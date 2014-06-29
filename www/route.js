//var model = require('./model');
var view = require('./view');
var route = module.exports;

route.error = function(error, request, response, next){
	var data = {request: request, error: error};
	return view.page(response.status(500), '5xx', data);
};

route.undefined = function(request, response){
	var data = {url: request.originalUrl};
	return view.page(response.status(404), '404', data);
};

route.page = function(name, dataExtractor){
	return function(request, response, next){
		try{
			var data = dataExtractor ? dataExtractor(request) : {request: request};
			return view.page(response, name, data);
		}catch(error){
			return next(error);
		}
	};
};

route.redirect = function(uri){
	return function(request, response, next){
		response.redirect(uri);
	};
};

route.redirectBack = function(request, response, next){
	response.redirect(request.get("referer"));
};

route.ok = function(request, response, next){
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify({ok: true}));
};
