# 🎓 DambaStudy - E-Learning Platform

A modern, full-stack e-learning platform built with React and Node.js featuring a premium dark-mode UI, course management, video lessons, and certificate generation.

![DambaStudy](<img width="1887" height="826" alt="image" src="https://github.com/user-attachments/assets/d383fb81-65dc-40ac-9426-f830effcb6b4" />
)

## ✨ Features

### 🎨 Frontend
- **Premium Dark Theme** - Modern UI with purple/pink gradient accents
- **Framer Motion Animations** - Smooth page transitions and micro-interactions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Course Catalog** - Browse, filter, and search courses
- **Shopping Cart** - Add courses and checkout
- **Video Player** - Watch lessons with progress tracking
- **User Dashboard** - Track enrolled courses and progress
- **Certificates** - Generate PDF certificates upon completion
- **Admin Panel** - Manage courses and categories

### ⚙️ Backend
- **RESTful API** - Express.js with MongoDB
- **JWT Authentication** - Secure login and registration
- **Role-based Access** - Admin and user roles
- **Course Management** - CRUD operations for courses
- **Progress Tracking** - Track completed lessons
- **Certificate Generation** - Award certificates

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| Vite | Express.js |
| React Router | MongoDB |
| Framer Motion | Mongoose |
| Axios | JWT |
| Lucide Icons | bcryptjs |
| React Hot Toast | CORS |

## 📁 Project Structure

```
mera project/
├── dambastudy/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context (Auth, Cart)
│   │   ├── hooks/           # Custom hooks
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   └── utils/           # Utilities (API, motion)
│   └── package.json
│
├── dambastudy-backend/      # Backend (Node.js + Express)
│   ├── middleware/          # Auth & Admin middleware
│   ├── models/              # Mongoose models
│   ├── server.js            # Main server file
│   ├── seed.js              # Database seeding
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- MongoDB Atlas account (or local MongoDB)
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dambastudy.git
cd dambastudy
```

### 2️⃣ Setup Backend

```bash
# Navigate to backend
cd dambastudy-backend

# Install dependencies
npm install

# Create environment file
# Create a file named .env with:
```

**.env file contents:**
```env
MONGO_URL="your url"

JWT_SECRET=your_super_secret_key_here
PORT=5000
```

```bash
# Seed the database with sample data
npm run seed

# Create admin user
node createAdmin.js

# Start the backend server
npm run dev
```

### 3️⃣ Setup Frontend

```bash
# Open a new terminal
cd dambastudy

# Install dependencies
npm install

# Create environment file
# Create a file named .env with:
```

**.env file contents:**
```env
VITE_API_URL=http://localhost:5000
```

```bash
# Start the frontend
npm run dev
```

### 4️⃣ Open in Browser

Frontend: [http://localhost:5173](http://localhost:5173)

Backend API: [http://localhost:5000](http://localhost:5000)

## 🔐 Default Login Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Or register a new account at `/register`**

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Get current user |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | List all courses |
| GET | `/courses/:id` | Get course details |
| GET | `/courses/popular` | Get popular courses |

### Enrollment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/enroll` | Enroll in a course |
| GET | `/user/courses` | Get enrolled courses |
| POST | `/progress/complete` | Mark lesson complete |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | List all categories |

## 🎯 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
npm run seed     # Seed database
```

## 🌐 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**DambaStudy** - Built with ❤️

---

⭐ Star this repo if you found it helpful!



