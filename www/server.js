var express = require("express"),
	server = express(),
	passport = require("passport"),
	mongoStore = require("express-session-mongo"),
	swig = require("swig"),
	config = require("./config");

module.exports = server;

server.start = function(module){
	if(module.parent){
		return false;
	}
	var port = server.set("port");
	server.listen(port, function(){
		console.log("Express server listening on port " + port);
	});
};

server.configure(function(){
	server.engine("html", swig.renderFile);
	server.set("view engine", "html");
	var templates = __dirname + "/template";
	server.set("views", templates);
	swig.setDefaults({loader: swig.loaders.fs(templates)});
	server.enable("strict routing");
	server.use(express.favicon());
	server.use(express.static(__dirname + "/static"));
	server.use(express.bodyParser());
//	// following equals bodyParser
//	server.use(express.json());
//	server.use(express.urlencoded());
	server.use(express.cookieParser());
	server.use(express.session({
		key: "session-id",
		cookie: {
			path: '/',
			domain: '',
			httpOnly: true,
			maxAge: config.cookieLife
		},
		secret: config.salt,
		store: new mongoStore()
	}));
	server.use(passport.initialize());
	server.use(passport.session());
	server.use(server.router);
});

server.configure("development", function(){
	server.set('view cache', false);
	swig.setDefaults({ cache: false });
	server.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	server.use(express.logger("dev"));
});

server.configure("production", function(){
});

require("./behavior");
