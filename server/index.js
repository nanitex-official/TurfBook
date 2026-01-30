const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/turf-booking';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Models
const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    rateType: { type: String, enum: ['Weekday', 'Weekend'], required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'Confirmed', enum: ['Confirmed', 'Cancelled', 'Completed'] },
    createdAt: { type: Date, default: Date.now },
});

const pricingSchema = new mongoose.Schema({
    duration: { type: String, required: true, unique: true },
    weekday: { type: Number, required: true },
    weekend: { type: Number, required: true },
});

const turfDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    operatingHours: { type: String, required: true },
    capacity: { type: String, required: true },
    amenities: [String],
    updatedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
const Pricing = mongoose.model('Pricing', pricingSchema);
const TurfDetails = mongoose.model('TurfDetails', turfDetailsSchema);

// API Routes

// Bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: 1, time: 1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check slot availability
app.get('/api/bookings/check-availability', async (req, res) => {
    try {
        const { date, time } = req.query;
        const existingBooking = await Booking.findOne({ date, time, status: 'Confirmed' });
        res.json({ available: !existingBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Pricing
app.get('/api/pricing', async (req, res) => {
    try {
        const pricing = await Pricing.find();
        res.json(pricing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/pricing', async (req, res) => {
    try {
        const pricing = new Pricing(req.body);
        await pricing.save();
        res.status(201).json(pricing);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/pricing/:id', async (req, res) => {
    try {
        const pricing = await Pricing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!pricing) {
            return res.status(404).json({ error: 'Pricing not found' });
        }
        res.json(pricing);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/pricing/:id', async (req, res) => {
    try {
        const pricing = await Pricing.findByIdAndDelete(req.params.id);
        if (!pricing) {
            return res.status(404).json({ error: 'Pricing not found' });
        }
        res.json({ message: 'Pricing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Turf Details
app.get('/api/turf', async (req, res) => {
    try {
        let turfDetails = await TurfDetails.findOne();

        // Create default if not exists
        if (!turfDetails) {
            turfDetails = await TurfDetails.create({
                name: 'Prime Sports Arena',
                location: '123 Stadium Road, Sports District\nDowntown City, ST 12345',
                operatingHours: 'Monday - Friday: 6:00 AM - 11:00 PM\nSaturday - Sunday: 5:00 AM - 12:00 AM',
                capacity: 'Full Size: 11 vs 11 Players',
                amenities: ['Free WiFi', 'Parking', 'Safety Equipment', 'Changing Rooms'],
            });
        }

        res.json(turfDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/turf', async (req, res) => {
    try {
        let turfDetails = await TurfDetails.findOne();

        if (!turfDetails) {
            turfDetails = new TurfDetails(req.body);
        } else {
            Object.assign(turfDetails, req.body);
            turfDetails.updatedAt = Date.now();
        }

        await turfDetails.save();
        res.json(turfDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Seed initial data
app.post('/api/seed', async (req, res) => {
    try {
        // Seed pricing if empty
        const pricingCount = await Pricing.countDocuments();
        if (pricingCount === 0) {
            await Pricing.insertMany([
                { duration: '1 Hour', weekday: 3000, weekend: 4000 },
                { duration: '2 Hours', weekday: 5500, weekend: 7500 },
                { duration: 'Half Day (4hrs)', weekday: 10000, weekend: 14000 },
                { duration: 'Full Day (8hrs)', weekday: 18000, weekend: 26000 },
            ]);
        }

        res.json({ message: 'Database seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
