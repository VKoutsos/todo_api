# 🧩 Real-Time Full-Stack To-Do List Application

A **comprehensive full-stack task management application** built with **Angular** and a **Node.js backend**.  
This project demonstrates a **complete, decoupled architecture** featuring a **relational database**, **secure user authentication**, **role-based permissions**, and **real-time data synchronization** using **WebSockets**.

This is a **robust portfolio project** designed to showcase a wide range of modern web development skills — from creating a dynamic frontend and a secure REST API to implementing advanced features like real-time admin-to-user communication.

---

## 🚀 Key Features

### 👤 User Features
- 🔐 **Secure Authentication:** Register and log in with **JWT (JSON Web Tokens)** for secure, stateless sessions.  
- ✅ **Full CRUD for Tasks:** Create, Read, Update, and Delete tasks with titles and descriptions.  
- 🧩 **Sub-task Management:** Add, edit, complete, and delete nested sub-tasks for detailed task tracking.  
- 🔄 **Task Status Control:** Mark tasks and sub-tasks as *pending* or *completed*.  
- 📧 **Email Notifications:** Receive notifications for key events like registration or task updates.  

### 🛠️ Admin Features
- 📊 **Admin Dashboard:** View all users and their tasks from a separate dashboard.  
- 👥 **Full User Management:** Access and manage all registered users.  
- 📝 **Complete Task Control:** Create, view, edit, and delete tasks and sub-tasks for any user.  
- ⚡ **Real-Time Updates:** Changes made by admins are **instantly pushed** to users via **Socket.io**, without needing a refresh.  

---

## 🖼️ Screenshots & Demo
 
**Frontend** deployed at [Vercel](https://vercel.com), 
and **Backend** deployed at [Render](https://render.com) 

🔗 **[➡️ https://todo-api-neon.vercel.app/ ⬅️]**

Add screenshots here to give recruiters a quick visual overview:

| Page | Screenshot |
|------|-------------|
| **Login Page** | _Your Screenshot Here_ |
| **User Dashboard** | _Your Screenshot Here_ |
| **Admin Dashboard** | _Your Screenshot Here_ |

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Angular, Angular Material, TypeScript, Socket.io-client |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MySQL |
| **Authentication & API** | JSON Web Tokens (JWT), bcrypt.js, Cors, Dotenv, Nodemailer |

---

## ⚙️ Local Installation & Setup

Follow these steps to run the project locally.

### 🧱 Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [MySQL Server & Workbench](https://dev.mysql.com/downloads/workbench/)

---

### 🗄️ 1. Database Setup

1. Install and run MySQL Server.  
2. Open **MySQL Workbench** and connect to your local instance.  
3. Run the `schema.sql` file (included in this repo) to create the `todo_app` database and tables.

---

### 🔧 2. Backend Setup

```bash
# Navigate to the backend directory
cd todo-app-backend

# Create your .env file (see example below)
# Install dependencies
npm install

# Start the backend server
npm start
```

The backend will run on:  
👉 **http://localhost:5000**

---

### 💻 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend folder
cd todo-app-frontend

# Install dependencies
npm install

# Start the Angular development server
npm start
```

The frontend will run on:  
👉 **http://localhost:4200**

---

## 🔑 Environment Variables

The backend requires a `.env` file with the following variables:  
(**Never** commit this file to Git.)

```bash
# .env.example

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_root_password
DB_NAME=todo_app

# JWT Configuration
JWT_SECRET=your_super_secret_key

# Nodemailer Configuration (use a Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

## 🧠 Project Architecture

```
todo-app/
│
├── todo-app-frontend/       # Angular frontend
│   ├── src/
│   ├── app/
│   └── ...
│
├── todo-app-backend/        # Node.js backend
│   ├── config/              # DB connection, environment setup
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth, validation, logging
│   ├── routes/              # API endpoints
│   ├── server.js            # Main entry point
│   └── ...
│
└── schema.sql               # Database schema
```

---

## ⚡ Real-Time Features

- The app uses **Socket.io** for instant communication between clients and the server.  
- When an admin edits a user’s task, the user’s interface updates **immediately** — no manual refresh needed.  
- The real-time layer ensures an engaging, up-to-date experience for all users.

---

## 🧩 Future Improvements

- 🔔 Push notifications for mobile/web  
- 📅 Task deadlines and reminders  
- 🌓 Dark mode toggle  
- 📊 Analytics and activity tracking  

---

## 🧑‍💻 Author

**Vasilis Koutsos**  
📍 Full-Stack Developer Intern at YSoft, Thessaloniki  
💼 [GitHub Profile](https://github.com/VKoutsos)

---

⭐ **If you found this project useful, don’t forget to give it a star!**




