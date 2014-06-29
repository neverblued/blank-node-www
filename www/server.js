var express = require('express');
var server = module.exports = express();
var config = require('./config');

//	var mongoStore = new require('mongo-store')();
//	var passport = require('passport');

server.use(require('serve-favicon')(__dirname + '/static/theme/favicon.ico'));
server.use(express.static(__dirname + '/static'));

//server.use(require('morgan'));
server.locals.model = require('./model');
server.locals.view = require('./view');

if(config.environment === 'development'){
	server.set('view cache', false);
	server.use(require('errorhandler')({dumpExceptions: true, showStack: true}));
}

//server.enable('strict routing');

server.use(require('body-parser')());
server.use(require('cookie-parser')());
server.use(require('express-session')({
//	store: mongoStore,
	key: 'session-id',
	secret: config.salt,
	cookie: {
		path: '/',
		domain: '',
		httpOnly: true,
		maxAge: config.cookieLife
	}
}));

//server.use(passport.initialize());
//server.use(passport.session());

//server.use(function(request, response, next){
//    response.setTimeout(config.timeout, function(){
//        console.log('Request has timed out.');
//		response.send(408);
//	});
//    next();
//});

require('./behavior');

server.start = function(module){
	if(module.parent){
		return false;
	}
	var port = server.set('port');
	server.listen(port, function(){
		console.log('Express server listening on port ' + port);
	});
};
