import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import express from 'express';
const app = express();

//Connect to MongoDB
import connectToDatabase from './config/db.js';
connectToDatabase();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import contactRouter from "./Route/contact.route.js";

app.use("/api", contactRouter);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server is running on > http://localhost:${port}`)
);