const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class EmailService {
  constructor() {
    // Configure email transporter
    // For development, using Ethereal (fake SMTP)
    // For production, use real SMTP (Gmail, SendGrid, etc.)
    this.transporter = null;
    this.initTransporter();
  }

  async initTransporter() {
    // For development: Create test account
    // For production: Use real SMTP credentials from .env
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Create test account for development
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('📧 Using test email account:', testAccount.user);
    }
  }

  // Generate PDF invoice
  async generateInvoicePDF(booking) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const fileName = `invoice-${booking.id}-${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '../temp', fileName);

      // Create temp directory if it doesn't exist
      const tempDir = path.join(__dirname, '../temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Header with gradient background
      doc.rect(0, 0, doc.page.width, 150).fill('#667eea');

      // Company Logo/Name
      doc.fillColor('#ffffff')
         .fontSize(32)
         .font('Helvetica-Bold')
         .text('✈️ Velvet Routes', 50, 50);

      doc.fontSize(12)
         .font('Helvetica')
         .text('Your Travel Companion', 50, 90);

      // Invoice Title
      doc.fillColor('#1f2937')
         .fontSize(24)
         .font('Helvetica-Bold')
         .text('BOOKING INVOICE', 50, 180);

      // Invoice Details
      doc.fontSize(10)
         .font('Helvetica')
         .text(`Invoice #: ${booking.id}`, 50, 220)
         .text(`Date: ${new Date(booking.createdAt).toLocaleDateString()}`, 50, 235)
         .text(`Booking Type: ${booking.type.toUpperCase()}`, 50, 250);

      // Customer Details
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Customer Details', 50, 290);

      doc.fontSize(10)
         .font('Helvetica')
         .text(`Name: ${booking.customerName}`, 50, 315)
         .text(`Email: ${booking.customerEmail}`, 50, 330);

      // Booking Details
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Booking Details', 50, 370);

      let yPos = 395;
      
      if (booking.type === 'hotel') {
        doc.fontSize(10)
           .font('Helvetica')
           .text(`Hotel: ${booking.details.hotelName}`, 50, yPos)
           .text(`Location: ${booking.details.location}`, 50, yPos + 15)
           .text(`Check-in: ${booking.details.checkIn}`, 50, yPos + 30)
           .text(`Check-out: ${booking.details.checkOut}`, 50, yPos + 45)
           .text(`Guests: ${booking.details.guests}`, 50, yPos + 60)
           .text(`Rooms: ${booking.details.rooms}`, 50, yPos + 75);
        yPos += 110;
      } else if (booking.type === 'flight') {
        doc.fontSize(10)
           .font('Helvetica')
           .text(`Airline: ${booking.details.airline}`, 50, yPos)
           .text(`Flight: ${booking.details.flightNumber}`, 50, yPos + 15)
           .text(`Route: ${booking.details.origin} → ${booking.details.destination}`, 50, yPos + 30)
           .text(`Departure: ${new Date(booking.details.departure).toLocaleString()}`, 50, yPos + 45)
           .text(`Passengers: ${booking.details.passengers}`, 50, yPos + 60);
        yPos += 95;
      } else if (booking.type === 'car') {
        doc.fontSize(10)
           .font('Helvetica')
           .text(`Car: ${booking.details.carName}`, 50, yPos)
           .text(`Category: ${booking.details.category}`, 50, yPos + 15)
           .text(`Location: ${booking.details.location}`, 50, yPos + 30)
           .text(`Pick-up: ${booking.details.pickUpDate}`, 50, yPos + 45)
           .text(`Drop-off: ${booking.details.dropOffDate}`, 50, yPos + 60);
        yPos += 95;
      } else if (booking.type === 'train' || booking.type === 'bus') {
        doc.fontSize(10)
           .font('Helvetica')
           .text(`Operator: ${booking.details.operator}`, 50, yPos)
           .text(`Route: ${booking.details.origin} → ${booking.details.destination}`, 50, yPos + 15)
           .text(`Departure: ${new Date(booking.details.departure).toLocaleString()}`, 50, yPos + 30)
           .text(`Passengers: ${booking.details.passengers}`, 50, yPos + 45);
        yPos += 80;
      }

      // Payment Summary
      doc.rect(50, yPos + 20, 500, 100).stroke('#e5e7eb');
      
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Payment Summary', 60, yPos + 35);

      doc.fontSize(12)
         .font('Helvetica')
         .text(`Subtotal:`, 60, yPos + 60)
         .text(`$${booking.amount.toFixed(2)}`, 450, yPos + 60, { align: 'right' });

      doc.text(`Tax (0%):`, 60, yPos + 80)
         .text(`$0.00`, 450, yPos + 80, { align: 'right' });

      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text(`Total:`, 60, yPos + 100)
         .text(`$${booking.amount.toFixed(2)}`, 450, yPos + 100, { align: 'right' });

      // Payment Status
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#10b981')
         .text(`✓ Payment Confirmed`, 60, yPos + 125);

      // Footer
      doc.fontSize(8)
         .fillColor('#6b7280')
         .text('Thank you for booking with Velvet Routes!', 50, doc.page.height - 100, {
           align: 'center',
           width: doc.page.width - 100
         })
         .text('For support, contact: support@velvetroutes.com', 50, doc.page.height - 85, {
           align: 'center',
           width: doc.page.width - 100
         });

      doc.end();

      stream.on('finish', () => {
        resolve(filePath);
      });

      stream.on('error', reject);
    });
  }

  // Send booking confirmation email with invoice
  async sendBookingConfirmation(booking) {
    try {
      if (!this.transporter) {
        await this.initTransporter();
      }

      // Generate PDF invoice
      const pdfPath = await this.generateInvoicePDF(booking);

      // Email content
      const mailOptions = {
        from: '"Velvet Routes" <bookings@velvetroutes.com>',
        to: booking.customerEmail,
        subject: `Booking Confirmation - ${booking.type.toUpperCase()} #${booking.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">✈️ Velvet Routes</h1>
              <p style="color: white; margin: 10px 0 0 0;">Booking Confirmation</p>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937;">Thank You for Your Booking!</h2>
              <p style="color: #4b5563;">Your ${booking.type} booking has been confirmed.</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Booking Details</h3>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Booking ID:</strong> ${booking.id}</p>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Type:</strong> ${booking.type.toUpperCase()}</p>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Amount:</strong> $${booking.amount.toFixed(2)}</p>
                <p style="color: #6b7280; margin: 5px 0;"><strong>Status:</strong> <span style="color: #10b981;">✓ Confirmed</span></p>
              </div>
              
              <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="color: #1e40af; margin: 0;">
                  <strong>📎 Invoice Attached</strong><br>
                  Your booking invoice is attached to this email as a PDF.
                </p>
              </div>
              
              <p style="color: #4b5563; margin-top: 20px;">
                If you have any questions, please contact our support team.
              </p>
            </div>
            
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2024 Velvet Routes. All rights reserved.
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `invoice-${booking.id}.pdf`,
            path: pdfPath
          }
        ]
      };

      const info = await this.transporter.sendMail(mailOptions);

      // For development, log the preview URL
      if (process.env.NODE_ENV !== 'production') {
        console.log('📧 Email sent!');
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }

      // Clean up temp file
      setTimeout(() => {
        if (fs.existsSync(pdfPath)) {
          fs.unlinkSync(pdfPath);
        }
      }, 5000);

      return {
        success: true,
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info),
        pdfPath: pdfPath
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new EmailService();
