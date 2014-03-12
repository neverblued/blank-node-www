module.exports = function(grunt){
	
//	var test = require("./www/test");
	
	var concatBanner =
		"/*! <%= pkg.name %> - v<%= pkg.version %> - " +
		"<%= grunt.template.today('yyyy-mm-dd') %> */\n\n";

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				stripBanners: true,
				banner: concatBanner,
			},
			dist: {
				files: {
					"www/static/build/style.less": [
						"www/static/theme/**/jquery*.css",
						"www/static/theme/**/default.less",
						"www/static/theme/**/*.less"
					],
					"www/static/build/script.js": [
						"www/static/script/**/jquery.js",
						"www/static/script/**/jquery-ui.js",
						"www/static/script/**/jquery*.js",
						"www/static/script/**/*.js"
					]
				}
			}
		},

		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"www/static/build/style.css": "www/static/build/style.less"
				}
			}
		},

		uglify: {
			main: {
				files: {
					"www/static/build/script.min.js": "www/static/build/script.js"
				}
			}
		},

		watch: {
			files: [
				'package.json',
				'Gruntfile.js',
				'www/static/**/*.less',
				'www/static/**/*.css',
				'www/static/**/*.js'
			],
			tasks: 'default'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'less', 'uglify']);
};
