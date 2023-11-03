//Required dependencies
const express = require('express');
const path = require('path');
const app = express();

//Middleware
app.use(express.static(path.join(__dirname, '/public')));


//Routes 
app.use('/', require('./routes/root'))
app.use('/api', require('./routes/api/upload'))

app.listen(3500, () => console.log(`Server running on port 3500`))
