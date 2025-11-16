# 🌍 Velvet Routes - Travel Booking Platform

A comprehensive travel booking website with hotels, flights, cars, trains, buses, and mobile notifications.

## 👥 Team Members

- **Manleen** - Team Lead 👑
- **Iyra** - Backend Developer ⚙️
- **Neeti** - UI/UX Designer 🎨
- **Eknoor** - Website Management 📊

## ✨ Features

### Booking Services
- 🏨 **Hotels** - Worldwide hotel search via Booking.com API
- ✈️ **Flights** - Real flight data via Sky Scrapper API
- 🚗 **Cars** - Car rentals worldwide via Booking.com API
- 🚂 **Trains** - Train booking system
- 🚌 **Buses** - Bus booking system

### User Features
- 💳 **Payments** - Stripe integration
- 📧 **Email Invoices** - Automatic PDF invoices
- 📱 **Mobile Notifications** - Browser push, SMS, WhatsApp
- 🌙 **Dark Mode** - Full dark theme support
- 🔐 **Authentication** - User accounts and trip management
- 📊 **Dashboard** - Manage your bookings and trips

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/iyra0317/velvet_routes-FEE-.git
cd velvet_routes-FEE-
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. **Configure environment variables**

Edit `.env` file and add your API keys:
```env
# Required
RAPIDAPI_KEY=your_rapidapi_key_here
STRIPE_SECRET_KEY=your_stripe_key_here

# Optional
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_phone_number
```

4. **Start the application**
```bash
# Windows
start.bat

# Or manually
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd client
npm start
```

5. **Open your browser**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📚 Getting API Keys

### RapidAPI (Hotels, Cars, Flights)
1. Go to https://rapidapi.com
2. Sign up for free account
3. Subscribe to:
   - Booking.com API (Hotels & Cars)
   - Sky Scrapper API (Flights)
4. Copy your API key

### Stripe (Payments)
1. Go to https://stripe.com
2. Sign up for account
3. Get test API keys from dashboard

### Twilio (SMS/WhatsApp) - Optional
1. Go to https://twilio.com/try-twilio
2. Sign up for free trial ($15 credit)
3. Get Account SID, Auth Token, and Phone Number

See `GET_API_KEYS_NOW.md` for detailed instructions.

## 🎨 Tech Stack

### Frontend
- React
- React Router
- Axios
- Stripe React

### Backend
- Node.js
- Express
- JWT Authentication
- Nodemailer
- PDFKit
- Twilio
- Web Push

### APIs
- RapidAPI (Hotels, Cars, Flights)
- Stripe (Payments)
- Twilio (SMS, WhatsApp)

## 📂 Project Structure

```
velvet-routes/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── App.js
│   └── public/
│       └── sw.js          # Service worker
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── middleware/       # Auth middleware
├── .env                  # Environment variables
├── package.json          # Backend dependencies
└── start.bat            # Quick start script
```

## 🧪 Testing

### Test Hotels
1. Go to http://localhost:3000/hotels
2. Hotels load automatically
3. Search: "Paris" or "Tokyo"
4. Click "Book Now" on any hotel

### Test Flights
1. Go to http://localhost:3000/flights
2. Flights load automatically
3. Search: "New York" → "London"
4. Filter by price or stops

### Test Cars
1. Go to http://localhost:3000/cars
2. Search: "Paris"
3. Select dates
4. Book a car

### Test Booking
1. Book any hotel/flight/car
2. Use test card: `4242 4242 4242 4242`
3. Receive:
   - Email with PDF invoice
   - Browser notification
   - SMS (if configured)

## 📱 Mobile Notifications

### Browser Notifications (FREE - Works Immediately)
1. Go to http://localhost:3000/dashboard
2. Click "Enable Notifications"
3. Allow browser permission
4. Book something → Get notified!

### SMS & WhatsApp (Optional)
1. Sign up for Twilio free trial
2. Add credentials to `.env`
3. Restart server
4. Add phone number in dashboard

## 🌙 Dark Mode

- Click the moon icon (🌙) in the navbar
- Entire website switches to dark theme
- Preference is saved automatically
- Works on all pages

## 📄 Pages

- **Home** - Landing page with features
- **Hotels** - Search and book hotels
- **Flights** - Search and book flights
- **Cars** - Rent cars
- **Transport** - Trains and buses
- **About** - Team information
- **Dashboard** - Manage bookings
- **Profile** - User settings

## 🔒 Security

- JWT-based authentication
- Bcrypt password hashing
- Environment variable protection
- Secure payment processing

## 🐛 Troubleshooting

**API not working?**
- Check `.env` file has correct API keys
- Verify RapidAPI subscription is active

**Notifications not working?**
- Browser: Allow notification permission
- SMS: Verify Twilio credentials

**Payment failing?**
- Use test card: 4242 4242 4242 4242
- Check Stripe key is correct

## 📝 NPM Scripts

```bash
npm run server          # Start backend only
npm run client          # Start frontend only
npm run dev            # Start both (concurrently)
npm run install-all    # Install all dependencies
```

## 🤝 Contributing

This is a college project by:
- Manleen (Team Lead)
- Iyra (Backend Developer)
- Neeti (UI/UX Designer)
- Eknoor (Website Management)

## 📄 License

ISC

## 🌟 Acknowledgments

- RapidAPI for travel data
- Stripe for payment processing
- Twilio for notifications
- All open-source libraries used

---

**Made with ❤️ by the Velvet Routes Team**

© 2024 Velvet Routes. All rights reserved.
