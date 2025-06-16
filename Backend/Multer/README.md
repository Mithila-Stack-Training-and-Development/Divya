# Multer File Upload Backend

This project is a simple Express.js backend for handling file uploads using [Multer](https://github.com/expressjs/multer). It supports uploading single or multiple files and renders a basic upload form using EJS.

## Features

- Upload single or multiple files (profile and cover images)
- Stores uploaded files in the `uploads/` directory
- Renders an EJS form for file uploads

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the server:**

   ```sh
   npm run dev
   # or
   npm start
   ```

   The server will start on [http://localhost:8000](http://localhost:8000).

## Endpoints

### GET `/`

- Renders the homepage with a file upload form.

### POST `/upload`

- Accepts file uploads for `profileImg` and `coverImg`.
- Saves files to the `uploads/` directory.
- Redirects back to the homepage after upload.

#### Example Form Fields

- `profileImg` (file)
- `coverImg` (file)

## Project Structure

```
Backend/
  Multer/
    index.js         # Main server file
    package.json     # Project dependencies and scripts
    uploads/         # Uploaded files are stored here
    views/
      homepage.ejs   # EJS template for upload form
```

## Notes

- Make sure the `uploads/` directory exists and is writable.
- The uploaded files are named with a timestamp prefix to avoid collisions.

