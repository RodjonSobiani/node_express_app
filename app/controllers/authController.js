const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// Const bcrypt = require('bcrypt');

const {jwtSecret} = require('../../config/app');
// Const {validationResult} = require("express-validator");

const User = mongoose.model('User');

// Обработчик ошибок
const handleErrors = err => {
	console.log(err.message, err.code);
	const errors = {login: '', password: ''};

	if (err.message === 'Неправильный логин.') {
		errors.login = 'Пользователя с таким логином не существует.';
	}

	if (err.message === 'Неправильный пароль.') {
		errors.password = 'Неправильный пароль.';
	}

	// Проверка на совпадения
	if (err.code === 11000) {
		errors.login = 'Такой логин уже занят.';
		return errors;
	}

	// Ошибки валидации
	if (err.message.includes('User validation failed: ')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = id => jwt.sign({id}, jwtSecret, {
	expiresIn: maxAge,
});

const signUp_get = (req, res) => {
	res.render('signup');
};

const signUp_post = async (req, res) => {
	const {login, password} = req.body;

	try {
		const user = await User.create({login, password});
		const token = createToken(user._id);
		res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
		res.status(201).json({message: 'Пользователь создан', id: user._id, login: user.login});
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({errors});
	}
};

const signIn_get = (req, res) => {
	res.render('signin');
};

const signIn_post = async (req, res) => {
	const {login, password} = req.body;

	try {
		const user = await User.signin(login, password);
		const token = createToken(user._id);
		res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
		res.status(200).json({user: user._id, bearer: token});
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({errors});
	}
};

module.exports = {
	signUp_get,
	signUp_post,
	signIn_get,
	signIn_post,
};
