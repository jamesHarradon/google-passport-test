const express = require('express');
const passport = require('passport');
const db = require('../db');
const AuthService = require('../Services/authService');

const AuthServiceInstance = new AuthService();

const authRouter = express.Router();

authRouter.use(express.static('public'));

//to delete
const logUser = (req, res, next) => {
    console.log(req.session);
    next()
}

// auth login
authRouter.get('/login', (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        next(err)
    }
    
});

// auth logout
authRouter.get('/logout', (req, res, next) => {
    //handle with passport
    try {
        req.logout();
        res.render('logout');
    } catch (err) {
        next(err);
    }
})

// auth with google
// user signs in so that our app can then obtain access token
// scope is the data we want to obtain, in this case profile is basic user data such as full name, google id, and img urls.
authRouter.get('/google', passport.authenticate('google', { scope: ['profile']}));

// google redirect route - access token now in URL
// passport uses code to exchange for profile info with google
authRouter.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login'}), logUser, (req, res, next) => {
    try { 
        //res.render('profile', req.user);
        res.redirect('/user')
    } catch (err) {
        next(err); 
    }
});






module.exports = authRouter;

