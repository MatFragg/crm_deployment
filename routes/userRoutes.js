const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/create-account', auth, userController.newUser);
router.post('/login', userController.authUser);
router.post('/change-password', userController.changePassword);

module.exports = router;