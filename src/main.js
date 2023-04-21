const express = require('express');
const app = express();
const mysql = require('mysql2');
const passport = require('passport');
require('dotenv').config();
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const cors = require('cors');
const db = require('./utils/mysqlcon');
const bookRouter = require('./routes/bookroutes');
const checkRouter = require('./routes/checkroute');
const locRouter = require('./routes/locationsroute');
const LoginRouter = require('./routes/loginroute');
const LoginMiddleware = require('./utils/middleware');
const LoginDao = require('./daos/logindao');
const sessionStore = new MySQLStore({ } , db.promise());
const LocalStrategy = require('passport-local').Strategy;


app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));


//user session 
app.use(expressSession({
    store: sessionStore, 
    secret: 'BMW&MERCEDES', 
    resave: false, 
    saveUninitialized: false,
    rolling: true,
    unset: 'destroy', 
    proxy: true, 
    cookie: { 
        maxAge: 600000, 
        httpOnly: false 
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/paslogin',

    passport.authenticate('local'), 

    (req, res) => {
        res.json(req.user); 
    }
);

passport.use(new LocalStrategy(async(username, password, done)=> {
    const loginDao = new LoginDao(db, 'acc_users');
    try {
        const userDetails = await loginDao.FindLoginDetails(username, password);

        if(userDetails === null) {
            return done(null, false);
        } else {
            return done(null, userDetails);
        }
    } catch(e) {
        return done(e);
    }
}));


passport.serializeUser((userDetails, done) => {
    done(null, userDetails.ID);
});

passport.deserializeUser(async(userid, done) => {
    try {
        const loginDao = new LoginDao(db, 'acc_users');
        const details = await loginDao.FindLoginById(userid);
        done(null, details);
    } catch(e) {
        done(e);
    }
});



app.get('/paslogin', (req,res)=>{
	if (!req.user) return res.status(401).json({error: "You must be logged in!"})
    res.json(req.user)
})


app.get('/badlogin', (req, res) => {
    res.status(401).json({error: "The login was invalid"});
});

passport.authenticate('local', { failureRedirect: '/badlogin' } )
app.use('/login', LoginRouter);

app.use(LoginMiddleware);

//routes
app.use('/book', bookRouter);
app.use('/placesToStay', locRouter);
app.use('/check', checkRouter);


//listen on port 3000
app.listen(5000);
