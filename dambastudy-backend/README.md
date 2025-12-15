# 🎓 DambaStudy Backend

RESTful API for DambaStudy e-learning platform built with Node.js, Express, and MongoDB.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Create .env file with your MongoDB credentials
# See Environment Variables section below

# Seed database with sample data
npm run seed

# Create admin user
node createAdmin.js

# Start server
npm run dev
```

Server runs at [http://localhost:5000](http://localhost:5000)

## 🔧 Environment Variables

Create a `.env` file:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/DambaDB
JWT_SECRET=your_secret_key_here
PORT=5000
```

## 🛠️ Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Structure

```
├── middleware/     # Auth & Admin middleware
├── models/         # Mongoose schemas
├── server.js       # Main server & routes
├── seed.js         # Database seeding
└── createAdmin.js  # Create admin user
```

## 📡 API Endpoints

### Auth
- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Courses
- `GET /courses` - List courses (with filters)
- `GET /courses/:id` - Course details
- `GET /courses/popular` - Popular courses

### Enrollment
- `POST /enroll` - Enroll in course
- `GET /user/courses` - My courses
- `POST /progress/complete` - Mark lesson done

### Categories
- `GET /categories` - All categories

### Admin
- `POST /admin/courses` - Create course
- `PUT /admin/courses/:id` - Update course
- `DELETE /admin/courses/:id` - Delete course

## 🎯 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Production start |
| `npm run seed` | Seed database |

## 🔐 Default Admin

After running `node createAdmin.js`:
- Email: `admin@example.com`
- Password: `admin123`

## 🌐 Deployment (Render)

1. Push to GitHub
2. Create Web Service on Render
3. Add environment variables
4. Deploy
