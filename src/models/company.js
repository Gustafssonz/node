var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	email: String
});
// blir alltid s i slutet ändå i mongodb
module.exports = mongoose.model('companies', schema);
