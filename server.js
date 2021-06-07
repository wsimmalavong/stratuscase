const express = require('express');
var cors = require('cors')
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors())

app.use(express.urlencoded({ extended: true }))

const comicRoute = require('./routes/comic');

app.set('view engine', 'ejs');

app.use('/', comicRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));