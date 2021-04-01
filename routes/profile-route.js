const router = require('express').Router();
const authCheck = require('../middleware/auth');


router.get('/', authCheck, (req, res) => {
    res.send(`You are logged in. This is your profile ${req.user.firstName}`);
});

module.exports = router;