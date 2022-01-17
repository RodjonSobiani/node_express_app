const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/app');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({message: 'Token not provided!'})
    }

    const token = authHeader.replace('Bearer: ', '');
    try {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // res.redirect('/signin');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: 'Invalid token.'});
        }
    }

    next();
}