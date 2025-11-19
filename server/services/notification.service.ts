import { PrismaClient, NotificationChannel, NotificationStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export interface SendNotificationRequest {
  userId: string;
  channel: NotificationChannel;
  message: string;
  email?: string;
  phone?: string;
  metadata?: Record<string, any>;
}

export class NotificationService {
  
  /**
   * Send notification to user
   */
  static async sendNotification(request: SendNotificationRequest) {
    const notification = await prisma.notification.create({
      data: {
        id: uuidv4(),
        userId: request.userId,
        channel: request.channel,
        message: request.message,
        email: request.email,
        phone: request.phone,
        status: 'PENDING',
        metadata: request.metadata
      }
    });

    // Here you would integrate with actual notification providers
    // For now, we'll just mark as delivered
    await this.updateNotificationStatus(notification.id, 'DELIVERED');

    return notification;
  }

  /**
   * Update notification status
   */
  static async updateNotificationStatus(
    notificationId: string,
    status: NotificationStatus,
    providerMessageId?: string
  ) {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: {
        status,
        providerMessageId,
        updatedAt: new Date()
      }
    });
  }

  /**
   * Get user notifications
   */
  static async getUserNotifications(userId: string, limit = 50) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  /**
   * Send booking confirmation
   */
  static async sendBookingConfirmation(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
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

    if (!booking) {
      throw new Error('Booking not found');
    }

    const message = `Booking confirmed! Your reservation (ID: ${bookingId}) has been confirmed.`;

    // Send email notification
    if (booking.customerEmail) {
      await this.sendNotification({
        userId: booking.userId,
        channel: 'EMAIL',
        email: booking.customerEmail,
        message,
        metadata: { bookingId, type: 'booking_confirmation' }
      });
    }

    // Send SMS notification
    if (booking.customerPhone) {
      await this.sendNotification({
        userId: booking.userId,
        channel: 'SMS',
        phone: booking.customerPhone,
        message,
        metadata: { bookingId, type: 'booking_confirmation' }
      });
    }
  }
}

export default NotificationService;
