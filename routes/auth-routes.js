const router = require('express').Router();
const passport = require('passport');


// @destination homePage
// route  GET/
router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

// @destination loginpage
// route GET/login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// @destination logout page
// route GET/logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logOut();
    // if user log out, redirect them to the homepage
    res.redirect('/');
});


// @destination google login page
// router  GET/google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
})
module.exports = router;