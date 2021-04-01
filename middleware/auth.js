// check to see if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

const notLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    next();
}

module.exports = {
    isLoggedIn,
    notLoggedIn
}