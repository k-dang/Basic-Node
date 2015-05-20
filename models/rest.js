var mongoose = require('mongoose');

var testschema = new mongoose.Schema({
	first : String,
	last : String,
	username : String,
	password : String,
	created_at : Date
});

//create dates
testschema.pre('save', function(next){
	var currentDate = new Date();

	if(!this.created_at)
		this.created_at = currentDate;

	next();
});

var User = mongoose.model('User', testschema);

module.exports = User;