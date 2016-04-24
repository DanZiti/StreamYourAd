module.exports = function(grunt) {

  	// Configure the tasks
  	//
  	grunt.initConfig({
	  	
	  	clean: {
			build: {
		    	src: ["_prod"]
			}
		},
		
	  	copy: {
		    build: {
		        src: ["**"],
		        dest: "_prod",
		        expand: true
	    	}
	    }
	
	});

	// Load the tasks
	//
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	
	// Define the tasks
	//
	
};