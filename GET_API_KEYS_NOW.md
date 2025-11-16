# 🔑 Get API Keys - Step-by-Step Guide

## 🎯 You Need 3 Main API Keys (All FREE!)

### Total Time: 15 minutes
### Total Cost: $0/month
### Coverage: Worldwide hotels, flights, cars, trains, buses

---

## 📋 Quick Overview

| API | What It Does | Free Tier | Sign Up Link |
|-----|--------------|-----------|--------------|
| **RapidAPI** | Hotels & Cars worldwide | 500 req/month | https://rapidapi.com |
| **Amadeus** | Flights worldwide | 2,000 req/month | https://developers.amadeus.com |
| **OpenWeather** | Weather data | 30,000 req/month | https://openweathermap.org |

---

## 🚀 STEP 1: RapidAPI (Hotels & Cars)

### What You Get:
- ✈️ Hotels worldwide (Booking.com data)
- 🚗 Car rentals worldwide
- 🚂 Trains (optional)
- 🚌 Buses (optional)

### Sign Up (2 minutes):

1. **Go to RapidAPI**
   ```
   https://rapidapi.com/auth/sign-up
   ```

2. **Create Account**
   - Click "Sign Up"
   - Use Email, Google, or GitHub
   - Verify your email

3. **Subscribe to Booking.com API**
   ```
   https://rapidapi.com/DataCrawler/api/booking-com15
   ```
   - Click "Subscribe to Test"
   - Choose "Basic" plan (FREE)
   - Click "Subscribe"

4. **Get Your API Key**
   - Go to any endpoint
   - Look for "Code Snippets" section
   - Find `x-rapidapi-key: YOUR_KEY_HERE`
   - Copy the key (starts with letters/numbers)

5. **Add to .env File**
   ```env
   RAPIDAPI_KEY=your_key_here
   ```

### ✅ Done! You now have:
- Hotels worldwide
- Cars worldwide
- One key for everything!

---

## 🚀 STEP 2: Amadeus (Flights)

### What You Get:
- ✈️ Real flight data worldwide
- 🛫 All airlines
- 💰 Real prices
- 📅 Live availability

### Sign Up (5 minutes):

1. **Go to Amadeus**
   ```
   https://developers.amadeus.com/register
   ```

2. **Create Account**
   - Fill in your details
   - Company: "Personal Project" or your name
   - Use case: "Travel Planning Website"
   - Click "Create Account"
   - Verify your email

3. **Create an App**
   - Log in to https://developers.amadeus.com/my-apps
   - Click "Create New App"
   - Name: "Velvet Routes"
   - Description: "Travel booking website"
   - Click "Create"

4. **Get Your Keys**
   - You'll see two keys:
     - **API Key** (starts with letters)
     - **API Secret** (longer string)
   - Copy both!

5. **Add to .env File**
   ```env
   AMADEUS_API_KEY=your_api_key_here
   AMADEUS_API_SECRET=your_api_secret_here
   ```

### ✅ Done! You now have:
- Flights worldwide
- 2,000 searches/month FREE!

---

## 🚀 STEP 3: OpenWeather (Weather)

### What You Get:
- 🌤️ Weather forecasts
- 🌡️ Temperature data
- 🌍 Worldwide coverage

### Sign Up (3 minutes):

1. **Go to OpenWeather**
   ```
   https://home.openweathermap.org/users/sign_up
   ```

2. **Create Account**
   - Enter email and password
   - Agree to terms
   - Click "Create Account"
   - Verify your email

3. **Get Your API Key**
   - Log in
   - Go to https://home.openweathermap.org/api_keys
   - You'll see a default key already created
   - Copy the key

4. **Wait 10 Minutes**
   - New keys take 10 minutes to activate
   - Go get coffee ☕

5. **Add to .env File**
   ```env
   OPENWEATHER_API_KEY=your_key_here
   ```

### ✅ Done! You now have:
- Weather data worldwide
- 30,000 requests/month FREE!

---

## 📝 Your Complete .env File

After getting all keys, your `.env` should look like this:

```env
PORT=5000
JWT_SECRET=velvet_routes_secret_key_2024
NODE_ENV=development

# Stripe Payment Keys (Already have these!)
STRIPE_SECRET_KEY=sk_test_51234567890abcdefghijklmnopqrstuvwxyz
STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz

# RapidAPI (Hotels & Cars)
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOTEL_HOST=booking-com15.p.rapidapi.com
RAPIDAPI_CAR_HOST=booking-com15.p.rapidapi.com

# Amadeus (Flights)
AMADEUS_API_KEY=your_amadeus_key_here
AMADEUS_API_SECRET=your_amadeus_secret_here

# OpenWeather (Weather)
OPENWEATHER_API_KEY=your_openweather_key_here

# Flight API
RAPIDAPI_FLIGHT_HOST=sky-scrapper.p.rapidapi.com

# Email (Optional - uses test account if not set)
EMAIL_HOST=
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
```

---

## 🔄 After Adding Keys

### Restart Your Server:

**Option 1: Stop and Start**
```bash
# Press Ctrl+C in server terminal
# Then run:
npm run server
```

**Option 2: Use start.bat**
```bash
# Close all terminals
# Double-click start.bat
```

**Option 3: Restart Both**
```bash
npm run dev
```

---

## ✅ Test Your APIs

### Test Hotels (RapidAPI):
1. Go to http://localhost:3000/hotels
2. Search "Paris"
3. Should see REAL hotels from Booking.com!

### Test Flights (Amadeus):
1. Go to http://localhost:3000/transport
2. Click "Flights"
3. Search "London to New York"
4. Should see REAL flights!

### Test Cars (RapidAPI):
1. Go to http://localhost:3000/cars
2. Search "Paris"
3. Should see REAL car rentals!

---

## 💡 Pro Tips

### 1. Keep Your Keys Secret
- ✅ Never share your API keys
- ✅ Never commit .env to GitHub
- ✅ .gitignore already includes .env

### 2. Monitor Usage
- Check RapidAPI dashboard: https://rapidapi.com/developer/dashboard
- Check Amadeus dashboard: https://developers.amadeus.com/my-apps
- Check OpenWeather dashboard: https://home.openweathermap.org/statistics

### 3. Free Tier Limits
- **RapidAPI**: 500 requests/month
- **Amadeus**: 2,000 requests/month
- **OpenWeather**: 30,000 requests/month

### 4. When You Need More
- RapidAPI Pro: $9.99/month (10,000 requests)
- Amadeus: Always free for self-service
- OpenWeather Pro: $40/month (more features)

---

## 🎯 What You'll Have

### With All APIs:
- 🏨 **Hotels**: Search ANY hotel worldwide
- ✈️ **Flights**: Find ANY flight route
- 🚗 **Cars**: Rent cars ANYWHERE
- 🚂 **Trains**: Book trains (mock data, can add real API)
- 🚌 **Buses**: Reserve buses (mock data, can add real API)
- 🌤️ **Weather**: Get forecasts anywhere
- 💳 **Payments**: Process bookings (Stripe)
- 📧 **Invoices**: Email with PDF

### Coverage:
- 🌍 Worldwide hotels
- 🌍 Worldwide flights
- 🌍 Worldwide cars
- 🌍 Worldwide weather

---

## 🆘 Troubleshooting

### "Invalid API Key"
- Check you copied the entire key
- No spaces before/after
- Restart server after adding

### "Rate Limit Exceeded"
- You've used your monthly quota
- Wait for next month
- Or upgrade to paid plan

### "API Not Responding"
- Check internet connection
- Verify API key is correct
- Check API status page

### "Hotels Not Loading"
- Make sure RAPIDAPI_KEY is set
- Restart server
- Check console for errors

---

## 📊 API Comparison

### RapidAPI vs Direct APIs:

**RapidAPI Advantages:**
- ✅ One key for multiple APIs
- ✅ Easy to manage
- ✅ Unified billing
- ✅ Good documentation

**Direct APIs Advantages:**
- ✅ Sometimes higher limits
- ✅ More features
- ✅ Direct support

**Recommendation:** Start with RapidAPI, it's easiest!

---

## 🎓 Optional: More APIs

### Want Even More Features?

**Google Maps** (Maps & Geocoding)
- Free: $200 credit/month
- Sign up: https://console.cloud.google.com
- Enable: Maps JavaScript API

**Trainline** (European Trains)
- Via RapidAPI
- Same key you already have!
- https://rapidapi.com/omarmhaimdat/api/trainline

**Busbud** (Bus Routes)
- Free tier available
- Sign up: https://www.busbud.com/en/bus-api

---

## 📞 Support Links

### If You Need Help:

**RapidAPI:**
- Docs: https://docs.rapidapi.com
- Support: https://rapidapi.com/support

**Amadeus:**
- Docs: https://developers.amadeus.com/docs
- Support: https://developers.amadeus.com/support

**OpenWeather:**
- Docs: https://openweathermap.org/api
- FAQ: https://openweathermap.org/faq

---

## 🎉 Summary

### What to Do:
1. ✅ Sign up for RapidAPI (2 min)
2. ✅ Sign up for Amadeus (5 min)
3. ✅ Sign up for OpenWeather (3 min)
4. ✅ Copy all keys to .env
5. ✅ Restart server
6. ✅ Test everything!

### What You Get:
- 🌍 Worldwide hotel search
- 🌍 Worldwide flight search
- 🌍 Worldwide car rentals
- 🌍 Weather forecasts
- 💰 All FREE!
- 📊 34,000+ requests/month

### Time Investment:
- Setup: 15 minutes
- Cost: $0/month
- Value: Priceless! 🎉

---

## 🚀 Ready to Go!

After getting your API keys:

1. **Add them to .env**
2. **Restart server**
3. **Test your website**
4. **Enjoy worldwide coverage!**

Your travel platform will have access to:
- Millions of hotels
- Thousands of flights
- Car rentals everywhere
- Real-time data
- Professional service

**All for FREE!** 🎉

---

*Need help? Check the support links above or refer to FREE_APIS_GUIDE.md*

**Happy travels!** ✈️🌍
