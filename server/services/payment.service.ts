import { PrismaClient, PaymentStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export interface ProcessPaymentRequest {
  bookingId: string;
  userId: string;
  stripePaymentIntentId: string;
  amountCents: number;
  currency?: string;
}

export class PaymentService {
  
  /**
   * Process payment for booking
   */
  static async processPayment(request: ProcessPaymentRequest) {
    return await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          id: uuidv4(),
          bookingId: request.bookingId,
          userId: request.userId,
          provider: 'STRIPE',
          stripePaymentId: request.stripePaymentIntentId,
          amountCents: request.amountCents,
          currency: request.currency || 'USD',
          status: 'PROCESSING'
        }
      });

      await tx.auditLog.create({
        data: {
          id: uuidv4(),
          userId: request.userId,
          action: 'PAYMENT_INITIATED',
          objectType: 'payment',
          objectId: payment.id,
          details: {
            bookingId: request.bookingId,
            amountCents: request.amountCents
          }
        }
      });

      return payment;
    });
  }

  /**
   * Update payment status
   */
  static async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
    metadata?: Record<string, any>
  ) {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        metadata,
        updatedAt: new Date()
      },
      include: {
        booking: true
      }
    });

    if (status === 'SUCCEEDED') {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' }
      });
    } else if (status === 'FAILED') {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'PAYMENT_FAILED' }
      });
    }

    return payment;
  }

  /**
   * Get payment by booking ID
   */
  static async getPaymentByBookingId(bookingId: string) {
    return await prisma.payment.findFirst({
      where: { bookingId },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Refund payment
   */
  static async refundPayment(paymentId: string, userId?: string) {
    return await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: 'REFUNDED',
          updatedAt: new Date()
        }
      });

      await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'REFUNDED' }
      });

      await tx.auditLog.create({
        data: {
          id: uuidv4(),
          userId,
          action: 'PAYMENT_REFUNDED',
          objectType: 'payment',
          objectId: paymentId,
          details: {
            bookingId: payment.bookingId,
            amountCents: payment.amountCents
          }
        }
      });

      return payment;
    });
  }
}

export default PaymentService;
