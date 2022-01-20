const router = require('express').Router();
const db = require('../connection/dbcon');
const picUpload = require('./pic');

router.post('/savePic', picUpload, (req, res) => {

    const profilepic = req.file.filename
    const username = req.body.username

    db.query(
        'UPDATE userinfo SET profilepic = ? WHERE username = ?',
        [profilepic, username],
        (err, result2) => {
            if(result2) {
                return res.send({status: true, filename:profilepic, message: "Save profile picture successfully"})
            }
            else {
                return res.send({status: false, message: "Failed to save profile picture"})
            }
        }
    )
})

module.exports = router;