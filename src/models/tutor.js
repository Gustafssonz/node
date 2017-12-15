var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String
});
// blir alltid s i slutet ändå i mongodb
module.exports = mongoose.model('tutors', schema);
