# VelvetRoutes API Documentation

Base URL: `http://localhost:5000/api`

## Authentication
Currently, the API does not require authentication. JWT authentication can be added later.

## Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Inventory

### Search Inventory
```
GET /api/inventory
```

**Query Parameters:**
- `travelMode` (optional): HOTEL | FLIGHT | CAR | TRAIN | BUS
- `location` (optional): Search location
- `minPrice` (optional): Minimum price in cents
- `maxPrice` (optional): Maximum price in cents
- `limit` (optional): Results per page (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Example:**
```
GET /api/inventory?travelMode=HOTEL&location=Paris&maxPrice=20000
```

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "travelMode": "HOTEL",
      "priceCents": 15000,
      "currency": "USD",
      "searchableLocation": "Paris, France",
      "hotel": {
        "name": "Grand Hotel Paris",
        "rating": 4.5,
        "stars": 5
      }
    }
  ],
  "total": 1
}
```

### Get Inventory Item
```
GET /api/inventory/:id
```

**Response:**
```json
{
  "id": "uuid",
  "travelMode": "HOTEL",
  "priceCents": 15000,
  "hotel": { ... },
  "reviews": [ ... ]
}
```

---

## Bookings

### Create Booking
```
POST /api/bookings
```

**Request Body:**
```json
{
  "userId": "user-uuid",
  "items": [
    {
      "inventoryItemId": "item-uuid",
      "providerItemId": "hotel_paris_001",
      "travelMode": "HOTEL",
      "quantity": 1,
      "unitPriceCents": 15000,
      "startDate": "2024-06-15",
      "endDate": "2024-06-17",
      "seatInfo": {
        "roomType": "Deluxe King"
      }
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "paymentMethod": {
    "stripePaymentIntentId": "pi_xxx"
  }
}
```

**Response:**
```json
{
  "id": "booking-uuid",
  "status": "PENDING",
  "totalAmountCents": 15000,
  "bookingItems": [ ... ]
}
```

### Get User Bookings
```
GET /api/bookings?userId=user-uuid
```

**Query Parameters:**
- `userId` (optional): Filter by user
- `status` (optional): PENDING | CONFIRMED | CANCELLED | COMPLETED
- `limit` (optional): Results per page
- `offset` (optional): Pagination offset

### Get Booking by ID
```
GET /api/bookings/:id
```

### Update Booking Status
```
PATCH /api/bookings/:id/status
```

**Request Body:**
```json
{
  "status": "CONFIRMED",
  "userId": "user-uuid"
}
```

### Cancel Booking
```
POST /api/bookings/:id/cancel
```

**Request Body:**
```json
{
  "userId": "user-uuid"
}
```

---

## Payments

### Process Payment
```
POST /api/payments
```

**Request Body:**
```json
{
  "bookingId": "booking-uuid",
  "userId": "user-uuid",
  "stripePaymentIntentId": "pi_xxx",
  "amountCents": 15000,
  "currency": "USD"
}
```

### Update Payment Status
```
PATCH /api/payments/:id/status
```

**Request Body:**
```json
{
  "status": "SUCCEEDED",
  "metadata": {
    "transactionId": "txn_xxx"
  }
}
```

### Refund Payment
```
POST /api/payments/:id/refund
```

**Request Body:**
```json
{
  "userId": "user-uuid"
}
```

---

## Users

### Create User
```
POST /api/users
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+1234567890"
}
```

### Get User
```
GET /api/users/:id
```

### Update User
```
PATCH /api/users/:id
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+0987654321"
}
```

### Update User Profile
```
PATCH /api/users/:id/profile
```

**Request Body:**
```json
{
  "dob": "1990-01-01",
  "address": "123 Main St",
  "preferences": {
    "travelClass": "business"
  }
}
```

---

## Notifications

### Get User Notifications
```
GET /api/notifications/:userId?limit=50
```

### Send Notification
```
POST /api/notifications
```

**Request Body:**
```json
{
  "userId": "user-uuid",
  "channel": "EMAIL",
  "message": "Your booking is confirmed",
  "email": "user@example.com",
  "metadata": {
    "bookingId": "booking-uuid"
  }
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Error Response Format

```json
{
  "error": "Error message here"
}
```

## Testing with cURL

### Search Hotels
```bash
curl "http://localhost:5000/api/inventory?travelMode=HOTEL&location=Paris"
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid",
    "items": [...],
    "customerInfo": {...}
  }'
```

### Get Bookings
```bash
curl "http://localhost:5000/api/bookings?userId=user-uuid"
```
