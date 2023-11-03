const express = require('express');
const app = express();
const path = require('path');



// Middleware for using static files images, stylesheets...etc
app.use(express.static(path.join(__dirname, '/public')));

//Routes
app.use('/', require('./routes/root'))
app.use('/api', require('./routes/api/whoami'))



//Server running on localhost:3500
app.listen(3500)