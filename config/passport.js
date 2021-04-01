const googleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    }, (accessToken, refreshToken, profile, done) => {

        //passport callback function
        console.log(profile)
    }));


}
