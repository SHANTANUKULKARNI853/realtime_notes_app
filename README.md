# 🚀 Real-Time Collaborative Notes App

A full-stack **real-time collaborative notes application** where multiple users can create, edit, and share notes live.

Built to demonstrate:
⚡ Real-time systems  
🔐 Secure authentication  
🤝 Multi-user collaboration  
🏗 Production-ready architecture  

---

# 🌍 Live Demo

### 🖥 Frontend  
👉 [https://YOUR-VERCEL-URL.vercel.app  ](https://realtime-notes-app-beta.vercel.app/)

### 🔧 Backend API  
👉 https://realtimenotesapp-production.up.railway.app  

---

# 👤 Demo Credentials

### 👑 Admin
📧 admin@mail.com  
🔑 123456  

### ✍️ Editor
📧 editor@mail.com  
🔑 123456  

### 👀 Viewer
📧 viewer@mail.com  
🔑 123456  

---

# ✨ Features

## 🔐 Authentication & Authorization
✅ JWT-based login/register  
✅ Role-based access (Admin / Editor / Viewer)  
✅ API-level protection  

---

## 📝 Notes Management
✅ Create, edit, delete notes  
✅ Ownership tracking  
✅ Last-modified timestamps  

---

## 🤝 Collaboration
✅ Add collaborators  
✅ Viewer vs Editor permissions  
✅ Shared note access  

---

## ⚡ Real-Time Editing
✅ Socket.io live sync  
✅ Multi-user editing  
✅ Room-based updates  
✅ Last-write-wins conflict handling  

---

## 📊 Activity Logs
✅ Tracks create/update/delete/share  
✅ Timestamped audit trail  

---

## 🔍 Search
✅ Search by title  
✅ Search by content  
✅ Permission-aware filtering  

---

## 🔗 Public Sharing
✅ Token-based public links  
✅ No login required  
✅ Read-only access  

---

# 🏗 Tech Stack

## 🎨 Frontend
⚛ React (Vite)  
📡 Axios  
🔌 Socket.io-client  
🎨 Tailwind CSS  

---

## 🛠 Backend
🟢 Node.js  
🚏 Express.js  
🧩 Prisma ORM  
🔌 Socket.io  

---

## 🗄 Database
🐘 PostgreSQL (Railway)

---

## 🚀 Deployment
▲ Vercel (Frontend)  
🚂 Railway (Backend + DB)

---

# 🧠 System Flow

User Login 🔐
↓
JWT Token Issued 🎟
↓
Create / Edit Notes 📝
↓
Join Socket Room 🔌
↓
Live Sync Across Users ⚡
↓
Activity Logged 📊
↓
Optional Public Sharing 🔗


---

# 📡 Real-Time Flow

User A types ✍️
↓
Socket emit (note-update) 📡
↓
Server broadcasts 🌍
↓
User B sees update instantly ⚡

---

## 🧪 Quick Test (2–3 Minutes)

1️⃣ **Login**
Use: `admin@mail.com / 123456`
➡️ You should reach the dashboard.

2️⃣ **Create & Edit**
Click **+ New Note**, change title/content.
➡️ Changes save instantly.

3️⃣ **Real-Time Sync ⚡**
Open the app in two browsers and edit the same note.
➡️ Updates appear live.

4️⃣ **Role Check 🔐**
Login as `viewer@mail.com / 123456`.
➡️ Viewer can view but NOT edit.

✅ If all pass → app works perfectly 🚀

---

# 🗄 Database Schema (Simplified)

User 👤
├── id
├── email
├── role

Note 📝
├── title
├── content
├── ownerId
├── isPublic
├── shareToken

Collaborator 🤝
├── noteId
├── userId
├── permission

ActivityLog 📊
├── userId
├── action
├── timestamp


---

# ⚙️ Local Setup

## Backend 🛠

cd backend
npm install


Create `.env`:

DATABASE_URL=your_db_url
JWT_SECRET=your_secret
BASE_URL=http://localhost:5000


Run:

npm run dev


---

## Frontend 🎨

cd frontend
npm install
npm run dev


---

# 🎯 Assignment Requirements Covered

✅ Authentication & RBAC  
✅ Notes CRUD  
✅ Real-time collaboration  
✅ Activity logs  
✅ Search  
✅ Public sharing  
✅ Deployment  
✅ Clean architecture  

---

# 🚀 Future Improvements

✨ Rich text editor  
✨ Version history  
✨ Notifications  
✨ Advanced conflict resolution  

---

# 👨‍💻 Author

**Shantanu Kulkarni**  

🔗 GitHub  
https://github.com/SHANTANUKULKARNI853  

---

# ⭐ If You Like This Project

Consider giving it a star ⭐  
It motivates further development!

---

# 🙌 Thank You

Thanks for reviewing this project!  
Hope you enjoy exploring it 🚀
