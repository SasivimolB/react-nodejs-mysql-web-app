const router = require('express').Router();
const db = require('../connection/dbcon');
const validateU = require('../validation/valusername');
const validateP = require('../validation/valpassword');
const bcrypt = require('bcrypt');

router.post('/register', validateU.validateUsername, validateP.validatePassword, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    
    db.query(
        'SELECT * FROM userinfo WHERE username = ?', [username],
        (err, result) => {
            if(result.length) {
                return res.send({status: false, message: "The username is already exists."});
            }
            else {
                db.query(
                    'INSERT INTO userinfo(username, firstname, lastname) VALUES (?, ?, ?)',
                    [username, firstname, lastname], 
                    (err, result) => {
                        if(result) { 
                            bcrypt.hash(password, 10, function(err, hash) {
                                db.query(
                                    'INSERT INTO userpw(username, password) VALUES( ?, ?)',
                                    [ username, hash],
                                    (err, result) => {
                                        if(result) {
                                            return res.send({status: true, message: "Registered Successfully."});
                                        }
                                    }
                                );
                            })
                        }
                    }
                );
            }
        }
    )
});

module.exports = router;