"use strict";

var mongoose 		= require('mongoose'),
	path 			= require('path'),
  	config 	 		= require(path.resolve('./config/env/dev')),
	db 				= require(path.resolve('./config/database'));	
	
var PetSchema = new mongoose.Schema({
	pet: {
		type: 'String'
	},
	cost: {
		type: 'String'	
	}
});

// To check if pets are in DB or not
PetSchema.statics.dump = function(cb){
	var Pet = this;
	Pet.find({}, function(err, result){
		if(err){
			cb(err, null);
		}
		if(typeof result === 'object' && isEmpty(result)){
			var pets = [{
				pet: 'cat',
				cost: '40'
			},{
				pet: 'bird',
				cost: '100'
			},{
				pet: 'dog',
				cost: '50'
			},{
				pet: 'fish',
				cost: '90'
			}];
			Pet.insertMany(pets, cb);
		} else {
			cb(null, result);
		}
	});
};

// To check if object is empty or not
function isEmpty(obj) {
	var hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj === null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

module.exports = db.Pet.model('Pet', PetSchema);