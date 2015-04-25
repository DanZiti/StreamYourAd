(function() {
	
	// Ensure the height of this section is 100% of the window height when loaded
	//
	$(window).on("load resize", function() {
		var newHeight = $(window).height();
		$("#slider").height(newHeight - 80); // -80 here accounts for adjustments in CSS for the sticky header
	});
	
	// Fading picture slider stuff
	//
	/* PUT STUFF HERE */
	
})();