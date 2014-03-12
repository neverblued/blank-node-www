var code = exports.code = __dirname;

var tests = exports.tests = [
	"hello-world"
	//, "another-script"
];
			
var path = exports.path = function(name){
	return name + ".js";
};

var pathAbsolute = exports.pathAbsolute = function(name){
	return __dirname + "/" + path(name);
};

var start = exports.start = function(){
	try{
		require("qunit").run({
			code: code,
			tests: tests.map(pathAbsolute)
		});
	}catch(error){
		console.log("{0y0} OH SHI-!!!!!!!");
		console.error(error);
	}finally{
		console.log("{^y^}");
	}
};

!module.parent && start();
