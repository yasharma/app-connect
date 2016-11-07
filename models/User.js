"use strict";

var mongoose 		= require('mongoose'),
	path 			= require('path'),
	crypto 			= require('crypto'),
  	config 	 		= require(path.resolve('./config/env/dev')),
	db 				= require(path.resolve('./config/database')),  
  	beautifyUnique 	= require('mongoose-beautiful-unique-validation');

var UserSchema 	= new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
    	trim: true,
		unique: 'The Email address you have entered already exists.',
		required: 'E-mail is required',
		validate: {
			validator: function(email) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
			},
			message: '{VALUE} is not a valid email address'
		}
	},
	password: {
		type: String,
		required: 'Password is required',
		minlength: [6, 'Password must be atleast 6 characters long.']
	},
	status: {
		type: Boolean,
		default: true // user is active by default
	},
	purchased: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
	}]
});

/* Mongoose beforeSave Hook : To hash a password */
UserSchema.pre('save', function(next){
	var user = this;
	if(this.isModified('password') || this.isNew){
		user.password = this.hashPassword(config.salt, user.password);
		next();
	} else {
		return next();
	}
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (salt, password) {
  if (salt && password) {
    return crypto.createHmac('sha512', salt).update(password).digest('base64');
  } else {
    return password;
  }
};


/* To check a password */
UserSchema.methods.comparePassword = function(salt, password){
	return this.password === this.hashPassword(salt, password);
};

UserSchema.plugin(beautifyUnique);
module.exports = db.User.model('User', UserSchema);