const express = require('express');
const authMiddleware = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// In-memory bookings storage
const bookings = [];

// Get all bookings for user
router.get('/', authMiddleware, (req, res) => {
  const userBookings = bookings.filter(b => b.userId === req.user.id);
  res.json(userBookings);
});

// Create booking (Universal - handles all types)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, details, amount, paymentIntentId, customerName, customerEmail } = req.body;

    const booking = {
      id: bookings.length + 1,
      userId: req.user.id,
      type: type, // 'hotel', 'flight', 'car', 'train', 'bus'
      details: details,
      amount: amount,
      paymentIntentId: paymentIntentId,
      customerName: customerName,
      customerEmail: customerEmail,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);

    // Send confirmation email with invoice
    const emailResult = await emailService.sendBookingConfirmation(booking);

    res.status(201).json({
      booking: booking,
      email: emailResult
    });
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

// Get single booking
router.get('/:id', authMiddleware, (req, res) => {
  const booking = bookings.find(b => 
    b.id === parseInt(req.params.id) && b.userId === req.user.id
  );

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.json(booking);
});

// Download invoice PDF
router.get('/:id/invoice', authMiddleware, async (req, res) => {
  try {
    const booking = bookings.find(b => 
      b.id === parseInt(req.params.id) && b.userId === req.user.id
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Generate PDF
    const pdfPath = await emailService.generateInvoicePDF(booking);

    // Send PDF file
    res.download(pdfPath, `invoice-${booking.id}.pdf`, (err) => {
      if (err) {
        console.error('PDF download error:', err);
      }
      // Clean up temp file
      const fs = require('fs');
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    });
  } catch (error) {
    console.error('Invoice generation failed:', error);
    res.status(500).json({ message: 'Invoice generation failed' });
  }
});

// Cancel booking
router.delete('/:id', authMiddleware, (req, res) => {
  const index = bookings.findIndex(b => 
    b.id === parseInt(req.params.id) && b.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  bookings[index].status = 'cancelled';
  res.json({ message: 'Booking cancelled', booking: bookings[index] });
});

module.exports = router;
