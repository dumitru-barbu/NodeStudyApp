const crypto = require('crypto');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mailController = require('./mail');

module.exports.authenticate = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	try {
		let user = await users.getByUsername(username);
		if (!user) {
			return res.status(401).send('Invalid credentials.');
		}
		
		let isMatch = await users.comparePassword(password, user.password);
		if (isMatch) {
			const token = jwt.sign(user.toJSON(), config.passportSecret, {
				expiresIn: config.tokenExpireTimeInSeconds
			});
			res.json({
				success: true,
				token: 'JWT ' + token,
				user: {
					id: user._id,
					name: user.name,
					username: user.username,
					email: user.email
				}
			});
		} else {
			return res.status(401).send('Invalid credentials.');
		}
	} catch(err) {
		console.log(err);
		res.status(500).send('Failed to authenticate user');
	}
};

module.exports.sendPasswordReset = async (req, res) => {
	try {
		let token = await crypto.randomBytes(config.resetPAsswordTokenLength).toString('hex');
		
		const username = req.body.username;
		let user = await users.getByUsername(username);
		if (!user) {
			return res.status(400).send('Invalid email');
		}
		user.passwordResetToken = token;
		user.passwordResetExpireDate = Date.now() + config.passwordResetTokenExpireTimeInMiniseconds;
		await users.save(user);

		var mailOptions = {
			to: user.email,
			from: 'noreply@nodestudyapp.com',
			subject: 'Node.js Password Reset',
			text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			'http://' + req.headers.host + '/resetPassword/' + token + '\n\n' +
			'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		};
		await mailController.send(mailOptions);
		res.json({ success: true, msg: 'An email containing password reset instructions has been sent.' });
	} catch (err) {
		console.log(err);
		res.status(500).send('Error when trying to reset your password');
	}	
};

module.exports.resetPassword = async (req, res) => {
	try {
		let user = await users.getByPasswordResetToken(req.params.token);

		if (!user) {
			res.status(401).send('Unauthorized password reset attempt.');
		}
	
		user.password = req.body.password;
		user.passwordResetToken = undefined;
		user.passwordResetExpireDate = undefined;

		user = await users.save(user);

		var mailOptions = {
			to: user.email,
			from: 'passwordreset@demo.com',
			subject: 'Your password has been changed',
			text: 'Hello,\n\n This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
		};
		await mailController.send(mailOptions);
		res.json({ success: true, msg: 'Your password has been changed.' });
	} catch (err) {
		res.status(500).send('Error when trying to reset your password');
	} 
}

module.exports.authorizeRole = (requiredRole) => {

	return (req, res, next) => {
		let currentUserRole = req.user.role;
		if (currentUserRole == requiredRole) {
			next();
		} else {
			res.status(403).send('Unauthorized');
		}
	};
}