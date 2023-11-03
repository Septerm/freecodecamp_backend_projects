const express  = require('express');
const app = express();
const path = require('path');

// Middleware for loading static files e.g stylesheets , image files .. etc
app.use(express.static(path.join(__dirname, '/public')));

//Routes 
app.use('/', require('./routes/root'))
app.use('/api', require('./routes/api/date'))


//Server Runs on Port localhost:3500
app.listen(3500)