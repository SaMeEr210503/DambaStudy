# 🎓 DambaStudy Frontend

Modern e-learning platform frontend built with React + Vite featuring a premium dark-mode UI.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Axios** - API calls
- **Lucide Icons** - Icon library
- **React Hot Toast** - Notifications

## 📁 Structure

```
src/
├── components/     # Reusable UI components
├── context/        # Auth & Cart context
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
└── utils/          # API config, motion variants
```

## 🎯 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/courses` | Course catalog |
| `/courses/:id` | Course details |
| `/categories` | All categories |
| `/login` | Login page |
| `/register` | Registration |
| `/dashboard` | User dashboard |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/admin` | Admin panel |

## 🌐 Deployment

### Vercel
1. Push to GitHub
2. Import in Vercel
3. Add `VITE_API_URL` env variable
4. Deploy

### Netlify
1. Build: `npm run build`
2. Publish directory: `dist`

---

**Note:** Requires the backend to be running. See `../dambastudy-backend/README.md`
