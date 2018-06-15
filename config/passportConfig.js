const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/userModel');
const config = require('./config');

module.exports = function(passport) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.secretOrKey = config.passportSecret;

    passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
		try {
			let user = await userModel.getById(jwtPayload._id);
			
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