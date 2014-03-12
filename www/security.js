var	passport = require("passport"),
	model = require("./../model"),
	act = require("./act");

var authenticationStrategy = {
	local: require("passport-local").Strategy,
	facebook: require("passport-facebook").Strategy
};

passport.use(new authenticationStrategy.local({
    usernameField: "username",
    passwordField: "password"
  }, function(username, password, callback){
	model.user.findByName(username, function(error, user){
		if(error){
			callback(error);
		}else if(!user){
			callback(null, false, {message: "Incorrect username"});
		}else if(!user.authorize(password)){
			callback(null, false, {message: "Incorrect password"});
		}else{
			callback(null, user);
		}
	});
}));

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	model.user.findById(id, function(error, user){
		if(error){
			callback(error);
		}else{
			callback(null, user);
		}
	});
});

act("security.login", passport.authenticate("local"));

act("security.logout", function(request, response, next){
	request.logout();
	next();
});

act("security.online", function(request, response, next){
	var user = request.user;
	if(!user){
		return next();
	}
	user.lastOnline = new Date();
	user.save(next);
});
