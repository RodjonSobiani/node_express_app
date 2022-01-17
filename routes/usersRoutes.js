const express = require('express');
const router = express.Router();

const users = require('../app/controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware, users.getAllUsers);
router.get('/user/:id', authMiddleware, users.getUser);
router.get('/me', authMiddleware, users.getMe);

module.exports = router;
