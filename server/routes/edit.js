const router = require('express').Router();
const db = require('../connection/dbcon');
const validateU = require('../validation/valusername');
const validateP = require('../validation/valpassword');
const bcrypt = require('bcrypt');

router.post('/edit-username', validateU.validateUsername, (req, res) => {

    const username = req.body.username;
    const oldUsername = req.body.oldUsername;

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
                            db.query(
                                'UPDATE userinfo SET username=? WHERE username=?',
                                [username, oldUsername],
                                (err, result) => {
                                    if(result) {
                                        console.log('UPDATED username in USERINFO')
                                        res.send({status: true, message:"Updated username"})
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
});

router.post('/edit-password', validateP.validatePassword, (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    //New password
    let flag = true;
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
                                    res.send({status: true, message:"Updated password"})
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
})

router.post('/edit-firstname', (req, res) => {

    const username = req.body.username;
    const firstname = req.body.firstname;

    db.query(
        'UPDATE userinfo SET firstname=?, WHERE username=?', [firstname],
        (err, result) => {
            if(result) {
                res.send({status: true, message:"Updated first name"})
            }
        }
    )
    
})

router.post('/edit-lastname', (req, res) => {

    const username = req.body.username;
    const lastname = req.body.lastname;

    db.query(
        'UPDATE userinfo SET lastname=? WHERE username=?',[lastname],
        (err, result) => {
            if(result) {
                res.send({status: true, message:"Updated last name"})
            }
        }
    )

})

module.exports = router;