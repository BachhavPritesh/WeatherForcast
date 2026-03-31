# Weather Forecast App - Specification

## Concept & Vision

A sleek, modern weather forecast application with dark glassmorphism aesthetics. The app provides real-time weather data and 5-day forecasts with a premium, immersive feel—think floating glass cards against a deep cosmic gradient background. Every interaction feels smooth and responsive.

## Design Language

### Aesthetic Direction
Dark glassmorphism with cosmic gradient background. Cards appear to float with subtle transparency and blur effects. The design evokes a futuristic weather station interface.

### Color Palette
- **Background Gradient**: `#0f0c29` → `#302b63` → `#24243e` (top-left to bottom-right)
- **Glass Card**: `rgba(255, 255, 255, 0.1)` with `backdrop-blur-md`
- **Glass Border**: `rgba(255, 255, 255, 0.2)`
- **Primary Text**: `#FFFFFF`
- **Secondary Text**: `rgba(255, 255, 255, 0.7)`
- **Accent**: `#60A5FA` (sky blue for interactive elements)

### Typography
- **Font**: System font stack (no external fonts needed)
- **Temperature**: 72px, bold, white
- **Headings**: 24px, semibold
- **Body**: 16px, regular
- **Details**: 14px, medium

### Spatial System
- **Container**: `max-w-2xl`, centered
- **Card Padding**: 24px (mobile: 16px)
- **Card Gap**: 24px
- **Border Radius**: 24px (rounded-3xl)
- **Element Spacing**: 8px base unit

### Motion Philosophy
- **Transitions**: `transition-all duration-300 ease-in-out`
- **Hover states**: Scale 1.02, increased opacity
- **Loading**: Skeleton pulse animation
- **Background blobs**: Subtle floating animation

## Layout & Structure

### Page Structure
1. **Animated Background** - Fixed cosmic gradient with floating blob elements
2. **Main Container** - Centered card `max-w-2xl` with:
   - Header with search bar and geolocation button
   - Recent searches chips (if any)
   - Current weather hero section
   - Weather details grid (2x2)
   - 5-day forecast horizontal scroll
   - Unit toggle

### Responsive Strategy
- **Mobile (< 640px)**: Single column, full-width cards, stacked layout
- **Tablet (640-1024px)**: 2-column detail grid
- **Desktop (> 1024px)**: Centered max-w-2xl, larger typography

## Features & Interactions

### 1. Search Bar
- Pill-shaped glass input field
- Debounced input (300ms delay)
- Submit on Enter key or search icon click
- Clear button appears when input has value
- Geolocation button (📍 icon) triggers browser geolocation
- Error handling: show friendly message if geolocation denied

### 2. Geolocation
- Requests user location on component mount (with permission)
- Falls back to default city (London) if denied or unavailable
- Shows loading state while fetching

### 3. Current Weather Display
- City name with country flag emoji (from country code)
- Large temperature display (72px bold)
- Weather condition text
- OpenWeatherMap icon (animated or static)
- Details grid:
  - Humidity (💧 icon)
  - Wind Speed (💨 icon)
  - Feels Like (🌡️ icon)
  - Pressure (🔵 icon)

### 4. 5-Day Forecast
- Horizontal scrollable row
- Filter data by 12:00:00 timestamp for one reading per day
- Each card shows:
  - Day name (e.g., "Mon", "Tue")
  - Weather icon
  - Min/Max temperature
- Glassmorphism card styling

### 5. Temperature Unit Toggle
- Pill-shaped toggle: °C | °F
- Persists preference
- Converts all displayed temperatures

### 6. Recent Searches
- Last 5 searched cities stored in localStorage
- Displayed as clickable chips below search
- Click loads that city's weather
- Stored as array of { name, country, lat, lon }

### 7. Error Handling
- City not found: "City not found. Please check the spelling and try again."
- Network error: "Unable to fetch weather data. Please check your connection."
- API error: "Something went wrong. Please try again later."
- Geolocation denied: "Location access denied. Showing weather for London."

### 8. Loading States
- Animated skeleton loader with pulse effect
- Skeleton for temperature, weather icon, forecast cards
- Smooth transition to actual content

## Component Inventory

### SearchBar
- **Default**: Glass pill input with search icon
- **Focus**: Brighter border glow
- **Loading**: Disabled with reduced opacity
- **Error**: Red tint border (temporary)

### WeatherCard (Current)
- **Default**: Full glass card with weather data
- **Loading**: Skeleton placeholder
- **Error**: Error message with icon

### DetailGrid
- **Layout**: 2x2 responsive grid
- **Each item**: Icon + Label + Value stack

### ForecastCard
- **Default**: Compact glass card
- **Hover**: Slight scale up
- **Loading**: Skeleton

### RecentCityChip
- **Default**: Small pill with city name
- **Hover**: Brighter background
- **Active**: Current city indicator

### UnitToggle
- **Default**: Pill with active/inactive states
- **Hover**: Subtle glow

### SkeletonLoader
- **Animation**: Pulse effect with gradient shimmer
- **Variants**: For temperature, icon, cards

## Technical Approach

### Framework
- React 18 with Vite
- Tailwind CSS for styling
- No additional UI libraries

### State Management
- React Context API for global state:
  - `weatherData` - Current weather
  - `forecastData` - 5-day forecast
  - `loading` - Loading state
  - `error` - Error message
  - `unit` - 'C' or 'F'
  - `recentSearches` - Array of recent cities
  - `fetchWeather` - Function to fetch weather by city
  - `fetchWeatherByCoords` - Function to fetch by coordinates
  - `toggleUnit` - Toggle temperature unit

### Custom Hooks
- `useWeather()` - Main hook for fetching weather data
- `useDebounce(value, delay)` - Debounce hook for search input
- `useLocalStorage(key, initialValue)` - LocalStorage persistence hook

### API Integration
- OpenWeatherMap API (free tier)
- Endpoints:
  - Current weather: `/data/2.5/weather?q={city}&appid={key}&units=metric`
  - Forecast: `/data/2.5/forecast?q={city}&appid={key}&units=metric`
  - Geolocation: `/data/2.5/weather?lat={lat}&lon={lon}&appid={key}&units=metric`
- API key from `.env`: `VITE_WEATHER_API_KEY`

### File Structure
```
src/
├── components/
│   ├── SearchBar.jsx
│   ├── CurrentWeather.jsx
│   ├── DetailGrid.jsx
│   ├── Forecast.jsx
│   ├── ForecastCard.jsx
│   ├── UnitToggle.jsx
│   ├── RecentSearches.jsx
│   └── SkeletonLoader.jsx
├── context/
│   └── WeatherContext.jsx
├── hooks/
│   ├── useWeather.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── utils/
│   └── weatherUtils.js
├── App.jsx
├── index.css
└── main.jsx
```
