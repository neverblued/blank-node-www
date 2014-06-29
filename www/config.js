exports.environment = process.env.NODE_ENV || 'development';
exports.cookieLife = 60 * 60 * 1000;
exports.salt = 'salt is not sweet';
exports.database = (function(){
	var user = 'dummy',
		password = 'simple-password',
		host = 'localhost',
		port = '27017',
		name = 'test';
	return 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + name;
})();
