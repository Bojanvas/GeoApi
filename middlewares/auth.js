const jwt = require('jsonwebtoken');

var auth = {

    /* Token verification middleware */
    verifyToken(req, res, next){
        //Get auth header value
        const token = req.headers['jwt'];
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
    },

    /* Token verification middleware (ADMIN) */
    verifyTokenAdmin(req, res, next){
        //Get auth header value
        const token = req.headers['jwt'];
        //Check if authHeader is undefined
        if(typeof token !== 'undefined'){
        //Set the token and do the verification
        jwt.verify(token, process.env.JWT_KEY_ADMIN, (err, authData) => {
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


module.exports = auth