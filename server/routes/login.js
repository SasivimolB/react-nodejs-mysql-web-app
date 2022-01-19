const router = require('express').Router();
const db = require('../connection/dbcon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
        db.query(
            'SELECT * FROM userpw WHERE username = ? ORDER BY pwid DESC LIMIT 1',
            [username],
            (err, result) => {
                if(result.length<1) {
                    //console.log("This username does not exist.")
                    res.status(401).send({  message: "This username does not exist."});
                }
                else {
                    if(bcrypt.compareSync(password, result[0].password)) {
                        //console.log("Logged in.")
                        const token = jwt.sign({id: result[0].id}, process.env.TOKEN_SECRET);
                        res.header('auth-token', token);
                        //res.send(token)
                        return res.status(200).send({ message: "Login Successful."})
                    }
                    else {
                        //console.log("Wrong username and/or password.")
                        res.status(401).send({ message: "Wrong username and/or password."})
                    }
                }
            }
        )
    }
});

module.exports = router;