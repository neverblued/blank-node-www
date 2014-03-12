var _ = require("underscore"),
	model = require("./model"),
	db = model.db,
	act = require("./www/act");

var thing = new db.Schema({
	date: {type: Date, default: new Date()},
	user: {type: db.Schema.Types.ObjectId, ref: "user", index: true},
	public: {type: Boolean, default: false, index: true}
});

thing.statics.get = function(user, next){
	if(!user){
		return next(new Error("no user"));
	}
	this.findOne({"user": user.id}, next);
};

thing.statics.delete = function(user, next){
	if(!user){
		return next(new Error("no user"));
	}
	this.remove({"user": user.id}, next);
};

thing.statics.record = function(user, next){
	if(!user){
		return next(new Error("no user"));
	}
	var thing = this,
		create = function(public){
			thing.create({
				"user": user.id,
				"public": public
			}, next);
		},
		remove = function(next){
			thing.delete(user, next);
		};
	thing.get(user, function(error, thing){
		if(error){
			return next(error);
		}
		if(thing){
			remove(function(){
				create(thing.public);
			});
		}else{
			create();
		}
	});
};

exports = module.exports = db.model("thing", thing);

act("thing.record", function(request, response, next){
	thing.record(request.user, next);
});

act("thing.delete", function(request, response, next){
	thing.delete(request.user, next);
});
