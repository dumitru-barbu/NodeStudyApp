const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/authenticate', authController.authenticate);
router.post('/forgotPassword', authController.sendPasswordReset);
router.post('/resetPassword/:token', authController.resetPassword);

module.exports = router;