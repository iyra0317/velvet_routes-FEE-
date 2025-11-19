# 🌍 VelvetRoutes - Travel Booking Platform

A comprehensive travel booking platform with a beautiful modern UI, complete database integration, and multi-provider support for hotels, flights, cars, trains, and buses.

## ✨ Features

- 🎨 **Beautiful Profile Page** - Modern gradient design with glassmorphism effects
- 💾 **PostgreSQL Database** - Complete integration with Prisma ORM
- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 📊 **User Statistics** - Track bookings, spending, and travel history
- 🏨 **Multi-Provider Support** - Hotels, flights, cars, trains, and buses
- 💳 **Payment Processing** - Stripe integration ready
- 📧 **Multi-Channel Notifications** - Email, SMS, WhatsApp, Push
- ⭐ **Reviews & Ratings** - User feedback system
- 📱 **Fully Responsive** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm

### Installation (Simple 3 Steps)

**📖 Read:** `START_HERE_MYSQL.md` for detailed instructions

```bash
# 1. Create database in MySQL
CREATE DATABASE velvetroutes;

# 2. Update .env file with your MySQL password
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/velvetroutes"

# 3. Run setup
setup-database.bat
```

### Start Application

```bash
start.bat
```

Or manually:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd client
npm start
```

### Access

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database GUI:** `npm run db:studio`

### Test Account

```
Email: john.doe@example.com
Password: password123
```

## 📁 Project Structure

```
velvetroutes/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Profile.js  # ⭐ Beautiful profile page
│   │   │   └── ...
│   │   └── components/
│   └── package.json
├── server/                 # Express backend
│   ├── routes/
│   │   ├── auth-prisma.js  # ⭐ Prisma-integrated auth
│   │   └── ...
│   ├── services/
│   └── index.js
├── prisma/                 # Database
│   ├── schema.prisma       # ⭐ Database schema
│   ├── seed.ts             # Sample data
│   └── migrations/
├── .env                    # Environment variables
└── package.json
```

## 🗄️ Database Schema

### Core Tables (20+)

- **users** - User accounts with authentication
- **profiles** - Extended user information and preferences
- **providers** - External API providers (Booking.com, etc.)
- **inventory_items** - Unified travel products
- **hotels, flights, cars, trains, buses** - Specific travel details
- **bookings** - User reservations
- **payments** - Payment transactions (Stripe)
- **invoices** - Generated invoices
- **reviews** - User ratings and feedback
- **notifications** - Multi-channel notifications
- **audit_logs** - Complete activity tracking

## 🎨 Profile Page Features

### Design
- Modern gradient background (purple/blue)
- Glassmorphism cards with backdrop blur
- Smooth animations and transitions
- Fully responsive design

### Functionality
- **Personal Info Tab:** Name, email, phone, address, date of birth
- **Travel Preferences Tab:** Travel class, dietary restrictions, accessibility
- **Security Tab:** Password management, 2FA, session control
- **Statistics Dashboard:** Total bookings, spending, countries visited

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login
GET    /api/auth/profile           - Get user profile
PUT    /api/auth/profile           - Update profile
GET    /api/auth/stats             - Get user statistics
```

### Bookings
```
POST   /api/bookings               - Create booking
GET    /api/bookings/:id           - Get booking details
GET    /api/bookings/user/:userId  - Get user bookings
POST   /api/bookings/:id/cancel    - Cancel booking
POST   /api/bookings/search        - Search inventory
```

### Inventory
```
GET    /api/hotels                 - List hotels
GET    /api/flights                - List flights
GET    /api/cars                   - List cars
GET    /api/trains                 - List trains
GET    /api/buses                  - List buses
```

## 🛠️ Available Scripts

### Database
```bash
npm run db:generate    # Generate Prisma Client
npm run db:migrate     # Run migrations
npm run db:seed        # Add sample data
npm run db:studio      # Open database GUI
npm run db:reset       # Reset database (⚠️ deletes data)
```

### Application
```bash
npm run server         # Start backend
npm run client         # Start frontend (from client folder)
start.bat              # Start both (Windows)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database - MySQL
DATABASE_URL="mysql://root:password@localhost:3306/velvetroutes"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Twilio (Optional)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...

# Email (Optional)
SENDGRID_API_KEY=...
EMAIL_FROM=noreply@velvetroutes.com

# RapidAPI (Optional)
RAPIDAPI_KEY=...
```

## 🧪 Testing

### Test Accounts

After running `npm run db:seed`:

```
Admin:
  Email: admin@velvetroutes.com
  Password: admin123

User:
  Email: john.doe@example.com
  Password: password123
```

### Sample Data

The seed includes:
- 2 users (admin + regular)
- 3 hotels (Paris, Tokyo, NYC)
- 3 flights (AA, BA, Delta)
- 2 cars (Hertz, Avis)
- 1 sample booking
- 1 payment transaction
- 1 review
- 2 notifications

## 🔒 Security

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ✅ CORS configuration
- ✅ Environment variables for secrets

## 📚 Documentation

### Setup Guides
- **START_HERE_MYSQL.md** - ⭐ Start here! Simple MySQL setup
- **MYSQL_SETUP.md** - Detailed MySQL guide with troubleshooting
- **MYSQL_QUICK_START.txt** - Quick reference text file

### API & Development
- **API_DOCUMENTATION.md** - Complete API reference
- **PROJECT_SUMMARY.md** - Project overview and architecture
- **DEPLOYMENT_CHECKLIST.md** - Production deployment guide

### Additional Resources
- **GET_API_KEYS_NOW.md** - Get free API keys for travel data
- **GIT_PUSH_GUIDE.md** - Push to GitHub guide

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check MySQL is running
# Windows: Check Services for "MySQL80"

# Verify DATABASE_URL in .env
# DATABASE_URL="mysql://root:password@localhost:3306/velvetroutes"
```

### Port Already in Use

```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Prisma Client Error

```bash
npm run db:generate
```

### Migration Failed

```bash
npm run db:reset
npm run db:migrate
npm run db:seed
```

## 🚀 Technology Stack

### Frontend
- React 18
- React Router
- Axios
- React Icons
- CSS3 (Modern styling)

### Backend
- Node.js
- Express 4
- Prisma 5
- JWT
- bcrypt
- TypeScript support

### Database
- MySQL 8.0+
- Prisma ORM 5
- Prisma Migrate
- Prisma Studio (GUI)

### External Services (Optional)
- Stripe - Payment processing
- Twilio - SMS/WhatsApp
- SendGrid - Email delivery
- RapidAPI - Travel data providers

## 📈 Performance

- Database indexing for optimized queries
- Connection pooling with Prisma
- Lazy loading components
- Optimized images
- Production builds minified

## 🎯 Use Cases

### For Travelers
1. Register and create profile
2. Set travel preferences
3. Search for hotels/flights/cars
4. Make bookings
5. Manage reservations
6. Leave reviews
7. Track spending

### For Administrators
1. Manage providers
2. Monitor bookings
3. Process payments
4. Handle refunds
5. View audit logs
6. Manage inventory

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🆘 Support

If you encounter any issues:

1. Read **START_HERE_MYSQL.md** for setup help
2. Check **MYSQL_SETUP.md** for troubleshooting
3. Verify environment variables in `.env`
4. Ensure MySQL is running
5. Check database with `npm run db:studio`

## 🎉 Success Checklist

Your setup is successful if:

- ✅ Backend runs without errors
- ✅ Frontend loads correctly
- ✅ Can register and login
- ✅ Profile page is beautiful and functional
- ✅ Can edit and save profile
- ✅ Statistics display correctly
- ✅ Database is connected and working
- ✅ All three profile tabs work

## 🌟 Features Roadmap

Coming soon:
- [ ] Avatar upload
- [ ] Password change functionality
- [ ] Two-factor authentication
- [ ] Email verification
- [ ] Password reset
- [ ] Social login (Google, Facebook)
- [ ] Activity timeline
- [ ] Export user data

---

**Built with ❤️ for travelers and developers**

*Version 4.0.0 - November 2024*

**🚀 Quick Start:** Read **START_HERE_MYSQL.md** to get started in 5 minutes!
