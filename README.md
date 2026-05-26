# 🚀 ProBlog: Modern Blog Platform with Admin Panel

ProBlog is a full-stack, high-performance blog platform designed for professional content management. It features a robust backend, a sleek responsive frontend, and a comprehensive admin suite for effortless content creation.

![Project Preview](https://raw.githubusercontent.com/faizafaisal786/internship-task-3/main/frontend/src/assets/hero.png)

## ✨ Features

### 👤 User Interface
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop.
- **Dynamic Content:** Real-time search and category-based filtering.
- **Seamless Navigation:** Fast routing with professional pagination.
- **Rich Reading Experience:** Clean typography with support for images, quotes, and formatted text.

### 🔐 Admin Panel (Protected)
- **Secure Authentication:** JWT-based login for authorized access.
- **Full Blog CRUD:** Create, Read, Update, and Delete blog posts.
- **Rich Text Editor:** Integrated `ReactQuill` for professional content formatting.
- **Category Management:** Create and manage custom categories for content organization.
- **Draft/Publish System:** Control the visibility of your posts with a single click.

## 🛠️ Tech Stack

**Frontend:**
- React 19 (TypeScript)
- Vite (Build Tool)
- Axios (API Communication)
- Lucide React (Icons)
- React Quill (Rich Text Editor)
- React Router DOM (Navigation)

**Backend:**
- Node.js & Express.js
- Prisma (ORM)
- SQLite (Database)
- JWT (Authentication)
- Bcrypt.js (Password Hashing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/faizafaisal786/internship-task-3.git
   cd internship-task-3
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create .env file with:
   # DATABASE_URL="file:./dev.db"
   # JWT_SECRET="your_secret_key"
   # PORT=5000
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed # To create default admin
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install --legacy-peer-deps
   npm run dev
   ```

### 🔑 Admin Credentials (Default)
- **Email:** `admin@blog.com`
- **Password:** `admin123`

## 📂 Project Structure

```text
├── backend/
│   ├── prisma/          # Database schema and migrations
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   └── middleware/  # Auth & error handling
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Page-level components
    │   ├── context/     # Global state (Auth)
    │   └── api/         # Axios configuration
```

## 📝 License
Distributed under the MIT License.

---
Developed with ❤️ by [Faiza Faisal](https://github.com/faizafaisal786)
