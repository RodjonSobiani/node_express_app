const mongoose = require('mongoose');
// Const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	login: {
		type: String,
		required: [true, 'Пожалуйста, введите логин.'],
		unique: true,
		lowercase: true,
		// Validate: [isEmail, 'Пожалуйста, введите корректный адрес электронной почты.']
	},
	password: {
		type: String,
		required: [true, 'Пожалуйста, введите пароль.'],
		minlength: [5, 'Минимальная длина пароля составляет 5 символов.'],
	},
});

UserSchema.post('save', (doc, next) => {
	console.log('New user was created and saved', doc);
	next();
});

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.statics.signin = async function (login, password) {
	const user = await this.findOne({login});
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}

		throw Error('Неправильный пароль.');
	}

	throw Error('Неправильный логин.');
};

mongoose.model('User', UserSchema);
