const axios = require('axios');

class FlightService {
  constructor() {
    this.rapidApiKey = process.env.RAPIDAPI_KEY;
    this.rapidApiHost = process.env.RAPIDAPI_FLIGHT_HOST || 'sky-scrapper.p.rapidapi.com';
    this.useRealAPI = this.rapidApiKey && this.rapidApiKey.length > 20;
  }

  // Search flights
  async searchFlights(origin, destination, departDate, returnDate = null, adults = 1, cabinClass = 'economy') {
    if (this.useRealAPI) {
      try {
        return await this.searchRealFlights(origin, destination, departDate, returnDate, adults, cabinClass);
      } catch (error) {
        console.error('Real flight API failed, using mock data:', error.message);
        return this.getMockFlights(origin, destination);
      }
    }
    return this.getMockFlights(origin, destination);
  }

  // Search real flights using Sky Scrapper API
  async searchRealFlights(origin, destination, departDate, returnDate, adults, cabinClass) {
    try {
      const originCode = this.getAirportCode(origin);
      const destCode = this.getAirportCode(destination);

      const response = await axios.get(
        `https://${this.rapidApiHost}/api/v2/flights/searchFlightsComplete`,
        {
          params: {
            originSkyId: originCode,
            destinationSkyId: destCode,
            originEntityId: this.getEntityId(origin),
            destinationEntityId: this.getEntityId(destination),
            cabinClass: cabinClass,
            adults: adults,
            sortBy: 'best',
            currency: 'USD',
            market: 'en-US',
            countryCode: 'US',
            date: departDate,
            returnDate: returnDate || undefined
          },
          headers: {
            'x-rapidapi-key': this.rapidApiKey,
            'x-rapidapi-host': this.rapidApiHost
          }
        }
      );

      if (response.data && response.data.data) {
        return this.formatRealFlights(response.data.data);
      }

      return this.getMockFlights(origin, destination);
    } catch (error) {
      console.error('Error fetching real flights:', error.message);
      return this.getMockFlights(origin, destination);
    }
  }

  // Get airport codes for major cities
  getAirportCode(city) {
    const codes = {
      'london': 'LOND',
      'new york': 'NYCA',
      'paris': 'PARI',
      'tokyo': 'TYOA',
      'dubai': 'DXBA',
      'singapore': 'SINA',
      'los angeles': 'LAXA',
      'sydney': 'SYDA',
      'default': 'LOND'
    };
    return codes[city.toLowerCase()] || codes['default'];
  }

  // Get entity IDs for major cities
  getEntityId(city) {
    const ids = {
      'london': '27544008',
      'new york': '27537542',
      'paris': '27539733',
      'tokyo': '27539793',
      'dubai': '27536673',
      'singapore': '27546206',
      'los angeles': '27537552',
      'sydney': '27544994',
      'default': '27544008'
    };
    return ids[city.toLowerCase()] || ids['default'];
  }

  // Format real API response
  formatRealFlights(data) {
    if (!data.itineraries || !Array.isArray(data.itineraries)) {
      return this.getMockFlights();
    }

    return data.itineraries.slice(0, 20).map((itinerary, index) => {
      const leg = itinerary.legs[0];
      return {
        id: itinerary.id || index + 3000,
        airline: leg.carriers?.marketing?.[0]?.name || 'Airline',
        flightNumber: leg.segments?.[0]?.flightNumber || 'FL123',
        origin: leg.origin?.displayCode || 'ORG',
        destination: leg.destination?.displayCode || 'DEST',
        departure: leg.departure || new Date().toISOString(),
        arrival: leg.arrival || new Date().toISOString(),
        duration: leg.durationInMinutes || 120,
        stops: leg.stopCount || 0,
        price: itinerary.price?.raw || 299,
        currency: 'USD',
        cabinClass: leg.segments?.[0]?.cabinClass || 'economy',
        aircraft: leg.segments?.[0]?.operatingCarrier?.name || 'Boeing 737',
        logo: leg.carriers?.marketing?.[0]?.logoUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      };
    });
  }

  // Mock flight data
  getMockFlights(origin = '', destination = '') {
    const allFlights = [
      {
        id: 3001,
        airline: 'Emirates',
        flightNumber: 'EK001',
        origin: 'JFK',
        destination: 'DXB',
        departure: '2024-12-01T10:00:00Z',
        arrival: '2024-12-02T06:30:00Z',
        duration: 810,
        stops: 0,
        price: 899,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Airbus A380',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3002,
        airline: 'British Airways',
        flightNumber: 'BA178',
        origin: 'LHR',
        destination: 'JFK',
        departure: '2024-12-01T14:00:00Z',
        arrival: '2024-12-01T17:30:00Z',
        duration: 450,
        stops: 0,
        price: 650,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Boeing 777',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3003,
        airline: 'Singapore Airlines',
        flightNumber: 'SQ25',
        origin: 'SIN',
        destination: 'JFK',
        departure: '2024-12-01T23:00:00Z',
        arrival: '2024-12-02T06:00:00Z',
        duration: 1080,
        stops: 0,
        price: 1200,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Airbus A350',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3004,
        airline: 'Air France',
        flightNumber: 'AF007',
        origin: 'CDG',
        destination: 'LAX',
        departure: '2024-12-01T11:00:00Z',
        arrival: '2024-12-01T14:30:00Z',
        duration: 690,
        stops: 0,
        price: 750,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Boeing 787',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3005,
        airline: 'Lufthansa',
        flightNumber: 'LH400',
        origin: 'FRA',
        destination: 'JFK',
        departure: '2024-12-01T13:00:00Z',
        arrival: '2024-12-01T16:00:00Z',
        duration: 540,
        stops: 0,
        price: 680,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Airbus A340',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3006,
        airline: 'Qatar Airways',
        flightNumber: 'QR701',
        origin: 'DOH',
        destination: 'SYD',
        departure: '2024-12-01T02:00:00Z',
        arrival: '2024-12-01T22:30:00Z',
        duration: 870,
        stops: 0,
        price: 950,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Boeing 777',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3007,
        airline: 'Delta Airlines',
        flightNumber: 'DL15',
        origin: 'LAX',
        destination: 'NRT',
        departure: '2024-12-01T12:00:00Z',
        arrival: '2024-12-02T16:00:00Z',
        duration: 660,
        stops: 0,
        price: 800,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Airbus A350',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      },
      {
        id: 3008,
        airline: 'United Airlines',
        flightNumber: 'UA890',
        origin: 'SFO',
        destination: 'SIN',
        departure: '2024-12-01T23:30:00Z',
        arrival: '2024-12-03T07:00:00Z',
        duration: 930,
        stops: 0,
        price: 1100,
        currency: 'USD',
        cabinClass: 'economy',
        aircraft: 'Boeing 787',
        logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200'
      }
    ];

    return allFlights;
  }

  // Format duration in minutes to readable format
  formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}

module.exports = new FlightService();
