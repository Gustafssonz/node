var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	startDate: String,
	endDate: String
});
// blir alltid s i slutet ändå i mongodb
module.exports = mongoose.model('courses', schema);
