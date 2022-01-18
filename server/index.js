const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const multer = require('multer')
const path = require('path');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: 'root',
    database: 'webappdb'
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, './public_html/', 'uploads'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

const upload = multer({ storage: storage}).single('profilepic');

app.post('/regis', upload, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const profilepic = req.file.filename;
    
    db.query(
        'SELECT id FROM userinfo WHERE username = ?',
        [username],
        (err, result) => {
            console.log(result);
            if(result.length) {
                console.log("The username is already exists.");
            }
            else {
                console.log("Proceed to info. insertion...")
                db.query(
                    'INSERT INTO userinfo(username, firstname, lastname, profilepic) VALUES (?, ?, ?, ?)',
                    [username, firstname, lastname, profilepic], 
                    (err, result) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log("Values Inserted");
                        }
                    }
                );

                bcrypt.hash(password, 10, function(err, hash) {
                    db.query(
                        'INSERT INTO userpw(username, password) VALUES( ?, ?)',
                        [username, hash],
                        (err, res) => {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                console.log("Password Inserted");
                            }
                        }
                    );
                })
            }
        }
    )
})

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
        console.log(username);
        db.query(
            'SELECT id, password FROM userpw WHERE username = ? ORDER BY id DESC LIMIT 1',
            [username],
            (err, res) => {
                if(err) {
                    console.log(err);
                }
                else {
                    //console.log(res[1].password)
                    if(bcrypt.compareSync(password, res[1].password)) {
                        console.log("matching")
                        const token = jwt.sign({
                            userId: result[0].id
                            },
                            'SECRETKEY', {
                            expiresIn: '180000'
                            }
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    else {
                        console.log("not match")
                    }
                }
            }
        )
    }
});

app.post('/edit-profile', upload, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const profilepic = req.file.filename;
})

app.listen(3001, () => {
    console.log("Server is running...");
})
