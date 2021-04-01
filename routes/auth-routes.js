const router = require('express').Router();

// @destination homePage
// route  GET/
router.get('/', (req, res) => {
    res.render('home');
});

// @destination loginpage
// route GET/login
router.get('/login', (req, res) => {
    res.render('login');
});

// @destination logout page
// route GET/logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('Logging out')
});


// @destination google login page
// router  GET/google
router.get('/google', (req, res) => {
    // handle with passport
    res.send('Loging in with Google');
});

module.exports = router;