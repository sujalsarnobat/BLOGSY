# 📝 Blogsy

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 
[![Frontend](https://img.shields.io/badge/Frontend-React-brightgreen)](#) 
[![Backend](https://img.shields.io/badge/Backend-Node.js-yellow)](#) 
[![Database](https://img.shields.io/badge/Database-MongoDB-green)](#) 
[![GitHub Repo Size](https://img.shields.io/github/repo-size/sujalsarnobat/BLOGSY)](https://github.com/sujalsarnobat/BLOGSY)
[![Stars](https://img.shields.io/github/stars/sujalsarnobat/BLOGSY?style=social)](https://github.com/sujalsarnobat/BLOGSY/stargazers)
[![Forks](https://img.shields.io/github/forks/sujalsarnobat/BLOGSY?style=social)](https://github.com/sujalsarnobat/BLOGSY/network/members)

**Blogsy** is a full-stack blogging platform that allows users to **create, edit, delete, and view blog posts**. It provides a seamless and modern blogging experience with authentication, API integration, and interactive UI.

---

## 🚀 Features

### 🌐 Frontend (React + Tailwind CSS)
- User-friendly interface for writing and reading blogs
- Login & Registration with JWT authentication
- Create, Edit, Delete posts
- Responsive design for all devices
- Interactive comments on posts
- API integration for dynamic content

### 🖥️ Backend (Node.js + Express + MongoDB)
- RESTful API for managing users and posts
- JWT-based Authentication
- CRUD operations for posts and comments
- File upload support using Multer & GridFS
- Secure routes for authorized users

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ORM |
| Authentication | JWT |
| File Handling | Multer, GridFS |
| Version Control | Git + GitHub |

---

## 🗂️ Project Architecture

Blogsy/
│
├─ client/ # React frontend
│ ├─ public/ # Public assets
│ └─ src/ # React components & pages
│ ├─ components/
│ ├─ pages/
│ ├─ utils/
│ └─ App.jsx
│
├─ server/ # Backend
│ ├─ controllers/ # Route logic
│ ├─ models/ # MongoDB models
│ ├─ routes/ # Express routes
│ ├─ middleware/ # Auth & other middleware
│ └─ index.js # Server entry point
│
├─ README.md
├─ package.json
└─ .gitignore




## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sujalsarnobat/BLOGSY.git
cd BLOGSY
2️⃣ Install dependencies
Frontend

bash
Copy code
cd client
npm install
npm run dev
Backend

bash
Copy code
cd ../server
npm install
npm start
3️⃣ Environment Variables
Create a .env file in server/:

ini
Copy code
PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
📡 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT token
GET	/api/posts	Get all posts
POST	/api/posts	Create a new post
PUT	/api/posts/:id	Update a post
DELETE	/api/posts/:id	Delete a post

🖼 Screenshots (Optional)
Add screenshots here to showcase the UI:

Home Page

Create/Edit Post Page

Post Details with Comments

🤝 Contributing
Fork the repo

Create a branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add feature"

Push to your branch: git push origin feature-name

Open a Pull Request

🧑‍💻 Author
Sujal Sarnobat
📧 sujalsarnobat@gmail.com
🌐 GitHub Profile

🪄 License
This project is licensed under the MIT License. See the LICENSE file for details.
