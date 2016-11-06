"use strict";

var mongoose 		= require('mongoose'),
	path 			= require('path'),
  	config 	 		= require(path.resolve('./config/env/dev')),
	Schema 			= mongoose.Schema;

/* Fix mongoose mpromise deprecation warning */
mongoose.Promise = global.Promise;

/* connection with mongoDB */
mongoose.createConnection(config.Pets.URL);		
	
var PetSchema = new Schema({
	pet: {
		type: 'String'
	},
	cost: {
		type: 'String'	
	}
});

module.exports = mongoose.model('Pet', PetSchema);