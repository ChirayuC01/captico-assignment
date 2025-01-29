# Backend - Express & MongoDB API
This is the backend of the MERN Stack project built using **Node.js**, **Express**, and **MongoDB**.

## 📌 Features
- User Authentication (JWT-based)
- Course Management (CRUD operations)
- Password Hashing with Bcrypt
- Input Validation using Joi

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Joi (Input Validation)**
- **Bcrypt (Password Hashing)**

## 🚀 Installation & Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
    ```bash 
    npm install 
    ```
3. Create a ```.env``` file in the ```backend/``` directory and add:
   
   ```go 
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_secret_key>
    ```
4. Start the backend server:
    ```bash
    node server.js
    ```

## 🔗 API Endpoints

### Authentication
- ```POST``` ```/api/auth/register``` -> Register a new user
- ```POST``` ```/api/auth/login``` -> Login & get JWT token

### Courses
- ```POST``` ```/api/courses``` -> Create a new course
- ```GET``` ```/api/courses``` -> Fetch all courses
- ```GET``` ```/api/course/:id``` -> Fetch a specific course
- ```PUT``` ```/api/course/:id``` -> Update a course
- ```DELETE``` ```/api/course/:id``` -> Delete a course