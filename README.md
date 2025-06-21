# 💬 Real-Time Chat Application

A full-stack real-time chat application with authentication, user profile management, online status indicators, and unseen message notifications. Built using:

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Realtime**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication
- Real-Time Messaging via Socket.io
- Responsive UI with Sidebar, Chat, and Profile View
- Error Notifications via `react-hot-toast`


---

## ⚙️ Environment Variables

Create a `.env` file in both `client` and `server` folders.

### Server (`/server/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```


### Client (`/client/.env`)
```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ranjeet-singh45/chat-app.git
cd chat-app
```
Install Server Dependencies
```
cd server
npm install
```
Install Client Dependencies
```
cd ../client
npm install
```
Start the backend:
```
cd server
npm run server
```
Start the frontend:
```
cd client
npm run dev
```
Go to: http://localhost:5173




