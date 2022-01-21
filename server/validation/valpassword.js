module.exports = {
    validatePassword: (req, res, next) => {

        //---PASSWORD---
        // password length >= 6
        if(!req.body.password || req.body.password.length < 6) {
            return res.send({
                message: 'Please enter a password with minimum 6 characters'
            });
        }
        // password does not contain consecutive alphabets or numbers
        var rep = /[a-zA-Z]{2,}|\d{2,}/g;
        if(!req.body.password || req.body.password.match(rep)) {
            return res.send({
                message: 'Please do not use consecutive alphabets and/or numbers in the password'
            });
        }

        next();
    }
}