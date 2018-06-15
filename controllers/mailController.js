const nodemailer = require('nodemailer');
const config = require('../config/config');

module.exports.send = async (options) => {
	let smtpTransport = nodemailer.createTransport({
		service: config.mailService,
		auth: {
			user: config.mailUser,
			pass: config.mailPassword
		}
	});

	let mailOptions = {
		to: options.to,
		from: options.from || 'noreply@nodestudyapp.com',
		subject: options.subject || 'NodeStudyApp',
		text: options.text
	};

	return await smtpTransport.sendMail(mailOptions);
}