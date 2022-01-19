const router = require('express').Router();
const db = require('../connection/dbcon');
const validate = require('../validation/valRegister');
const picUpload = require('./pic');
const bcrypt = require('bcrypt');

router.post('/register', picUpload, validate.validateRegister, (req, res) => {
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
                                                        res.send({message: "Failed to register."});
                                                    }
                                                    else {
                                                        //console.log("Password Inserted");
                                                        res.send({message: "Registered successfully."});
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