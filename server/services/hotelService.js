const axios = require('axios');

class HotelService {
  constructor() {
    this.rapidApiKey = process.env.RAPIDAPI_KEY;
    this.rapidApiHost = process.env.RAPIDAPI_HOTEL_HOST || 'booking-com15.p.rapidapi.com';
    this.useRealAPI = this.rapidApiKey && this.rapidApiKey !== 'your_rapidapi_key_here' && this.rapidApiKey.length > 20;
  }

  // Search hotels by location
  async searchHotels(destination, checkIn, checkOut, adults = 2) {
    if (this.useRealAPI) {
      try {
        return await this.searchRealHotels(destination, checkIn, checkOut, adults);
      } catch (error) {
        console.error('Real API failed, using mock data:', error.message);
        return this.getMockHotels(destination);
      }
    }
    return this.getMockHotels(destination);
  }

  // Search real hotels using Booking.com API
  async searchRealHotels(destination, checkIn, checkOut, adults) {
    try {
      // Search hotels by location
      const response = await axios.get(
        `https://${this.rapidApiHost}/api/v1/hotels/searchHotels`,
        {
          params: {
            dest: destination,
            search_type: 'CITY',
            arrival_date: checkIn,
            departure_date: checkOut,
            adults: adults || 2,
            room_qty: 1,
            page_number: 1,
            units: 'metric',
            temperature_unit: 'c',
            languagecode: 'en-us',
            currency_code: 'USD'
          },
          headers: {
            'x-rapidapi-key': this.rapidApiKey,
            'x-rapidapi-host': this.rapidApiHost
          }
        }
      );

      if (response.data && response.data.data && response.data.data.hotels) {
        return this.formatRealHotels(response.data.data.hotels);
      }

      return this.getMockHotels(destination);
    } catch (error) {
      console.error('Error fetching real hotels:', error.message);
      return this.getMockHotels(destination);
    }
  }

  // Format real API response
  formatRealHotels(hotels) {
    if (!Array.isArray(hotels)) return this.getMockHotels();
    
    return hotels.slice(0, 20).map((hotel, index) => ({
      id: hotel.hotel_id || hotel.id || index + 1000,
      name: hotel.property?.name || hotel.hotel_name || 'Hotel',
      location: `${hotel.property?.city || hotel.city || 'City'}, ${hotel.property?.countryCode || hotel.country || 'Country'}`,
      address: hotel.property?.address || hotel.address || 'Address not available',
      description: hotel.property?.description || hotel.hotel_name || 'Comfortable accommodation',
      pricePerNight: Math.round(hotel.property?.priceBreakdown?.grossPrice?.value || hotel.min_total_price || 100),
      rating: hotel.property?.reviewScore || hotel.review_score || 4.5,
      reviews: hotel.property?.reviewCount || hotel.review_nr || 100,
      image: hotel.property?.photoUrls?.[0] || hotel.max_photo_url || hotel.main_photo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      amenities: this.extractAmenities(hotel)
    }));
  }

  extractAmenities(hotel) {
    const amenities = ['Free WiFi'];
    const facilities = hotel.property?.facilities || hotel.facilities || [];
    
    if (facilities.includes('Free parking') || hotel.has_free_parking) amenities.push('Free Parking');
    if (facilities.includes('Swimming pool') || hotel.has_swimming_pool) amenities.push('Pool');
    if (facilities.includes('Spa') || hotel.has_spa) amenities.push('Spa');
    if (facilities.includes('Restaurant') || hotel.has_restaurant) amenities.push('Restaurant');
    if (hotel.is_free_cancellable) amenities.push('Free Cancellation');
    
    amenities.push('Room Service', 'Air Conditioning');
    return amenities;
  }

  // Mock hotels for different destinations
  getMockHotels(destination = '') {
    const allHotels = [
      // Paris Hotels
      {
        id: 1,
        name: 'Grand Plaza Hotel Paris',
        location: 'Paris, France',
        address: '123 Champs-Élysées, Paris, France',
        description: 'Luxurious 5-star hotel in the heart of Paris with stunning views of the Eiffel Tower.',
        pricePerNight: 250,
        rating: 4.8,
        reviews: 1250,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service', 'Parking']
      },
      {
        id: 2,
        name: 'Le Marais Boutique Hotel',
        location: 'Paris, France',
        address: '45 Rue du Temple, Paris, France',
        description: 'Charming boutique hotel in the historic Marais district.',
        pricePerNight: 180,
        rating: 4.6,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Concierge', 'Laundry']
      },
      // Tokyo Hotels
      {
        id: 3,
        name: 'Sakura Garden Hotel',
        location: 'Tokyo, Japan',
        address: '456 Shibuya, Tokyo, Japan',
        description: 'Modern hotel blending traditional Japanese aesthetics with contemporary comfort.',
        pricePerNight: 180,
        rating: 4.7,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym', 'Concierge', 'Laundry']
      },
      {
        id: 4,
        name: 'Tokyo Sky Tower Hotel',
        location: 'Tokyo, Japan',
        address: '789 Shinjuku, Tokyo, Japan',
        description: 'Luxury hotel with panoramic city views and world-class dining.',
        pricePerNight: 220,
        rating: 4.9,
        reviews: 1450,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Rooftop Bar']
      },
      // Bali Hotels
      {
        id: 5,
        name: 'Sunset Beach Resort',
        location: 'Bali, Indonesia',
        address: '789 Seminyak Beach, Bali, Indonesia',
        description: 'Beachfront paradise with private villas and infinity pools.',
        pricePerNight: 320,
        rating: 4.9,
        reviews: 2100,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        amenities: ['Free WiFi', 'Beach Access', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Water Sports', 'Yoga']
      },
      {
        id: 6,
        name: 'Ubud Jungle Retreat',
        location: 'Bali, Indonesia',
        address: '123 Ubud Forest, Bali, Indonesia',
        description: 'Eco-luxury resort nestled in the lush Ubud jungle.',
        pricePerNight: 280,
        rating: 4.8,
        reviews: 1680,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Yoga', 'Nature Tours']
      },
      // New York Hotels
      {
        id: 7,
        name: 'Manhattan Sky Tower',
        location: 'New York, USA',
        address: '321 5th Avenue, New York, USA',
        description: 'Iconic skyscraper hotel with panoramic city views.',
        pricePerNight: 280,
        rating: 4.6,
        reviews: 1580,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        amenities: ['Free WiFi', 'Rooftop Bar', 'Restaurant', 'Gym', 'Business Center', 'Concierge']
      },
      {
        id: 8,
        name: 'Brooklyn Bridge Hotel',
        location: 'New York, USA',
        address: '567 Brooklyn Heights, New York, USA',
        description: 'Trendy hotel with stunning bridge and skyline views.',
        pricePerNight: 240,
        rating: 4.5,
        reviews: 1120,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym', 'Parking']
      },
      // London Hotels
      {
        id: 9,
        name: 'Thames View Hotel',
        location: 'London, UK',
        address: '100 Westminster, London, UK',
        description: 'Elegant hotel overlooking the River Thames and Big Ben.',
        pricePerNight: 300,
        rating: 4.7,
        reviews: 1890,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Spa', 'Gym', 'Concierge']
      },
      {
        id: 10,
        name: 'Covent Garden Boutique',
        location: 'London, UK',
        address: '45 Covent Garden, London, UK',
        description: 'Stylish boutique hotel in the heart of London\'s theater district.',
        pricePerNight: 260,
        rating: 4.6,
        reviews: 1340,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Room Service']
      },
      // Dubai Hotels
      {
        id: 11,
        name: 'Desert Oasis Resort',
        location: 'Dubai, UAE',
        address: '888 Palm Jumeirah, Dubai, UAE',
        description: 'Luxury resort with private beach and world-class amenities.',
        pricePerNight: 400,
        rating: 4.9,
        reviews: 1920,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        amenities: ['Free WiFi', 'Private Beach', 'Pool', 'Spa', 'Multiple Restaurants', 'Golf', 'Kids Club']
      },
      // Swiss Alps Hotels
      {
        id: 12,
        name: 'Alpine Mountain Lodge',
        location: 'Zermatt, Switzerland',
        address: '555 Mountain Road, Zermatt, Switzerland',
        description: 'Cozy mountain retreat with stunning alpine views.',
        pricePerNight: 220,
        rating: 4.8,
        reviews: 750,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        amenities: ['Free WiFi', 'Ski Storage', 'Restaurant', 'Spa', 'Fireplace', 'Mountain Views']
      }
    ];

    // Filter by destination if provided
    if (destination) {
      const filtered = allHotels.filter(hotel => 
        hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.name.toLowerCase().includes(destination.toLowerCase())
      );
      return filtered.length > 0 ? filtered : allHotels;
    }

    return allHotels;
  }
}

module.exports = new HotelService();
