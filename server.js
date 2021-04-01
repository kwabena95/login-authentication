// All dependencies
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-route');
const passportSetup = require('./config/passport');




// path to load config
dotenv.config({ path: './config.env' });

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
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

// router
app.use('/', authRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, console.log(`Running on port ${PORT}`));