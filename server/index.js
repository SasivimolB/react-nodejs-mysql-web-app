const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

//Import Routes
const regisRoute = require('./routes/regis');
const loginRoute = require('./routes/login');
const editRoute = require('./routes/edit');
const savePicRoute = require('./routes/savePic');

//Connect to DB
const db = require('./connection/dbcon');
db.connect( (err) => {
    if (err) { return console.error('error: ' + err.message); }
    console.log('Connected to the MySQL server.');
})

//Middleware
app.use(cors());
app.use(express.json());

app.use(express.static('public/images')); 

//Route Middlewares
app.use('/api/user', regisRoute);
app.use('/api/user', loginRoute);
app.use('/api/user', editRoute);
app.use('/api/user', savePicRoute);


app.listen(3001, () => console.log('Server is up and running...'));