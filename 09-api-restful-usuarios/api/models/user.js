const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: String,
	email: String,
	password: String,
	role: String,
	img: String,
	status: Boolean,
	google: Boolean
});

module.exports = mongoose.model('User', UserSchema);