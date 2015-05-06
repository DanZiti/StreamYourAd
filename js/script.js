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
	$("[data-navigate]").on(sya.interaction, function() {
		
		var section = $(this).attr("data-navigate");
		
		sya
			.deselect("[data-navigate]")
			.select("[data-navigate='" + section + "']");
		
		resetScroll();
	});
	
	$(".logo").on(sya.interaction, function() {
		sya
			.deselect("[data-navigate]")
			.select("[data-navigate='home']");
		
		resetScroll();
	});
	
	$("#splash-down-arrow").on(sya.interaction, function() {
		sya
			.deselect("[data-navigate='home']")
			.select("[data-navigate='about']");
		
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
					.deselect("[data-navigate]")
					.select("[data-navigate='about']"); // How it Works
				
				if (servicesOffset - scrolled < threshold) {
					sya
						.deselect("[data-navigate]")
						.select("[data-navigate='services']"); // Our Services
					
					if (contactOffset - scrolled < threshold) {
						sya
							.deselect("[data-navigate]")
							.select("[data-navigate='contact']"); // Contact Us
					}
				}
			}
			
			else {
				sya
					.deselect("[data-navigate]")
					.select("[data-navigate='home']"); // Home
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
		
		var delay = ("createTouch" in document) ? 50 : 0;
		
		setTimeout(function() {
			alert("'StreamYourAd' the company no longer exists as a legal entity, thus I am prohibited from sharing any legal mumbo jumbo on the site. This site now serves as a dummy practice environment for my portfolio :)");
		}, delay);
		
	});
	
	// Create hover/active states throughout the site
	//
	$(window).load(function() {
		$("nav li, #responsive-nav-btn, .blue-btn, footer ul li:not(:last-child)").mouseable();
	});
	
})();