const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.post('/signup', usersController.createUser);

router.patch('/verify-email', usersController.verifyEmail);

router.post('/login', usersController.login);


module.exports = router;
