const express = require('express');
const { userCreation, login } = require('../controllers/authControllers');
const router = express.Router();
router.post('/signup', userCreation);
router.post('/login', login);
module.exports = router;
