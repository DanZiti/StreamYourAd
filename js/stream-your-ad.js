(function(w, d, $) {
	
	var state = {};
	state.dom = {};
	
	// Gather elements
	//
	var collectDom = function() {
		
	};
	
	// Navigation for desktop and mobile
	//
	var controlNavigation = function() {
		
		var $responsiveNav = $("header nav").clone();
		
		$(d).on(services.interaction(), "[data-navigate]", function() {
			
			var section = $(this).attr("data-navigate");
			
			if (section === "home") {
				services.navigate(0);
			} else {
				var scrollTo = $("#" + section + "-content").offset().top;
				services.navigate(scrollTo - 80); // -80 here accounts for adjustments in CSS for the sticky header
			}
		});
		
		// Create responsive nav menu
		//
		$responsiveNav
			.insertAfter("header")
			.attr("id", "responsive-menu");
		
		// Controls responsive nav/menu button and opening/closing of the nav menu while in mobile/responsive view
		//
		$("#responsive-nav-btn").on(services.interaction(), function() {
			services.show("#responsive-menu", true);
		});
		
		$("#responsive-menu li, header .logo").on(services.interaction(), function() {
			services.hide("#responsive-menu");
		});
		
		$(w).resize(function() {
			if ($(this).width() > 740 && $("#responsive-menu").hasClass("SHOW")) services.hide("#responsive-menu");
		});
	
	};
	
	// Control parallax banner
	//
	var controlParallax = function() {
		
		if (!services.isMobile()) {
		
			$(w)
				.scroll(function() {
					if ($(this).width() > 1000) {
						services.parallax();
					} else {
						$(".parallax > img").css("top", "0px");
					}
				})			
				.resize(function() {
					if ($(this).width() > 1000) $(".parallax > img").css("top", "0px");
				});
		}
	};
	
	
	// asdf
	//
	
	
	
	// asdf
	//
	
	
	
	// asdf
	//
		
	
	/////////////////////////////////////////////////////////////////////
	// TODO: PUT ALL THE RANDOM SHIT FROM "SCRIPT" IN HERE
	/////////////////////////////////////////////////////////////////////
	
	
	
	// Start
	//
	var init = function() {
		collectDom();
		controlNavigation();
		controlParallax();
	};
	
	$(d).ready(init);
	
})(window, document, jQuery);