const userModel = require('../models/userModel');

module.exports.create = async (req, res) => {
	let newUser = new userModel.User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	try {
		await userModel.save(newUser);
		res.status(201);
		res.json({ success: true, msg: 'User registered.' });
	} catch(err) {
		console.log(err);
		res.status(500).send('Failed to register user');
	}
};

module.exports.getAll = async (req, res) => {
	try {
		let users = await users.getAll();
		res.json(users);
	} catch(err) {
		console.log(err);
		res.status(500).send('Failed to retrieve users');
	}
};

module.exports.getById = async (req, res) => {
	try {
		let userId = req.params.id;
		let user = await userModel.getById(userId);
		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).send('Failed to retrieve user');
	}
};

module.exports.update = async (req, res) => {
	try {
		let user = {
			id: req.params.id,
			name: req.body.name,
			email: req.body.email,
			role: req.body.role
		};
		let updatedUser = await userModel.update(user);
		res.json(updatedUser);
	} catch (err) {
		console.log(err);
		res.status(500).send('Failed to update user');
	}
};

module.exports.delete = async (req, res) => {
	try {
		let userId = req.params.id;
		let user = await userModel.delete(userId);
		res.status(204);
		res.json({ success: true, msg: 'User deleted' });
	} catch (err) {
		console.log(err);
		res.status(500).send('Failed to update user');
	}
};

module.exports.getLoggedInUserProfile = (req, res) => {
	res.json({user: req.user});
};