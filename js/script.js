(function() {
	
	/**
	 * Primary script for the site; generic functions for use throughout
	 * All "sya" methods below are programmed within "global.js"
	 */
	
	// Control "SELECTED" states in header > nav > ul > li based on user location
	//
	$("header nav li").on(sya.interaction, function() {
		
		var self = this;
		
		sya
			.deselect("header nav li")
			.select(self);
	});
	
	$(".logo").on(sya.interaction, function() {
		sya
			.deselect("header nav li")
			.select("header nav > ul li:first-of-type");
	});
	
	$("#splash-down-arrow").on(sya.interaction, function() {
		sya
			.deselect("header nav li")
			.select("header nav > ul li:nth-of-type(2)");
	});
	
	/* TO-DO: CONTROL SELECTED NAV ITEM BASED ON LOCATION/SCROLLING */
	
	// Create hover/active states throughout the site
	//
	$("header nav li").mouseable();
	
})();