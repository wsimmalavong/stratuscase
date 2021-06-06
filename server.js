const express = require('express');
var cors = require('cors')
const app = express();


app.use(cors())
app.use(express.static(__dirname + '/public'));
// Middleware
app.use(express.urlencoded({ extended: true }))

// Import Route
const weatherRoute = require('./routes/weather');

// Use View Engine
app.set('view engine', 'ejs');

// Middleware route
app.use('/', weatherRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));