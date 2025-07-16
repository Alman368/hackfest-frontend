# Hackfest Frontend

A modern React + Vite frontend for the hackfest music events platform with CTF (Capture The Flag) challenges integrated.

## 🚀 Features

### Home Page
- **Hero Section**: Beautiful gradient background with the "hackfest" title and search functionality
- **Search Bar**: Real-time filtering of events by title and description
- **Events Grid**: Responsive grid layout displaying event cards
- **CTF Integration**: Hidden vulnerabilities and challenges for cybersecurity learning

### Event Cards
- **Visual Design**: Each card includes:
  - Event icon (emoji)
  - Event image
  - Title and description
  - Price display
  - Buy button with shopping cart icon
- **Interactive**: Cards are clickable to navigate to event details
- **Hover Effects**: Smooth animations and elevated shadows

### Event Preview Page
- **Hero Section**: Large event image with overlay containing event details
- **Detailed Information**:
  - Full event description
  - Featured artists list
  - Event details (date, time, location, capacity)
  - Purchase section with pricing
- **Navigation**: Back button to return to home page

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: CSS3 with modern features
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Server**: Nginx (Alpine)
- **Deployment**: Railway (Docker)

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Railway Deployment

### Prerequisites
1. Two Railway projects:
   - `hackfest-frontend` (this project)
   - `hackfest-backend` (Flask API)

### Frontend Deployment Steps

1. **Deploy the backend first** to get its Railway URL
2. **Configure environment variable** in Railway dashboard:
   ```
   BACKEND_URL=https://your-backend-app.up.railway.app
   ```
3. **Deploy the frontend** - it will automatically proxy API calls to the backend

### Environment Variables

- `BACKEND_URL`: URL of the deployed backend service (required for production)
- `VITE_BACKEND_URL`: Backend URL for development (optional)

### How It Works

The frontend uses nginx as a reverse proxy:
- **Production**: nginx proxies `/api/*`, `/config`, `/uploads/*`, `/hints`, etc. to the backend
- **Development**: Direct API calls to `VITE_BACKEND_URL`

### Microservices Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   (React+Nginx) │    │    (Flask)      │
│                 │    │                 │
│ nginx proxies:  │───▶│ /api/*          │
│ /api/* ────────▶│    │ /config         │
│ /config ───────▶│    │ /uploads/*      │
│ /uploads/* ────▶│    │ /hints          │
│ /hints ────────▶│    │ /robots.txt     │
└─────────────────┘    └─────────────────┘
```

## 🎯 Current Status

- ✅ Home page with search functionality
- ✅ Event cards with all required elements
- ✅ Event preview/detail pages
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Backend integration via nginx proxy
- ✅ CTF challenges and vulnerabilities
- ✅ Railway deployment ready
- ⏳ Functional purchase system (to be implemented)

## 🔮 CTF Challenges

The platform includes several cybersecurity challenges:

1. **YAML RCE Vulnerability**: `/config` endpoint vulnerable to unsafe deserialization
2. **Caesar Cipher**: Encrypted messages with hints for decryption
3. **Privilege Escalation**: System information for local exploitation
4. **File Exfiltration**: Upload and download mechanisms
5. **Information Disclosure**: Various endpoints revealing system details

### Available Endpoints (via proxy)

- `/api/festival` - Festival information
- `/api/artists` - Artists data
- `/api/tickets` - Ticket information
- `/api/hints` - Encrypted Caesar cipher hints
- `/config` - **VULNERABLE** YAML configuration endpoint
- `/uploads/<filename>` - File upload/download
- `/api/status` - System status
- `/api/admin` - Admin panel info
- `/api/logs` - System logs
- `/api/system` - System information for privilege escalation
- `/robots.txt` - Robots file with hidden directories

## 📱 Demo Data

The app currently uses mock data with 6 different music events:
- Summer Music Festival
- Electronic Nights
- Jazz & Blues Evening
- Rock Concert Extravaganza
- Classical Orchestra Performance
- Hip-Hop Block Party

Each event includes realistic details, pricing, and featured artists for demonstration purposes.

## 🎵 Events Available

All events are music-focused as requested:
- Various genres (Electronic, Jazz, Rock, Classical, Hip-Hop)
- Different venues and capacities
- Realistic pricing ($40-$90 range)
- Featured artists and detailed descriptions
- Event dates, times, and locations

## 🚨 Security Note

This application intentionally contains vulnerabilities for educational purposes. **DO NOT** deploy in production environments without proper security measures.

## 📞 Support

For deployment help or CTF guidance, ensure both frontend and backend are properly configured with the `BACKEND_URL` environment variable pointing to your deployed backend service.
