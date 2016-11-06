"use strict";
var config = {
	Users: {
		URL: 'mongodb://localhost/users'
	},
	Pets: {
		URL: 'mongodb://localhost/pets'
	},
	server: {
		host: 'http://localhost',
		PORT: 5000
	},
   	salt: '51ca5acbce3e6a5b2dd9772b36cff34c',
};
module.exports = config;