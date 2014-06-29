var _ = require('underscore'),
	model = require('./model');

/*
exports.thing = function(request, response, next){
	var name = request.params.thing;
	if(!name){
		return next(new Error('no name'));
	}
	var win = function(error, thing){
		if(error){
			return next(error);
		}
		request.thing = thing;
		next();
	};
	model.thing.findOne({name: name}, win);
};
*/
