const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);