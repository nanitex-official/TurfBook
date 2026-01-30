# 🏟️ TurfHub - Turf Booking System

A modern, full-stack turf booking system built with React, Tailwind CSS, GSAP, and MongoDB.

## 🌟 Features

### User Features
- **Browse Turf Details**: View turf information, location, operating hours, and amenities
- **Dynamic Pricing**: Different rates for weekdays and weekends
- **Easy Booking**: Interactive calendar and time slot selection
- **Booking Management**: View and cancel bookings
- **Beautiful UI**: Modern design with smooth animations

### Admin Features
- **Dashboard**: View booking statistics and revenue
- **Booking Management**: View, edit, and delete bookings
- **Pricing Management**: Add, edit, and delete pricing plans
- **Turf Details**: Update turf information and amenities

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **GSAP** - Advanced animations
- **Framer Motion** - UI animations
- **React Router** - Navigation
- **Axios** - API calls
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd d:\TurfBooking
npm install

# Install backend dependencies
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/turf-booking
PORT=5000
```

For MongoDB Atlas (cloud database):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/turf-booking
PORT=5000
```

### 3. Start MongoDB (if using local installation)

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

### 4. Run the Application

**Option 1: Run Frontend and Backend Separately**

Terminal 1 (Backend):
```bash
cd server
npm start
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Option 2: Quick Start (Windows)**
```bash
# Start backend
start cmd /k "cd server && npm start"

# Start frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### 5. Seed Initial Data

Visit: http://localhost:5000/api/seed

This will populate the database with initial pricing data.

## 📁 Project Structure

```
TurfBooking/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   ├── HomePage.jsx        # Home page with turf info
│   │   ├── BookingPage.jsx     # Booking interface
│   │   ├── MyBookingsPage.jsx  # User's bookings
│   │   └── AdminPage.jsx       # Admin dashboard
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── server/
│   ├── index.js                # Express server & API
│   └── .env.example            # Environment variables template
├── public/                     # Static assets
├── package.json                # Frontend dependencies
└── README.md                   # This file
```

## 🔌 API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /api/bookings/check-availability` - Check slot availability

### Pricing
- `GET /api/pricing` - Get all pricing plans
- `POST /api/pricing` - Add new pricing plan
- `PUT /api/pricing/:id` - Update pricing plan
- `DELETE /api/pricing/:id` - Delete pricing plan

### Turf Details
- `GET /api/turf` - Get turf details
- `PUT /api/turf` - Update turf details

### Utility
- `GET /api/health` - Health check
- `POST /api/seed` - Seed initial data

## 🎨 Design Features

- **Green Color Scheme** (#00B140): Matches sports/turf theme
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: GSAP and Framer Motion for fluid UX
- **Modern UI**: Card-based layouts with shadows and hover effects
- **Interactive Elements**: Calendar, time slots, and dynamic pricing

## 🔧 Customization

### Change Color Scheme
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#00B140',  // Your primary color
    dark: '#009635',
    light: '#00D14D',
  },
}
```

### Update Turf Images
Replace image URLs in `HomePage.jsx`:
```jsx
backgroundImage: "url('YOUR_IMAGE_URL')"
```

### Modify Pricing Plans
Use the Admin Panel or directly update via API:
```bash
POST http://localhost:5000/api/pricing
{
  "duration": "3 Hours",
  "weekday": 80,
  "weekend": 110
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity for Atlas

### Port Already in Use
Change port in `server/.env`:
```env
PORT=5001
```

### Frontend Can't Connect to Backend
Update API base URL in frontend code (if needed):
```js
const API_URL = 'http://localhost:5000/api';
```

## 📝 Future Enhancements

- **User Authentication**: Login/signup functionality
- **Payment Integration**: Online payment processing
- **Email Notifications**: Booking confirmations
- **SMS Alerts**: Booking reminders
- **Multi-Turf Support**: Manage multiple venues
- **Advanced Analytics**: Revenue reports and insights
- **Photo Gallery**: Upload turf images
- **Customer Reviews**: Rating and review system

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for the sports community

---

**Need Help?** Create an issue or reach out to the development team.
