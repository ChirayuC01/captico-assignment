# Frontend - React (Vite) Application

This is the frontend of the MERN Stack project built using **React (Vite)** and **Tailwind CSS**.

## 📌 Features
- User Authentication (Register/Login)
- Course Management (CRUD operations)
- Responsive UI with Tailwind CSS
- JWT Token-Based Authentication

## 🛠️ Tech Stack
- **React (Vite)**
- **Tailwind CSS**
- **Axios** (for API requests)
- **React Router** (for navigation)

## 🚀 Installation & Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
    ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## 🔗 API Configuration
The frontend interacts with the backend using Axios. To configure the API base URL, update ```src/api/axios.js```:
```go
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change this to the deployed backend URL if necessary
});
```