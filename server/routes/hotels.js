const express = require('express');
const hotelService = require('../services/hotelService');
const router = express.Router();

// Fallback hotel data
const fallbackHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Paris, France',
    address: '123 Champs-Élysées, Paris, France',
    description: 'Luxurious 5-star hotel in the heart of Paris with stunning views of the Eiffel Tower. Experience French elegance and world-class service.',
    pricePerNight: 250,
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service', 'Parking']
  },
  {
    id: 2,
    name: 'Sakura Garden Hotel',
    location: 'Tokyo, Japan',
    address: '456 Shibuya, Tokyo, Japan',
    description: 'Modern hotel blending traditional Japanese aesthetics with contemporary comfort. Perfect location for exploring Tokyo.',
    pricePerNight: 180,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym', 'Concierge', 'Laundry']
  },
  {
    id: 3,
    name: 'Sunset Beach Resort',
    location: 'Bali, Indonesia',
    address: '789 Seminyak Beach, Bali, Indonesia',
    description: 'Beachfront paradise with private villas, infinity pools, and breathtaking ocean views. Your tropical escape awaits.',
    pricePerNight: 320,
    rating: 4.9,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    amenities: ['Free WiFi', 'Beach Access', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Water Sports', 'Yoga Classes']
  },
  {
    id: 4,
    name: 'Manhattan Sky Tower',
    location: 'New York, USA',
    address: '321 5th Avenue, New York, USA',
    description: 'Iconic skyscraper hotel with panoramic city views. Steps away from Times Square and Central Park.',
    pricePerNight: 280,
    rating: 4.6,
    reviews: 1580,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    amenities: ['Free WiFi', 'Rooftop Bar', 'Restaurant', 'Gym', 'Business Center', 'Concierge']
  },
  {
    id: 5,
    name: 'Alpine Mountain Lodge',
    location: 'Swiss Alps, Switzerland',
    address: '555 Mountain Road, Zermatt, Switzerland',
    description: 'Cozy mountain retreat with stunning alpine views. Perfect for skiing and hiking enthusiasts.',
    pricePerNight: 220,
    rating: 4.8,
    reviews: 750,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    amenities: ['Free WiFi', 'Ski Storage', 'Restaurant', 'Spa', 'Fireplace', 'Mountain Views']
  },
  {
    id: 6,
    name: 'Desert Oasis Resort',
    location: 'Dubai, UAE',
    address: '888 Palm Jumeirah, Dubai, UAE',
    description: 'Luxury resort in the desert with world-class amenities and Arabian hospitality.',
    pricePerNight: 400,
    rating: 4.9,
    reviews: 1920,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    amenities: ['Free WiFi', 'Private Beach', 'Pool', 'Spa', 'Multiple Restaurants', 'Golf Course', 'Kids Club']
  }
];

// Search hotels with real API or mock data
router.get('/search', async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests } = req.query;
    
    if (!destination) {
      return res.json(fallbackHotels);
    }

    const hotels = await hotelService.searchHotels(
      destination,
      checkIn,
      checkOut,
      parseInt(guests) || 2
    );

    res.json(hotels);
  } catch (error) {
    console.error('Hotel search error:', error);
    res.json(fallbackHotels);
  }
});

// Get all hotels (default list)
router.get('/', async (req, res) => {
  try {
    const hotels = await hotelService.getMockHotels();
    res.json(hotels);
  } catch (error) {
    res.json(fallbackHotels);
  }
});

// Get single hotel
router.get('/:id', async (req, res) => {
  try {
    const allHotels = await hotelService.getMockHotels();
    const hotel = allHotels.find(h => h.id === parseInt(req.params.id));
    
    if (!hotel) {
      const fallback = fallbackHotels.find(h => h.id === parseInt(req.params.id));
      if (!fallback) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      return res.json(fallback);
    }
    
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel' });
  }
});

module.exports = router;
