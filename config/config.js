module.exports = {
	database: 'mongodb://localhost:27017/nodestudy',
	passportSecret: 'secret',
	passwordHashSaltIterations: 10,
	tokenExpireTimeInSeconds: 604800, //1 week in seconds
	passwordResetTokenExpireTimeInMiniseconds: 86400000, //1 day
	resetPAsswordTokenLength: 25,
	mailUser: 'testEmailAddress',
	mailPassword: 'testPassword'
}
