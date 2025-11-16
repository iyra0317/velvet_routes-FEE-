const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// In-memory trip storage
const trips = [];

// Get all trips for user
router.get('/', authMiddleware, (req, res) => {
  const userTrips = trips.filter(t => t.userId === req.user.id);
  res.json(userTrips);
});

// Get single trip
router.get('/:id', authMiddleware, (req, res) => {
  const trip = trips.find(t => t.id === parseInt(req.params.id) && t.userId === req.user.id);
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  res.json(trip);
});

// Create trip
router.post('/', authMiddleware, (req, res) => {
  const { title, destination, startDate, endDate, description, activities } = req.body;
  
  const trip = {
    id: trips.length + 1,
    userId: req.user.id,
    title,
    destination,
    startDate,
    endDate,
    description,
    activities: activities || [],
    createdAt: new Date().toISOString()
  };

  trips.push(trip);
  res.status(201).json(trip);
});

// Update trip
router.put('/:id', authMiddleware, (req, res) => {
  const trip = trips.find(t => t.id === parseInt(req.params.id) && t.userId === req.user.id);
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  const { title, destination, startDate, endDate, description, activities } = req.body;
  if (title) trip.title = title;
  if (destination) trip.destination = destination;
  if (startDate) trip.startDate = startDate;
  if (endDate) trip.endDate = endDate;
  if (description !== undefined) trip.description = description;
  if (activities) trip.activities = activities;

  res.json(trip);
});

// Delete trip
router.delete('/:id', authMiddleware, (req, res) => {
  const index = trips.findIndex(t => t.id === parseInt(req.params.id) && t.userId === req.user.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  trips.splice(index, 1);
  res.json({ message: 'Trip deleted' });
});

module.exports = router;
