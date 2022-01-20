const router = require('express').Router();
const db = require('../connection/dbcon');
const validateUsername = require('../validation/valuname');
const validatePassword = require('../validation/valpw')
const picUpload = require('./pic');
const bcrypt = require('bcrypt');

router.post('/register', picUpload, picUpload, validateUsername.validateUsername, validatePassword.validatePassword, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const profilepic = req.file.filename;
    
    db.query(
        'SELECT id FROM userinfo WHERE username = ?', [username],
        (err, result) => {
            if(result.length) {
                res.send({message: "The username is already exists."});
            }
            else {
                db.query(
                    'INSERT INTO userinfo(username, firstname, lastname, profilepic) VALUES (?, ?, ?, ?)',
                    [username, firstname, lastname, profilepic], 
                    (err, result1) => {
                        if(err) { console.log(err); }
                        else {
                            //console.log("Values Inserted");
                            db.query(
                                'SELECT id FROM userinfo WHERE username = ?', [username],
                                (err, result2) => {
                                    if(result2.length) {
                                        bcrypt.hash(password, 10, function(err, hash) {
                                            db.query(
                                                'INSERT INTO userpw(id, username, password) VALUES( ?, ?, ?)',
                                                [result2[0].id, username, hash],
                                                (err, result) => {
                                                    if(err) {
                                                        console.log(err);
                                                        res.status(400).send({message: "Failed to register."});
                                                    }
                                                    else {
                                                        //console.log("Password Inserted");
                                                        res.status(200).send({message: "Registered successfully."});
                                                    }
                                                }
                                            );
                                        })
                                    }
                                }
                            )
                        }
                    }
                );
            }
        }
    )
});

module.exports = router;