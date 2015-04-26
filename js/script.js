(function() {
	
	/**
	 * Primary script for the site; generic functions for use throughout
	 * All "sya" methods below are programmed within "global.js"
	 */
	 
	 var _canScroll = true;
	
	// Control "SELECTED" states in header > nav > ul > li based on user location
	//
	$("header nav li").on(sya.interaction, function() {
		
		var self = this;
		
		sya
			.deselect("header nav li")
			.select(self);
		
		_canScroll = false;
		
		setTimeout(function() {
			_canScroll = true;
		}, 600);
	});
	
	$(".logo").on(sya.interaction, function() {
		sya
			.deselect("header nav li")
			.select("header nav > ul li:first-of-type");
		
		_canScroll = false;
		
		setTimeout(function() {
			_canScroll = true;
		}, 600);
	});
	
	$("#splash-down-arrow").on(sya.interaction, function() {
		sya
			.deselect("header nav li")
			.select("header nav > ul li:nth-of-type(2)");
		
		_canScroll = false;
		
		setTimeout(function() {
			_canScroll = true;
		}, 600);
	});
	
	// Control automatic header > nav > ul > li "SELECTED" states updates while scrolling
	//
	$(window).scroll(function() {
		
		if (_canScroll) { // Necessary to prevent weird transition errors after clicking/tapping on nav items
		
			var scrolled = $(window).scrollTop();
			var threshold = ($(window).height() * 0.4);
			
			var aboutOffset = $("#about-content").offset().top;
			var servicesOffset = $("#services-content").offset().top;
			var contactOffset = $("#contact-content").offset().top;
			
			if (aboutOffset - scrolled < threshold) {
				sya
					.deselect("header nav li")
					.select("header nav > ul li:nth-of-type(2)"); // About Us
				
				if (servicesOffset - scrolled < threshold) {
					sya
						.deselect("header nav li")
						.select("header nav > ul li:nth-of-type(3)"); // Our Services
					
					if (contactOffset - scrolled < threshold) {
						sya
							.deselect("header nav li")
							.select("header nav > ul li:last-of-type"); // Contact Us
					}
				}
			}
			
			else {
				sya
					.deselect("header nav li")
					.select("header nav > ul li:first-of-type"); // Home
			}
		
		} // End _canScroll check
		
	});
	
	// Create hover/active states throughout the site
	//
	$("nav li, .blue-btn, footer ul li:not(:last-child)").mouseable();
	
})();