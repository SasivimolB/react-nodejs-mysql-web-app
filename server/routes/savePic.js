const router = require('express').Router();
const db = require('../connection/dbcon');
const picUpload = require('./pic');

router.post('/savePic', picUpload, (req, res) => {
    db.query(
        'UPDATE userinfo SET profilepic = ? WHERE username = ?',
        [profilepic, username],
        (err, result2) => {
            if(result2) {
                res.status(200).send("Save profile pic successfully")
            }
            else {
                res.status(401).send("Can't save profile pic")
            }
        }
    )
})

module.exports = router;