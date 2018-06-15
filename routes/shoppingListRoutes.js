const router = require('express').Router();
const shoppingListController = require('../controllers/shoppingListController');

router.get('/', shoppingListController.getAll);
router.post('/', shoppingListController.save);
router.get('/:shoppingListId', shoppingListController.getbyId);
router.post('/:shoppingListId/shoppingListItem', shoppingListController.addItem);
router.delete('/:shoppingListId/shoppingListItem/:shoppingListItemId', shoppingListController.deleteItem);
router.post('/:shoppingListId/participant/:participantId', shoppingListController.addParticipant);
router.delete('/:shoppingListId/participant/:participantId', shoppingListController.deleteParticipant);
router.post('/:shoppingListId/complete', shoppingListController.completeAndCreateNew);

module.exports = router;