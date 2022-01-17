const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Добро пожаловать в API.');
});

module.exports = router;