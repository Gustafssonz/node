var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	email: String
});

module.exports = mongoose.model('companies', schema);