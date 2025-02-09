# 🎉 Event Management Platform

An elegant, full-stack solution for managing events with real-time interactions. Create, organize, and participate in events with our modern, user-friendly platform.

## ✨ Key Features

### 👤 User Experience

- Seamless authentication with regular and guest access
- Interactive event dashboard with smart filtering
- Real-time attendee tracking
- Mobile-first, responsive design
- Intuitive event creation and management

### 🛠 Technical Highlights

- Secure JWT authentication
- Real-time updates via WebSocket
- Cloud-based image management
- RESTful API architecture
- Scalable database solution

## 🚀 Tech Stack

### Frontend Architecture

```
React.js     → Modern UI Framework
Tailwind CSS → Utility-first Styling
Axios        → API Communication
Socket.IO    → Real-time Updates
```

### Backend Infrastructure

```
Node.js    → Runtime Environment
Express.js → API Framework
MongoDB    → Database Solution
Socket.IO  → WebSocket Server
JWT        → Authentication
Cloudinary → Media Management
```

### Cloud Infrastructure

- Frontend: Vercel/Netlify
- Backend: Render/Railway.app
- Database: MongoDB Atlas

## 🛠 Getting Started

### System Requirements

- Node.js (LTS version)
- MongoDB Atlas Account
- Cloudinary Account

### Backend Configuration

1. **Initialize Backend**

   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   Create `.env` file:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Launch Server**
   ```bash
   npm run start
   ```

### Frontend Configuration

1. **Initialize Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🔌 API Reference

### Authentication Endpoints

```http
POST /api/auth/register    # Create account
POST /api/auth/login       # User login
POST /api/auth/guest-login # Guest access
```

### Event Management

```http
GET    /api/events        # List events
POST   /api/events        # Create event
GET    /api/events/:id    # Event details
PUT    /api/events/:id    # Update event
DELETE /api/events/:id    # Remove event
POST   /api/events/:id/attend # Join event
```

---

📝 For detailed documentation and contribution guidelines, please visit our [Wiki](https://github.com/your-repo/wiki).
