//var _ = require('underscore');
var swig = require('swig');

var config = require('./config');
var model = require('./model');

var server = require('./server');
server.engine('html', swig.renderFile);
server.set('view engine', 'html');

var templates = __dirname + '/template';
server.set('views', templates);
swig.setDefaults({loader: swig.loaders.fs(templates)});

if(config.environment === 'development'){
	swig.setDefaults({cache: false});
}

var view = module.exports;

view.minify = function(){
	return config.environment === 'production';
};

view.page = function(response, name, data){
	return response.render('page/' + name, data);
};

Date.prototype.toLocaleFormat = function(format){
    var f = {
		y: this.getYear() + 1900,
		m: this.getMonth() + 1,
		d: this.getDate(),
		H: this.getHours(),
		M: this.getMinutes(),
		S: this.getSeconds()
	};
    for(k in f){
        format = format.replace('%' + k, f[k] < 10 ? '0' + f[k] : f[k]);
	}
    return format;
};

view.prettyDate = function(date){
	return date && new Date(date).toLocaleFormat('%d.%m.%y, %H:%M');
};

/* example:

	model.thing.prototype.prettyDate = function(){
		return this.date && new Date(this.date).toLocaleFormat('%d.%m.%y, %H:%M');
	};
 
*/
