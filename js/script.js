(function() {
	
	/**
	 * Primary script for the site; generic functions for use throughout
	 * All "sya" methods below are programmed within "global.js"
	 */
	 
	 var _canScroll = true;
	 
	 function resetScroll() {
		
		_canScroll = false;
		 
		setTimeout(function() {
			_canScroll = true;
		}, 600);
	 };
	
	// Control "SELECTED" states in header > nav > ul > li based on user location
	//
	$("header nav li").on(sya.interaction, function() {
		
		var self = this;
		
		sya
			.deselect("header nav li")
			.select(self);
		
		resetScroll();
	});
	
	$(".logo").on(sya.interaction, function() {
		sya
			.deselect("header nav li")
			.select("header nav > ul li:first-of-type");
		
		resetScroll();
	});
	
	$("#splash-down-arrow").on(sya.interaction, function() {
		sya
			.deselect("header nav li")
			.select("header nav > ul li:nth-of-type(2)");
		
		resetScroll();
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
	
	// Contact form submission
	//
	var _form = document.getElementById("contact-form");
	
	_form.onsubmit = function() {
		alert("Thank you for your submission: someone will be in touch with you soon!");
	};
	
	// Friendly alert regarding "Privacy Policy" and "Terms & Conditions" links in footer
	//
	$("footer ul li:not(:last-child)").on(sya.interaction, function() {
		alert("'StreamYourAd' the company no longer exists as a legal entity, thus I am prohibited from sharing any legal mumbo jumbo on the site. This site now serves as a dummy practice environment for my portfolio :)");
	});
	
	// Create hover/active states throughout the site
	//
	$("nav li, .blue-btn, footer ul li:not(:last-child)").mouseable();
	
})();