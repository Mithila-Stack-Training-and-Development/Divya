# Contact API Backend

A Node.js RESTful API for managing contact form submissions, built with Express, MongoDB (Mongoose), and Zod for validation.

## Features

- **Create Contact:** Accepts contact form submissions with validation.
- **Get All Contacts:** Fetches a list of all contacts.
- **Get Contact by ID:** Fetches a single contact by its MongoDB ID.
- **Validation:** Uses Zod for request validation and Mongoose for schema enforcement.
- **Environment Config:** Uses `.env` for MongoDB URI, DB name, and port.
- **CORS Enabled:** Allows cross-origin requests.

## Project Structure

```
contact/
  config/
    db.js                  # MongoDB connection logic
  controller/
    contact.controller.js  # Contact controller functions
  dto/
    contact.dto.js         # Data transfer object helpers
  model/
    contact.model.js       # Mongoose schema/model
  route/
    contact.route.js       # Express router for contact endpoints
  validation/
    contact.validation.js  # Zod validation schema
  index.js                 # Main server entry point
  .env                     # Environment variables (not committed)
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

2. **Create a `.env` file** in the root of the `contact` folder:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017
   DB_NAME=contactdb
   PORT=8000
   ```

3. **Start MongoDB** (if not already running).

4. **Run the server:**
   ```sh
   npm start
   ```
   or (if you use nodemon)
   ```sh
   npm run dev
   ```

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | `/api/contacts`    | Get all contacts           |
| GET    | `/api/contacts/:id`| Get a contact by ID        |
| POST   | `/api/contacts`    | Create a new contact       |

### POST `/api/contacts` Example

```json
{
  "name": "Divya Kumari",
  "email": "divya@example.com",
  "phone": "9876543210",
  "message": "Hello, this is a test message."
}
```

### Validation Rules

- **Name:** 4-50 characters
- **Email:** Valid email format, unique
- **Phone:** 10-15 digits
- **Message:** 10-500 characters

## Notes

- All responses are JSON.
- Errors return a JSON object with `status: "error"` and a message.
- Make sure your MongoDB server is running and accessible.

## Author
Divya Kumari