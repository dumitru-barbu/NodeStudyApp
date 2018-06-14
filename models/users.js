const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const roles = require('./roles');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
	},
	passwordResetToken: {
		type: String,
		required: false
	},
	passwordResetExpireDate: {
		type: Date,
		required: false
	},
	role: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', async function(next) {
	let user = this;
	if (!user.isModified('password')) return next();
	if (!user.role) {
		user.role = roles.USER;
	}

	try {
		let salt = await bcrypt.genSalt(config.passwordHashSaltIterations);
		let hash = await bcrypt.hash(user.password, salt);

		user.password = hash;
		next();
	} catch (err) {
		next(err);
	}
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;

module.exports.getById = async (id, callback) => {
    return await User.findById(id, callback);
}

module.exports.getByUsername = async (username) => {
    const query = {username: username};
	return await User.findOne(query);
}

module.exports.getByEmail = async (email) => {
    const query = {email: email};
	return await User.findOne(query);
}

module.exports.getByPasswordResetToken = async (token) => {
	return await User.findOne({ passwordResetToken: token, passwordResetExpireDate: { $gt: Date.now() } });
}
module.exports.save = async(newUser) => {
	return await newUser.save();
}

module.exports.getAll = async () => {
	return await User.find({}).exec();
}

module.exports.update = async (user) => {
	let updatedUser = await User.findByIdAndUpdate({ _id: user.id }, { $set: 
		{ 
			name: user.name, 
			email: user.email, 
			username: user.username,
			role: user.role
		}}, { upsert: true }).exec();

	return updatedUser;
}

module.exports.delete = async (userId) => {
	await User.remove({_id: userId});
}

module.exports.comparePassword = async (password, hash) => {
	let isMatch = await bcrypt.compare(password, hash);

	return isMatch;
}