const router = require('express').Router();
const db = require('../connection/dbcon');
const validate = require('../validation/validate');
const bcrypt = require('bcrypt');

router.post('/edit', validate.validateUsernamePassword, (req, res) => {

    //console.log("IN EDIT")

    const username = req.body.username;
    const oldUsername = req.body.oldUsername;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    //Firstname, Lastname
    db.query(
        'UPDATE userinfo SET firstname=?, lastname=? WHERE username=?',
        [firstname, lastname, oldUsername],
        (err, result) => {
            if(result) {
                console.log("UPDATED firstname, lastname");
            }
        }
    )

    //New password
    let flag = true;
    if(password != 'N0P4S5W0R0') {
        //console.log('NEW PASSWORD')
        db.query(
            'SELECT * FROM userpw WHERE username=? ORDER BY pwid DESC LIMIT 5', [username],
            (err, result) => {
                if(result) {
                    for(let i=0; i<result.length; i++) {
                        if(bcrypt.compareSync(password, result[i].password)) {
                            flag = false;
                            break;
                        }
                    }
                    if(flag == true) {
                        console.log('PASSWORD is not the same with previous 5 passwords')
                        console.log(username, password)
                        bcrypt.hash(password, 10, function(err, hash) {
                            db.query(
                                'INSERT INTO userpw(username, password) VALUES (?, ?)',
                                [username, hash],
                                (err, result) => {
                                    if(result) {
                                        console.log('INSERTED PASSWORD ')
                                    }
                                }
                            )
                        })
                    }
                    else {
                        console.log("PASSWORD is the same with previous 5 passwords");
                        console.log(username, password)
                        return res.send({status: false, message:"The password is the same with previous 5 passwords"});
                    }
                }
            }
        )
    }
    else{
        //console.log('OLD PASSWORD')
    }

    //New username
    if(username != oldUsername) {
        //console.log("NEW USERNAME")
        db.query(
            'SELECT id FROM userinfo WHERE username = ?', [username],
            (err, result) => {
                if(result.length) {
                    return res.send({status: false, message: "The username is already exists."});
                }
                else {
                    db.query(
                        'UPDATE userpw SET username=? WHERE username=?',
                        [username, oldUsername],
                        (err, result) => {
                            if(result) {
                                console.log('UPDATED username in USERPW')
                            }
                        }
                    )
                    db.query(
                        'UPDATE userinfo SET username=? WHERE username=?',
                        [username, oldUsername],
                        (err, result) => {
                            if(result) {
                                console.log('UPDATED username in USERINFO')
                            }
                        }
                    )
                }
            }
        )
    }
    else{
        //console.log('OLD USERNAME')
    }
});

module.exports = router;