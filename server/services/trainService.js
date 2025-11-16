class TrainService {
  // Mock train data
  getMockTrains(origin = '', destination = '') {
    const allTrains = [
      {
        id: 4001,
        operator: 'Eurostar',
        trainNumber: 'ES9012',
        origin: 'London St Pancras',
        destination: 'Paris Gare du Nord',
        departure: '2024-12-01T08:00:00Z',
        arrival: '2024-12-01T11:30:00Z',
        duration: 210,
        stops: 0,
        price: 120,
        currency: 'USD',
        class: 'Standard',
        amenities: ['WiFi', 'Power Outlets', 'Cafe Car', 'Luggage Storage']
      },
      {
        id: 4002,
        operator: 'Shinkansen',
        trainNumber: 'N700S',
        origin: 'Tokyo',
        destination: 'Osaka',
        departure: '2024-12-01T09:00:00Z',
        arrival: '2024-12-01T11:30:00Z',
        duration: 150,
        stops: 2,
        price: 140,
        currency: 'USD',
        class: 'Ordinary',
        amenities: ['WiFi', 'Power Outlets', 'Vending Machines', 'Spacious Seats']
      },
      {
        id: 4003,
        operator: 'Amtrak',
        trainNumber: 'Acela 2150',
        origin: 'New York Penn Station',
        destination: 'Washington DC',
        departure: '2024-12-01T07:00:00Z',
        arrival: '2024-12-01T10:00:00Z',
        duration: 180,
        stops: 3,
        price: 95,
        currency: 'USD',
        class: 'Business',
        amenities: ['WiFi', 'Power Outlets', 'Cafe Car', 'Quiet Car']
      },
      {
        id: 4004,
        operator: 'Deutsche Bahn',
        trainNumber: 'ICE 71',
        origin: 'Frankfurt',
        destination: 'Berlin',
        departure: '2024-12-01T10:00:00Z',
        arrival: '2024-12-01T14:00:00Z',
        duration: 240,
        stops: 4,
        price: 85,
        currency: 'USD',
        class: '2nd Class',
        amenities: ['WiFi', 'Power Outlets', 'Restaurant', 'Bike Storage']
      },
      {
        id: 4005,
        operator: 'Renfe AVE',
        trainNumber: 'AVE 3100',
        origin: 'Madrid',
        destination: 'Barcelona',
        departure: '2024-12-01T08:30:00Z',
        arrival: '2024-12-01T11:15:00Z',
        duration: 165,
        stops: 1,
        price: 110,
        currency: 'USD',
        class: 'Turista',
        amenities: ['WiFi', 'Power Outlets', 'Cafe', 'Air Conditioning']
      },
      {
        id: 4006,
        operator: 'Trenitalia',
        trainNumber: 'FR 9615',
        origin: 'Rome',
        destination: 'Milan',
        departure: '2024-12-01T09:00:00Z',
        arrival: '2024-12-01T12:00:00Z',
        duration: 180,
        stops: 2,
        price: 90,
        currency: 'USD',
        class: 'Standard',
        amenities: ['WiFi', 'Power Outlets', 'Bistro', 'Luggage Racks']
      }
    ];

    return allTrains;
  }
}

module.exports = new TrainService();
