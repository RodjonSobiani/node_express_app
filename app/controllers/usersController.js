const mongoose = require('mongoose');

const User = mongoose.model('User');

const getAllUsers = async (req, res) => {
    User.find()
        .exec()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
};

const getMe = async function(req, res) {
    res.send(user);
}

module.exports = {
    getAllUsers,
    getUser,
    getMe
};