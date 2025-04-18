// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB using Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

const getDB = () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.db;
    }
    throw new Error('Database not connected');
};

module.exports = { connectDB, getDB, mongoose }; // Export mongoose as well