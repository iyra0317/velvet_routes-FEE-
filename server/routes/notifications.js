const express = require('express');
const authMiddleware = require('../middleware/auth');
const notificationService = require('../services/notificationService');

const router = express.Router();

router.post('/subscribe', authMiddleware, (req, res) => {
  try {
    const { subscription } = req.body;
    const result = notificationService.subscribeToPush(req.user.id, subscription);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/unsubscribe', authMiddleware, (req, res) => {
  try {
    const result = notificationService.unsubscribeFromPush(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/status', (req, res) => {
  try {
    const status = notificationService.getNotificationStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/test', authMiddleware, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    const testBooking = {
      id: 'TEST123',
      type: 'hotel',
      amount: 150,
      details: {
        hotelName: 'Test Hotel',
        location: 'Paris, France'
      },
      customerName: req.user.name || 'Test User',
      customerEmail: req.user.email || 'test@example.com'
    };

    const result = await notificationService.sendBookingNotification(testBooking, phoneNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
