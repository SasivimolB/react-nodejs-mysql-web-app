module.exports = {
    validateUsername: (req, res, next) => {
        //---USERNAME---
        // username length <= 12
        if(!req.body.username || req.body.username.length > 12) {
            return res.status(400).send({
                message: 'Please enter a username with maximum 12 characters'
            });

        }
        // username contains a-z A-z 0-9 _
        var reu = /^\w+$/;
        if(!req.body.username || !(req.body.username.match(reu))) {
            return res.status(400).send({
                message: 'Please use only alphabet characters(A-Z, a-z), numbers(0-9), and underscore(_) in the username'
            });
        }
        
        next();
    }
};