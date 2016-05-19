module.exports = function(grunt) {

  	grunt.initConfig({
	  	
	  	clean: {
			build: {
		    	src: ['_prod']
			}
		},
		
	  	copy: {
		    build: {
		        src: [
		        	'css/style.css',
		        	'favicon.ico',
		        	'fonts/*',
		        	'images/**/*',
		        	'includes/*.php',
		        	'js/*.js',
		        	'*.php'
		        ],
		        dest: '_prod',
		        expand: true
	    	}
	    },
		
		uglify: {
			build: {
				files: [
					{
						expand: true,
						cwd: '_prod/js',
						src: [
							'*.js',
							'!*.min.js'
						],
						dest: '_prod/js'
					}
				]
			}
		},
		
		htmlmin: {
			dist: {
		    	options: {
			    	minifyJS: true,
			    	minifyCSS: true,
					removeComments: true,
					collapseWhitespace: true
		    	},
				files: [
					{
						'_prod/index.php': '_prod/index.php'
			    	},
			    	{
				    	expand: true,
						cwd: '_prod/includes',
						src: '*.php',
						dest: '_prod/includes'
			    	}
		    	]
		    }
		}
	
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	
	grunt.registerTask('build', ['clean', 'copy', 'uglify', 'htmlmin']);
};