var _ = require("underscore"),
	swig = require("swig"),
	config = require("./config"),
	model = require("./../model");

var view = module.exports;

view.minify = function(){
	return config.environment === "production";
};

view.page = function(response, name, data){
	return response.render("page/" + name, _.extend({model: model, view: view}, data));
};

Date.prototype.toLocaleFormat = function(format) {
    var f = {
		y: this.getYear() + 1900,
		m: this.getMonth() + 1,
		d: this.getDate(),
		H: this.getHours(),
		M: this.getMinutes(),
		S: this.getSeconds()
	};
    for(k in f){
        format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
	}
    return format;
};

model.thing.prototype.prettyDate = function(){
	return this.date && new Date(this.date).toLocaleFormat("%d.%m.%y, %H:%M");
};
