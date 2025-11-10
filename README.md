
# 🚀 Mega Backend File Manager

A powerful and scalable **Node.js + Express + MongoDB** backend designed for file management with **Multer** and **Swagger API documentation**.  
Each registered user automatically gets a **personal folder** where all uploaded files are securely stored and organized.

---

## ⚙️ Features

- 🔐 **User Authentication (Register/Login)**  
  Built with JWT for secure authentication and session handling.

- 🗂️ **Automatic Folder Creation**  
  When a user registers, the system automatically creates a folder named after their **username**.

- 📤 **File Upload Management**  
  Upload files directly into your personal folder (or the default folder if not set).  
  Supports any file type with Multer middleware.

- 🧭 **Swagger API Documentation**  
  Fully documented API endpoints for developers and testers.

- 🧱 **Modular Structure**  
  Clean and scalable folder architecture, perfect for large projects.

---

## 🧩 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Multer** (file handling)
- **Swagger UI** (API documentation)
- **JWT** (authentication)

---

## 📁 Project Structure

```

mega-backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── public/
│   └── utils/
├── config.env
├── package.json
└── server.js

````

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/barbodmsd/mega.git
cd mega
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=7000
```

### 4️⃣ Run the Server

```bash
npm run dev
```

The server will start on `http://localhost:7000`

---

## 📘 API Documentation

Swagger is available at:

```
http://localhost:7000/api-docs
```

---

## 🧠 How It Works

1. **Register or Login** – The app verifies your credentials and generates a JWT token.
2. **Folder Creation** – A folder named after your username is created automatically in `/public`.
3. **File Uploads** – Upload files to your folder using authenticated endpoints.
4. **Access Swagger** – Test and explore every route easily.

---

## 📦 Example

When a user named `barbodmsd` registers, a folder like this is created:

```
/public/barbodmsd/
```

Then all `barbodmsd`’s uploads go into that folder automatically.

---

## 🛠 Future Improvements

* File sharing between users
* Role-based access (Admin/User)
* Cloud storage integration (AWS S3)
* File versioning and history tracking

---

## 👨‍💻 Author

**Barbad Masoudi**
Full-Stack Developer | MERN Specialist
📍 Mashhad, Iran
💼 [LinkedIn](https://www.linkedin.com/in/barbod-masoudi-50842b30b/) • 🌐 [Portfolio](https://barbodmsd.com) • 💻 [GitHub](https://github.com/barbodmsd)

---

## 🧾 License

This project is licensed under the **MIT License**.


