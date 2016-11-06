"use strict";

var mongoose 		= require('mongoose'),
	path 			= require('path'),
  	config 	 		= require(path.resolve('./config/env/dev')),
	Schema 			= mongoose.Schema;	
	
var PetSchema = new Schema({
	pet: {
		type: 'String'
	},
	cost: {
		type: 'String'	
	}
});

module.exports = mongoose.model('Pet', PetSchema);