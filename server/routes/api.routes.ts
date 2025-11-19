import { Router, Request, Response } from 'express';
import BookingService from '../services/booking.service';
import InventoryService from '../services/inventory.service';
import PaymentService from '../services/payment.service';
import UserService from '../services/user.service';
import NotificationService from '../services/notification.service';

const router = Router();

// ============================================================================
// HEALTH CHECK
// ============================================================================

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// INVENTORY ROUTES
// ============================================================================

router.get('/inventory', async (req: Request, res: Response) => {
  try {
    const filters = {
      travelMode: req.query.travelMode as any,
      location: req.query.location as string,
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0
    };

    const result = await InventoryService.searchInventory(filters);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/inventory/:id', async (req: Request, res: Response) => {
  try {
    const item = await InventoryService.getInventoryItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// BOOKING ROUTES
// ============================================================================

router.post('/bookings', async (req: Request, res: Response) => {
  try {
    const booking = await BookingService.createBooking(req.body);
    
    // Send confirmation notification
    await NotificationService.sendBookingConfirmation(booking.id);
    
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const filters = {
      userId: req.query.userId as string,
      status: req.query.status as any,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0
    };

    const result = await BookingService.getUserBookings(filters);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/bookings/:id', async (req: Request, res: Response) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/bookings/:id/status', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await BookingService.updateBookingStatus(
      req.params.id,
      status,
      req.body.userId
    );
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bookings/:id/cancel', async (req: Request, res: Response) => {
  try {
    const booking = await BookingService.cancelBooking(
      req.params.id,
      req.body.userId
    );
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// PAYMENT ROUTES
// ============================================================================

router.post('/payments', async (req: Request, res: Response) => {
  try {
    const payment = await PaymentService.processPayment(req.body);
    res.status(201).json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/payments/:id/status', async (req: Request, res: Response) => {
  try {
    const { status, metadata } = req.body;
    const payment = await PaymentService.updatePaymentStatus(
      req.params.id,
      status,
      metadata
    );
    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/payments/:id/refund', async (req: Request, res: Response) => {
  try {
    const payment = await PaymentService.refundPayment(
      req.params.id,
      req.body.userId
    );
    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// USER ROUTES
// ============================================================================

router.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/users/:id/profile', async (req: Request, res: Response) => {
  try {
    const profile = await UserService.updateProfile(req.params.id, req.body);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// NOTIFICATION ROUTES
// ============================================================================

router.get('/notifications/:userId', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const notifications = await NotificationService.getUserNotifications(
      req.params.userId,
      limit
    );
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/notifications', async (req: Request, res: Response) => {
  try {
    const notification = await NotificationService.sendNotification(req.body);
    res.status(201).json(notification);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
