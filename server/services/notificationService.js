const twilio = require('twilio');
const webpush = require('web-push');

class NotificationService {
  constructor() {
    this.twilioClient = null;
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
      webpush.setVapidDetails(
        'mailto:support@velvetroutes.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
      );
    }

    this.pushSubscriptions = new Map();
  }

  async sendBookingNotification(booking, userPhone = null) {
    const notifications = [];

    try {
      if (userPhone && this.twilioClient) {
        const smsResult = await this.sendSMS(booking, userPhone);
        notifications.push({ type: 'sms', result: smsResult });
      }

      const pushResult = await this.sendPushNotification(booking);
      notifications.push({ type: 'push', result: pushResult });

      if (userPhone && this.twilioClient) {
        const whatsappResult = await this.sendWhatsApp(booking, userPhone);
        notifications.push({ type: 'whatsapp', result: whatsappResult });
      }

      return {
        success: true,
        notifications: notifications,
        message: 'Notifications sent successfully'
      };
    } catch (error) {
      console.error('Notification error:', error);
      return {
        success: false,
        error: error.message,
        notifications: notifications
      };
    }
  }

  async sendSMS(booking, phoneNumber) {
    if (!this.twilioClient) {
      return { success: false, message: 'SMS not configured' };
    }

    try {
      const message = this.createSMSMessage(booking);
      
      const result = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      return {
        success: true,
        messageId: result.sid,
        message: 'SMS sent successfully'
      };
    } catch (error) {
      console.error('SMS error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendWhatsApp(booking, phoneNumber) {
    if (!this.twilioClient) {
      return { success: false, message: 'WhatsApp not configured' };
    }

    try {
      const message = this.createWhatsAppMessage(booking);
      
      const result = await this.twilioClient.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${phoneNumber}`
      });

      return {
        success: true,
        messageId: result.sid,
        message: 'WhatsApp sent successfully'
      };
    } catch (error) {
      console.error('WhatsApp error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendPushNotification(booking) {
    try {
      const payload = {
        title: '🎉 Booking Confirmed!',
        body: this.createPushMessage(booking),
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        data: {
          bookingId: booking.id,
          type: booking.type,
          url: `/dashboard`
        },
        actions: [
          { action: 'view', title: 'View Booking' },
          { action: 'close', title: 'Close' }
        ]
      };

      const results = [];
      
      for (const [userId, subscription] of this.pushSubscriptions) {
        try {
          await webpush.sendNotification(subscription, JSON.stringify(payload));
          results.push({ userId, success: true });
        } catch (error) {
          results.push({ userId, success: false, error: error.message });
        }
      }

      return {
        success: true,
        results: results,
        message: `Push notifications sent to ${results.length} devices`
      };
    } catch (error) {
      console.error('Push notification error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  createSMSMessage(booking) {
    const type = booking.type.toUpperCase();
    const amount = `$${booking.amount.toFixed(2)}`;
    
    let details = '';
    if (booking.type === 'hotel') {
      details = `${booking.details.hotelName} in ${booking.details.location}`;
    } else if (booking.type === 'flight') {
      details = `${booking.details.airline} ${booking.details.flightNumber} (${booking.details.origin} → ${booking.details.destination})`;
    } else if (booking.type === 'car') {
      details = `${booking.details.carName} in ${booking.details.location}`;
    } else {
      details = `${booking.details.operator} (${booking.details.origin} → ${booking.details.destination})`;
    }

    return `✈️ Velvet Routes: Your ${type} booking is confirmed! \n\n${details}\n\nBooking ID: #${booking.id}\nAmount: ${amount}\n\nInvoice sent to your email. Have a great trip!`;
  }

  createWhatsAppMessage(booking) {
    const type = booking.type.toUpperCase();
    const amount = `$${booking.amount.toFixed(2)}`;
    
    return `🎉 *Booking Confirmed!*\n\n✈️ *Velvet Routes*\n\n📋 *${type} Booking*\nID: #${booking.id}\nAmount: ${amount}\n\n📧 Invoice sent to your email\n📱 Download from our app\n\n✨ Thank you for choosing Velvet Routes!\n\nHave an amazing trip! 🌍`;
  }

  createPushMessage(booking) {
    const type = booking.type.charAt(0).toUpperCase() + booking.type.slice(1);
    const amount = `$${booking.amount.toFixed(2)}`;
    
    return `${type} booking confirmed! Booking ID: #${booking.id} | Amount: ${amount}`;
  }

  subscribeToPush(userId, subscription) {
    this.pushSubscriptions.set(userId, subscription);
    return {
      success: true,
      message: 'Subscribed to push notifications'
    };
  }

  unsubscribeFromPush(userId) {
    this.pushSubscriptions.delete(userId);
    return {
      success: true,
      message: 'Unsubscribed from push notifications'
    };
  }

  getNotificationStatus() {
    return {
      sms: {
        enabled: !!this.twilioClient,
        service: 'Twilio'
      },
      whatsapp: {
        enabled: !!this.twilioClient && !!process.env.TWILIO_WHATSAPP_NUMBER,
        service: 'Twilio'
      },
      push: {
        enabled: !!process.env.VAPID_PUBLIC_KEY,
        service: 'Web Push',
        subscribers: this.pushSubscriptions.size
      }
    };
  }
}

module.exports = new NotificationService();
