const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./config');

module.exports = function(passport) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.secretOrKey = config.passportSecret;

    passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
		try {
			let user = await User.getById(jwtPayload._id);
			
			if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
		} catch (err) {
			return done(err, false);
		}
    }));
};