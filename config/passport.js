const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const user = mongoose.model('user');
const securityKey = require('../config/security').jtwSecret;

const opt = {};

opt.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = securityKey;


module.exports = passport => {
    passport.use(new jwtStrategy(opt, (jwtPayload, done) => {

        user.findById(jwtPayload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(error => {
                console.log(error);
            })

    }));
};