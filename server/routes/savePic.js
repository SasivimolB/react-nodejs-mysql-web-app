const router = require('express').Router();
const db = require('../connection/dbcon');
const picUpload = require('./pic');

router.post('/savePic', picUpload, (req, res) => {
    db.query(
        'UPDATE userinfo SET profilepic = ? WHERE username = ?',
        [profilepic, username],
        (err, result2) => {
            if(result2) {
                return res.send({status: true, message: "Save profile picture successfully"})
            }
            else {
                return res.send({status: false, message: "Failed to save profile picture"})
            }
        }
    )
})

module.exports = router;