const localStrategy = require('passport-local').Strategy;

module.exports = passport => {
    passport.use(new localStrategy((email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            // check for error 
            if (err) return done(err);

            // If user is not found return message
            if (!user) {
                return done(null, false, { message: 'Incorrect email' });
            }

            bcrypt.compare(password, user.password, (err, res) => {
                // check for error 
                if (err) return done(err);   // check for error 

                // if response id false, display message
                if (res === false) return done(null, false, { message: 'Incorrect password' });

                // If response is true, return user
                return done(null, user);
            })
        })
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        user, findById(id, (err, user) => done(err, user));
    });

};
