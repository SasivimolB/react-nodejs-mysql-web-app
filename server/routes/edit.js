const router = require('express').Router();
const db = require('../connection/dbcon');
const validateUsername = require('../validation/valuname');
const validatePassword = require('../validation/valpw')
const validate = require('../validation/validate');
const bcrypt = require('bcrypt');

router.post('/edit', validate.validateUsernamePassword, (req, res) => {

    console.log("IN EDIT")

    const username = req.body.username;
    const oldUsername = req.body.oldUsername;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    db.query(
        'UPDATE userinfo SET firstname=?, lastname=? WHERE username=?',
        [firstname, lastname, oldUsername],
        (err, result) => {
            if(result) {
                console.log("UPDATED firstname, lastname");
                if(username != oldUsername) {
                    
                }
            }
            else {
                console.log("FAIL TO UPDATE firstname, lastname");
            }
        }
    )
});

module.exports = router;