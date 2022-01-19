const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

//Import Routes
const regisRoute = require('./routes/regis');
const loginRoute = require('./routes/login');

//Connect to DB
const db = require('./connection/dbcon');
db.connect( (err) => {
    if (err) { return console.error('error: ' + err.message); }
    console.log('Connected to the MySQL server.');
})

//Middleware
app.use(cors());
app.use(express.json());
//Route Middlewares
app.use('/api/user', regisRoute);
app.use('/api/user', loginRoute);



app.listen(3001, () => console.log('Server is up and running...'));