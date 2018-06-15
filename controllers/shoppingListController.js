const shoppingListModel = require('../models/shoppingListModel');
const userModel = require('../models/userModel');

module.exports.getAll = async (req, res) => {
	let shoppingLists = await shoppingListModel.getAll();
	res.json(shoppingLists);
};

module.exports.save = async (req, res) => {
	let newShoppingList = {
		name: req.body.name,
		status: shoppingListModel.Status.ACTIVE
	}
	newShoppingList = await shoppingListModel.save(newShoppingList);

	res.json(newShoppingList);
};

module.exports.getById = async (req, res) => {
	let shoppingList = await shoppingListModel.getById(req.params.shoppingListId);
	res.json(shoppingList);
};

module.exports.addItem = async (req, res) => {
	let newShoppingListItem = {
		name: req.body.name
	};	
	newShoppingListItem = await shoppingListModel.addItem(req.params.shoppingListId, newShoppingListItem);

	res.json(newShoppingListItem);
};

module.exports.deleteItem = async (req, res) => {
	await shoppingListModel.deleteItem(req.params.shoppingListId, req.params.shoppingListItemId);

	res.statusCode(204).send('Deleted successfully.');
};