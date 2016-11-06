'use strict';

var express 	= require('express'),
	app 		= express(),
	http 		= require('http').Server(app),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	morgan 		= require('morgan'),
	path 		= require('path'),
	routes 		= require(path.resolve('./config/routes')),
	config 	= require(path.resolve('./config/env/dev'));

/* make public directory accessbile thrugh express static middleware */
app.use(express.static(path.resolve('./public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

/* Register all your routes */
app.use('/', routes);

/* Global error handler */
app.use((err, req, res, next) => {
	if(err){
		res.status(err.status || 500).json({
			errors: {
				source: err,
				code: err.code,
				message: err.message || 'Some error occurred, see log for more info!!',
				success: false
			}	
		});
		logger.log('error', err);		
	}
	next();
});	

/*
* Start the node server using node 'http' package
*/
http.listen(config.server.PORT, () => {
    console.log(`Listening on server port:${config.server.PORT}`);
});

/*
* we need app package for tests so we are exporting this for our tests
*/
module.exports = app;