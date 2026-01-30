# 🛠️ Development Guide - TurfHub

## Project Architecture

### Frontend Architecture
```
React (UI) → Router (Navigation) → Components/Pages → API Utils → Backend
     ↓
Tailwind CSS (Styling)
     ↓
GSAP + Framer Motion (Animations)
```

### Backend Architecture
```
Express Server → Routes → Controllers (in index.js) → Mongoose Models → MongoDB
```

### Data Flow
```
User Action → React Component → API Call (axios) → Express Route → 
Mongoose Query → MongoDB → Response → Update UI
```

---

## Component Structure

### 1. Navbar Component
**Location**: `src/components/Navbar.jsx`

**Features:**
- Fixed position navigation
- Scroll-based background change
- Active route highlighting
- Responsive mobile menu (placeholder)

**Key Technologies:**
- Framer Motion for slide-in animation
- React Router for navigation
- Lucide React for icons

---

### 2. HomePage Component
**Location**: `src/pages/HomePage.jsx`

**Sections:**
1. **Hero**: Full-screen background with CTA
2. **Info Cards**: Location, Hours, Capacity (with GSAP scroll animation)
3. **About**: Turf description with amenities
4. **Pricing**: Table with duration and rates
5. **CTA**: Call-to-action section

**Animations:**
- GSAP for scroll-triggered card animations
- Framer Motion for hero content
- Hover effects for cards

**Images Used:**
- Hero background: Unsplash turf/soccer field
- About section: Aerial view of turf

---

### 3. BookingPage Component
**Location**: `src/pages/BookingPage.jsx`

**Features:**
- **Date Picker**: 14-day calendar grid
- **Duration Selector**: 4 preset durations
- **Time Slot Grid**: Hourly slots from 6 AM - 10 PM
- **Booking Summary**: Live price calculation
- **Validation**: Ensures date and time selected

**State Management:**
```jsx
selectedDate    // Date object
selectedTime    // String (HH:MM format)
selectedDuration // String (e.g., "1 Hour")
rateType        // "Weekday" or "Weekend"
```

**Dynamic Pricing Logic:**
- Weekday: Monday - Friday
- Weekend: Saturday - Sunday
- Automatically updates when date changes

---

### 4. MyBookingsPage Component
**Location**: `src/pages/MyBookingsPage.jsx`

**Features:**
- List all user bookings
- Cancel functionality
- Empty state with CTA
- Loading state

**Future Enhancements:**
- Filter by status (Confirmed/Cancelled/Completed)
- Search bookings
- Export to PDF

---

### 5. AdminPage Component
**Location**: `src/pages/AdminPage.jsx`

**Features:**
- **Dashboard Stats**: Bookings, Revenue, Customers
- **Tabbed Interface**: 3 tabs (Bookings, Pricing, Turf Details)
- **CRUD Operations**: Create, Read, Update, Delete for all entities
- **Inline Editing**: Click edit, modify fields, save

**Admin Tabs:**

#### Bookings Tab
- View all bookings with customer details
- Edit: Name, Email, Date, Time, Duration, Price
- Delete: Remove booking with confirmation

#### Pricing Tab
- View all pricing plans
- Add new pricing with form
- Edit existing pricing
- Delete pricing plans

#### Turf Details Tab
- View current turf information
- Edit all fields (Name, Location, Hours, Capacity)
- Save changes site-wide

---

## Backend API Structure

### Models (Mongoose Schemas)

#### Booking Schema
```javascript
{
  customerName: String (required)
  customerEmail: String (required)
  date: Date (required)
  time: String (required)
  duration: String (required)
  rateType: String (Weekday/Weekend, required)
  price: Number (required)
  status: String (default: Confirmed)
  createdAt: Date (auto)
}
```

#### Pricing Schema
```javascript
{
  duration: String (required, unique)
  weekday: Number (required)
  weekend: Number (required)
}
```

#### TurfDetails Schema
```javascript
{
  name: String (required)
  location: String (required)
  operatingHours: String (required)
  capacity: String (required)
  amenities: [String]
  updatedAt: Date (auto)
}
```

---

## API Endpoints Reference

### Bookings
```
GET    /api/bookings                   - Get all bookings
POST   /api/bookings                   - Create booking
PUT    /api/bookings/:id               - Update booking
DELETE /api/bookings/:id               - Delete booking
GET    /api/bookings/check-availability - Check if slot available
```

### Pricing
```
GET    /api/pricing                    - Get all pricing
POST   /api/pricing                    - Create pricing
PUT    /api/pricing/:id                - Update pricing
DELETE /api/pricing/:id                - Delete pricing
```

### Turf Details
```
GET    /api/turf                       - Get turf details
PUT    /api/turf                       - Update turf details
```

### Utility
```
GET    /api/health                     - Server health check
POST   /api/seed                       - Seed initial data
```

---

## Styling System

### Tailwind Configuration
**File**: `tailwind.config.js`

**Custom Colors:**
- Primary: `#00B140` (Green for sports theme)
- Primary Dark: `#009635`
- Primary Light: `#00D14D`

**Custom Classes** (in `index.css`):
- `.btn-primary`: Primary button style
- `.btn-outline`: Outlined button
- `.card`: Card component with shadow
- `.input-field`: Standardized input
- `.section-title`: Section heading

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Animation Guide

### GSAP Animations
**Used in**: HomePage

```javascript
// Scroll-triggered animations
gsap.from('.info-card', {
  scrollTrigger: { trigger: cardsRef.current },
  opacity: 0,
  y: 50,
  stagger: 0.2,
});
```

**Key Points:**
- Register ScrollTrigger plugin
- Use refs for DOM elements
- Clean up in useEffect return

### Framer Motion
**Used in**: All pages

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
```

**Common Patterns:**
- Fade + slide up for cards
- Stagger delays for lists
- Scale on buttons

---

## Database Management

### Local MongoDB Commands

**Start MongoDB:**
```bash
mongod
```

**Connect to Database:**
```bash
mongosh
use turf-booking
```

**View Collections:**
```javascript
show collections
db.bookings.find()
db.pricings.find()
db.turfdetails.find()
```

**Clear Collections:**
```javascript
db.bookings.deleteMany({})
db.pricings.deleteMany({})
```

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/turf-booking
   ```

---

## Adding New Features

### Adding a New Page

1. **Create Page Component**
   ```bash
   src/pages/NewPage.jsx
   ```

2. **Add Route**
   ```jsx
   // App.jsx
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Add Navigation Link**
   ```jsx
   // Navbar.jsx
   { path: '/new-page', label: 'New Page', icon: IconName }
   ```

### Adding a New API Endpoint

1. **Add Route in Backend**
   ```javascript
   // server/index.js
   app.get('/api/new-endpoint', async (req, res) => {
     // Logic here
   });
   ```

2. **Add to API Utils**
   ```javascript
   // src/utils/api.js
   export const newAPI = {
     get: () => api.get('/new-endpoint'),
   };
   ```

3. **Use in Component**
   ```jsx
   import { newAPI } from '../utils/api';
   const { data } = await newAPI.get();
   ```

### Adding a New Database Model

1. **Define Schema**
   ```javascript
   const newSchema = new mongoose.Schema({
     field1: String,
     field2: Number,
   });
   ```

2. **Create Model**
   ```javascript
   const NewModel = mongoose.model('NewModel', newSchema);
   ```

3. **Add CRUD Routes**
   ```javascript
   app.get('/api/new', async (req, res) => {
     const items = await NewModel.find();
     res.json(items);
   });
   ```

---

## Environment Variables

### Development
```env
# server/.env
MONGODB_URI=mongodb://localhost:27017/turf-booking
PORT=5000
```

### Production (Future)
```env
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secret_key
```

---

## Testing

### Manual Testing Checklist

**Booking Flow:**
- [ ] Can select date
- [ ] Can select time
- [ ] Price calculates correctly
- [ ] Booking saves to database
- [ ] Confirmation shows

**Admin Panel:**
- [ ] Stats display correctly
- [ ] Can edit bookings
- [ ] Can delete bookings
- [ ] Can add pricing
- [ ] Can update turf details

**Navigation:**
- [ ] All links work
- [ ] Active states correct
- [ ] Mobile responsive

### API Testing (Postman/Thunder Client)

**Test Booking Creation:**
```json
POST http://localhost:5000/api/bookings
{
  "customerName": "Test User",
  "customerEmail": "test@example.com",
  "date": "2026-02-01",
  "time": "10:00",
  "duration": "1 Hour",
  "rateType": "Weekday",
  "price": 30
}
```

---

## Performance Optimization

### Frontend
- Use lazy loading for routes
- Optimize images (use WebP)
- Minimize bundle size
- Code splitting

### Backend
- Add database indexing
- Implement caching (Redis)
- Compress responses (gzip)
- Rate limiting

### Database
- Index frequently queried fields
- Limit query results
- Use lean() for read-only queries

---

## Security Best Practices

### Current Implementation
- CORS enabled (restrict in production)
- Input validation in schemas
- Error handling

### To Add in Production
- **Authentication**: JWT tokens
- **Authorization**: Role-based access
- **Input Sanitization**: Prevent injection
- **Rate Limiting**: Prevent abuse
- **HTTPS**: Secure connections
- **Environment Variables**: Hide secrets

---

## Deployment Guide

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set environment variables
4. Configure custom domain

### Backend (Heroku/Railway)
1. Add Procfile: `web: node server/index.js`
2. Set environment variables
3. Connect to MongoDB Atlas
4. Deploy

### Full Stack (Railway)
1. Connect GitHub repo
2. Set build commands
3. Configure environment
4. Deploy both services

---

## Debugging Tips

### Frontend Issues
- Check browser console (F12)
- Verify API calls in Network tab
- Use React DevTools
- Check component state

### Backend Issues
- Check server logs
- Test endpoints with Postman
- Verify MongoDB connection
- Check environment variables

### Common Errors
- **CORS Error**: Enable CORS in server
- **404 Not Found**: Check route paths
- **500 Server Error**: Check server logs
- **Network Error**: Ensure server is running

---

## Code Style Guide

### JavaScript
- Use ES6+ features
- Arrow functions for callbacks
- Async/await over promises
- Destructuring when possible

### React
- Functional components
- Hooks over class components
- PropTypes for type checking (future)
- Meaningful component names

### CSS
- Tailwind utility classes
- Custom classes in index.css
- Mobile-first approach
- Consistent spacing

---

## Version Control

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-feature

# Work and commit
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Commit Message Format
```
type: Short description

- Detailed point 1
- Detailed point 2

Type: feat, fix, docs, style, refactor, test, chore
```

---

## Resources

### Documentation
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- GSAP: https://greensock.com/docs
- Framer Motion: https://www.framer.com/motion
- MongoDB: https://docs.mongodb.com
- Express: https://expressjs.com

### Tools
- VS Code Extensions: ES7 snippets, Tailwind IntelliSense
- Postman: API testing
- MongoDB Compass: Database GUI
- React DevTools: Component debugging

---

**Happy Coding! 🚀**
