const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Admin = require('../models/admin');
require("dotenv").config();


//LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email', passwordField: 'password', passReqToCallback : true},
    (req, email, password, done) => {
        Admin.findOne({ email: email }, (err, admin) => {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (admin == null) return done(null, false, { message: 'Incorrect Email'});
            bcrypt.compare(password, admin.password, (err, hashres) => {
                if(err) return console.log(err);
                if(hashres){
                    //accure pass
                    return done(null, admin);
                }else{
                    //wrong pass
                    return done(null, false, { message: 'Incorrect Password'});
                }
            });
        });
    }
));

// GoogleStrategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/users/auth/google/callback"
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
    callbackURL: "http://localhost:3000/users/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {

}
));