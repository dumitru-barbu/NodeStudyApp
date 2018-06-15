const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	participants: [{
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
	}],
	name: String,
	completedDate: Date,
	status: String,
	items: [ new mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		name: String
	})]
});

const ShoppingList = mongoose.model('shoppingList', ShoppingListSchema);

const status = {
	ACTIVE: 'ACTIVE',
	COMPLETED: 'COMPLETED'
}

module.exports.ShoppingList = ShoppingList;
module.exports.Status = status;