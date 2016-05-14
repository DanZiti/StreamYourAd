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
		        	'includes/*',
		        	'index.php',
		        	'js/*',
		        	'mail.php'
		        ],
		        dest: '_prod',
		        expand: true
	    	}
	    },
		
		uglify: {
			build: {
				files: [
					{
						src: '_prod/js/services.js',
						dest: '_prod/js/services.js'
					},
					{
						src: '_prod/js/stream-your-ad.js',
						dest: '_prod/js/stream-your-ad.js'
					}
				]
			}
		}
	
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('build', ['clean', 'copy', 'uglify']);
};