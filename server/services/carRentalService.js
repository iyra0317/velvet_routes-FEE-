const axios = require('axios');

class CarRentalService {
  constructor() {
    this.rapidApiKey = process.env.RAPIDAPI_KEY;
    this.rapidApiHost = process.env.RAPIDAPI_CAR_HOST || 'booking-com15.p.rapidapi.com';
    this.useRealAPI = this.rapidApiKey && this.rapidApiKey.length > 20;
  }

  // Search car rentals
  async searchCars(location, pickUpDate, dropOffDate, pickUpTime = '10:00', dropOffTime = '10:00') {
    if (this.useRealAPI) {
      try {
        return await this.searchRealCars(location, pickUpDate, dropOffDate, pickUpTime, dropOffTime);
      } catch (error) {
        console.error('Real car API failed, using mock data:', error.message);
        return this.getMockCars(location);
      }
    }
    return this.getMockCars(location);
  }

  // Search real cars using Booking.com API
  async searchRealCars(location, pickUpDate, dropOffDate, pickUpTime, dropOffTime) {
    try {
      // For demo, using coordinates for major cities
      const coordinates = this.getLocationCoordinates(location);
      
      const response = await axios.get(
        `https://${this.rapidApiHost}/api/v1/cars/searchCarRentals`,
        {
          params: {
            pick_up_latitude: coordinates.lat,
            pick_up_longitude: coordinates.lng,
            drop_off_latitude: coordinates.lat,
            drop_off_longitude: coordinates.lng,
            pick_up_date: pickUpDate,
            drop_off_date: dropOffDate,
            pick_up_time: pickUpTime,
            drop_off_time: dropOffTime,
            driver_age: 30,
            currency_code: 'USD',
            location: 'US'
          },
          headers: {
            'x-rapidapi-key': this.rapidApiKey,
            'x-rapidapi-host': this.rapidApiHost
          }
        }
      );

      if (response.data && response.data.data) {
        return this.formatRealCars(response.data.data);
      }

      return this.getMockCars(location);
    } catch (error) {
      console.error('Error fetching real cars:', error.message);
      return this.getMockCars(location);
    }
  }

  // Get coordinates for major cities
  getLocationCoordinates(location) {
    const coordinates = {
      'paris': { lat: 48.8566, lng: 2.3522 },
      'tokyo': { lat: 35.6762, lng: 139.6503 },
      'new york': { lat: 40.7128, lng: -74.0060 },
      'london': { lat: 51.5074, lng: -0.1278 },
      'dubai': { lat: 25.2048, lng: 55.2708 },
      'bali': { lat: -8.3405, lng: 115.0920 },
      'default': { lat: 40.7128, lng: -74.0060 }
    };

    const key = location.toLowerCase();
    return coordinates[key] || coordinates['default'];
  }

  // Format real API response
  formatRealCars(cars) {
    if (!Array.isArray(cars)) return this.getMockCars();
    
    return cars.slice(0, 15).map((car, index) => ({
      id: car.id || index + 2000,
      name: car.vehicle?.name || 'Car',
      category: car.vehicle?.category || 'Economy',
      transmission: car.vehicle?.transmission || 'Automatic',
      seats: car.vehicle?.seats || 5,
      doors: car.vehicle?.doors || 4,
      pricePerDay: Math.round(car.price?.amount || 50),
      currency: car.price?.currency || 'USD',
      image: car.vehicle?.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      supplier: car.supplier?.name || 'Car Rental',
      features: this.extractFeatures(car)
    }));
  }

  extractFeatures(car) {
    const features = [];
    if (car.vehicle?.airConditioning) features.push('Air Conditioning');
    if (car.vehicle?.unlimited_mileage) features.push('Unlimited Mileage');
    features.push('Insurance', 'GPS Available');
    return features;
  }

  // Mock car data
  getMockCars(location = '') {
    const allCars = [
      {
        id: 2001,
        name: 'Toyota Corolla',
        category: 'Economy',
        transmission: 'Automatic',
        seats: 5,
        doors: 4,
        pricePerDay: 45,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        supplier: 'Budget Rent a Car',
        features: ['Air Conditioning', 'Unlimited Mileage', 'Insurance', 'GPS Available']
      },
      {
        id: 2002,
        name: 'Honda Civic',
        category: 'Compact',
        transmission: 'Automatic',
        seats: 5,
        doors: 4,
        pricePerDay: 50,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        supplier: 'Hertz',
        features: ['Air Conditioning', 'Unlimited Mileage', 'Insurance', 'Bluetooth']
      },
      {
        id: 2003,
        name: 'Ford Mustang',
        category: 'Sports',
        transmission: 'Automatic',
        seats: 4,
        doors: 2,
        pricePerDay: 120,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5f5d3e0c0?w=800',
        supplier: 'Enterprise',
        features: ['Air Conditioning', 'Premium Sound', 'Insurance', 'GPS']
      },
      {
        id: 2004,
        name: 'BMW 3 Series',
        category: 'Luxury',
        transmission: 'Automatic',
        seats: 5,
        doors: 4,
        pricePerDay: 150,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        supplier: 'Sixt',
        features: ['Air Conditioning', 'Leather Seats', 'Premium Sound', 'GPS', 'Insurance']
      },
      {
        id: 2005,
        name: 'Toyota RAV4',
        category: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        doors: 4,
        pricePerDay: 85,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        supplier: 'Avis',
        features: ['Air Conditioning', 'Unlimited Mileage', '4WD', 'Insurance', 'GPS']
      },
      {
        id: 2006,
        name: 'Mercedes-Benz E-Class',
        category: 'Luxury',
        transmission: 'Automatic',
        seats: 5,
        doors: 4,
        pricePerDay: 180,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
        supplier: 'Europcar',
        features: ['Air Conditioning', 'Leather Seats', 'Premium Sound', 'GPS', 'Insurance']
      }
    ];

    return allCars;
  }
}

module.exports = new CarRentalService();
