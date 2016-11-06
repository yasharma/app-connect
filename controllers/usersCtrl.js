'use strict';
var path = require('path'),
	config = require(path.resolve('./config/env/dev')),
	User = require(path.resolve('./models/User'));

/* user login function */
exports.login = function(req,res) {	
	User.findOne({ email: req.body.email }, function(err, user, next) {
		if(err){
			next(err);                                              
		} else {
			if(!user){
				res.status(401).json({
					errors: {
						name: 'Authentication failed', 
						message: 'Authentication failed. User not found.',
						success: false,
					}
				});
			} else {
				if(user.comparePassword(config.salt, req.body.password)){
					// Remove sensitive data before sending user object
					user.password = undefined;
					res.json({ user: user, success: true, message: 'login success'});
				} else {
					res.status(401).json({
						errors: {
							name: 'Authentication failed', 
							message: 'Authentication failed. Wrong password.',
							success: false,
						}
					});
				}
			}
		}
	});
};

/* user registration function */
exports.register = function(req, res, next) {
	var user = new User({ email: req.body.email, password: req.body.password });
	user.save(function(err, user) {
		if(err){
			res.status(400).send(err);
		} else {
			// Remove sensitive data before sending user object
			user.password = undefined;
			res.json({
				message: 'User registered successfully', 
				user: user.email, 
				success: true
			});
		}
	});
};