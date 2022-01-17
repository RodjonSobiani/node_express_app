const express = require('express');

const router = express.Router();

const auth = require('../app/controllers/authController');

router.get('/signin', auth.signIn_get);
router.post('/signin', auth.signIn_post);

router.get('/signup', auth.signUp_get);
router.post('/signup', auth.signUp_post);

module.exports = router;
