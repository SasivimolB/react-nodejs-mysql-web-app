const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../profilepics/', 'uploads'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

const upload = multer({ storage: storage }).single('profilepic');

module.exports = upload;