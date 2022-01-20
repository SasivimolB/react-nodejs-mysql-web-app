const router = require('express').Router();
const db = require('../connection/dbcon');
const bcrypt = require('bcrypt');

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
                        // const token = jwt.sign({id: result[0].id}, process.env.TOKEN_SECRET);
                        // res.header('auth-token', token);
                        // res.send(token)
                        db.query(
                            'SELECT * FROM userinfo WHERE username = ?', [username],
                            (err, result2) => {
                                if(result2.length>0)
                                {
                                    res.status(200).send({ 
                                        user: username, 
                                        firstname: result2[0].firstname,
                                        lastname: result2[0].lastname,
                                        profilepic: result2[0].profilepic
                                    })
                                }
                            }
                        )
                        
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