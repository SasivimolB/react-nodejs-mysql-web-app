const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: 'root',
    database: 'try1'
})

db.connect(function(err){
    if(err) throw err;
    console.log("Connected.");
})