# 🗺️ LocalEyes – Tour Guide Platform
### Connecting Travelers with Authentic Local Experiences

---

## 📋 Overview

**LocalEyes** is a full-stack web platform that connects tourists with certified local guides for authentic travel experiences.
The platform focuses on secure bookings, intelligent guide discovery, real-time communication, and role-based system architecture.

Built with production-ready practices, LocalEyes emphasizes scalability, security, and maintainability.

---

## 🌐 Live Demo

🚀 **Live Site:** https://localeyesdb.vercel.app

🖥  **Server code repo :** https://github.com/Md-Habibullah/local-eyes-server

---

## ✨ Features

### 🧑‍🤝‍🧑 For Travelers
- Search and filter guides by location, expertise, and ratings
- Book tours with secure payment processing
- Rate and review experiences
- Fully responsive design

### 🧭 For Local Guides
- Create detailed profiles with expertise and availability
- Manage bookings and calendar
- Secure payment handling
- Performance analytics and reviews
- Mobile-friendly dashboard

---

## 🔐 Security Features
- Role-based authentication (User / Guide / Admin)
- JWT-based authorization
- Secure password hashing
- Data validation and protection

## 📸 Screenshots

### 🏠 Homepage
<img src="https://res.cloudinary.com/do8bidma8/image/upload/v1769685561/localeyes-home_ijbinc.png" alt="LocalEyes Homepage" width="800"/>

### 👤 Dashboard
<img src="https://res.cloudinary.com/do8bidma8/image/upload/v1769685627/localeyes-dashboard_v7mdug.png" alt="LocalEyes Dashboard" width="800"/>

---



## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Context API
- React Hook Form + Zod
- Radix UI

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT & bcrypt
- Cloudinary (file uploads)

### DevOps & Tools
- Vercel (Frontend)
- Render / Railway (Backend)
- Neon / Supabase (PostgreSQL)
- Git & GitHub
- npm / yarn

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database

---

Note:
In this system, "Add Item" is mapped to "Create Tour".
Due to real-world design, only Guide/Admin roles can create tours.
Tourists can interact via booking instead.

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/Md-Habibullah/local-eyes-client.git
cd local-eyes-client
```

Install dependencies:
```bash
npm install
# or
yarn install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
JWT_SECRET=secret
REFRESH_TOKEN_SECRET=secret
```

---

## ▶️ Run the Application

```bash
npm run dev
# or
yarn dev
```

Open in browser:
👉 http://localhost:3000

---

## 🔗 API Integration

This frontend connects to the **LocalEyes Backend API**.
Ensure the backend server is running.

👉 Backend Repository: `local-eyes-server`

---

## 🧪 Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

---

## 📦 Build & Deployment

Build for production:
```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel deploy
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature
```
3. Commit changes:
```bash
git commit -m "Add new feature"
```
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Md. Habibullah**

- GitHub: https://github.com/md-habibullah
- LinkedIn: https://www.linkedin.com/in/md-habibullah1/
- Email: habibullah15160@gmail.com

---

## 🙏 Acknowledgments
- Icons by Lucide Icons
- UI inspiration from modern travel platforms
- Community feedback and testing

⭐ If you find this project helpful, please consider giving it a star!
