const router = require('express').Router();
const db = require('../connection/dbcon');
const verifyToken = require('./verifyToken');

router.post('/dashboard', verifyToken, (req, res)=> {
})

module.exports = router;