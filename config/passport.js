const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
require("dotenv").config();


// GoogleStrategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://geographyapi.herokuapp.com/users/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile.emails[0].value }, (err, existingUser) => {
        if(err) return console.log(err);
        console.log("User exist: " + existingUser);
        if(existingUser){
            return done(null, existingUser);
        }else{
            const newUser = new User({
                name: displayName,
                email: profile.emails[0].value,
            });
            
            newUser.save((err, newUser) => {
                if (err) return console.error(err);
                console.log('User created: ' + newUser);
                done(null, newUser)
            });
        }
    });
}
));


// FacebookStrategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://geographyapi.herokuapp.com/users/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {

}
));