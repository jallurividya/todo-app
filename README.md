# 📝 Todo App (Full Stack)

A full-stack Todo application with authentication where users can manage their tasks efficiently.

---

## 🚀 Features

*  User Signup & Login (JWT Authentication)
*  Add Todo
*  Edit Todo
*  Mark as Completed / Incomplete
*  Delete Todo
*  Protected Routes (only logged-in users can access)
*  Responsive UI (Mobile + Desktop)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* Supabase (Database)
* JWT (Authentication)
* Bcrypt (Password Hashing)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/jallurividya/todo-app.git
cd todo-app
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

#### Create `.env` file inside backend:

```env
PORT=5000
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

#### Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

### Backend

Deployed on Render

Link: https://todos-app-54pk.onrender.com/


### Frontend

Deployed on Vercel

---

## 🔗 API Endpoints

### Auth

* `POST /auth/signup`
* `POST /auth/login`

### Todos

* `GET /todos`
* `POST /todos`
* `PUT /todos/:id`
* `DELETE /todos/:id`

---

## 🔐 Authentication

* JWT-based authentication
* Token stored in localStorage
* Protected routes for dashboard access

---

## 🎯 Future Improvements

* 🔍 Search Todos
* 📊 Filter (Completed / Pending)
* 🌙 Dark Mode
* 📅 Due Dates

---

## 🙋‍♀️ Author

**Vidya Jalluri**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
