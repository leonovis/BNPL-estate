require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bnplRoutes = require('./routes/bnplRoutes');

const app = express();

//connect the Mongo database
connectDB();

//middleware
app.use(express.json());

//Routes
app.use('api/auth', authRoutes);
app.use('api/bnpl', bnplRoutes);


// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

module.exports = app