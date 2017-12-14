var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String
});

module.exports = mongoose.model('students', schema);