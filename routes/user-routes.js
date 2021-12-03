const express = require('express');

const userRouter = express.Router();

const logUser = (req, res, next) => {
    console.log(req.session);
    next();
}

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
}

userRouter.use(express.static('public'))

userRouter.get('/', logUser, authCheck, (req, res, next) => {
    res.render('profile', req.user);
})

module.exports = userRouter;