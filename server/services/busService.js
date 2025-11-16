class BusService {
  // Mock bus data
  getMockBuses(origin = '', destination = '') {
    const allBuses = [
      {
        id: 5001,
        operator: 'Greyhound',
        busNumber: 'GH1234',
        origin: 'New York',
        destination: 'Boston',
        departure: '2024-12-01T08:00:00Z',
        arrival: '2024-12-01T12:30:00Z',
        duration: 270,
        stops: 3,
        price: 35,
        currency: 'USD',
        class: 'Standard',
        amenities: ['WiFi', 'Power Outlets', 'Restroom', 'Reclining Seats']
      },
      {
        id: 5002,
        operator: 'Megabus',
        busNumber: 'MB567',
        origin: 'Los Angeles',
        destination: 'San Francisco',
        departure: '2024-12-01T07:00:00Z',
        arrival: '2024-12-01T14:00:00Z',
        duration: 420,
        stops: 2,
        price: 25,
        currency: 'USD',
        class: 'Economy',
        amenities: ['WiFi', 'Power Outlets', 'Restroom']
      },
      {
        id: 5003,
        operator: 'FlixBus',
        busNumber: 'FB890',
        origin: 'Paris',
        destination: 'Amsterdam',
        departure: '2024-12-01T09:00:00Z',
        arrival: '2024-12-01T15:30:00Z',
        duration: 390,
        stops: 4,
        price: 40,
        currency: 'USD',
        class: 'Standard',
        amenities: ['WiFi', 'Power Outlets', 'Restroom', 'Air Conditioning']
      },
      {
        id: 5004,
        operator: 'National Express',
        busNumber: 'NE456',
        origin: 'London',
        destination: 'Edinburgh',
        departure: '2024-12-01T22:00:00Z',
        arrival: '2024-12-02T07:00:00Z',
        duration: 540,
        stops: 5,
        price: 45,
        currency: 'USD',
        class: 'Standard',
        amenities: ['WiFi', 'Power Outlets', 'Restroom', 'Reclining Seats']
      },
      {
        id: 5005,
        operator: 'BlaBlaBus',
        busNumber: 'BB123',
        origin: 'Berlin',
        destination: 'Prague',
        departure: '2024-12-01T10:00:00Z',
        arrival: '2024-12-01T14:30:00Z',
        duration: 270,
        stops: 2,
        price: 30,
        currency: 'USD',
        class: 'Economy',
        amenities: ['WiFi', 'Power Outlets', 'Restroom']
      },
      {
        id: 5006,
        operator: 'Alsa',
        busNumber: 'AL789',
        origin: 'Madrid',
        destination: 'Valencia',
        departure: '2024-12-01T08:00:00Z',
        arrival: '2024-12-01T12:00:00Z',
        duration: 240,
        stops: 3,
        price: 28,
        currency: 'USD',
        class: 'Standard',
        amenities: ['WiFi', 'Power Outlets', 'Restroom', 'Air Conditioning']
      }
    ];

    return allBuses;
  }
}

module.exports = new BusService();
