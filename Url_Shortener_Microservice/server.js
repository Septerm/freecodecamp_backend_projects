require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Function connects to mongoDB database
connectDB();

//Middleware
app.use(express.urlencoded({ extended: false })); //Enables the usage of form data
app.use(express.static(path.join(__dirname, '/public'))); // Enables the usage of static files e.g stylesheets, images...etc


//Routes 
app.use('/', require('./routes/root')); //Default route index page the allows the uploading of urls 
app.use('/api', require('./routes/api/link')); // Api routes post [basedurl]/api/shorturl uploades url

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

