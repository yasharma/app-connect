"use strict";

var express 	= require('express'),
	path 		= require('path'),
	usersCtrl 	= require(path.resolve('./controllers/usersCtrl')),
	petsCtrl 	= require(path.resolve('./controllers/petsCtrl')),
	router 		= express.Router();

/*
* These are our base routes that will call simple prefixed by '/'
* eg. /login
*/
router.post('/login', usersCtrl.login);
router.post('/register', usersCtrl.register);
router.get('/pets', petsCtrl.getAllPets);

module.exports = router;