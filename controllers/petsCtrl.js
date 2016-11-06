'use strict';
var path = require('path'),
	config = require(path.resolve('./config/env/dev')),
	Pet = require(path.resolve('./models/Pet'));

/* Get all the pets from pet DB */
exports.getAllPets = function(req, res, next) {
	Pet.find({}, function(err, result){
		if(err){
			next(err);
		}
		console.log(result);
	});
};	