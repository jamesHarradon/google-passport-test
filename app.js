const express = require('express');
const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-routes');
const passportSetup = require('./config/passport-config');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();



const app = express();

//set up view engine
app.set('view engine', 'ejs');

//uses public folder for css
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



//session set up
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true
    }
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//use routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

//home route
app.get('/', (req, res) => {
    res.render('home');
})

app.use((err, req, res, next) => {
    const {message, status} = err;
    res.status(status || 500).send(message);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});