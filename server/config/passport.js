var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require("../models/User");
const passportJs = async (passport) => {
    passport.use(new GoogleStrategy({
        clientID: "789002304968-g3nim07om0fiv04hpq6n0qa0jrpoaajc.apps.googleusercontent.com",
        clientSecret: "cPOxnO9FoW8TG396selUQHGa",
        callbackURL: "/api/auth/redirect",
        //   passReqToCallback: true
    },
        (request, accessToken, refreshToken, profile, done) => {

            User.findOne({ googleID: profile.id }, function (err, user) {
                if (err) {

                    return done(err, false)
                }

                if (user) {

                    return done(err, user);
                }

                else {
                    console.log("newUser")
                    new User({
                        username: profile.displayName,
                        googleID: profile.id,
                        image: profile._json.picture
                    }).save()
                        .then(newUser => {
                            return done(err, newUser);
                        })
                        .catch(err => {
                            return done(err, false)
                        })

                }
            });
        }
    ));


    passport.serializeUser((user, done) => {
        console.log("SerializeUser")

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("DeserializeUser")
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
module.exports = passportJs