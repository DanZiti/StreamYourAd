(function() {
	
	// Controls navigation throughout the site - "sya.navigate" method is programmed within "js > global.js"
	//
	$(document).on(sya.interaction, "[data-navigate]",function() {
		
		var value = $(this).attr("data-navigate");
		
		if (value === "home") {
			sya.navigate(0);
		}
		
		else {
			var scrollTo = $("#" + value + "-content").offset().top;
			sya.navigate(scrollTo - 80); // -80 here accounts for adjustments in CSS for the sticky header
		}
		
	});
	
	// Create responsive nav menu
	//
	var _responsiveNav = $("header nav").clone();
	
	_responsiveNav
		.insertAfter("header")
		.attr("id", "responsive-menu");
	
	// Controls responsive nav/menu button and opening/closing of the nav menu while in mobile/responsive view
	//
	$("#responsive-nav-btn").on(sya.interaction, function() {
		sya.show("#responsive-menu", true);
	});
	
	$("#responsive-menu li, header .logo").on(sya.interaction, function() {
		sya.hide("#responsive-menu");
	});
	
	$(window).resize(function() {
		if ($(this).width() > 740 && $("#responsive-menu").hasClass("SHOW")) sya.hide("#responsive-menu");
	});
	
})();