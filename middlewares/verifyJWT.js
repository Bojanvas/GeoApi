const jwt = require('jsonwebtoken');

var verifyJWT = {

    /* Token verification middleware */
    verifyToken(req, res, next){
        //Get auth header value
        const token = req.headers['JWT'];
        //Check if authHeader is undefined
        if(typeof token !== 'undefined'){
        //Set the token and do the verification
        jwt.verify(token, process.env.JWT_KEY, (err, authData) => {
            if(err){
            //Wrong token
            res.sendStatus(403);
            }else{
            req.authData;
            //Next middleware
            next();
            }
        });
        }else{
        //Forbidden
        res.sendStatus(403);
        }
    }

};


module.exports = verifyJWT