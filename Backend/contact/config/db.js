import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToDatabase;
// This function connects to the MongoDB database using Mongoose.
// It reads the connection URI and database name from environment variables.