// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // **Crucially, this should be before any routes**
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});