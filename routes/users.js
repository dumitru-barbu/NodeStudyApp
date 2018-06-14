const router = require('express').Router();
const passport = require('passport');
const usersController = require('../controllers/users');
const authorizationController = require('../controllers/auth');
const roles = require('../models/roles');

router.post('/', usersController.create);
router.get('/', passport.authenticate('jwt', {session: false}), usersController.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), usersController.getById);
router.put('/:id', passport.authenticate('jwt', {session: false}), usersController.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), authorizationController.authorizeRole(roles.ADMIN), usersController.delete);
router.get('/current/profile', passport.authenticate('jwt', {session: false}), usersController.getLoggedInUserProfile);

module.exports = router;
