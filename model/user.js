var crypto = require("crypto"),
	model = require("./index"),
	db = model.db,
	config = require("./../www/config");

var user = new db.Schema({
	registered: {type: Date, default: new Date()},
	name: {type: String, index: true},
	email: {type: String, unique: true},
	seal: String,
	disabled: Boolean,
	roles: {type: [String], index: true},
	lastOnline: Date,
});

user.methods.authorize = function(plainText){
	return this.seal === user.encryptPassword(plainText);
};

user.statics.encryptPassword = function(password){
	return crypto.createHmac("sha1", config.salt).update(password).digest("hex");
};

user.statics.findByName = function(name, callback){
	this.findOne({name: name}, callback);
};

user = exports = module.exports = db.model("user", user);
