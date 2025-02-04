const express = require('express');
const { userCreation, login } = require('../controllers/authControllers');
const { getUserInfo } = require('../controllers/userController');
const router = express.Router();
router.post('/signup', userCreation);
router.post('/login', login);
router.get('/users', getUserInfo);
module.exports = router;
