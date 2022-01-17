const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: 'root',
    database: 'try1'
})

app.post('/regis', (req, res) => {
    console.log(req.body.username);
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash) {
        db.query(
            'INSERT INTO users(username, password) VALUES (?, ?)',
            [username, hash], 
            (err, result) => {
                if(err) {
                    console.log(err);
                }
                else {
                    res.send("Values Inserted");
                }
            }
        );
    });    
})

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
        console.log(username);
        db.query(
            'SELECT password FROM users WHERE username = ? ORDER BY id DESC LIMIT 1',
            [username],
            (err, res) => {
                if(err) {
                    console.log(err);
                }
                else {
                    //console.log(res[0].password)
                    if(bcrypt.compareSync(password, res[0].password)) {
                        console.log("matching")
                    }
                    else {
                        console.log("not match")
                    }
                }
            }
        )
    }
});

app.listen(3001, () => {
    console.log("Server is running...");
})
