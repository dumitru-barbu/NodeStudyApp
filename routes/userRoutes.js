const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const userModel = require('../models/userModel');

router.post('/', userController.create);
router.get('/', passport.authenticate('jwt', {session: false}), userController.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), userController.getById);
router.put('/:id', passport.authenticate('jwt', {session: false}), userController.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), authController.authorizeRole(userModel.Role.ADMIN), userController.delete);
router.get('/current/profile', passport.authenticate('jwt', {session: false}), userController.getLoggedInUserProfile);

module.exports = router;
