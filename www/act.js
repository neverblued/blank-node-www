var actions = {};
module.exports = function(name, handler){
	if(!name){
		throw new Error('no name');
	}
	if(handler){
		actions[name] = handler;
	}else{
		handler = actions[name];
	}
	return handler;
};

require('./security');
require('./model');
