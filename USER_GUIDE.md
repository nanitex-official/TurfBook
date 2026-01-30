# 📖 TurfHub User Guide

## Quick Start Guide

### First Time Setup

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   You should see: "✅ Connected to MongoDB" and "🚀 Server running on port 5000"

2. **Seed Initial Data** (One-time only)
   - Open browser: http://localhost:5000/api/seed
   - This will add default pricing plans to the database

3. **Start the Frontend**
   ```bash
   cd ..
   npm run dev
   ```
   Open http://localhost:5173 in your browser

---

## User Features

### 1. Viewing Turf Information (Home Page)

**What you'll see:**
- **Hero Section**: Large banner with turf name and booking button
- **Info Cards**: Location, operating hours, and capacity details
- **About Section**: Description of facilities and amenities
- **Pricing Table**: All available duration packages and rates
- **CTA Section**: Call-to-action to book

**Navigation:**
- Click "TurfHub" logo to return home anytime
- Use top navigation: Home | Book Now | My Bookings | Admin

---

### 2. Making a Booking

**Step-by-Step:**

1. **Select Date**
   - Click on any available date in the calendar
   - Shows 14 days from today
   - Weekends automatically have different pricing

2. **Choose Duration**
   - Options: 1 Hour, 2 Hours, Half Day (4hrs), Full Day (8hrs)
   - Click your preferred duration

3. **Pick Time Slot**
   - Available times: 6:00 AM to 10:00 PM
   - Click on your desired time slot

4. **Review Booking Summary**
   - Check date, time, duration, and price
   - Ensure all details are correct

5. **Confirm Booking**
   - Click "Confirm Booking"
   - You'll see a success message
   - Booking is saved to database

**Pricing:**
- **Weekday**: Monday - Friday
- **Weekend**: Saturday - Sunday
- Prices vary by duration
- Total shown in booking summary

---

### 3. Managing Your Bookings

**View Bookings:**
1. Click "My Bookings" in navigation
2. See all your confirmed bookings
3. Each booking shows:
   - Confirmation status
   - Date and time
   - Duration
   - Total price paid

**Cancel Booking:**
1. Find the booking you want to cancel
2. Click the red "Cancel" button
3. Confirm cancellation
4. Booking is removed from your list

---

## Admin Features

### Accessing Admin Panel
- Click "Admin" in the navigation
- No authentication required (add in production!)

### Admin Dashboard Overview

**Statistics Cards:**
- **Total Bookings**: Count of all bookings
- **Total Revenue**: Sum of all booking prices
- **Total Customers**: Unique customer count

**Three Main Tabs:**
1. Bookings
2. Pricing
3. Turf Details

---

### 1. Managing Bookings

**View All Bookings:**
- See complete list of customer bookings
- Details include: customer name, email, date, time, duration, price

**Edit Booking:**
1. Click the blue edit icon (pencil)
2. Modify any field:
   - Customer name
   - Customer email
   - Date
   - Time
   - Duration
   - Price
3. Click "Save" to update
4. Click "Cancel" to discard changes

**Delete Booking:**
1. Click the red delete icon (trash)
2. Confirm deletion
3. Booking is permanently removed

---

### 2. Managing Pricing

**View Pricing Plans:**
- See all duration packages
- Weekday and weekend rates shown

**Add New Pricing:**
1. Click "+ Add Pricing" button
2. Enter:
   - Duration (e.g., "3 Hours")
   - Weekday price (number)
   - Weekend price (number)
3. Click "Add Pricing"
4. New plan appears in list

**Edit Pricing:**
1. Click blue edit icon
2. Modify duration or prices
3. Click "Save"

**Delete Pricing:**
1. Click red delete icon
2. Confirm deletion

**Example Pricing:**
- 1 Hour: $30 (weekday), $40 (weekend)
- 2 Hours: $55 (weekday), $75 (weekend)

---

### 3. Managing Turf Details

**View Current Details:**
- Turf name
- Location address
- Operating hours
- Capacity information
- List of amenities

**Edit Turf Details:**
1. Click "Edit Details" button
2. Update any fields:
   - **Turf Name**: Arena/venue name
   - **Location**: Full address (multi-line supported)
   - **Operating Hours**: Business hours (multi-line)
   - **Capacity**: Player capacity info
3. Click "Save Changes"
4. Details are updated site-wide

**Note**: Amenities are fixed for now. In future versions, you can add/remove them.

---

## Tips & Best Practices

### For Users:
- ✅ Book in advance to secure your preferred slot
- ✅ Double-check date and time before confirming
- ✅ Note the different weekend pricing
- ✅ Cancel early if plans change

### For Admins:
- ✅ Regularly check bookings dashboard
- ✅ Keep pricing competitive and up-to-date
- ✅ Update operating hours for holidays
- ✅ Review and clean up past bookings periodically

---

## Common Issues & Solutions

### "Cannot connect to server"
**Solution:**
1. Check if backend is running (`npm start` in server folder)
2. Verify MongoDB is running
3. Check console for errors

### "Booking not saving"
**Solution:**
1. Ensure MongoDB connection is active
2. Check browser console for API errors
3. Verify all required fields are filled

### "Pricing not showing"
**Solution:**
1. Run the seed endpoint: http://localhost:5000/api/seed
2. Refresh the page
3. Check admin panel pricing tab

### "Page not loading"
**Solution:**
1. Clear browser cache
2. Restart dev server (`npm run dev`)
3. Check browser console for errors

---

## Keyboard Shortcuts

- **Ctrl + Click** on date/time: Quick selection
- **Escape**: Close modals/forms
- **Tab**: Navigate through form fields

---

## Mobile Usage

The app is fully responsive! On mobile:
- Tap to select dates and times
- Swipe to see more dates
- All features work the same as desktop
- Optimized layout for small screens

---

## Getting Help

**During Development:**
- Check browser console (F12) for errors
- Review server logs in terminal
- Verify API endpoints are responding

**Common Endpoints to Test:**
- Health Check: http://localhost:5000/api/health
- Get Bookings: http://localhost:5000/api/bookings
- Get Pricing: http://localhost:5000/api/pricing
- Get Turf: http://localhost:5000/api/turf

---

## Next Steps

After getting familiar with the system:

1. **Customize Colors**: Edit `tailwind.config.js`
2. **Add Real Images**: Replace placeholder URLs in code
3. **Set Up MongoDB Atlas**: For cloud database (production)
4. **Add Authentication**: Secure admin panel
5. **Enable Payments**: Integrate payment gateway
6. **Email Notifications**: Send booking confirmations

---

**Enjoy using TurfHub! 🏟️⚽**
