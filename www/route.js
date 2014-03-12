var view = require('./view');

exports.error = function(error, request, response, next){
	var data = { request: request, error: error };
	return view.page(response.status(500), '5xx', data);
};

exports.undefined = function(request, response){
	var data = { url: request.originalUrl };
	return view.page(response.status(404), '404', data);
};

exports.page = function(name, dataExtractor){
	return function(request, response, next){
		try{
			var data = dataExtractor ? dataExtractor(request) : {request: request};
			return view.page(response, name, data);
		}catch(error){
			return next(error);
		}
	};
};

exports.redirect = function(uri){
	return function(request, response, next){
		response.redirect(uri);
	};
};

exports.redirectBack = function(request, response, next){
	response.redirect(request.get("referer"));
};

exports.ok = function(request, response, next){
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify({ok: true}));
};
