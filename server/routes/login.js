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
                if(result.length < 1) {
                    return res.send({  message: "This username does not exist."});
                }
                else {
                    if(bcrypt.compareSync(password, result[0].password)) {
                        db.query(
                            'SELECT * FROM userinfo WHERE username = ?', [username],
                            (err, result) => {
                                console.log(result)
                                if(result.length>0)
                                {
                                    return res.send({ 
                                        status: true,
                                        user: result[0].username, 
                                        firstname: result[0].firstname,
                                        lastname: result[0].lastname,
                                        profilepic: result[0].profilepic
                                    })
                                }
                            }
                        )
                        
                    }
                    else {
                        //console.log("Wrong username and/or password.")
                        return res.send({ status: false, message: "Wrong username and/or password."})
                    }
                }
            }
        )
    }
});

module.exports = router;