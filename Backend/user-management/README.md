# User Management API

A Node.js RESTful API for managing users, built with Express and MongoDB (via Mongoose). This project demonstrates CRUD operations, middleware usage, and modular code structure.

## Features

- **User CRUD:** Create, Read, Update, and Delete users via RESTful endpoints.
- **MongoDB Integration:** Uses Mongoose for schema modeling and database operations.
- **Logging Middleware:** Logs each request to `log.txt`.
- **Modular Structure:** Separate files for controllers, models, routes, and middleware.
- **Sample Data:** Includes `MOCK_DATA.json` for initial data reference.

## Project Structure

```
Backend/
  user-management/
    controllers/
      user.controller.js      # Controller functions for user routes
    middlewares/
      index.mid.js            # Logging middleware
    models/
      user.model.js           # Mongoose user schema/model
    routes/
      user.routes.js          # Express routes for user endpoints
    MOCK_DATA.json            # Sample/mock user data
    connection.js             # MongoDB connection helper
    server.js                 # Main entry point (recommended)
    index.js                  # Alternative entry point (monolithic)
    package.json              # Project metadata and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start MongoDB:**  
   Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017/user-management`.

3. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Base URL

```
http://localhost:8000/user
```

### Routes

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/user`          | Get all users              |
| POST   | `/user`          | Create a new user          |
| GET    | `/user/:id`      | Get user by ID             |
| PATCH  | `/user/:id`      | Update user by ID          |
| DELETE | `/user/:id`      | Delete user by ID          |

#### Example User Object

```json
{
  "first_name": "Divya",
  "last_name": "Kumari",
  "email": "example@gmail.com",
  "gender": "female",
  "job_title": "SDE"
}
```

### Middleware

- **Logging:** All requests are logged to `log.txt` with timestamp, IP, method, and path.

## Scripts

- `npm run dev` — Start server with nodemon (`server.js`)
- `npm start` — Start server with node (`index.js`)

## Notes

- The API expects user fields in snake_case in requests, but stores them in camelCase in MongoDB.
- Make sure the MongoDB server is running before starting the API.
- All fields are required when creating a new user.

## Author

Divya Kumari