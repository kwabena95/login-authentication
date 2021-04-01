// All dependencies
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport');



// path to load config
dotenv.config({ path: './config/config.env' });

// passport config
passportSetup(passport);

// connecting to database
connectDB();
const app = express();

const PORT = process.env.PORT || 3001;


// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// passport
app.use(passport.initialize());
// app.use(passport.session());

// router
app.use('/', authRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, console.log(`Running on port ${PORT}`));