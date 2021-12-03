const passport = require('passport');
require('dotenv').config();
const AuthService = require('../Services/authService');
const UserService = require('../Services/userService');

const AuthServiceInstance = new AuthService();
const UserServiceInstance = new UserService();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//takes id from postgres table and serializes it ready to pass to a cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserServiceInstance.get(id);
    done(null, user);
})

passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}, async (accessToken, refreshToken, data, done) => {
    //passport callback
    try {
        const user = await AuthServiceInstance.register(data);
        //done func (similar to next) is called inside passport.serializeUser above;
        done(null, user);
        
    } catch (err) {
        console.log(err);
    }
    
}));


//accessToken is what is generated when the user gives access by signing in with google
//refreshToken allows for new access tokens once they expire
//data is the profile data we get back in return for giving google our access token
//done is a function called when we are done with the callback above