const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', usersController.createUser)

router.post('/verify-email', usersController.verifyEmail)

module.exports = router;
