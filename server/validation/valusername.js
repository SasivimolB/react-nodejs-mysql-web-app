module.exports = {
    validateUsername: (req, res, next) => {
        //console.log(req.body.username, req.body.password)
        //---USERNAME---
        // username length <= 12
        if(!req.body.username || req.body.username.length > 12) {
            return res.send({
                message: 'Please enter a username with maximum 12 characters'
            });

        }
        // username contains a-z A-z 0-9 _
        var reu = /^\w+$/;
        if(!req.body.username || !(req.body.username.match(reu))) {
            return res.send({
                message: 'Please use only alphabets(A-Z, a-z), numbers(0-9), and underscore(_) in the username'
            });
        }

        next();
    }
};