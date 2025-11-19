import { PrismaClient, BookingStatus, TravelMode, PaymentStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface CreateBookingRequest {
  userId: string;
  items: BookingItemRequest[];
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  paymentMethod?: {
    stripePaymentIntentId?: string;
  };
  metadata?: Record<string, any>;
}

export interface BookingItemRequest {
  inventoryItemId?: string;
  providerItemId: string;
  travelMode: TravelMode;
  quantity: number;
  unitPriceCents: number;
  startDate?: Date;
  endDate?: Date;
  seatInfo?: Record<string, any>;
  meta?: Record<string, any>;
}

export interface BookingSearchFilters {
  userId?: string;
  status?: BookingStatus;
  travelMode?: TravelMode;
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  offset?: number;
}

// ============================================================================
// BOOKING SERVICE
// ============================================================================

export class BookingService {
  
  /**
   * Create a new booking with items
   */
  static async createBooking(request: CreateBookingRequest) {
    return await prisma.$transaction(async (tx) => {
      const totalAmountCents = request.items.reduce(
        (sum, item) => sum + (item.unitPriceCents * item.quantity), 
        0
      );

      for (const item of request.items) {
        if (item.inventoryItemId) {
          const inventoryItem = await tx.inventoryItem.findUnique({
            where: { id: item.inventoryItemId }
          });
          
          if (!inventoryItem || !inventoryItem.isAvailable) {
            throw new Error(`Inventory item ${item.inventoryItemId} is not available`);
          }
        }
      }

      const booking = await tx.booking.create({
        data: {
          id: uuidv4(),
          userId: request.userId,
          totalAmountCents,
          currency: 'USD',
          status: 'PENDING',
          customerName: request.customerInfo.name,
          customerEmail: request.customerInfo.email,
          customerPhone: request.customerInfo.phone,
          metadata: request.metadata,
          bookingItems: {
            create: request.items.map(item => ({
              id: uuidv4(),
              inventoryItemId: item.inventoryItemId,
              providerItemId: item.providerItemId,
              travelMode: item.travelMode,
              quantity: item.quantity,
              unitPriceCents: item.unitPriceCents,
              startDate: item.startDate,
              endDate: item.endDate,
              seatInfo: item.seatInfo,
              meta: item.meta
            }))
          }
        },
        include: {
          bookingItems: {
            include: {
              inventoryItem: {
                include: {
                  hotel: true,
                  flight: true,
                  car: true
                }
              }
            }
          }
        }
      });

      if (request.paymentMethod?.stripePaymentIntentId) {
        await tx.payment.create({
          data: {
            id: uuidv4(),
            bookingId: booking.id,
            userId: request.userId,
            provider: 'STRIPE',
            stripePaymentId: request.paymentMethod.stripePaymentIntentId,
            amountCents: totalAmountCents,
            currency: 'USD',
            status: 'INIT'
          }
        });
      }

      await tx.auditLog.create({
        data: {
          id: uuidv4(),
          userId: request.userId,
          action: 'BOOKING_CREATED',
          objectType: 'booking',
          objectId: booking.id,
          details: {
            totalAmountCents,
            itemCount: request.items.length
          }
        }
      });

      return booking;
    });
  }

  /**
   * Update booking status
   */
  static async updateBookingStatus(
    bookingId: string, 
    status: BookingStatus, 
    userId?: string
  ) {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { 
        status,
        updatedAt: new Date()
      },
      include: {
        bookingItems: true,
        payments: true
      }
    });

    await prisma.auditLog.create({
      data: {
        id: uuidv4(),
        userId,
        action: 'BOOKING_STATUS_UPDATED',
        objectType: 'booking',
        objectId: bookingId,
        details: { newStatus: status }
      }
    });

    return booking;
  }

  /**
   * Get user bookings with pagination
   */
  static async getUserBookings(filters: BookingSearchFilters) {
    const where: any = {};
    
    if (filters.userId) where.userId = filters.userId;
    if (filters.status) where.status = filters.status;
    
    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          bookingItems: {
            include: {
              inventoryItem: {
                include: {
                  hotel: true,
                  flight: true,
                  car: true
                }
              }
            }
          },
          payments: true
        },
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 20,
        skip: filters.offset || 0
      }),
      prisma.booking.count({ where })
    ]);

    return { bookings, total };
  }

  /**
   * Get booking by ID
   */
  static async getBookingById(bookingId: string) {
    return await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        bookingItems: {
          include: {
            inventoryItem: {
              include: {
                hotel: true,
                flight: true,
                car: true
              }
            }
          }
        },
        payments: true,
        invoice: true
      }
    });
  }

  /**
   * Cancel booking
   */
  static async cancelBooking(bookingId: string, userId?: string) {
    return await this.updateBookingStatus(bookingId, 'CANCELLED', userId);
  }
}

export default BookingService;
