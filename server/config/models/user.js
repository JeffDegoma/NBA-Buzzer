const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	
	twitter: {
		id: String,
		accessToken: String,
		displayName: String,
		username: String,
		favorites: Array
	},

	google: {
		id: String,
		accessToken: String,
		email: String,
		name: String,
	}
});

module.exports = mongoose.model('User', userSchema);