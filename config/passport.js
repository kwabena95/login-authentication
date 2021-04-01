const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    }, async (accessToken, refreshToken, profile, done) => {
        //passport callback function
        // create new user
        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        })


        try {
            // try to find the user by id.
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                //  if user exist, then return user
                done(null, user);
            } else {
                // else if user does not exist, then create new user
                user = await User.create(newUser)
                console.log(user)
            }
        }
        catch (err) {
            console.log(err);
        }

    }));

    // user.id is the id in mongo database not google id
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));


}
