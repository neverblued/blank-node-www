var model = module.exports = require('./../model');

model.now = function(){
	return new Date();
};

model.site = {
	title: 'Project Title',
	domain: 'example.com'
};

model.google = {
	analytics: '_GOOGLE_ANALYTICS_ID_'
};

model.facebook = {
	id: '_FACEBOOK_ID_',
	link: function(){
		return 'https://www.facebook.com/' + model.facebook.id;
	}
};

