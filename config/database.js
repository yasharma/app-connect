'use strict';

var mongoose    = require('mongoose'),
	path        = require('path'),
	configs 	= require(path.resolve('./config/env/dev'));

/*
* Connect with the mongodb database and set mongoose debug Level
* @ https://www.npmjs.com/package/mongoose
*/
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection(configs.Users.URL);
var conn1 = mongoose.createConnection(configs.Pets.URL);

// Set the mongoose debug level
mongoose.set('debug', true);

module.exports = {
	User: conn,
	Pet: conn1
};