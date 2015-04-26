(function() {
	
	// Controls navigation throughout the site - "sya.navigate" method is programmed within "js > global.js"
	//
	$("[data-navigate]").on(sya.interaction, function() {
		
		var value = $(this).attr("data-navigate");
		
		if (value === "home") {
			sya.navigate(0);
		}
		
		else {
			var scrollTo = $("#" + value + "-content").offset().top;
			sya.navigate(scrollTo - 80); // -80 here accounts for adjustments in CSS for the sticky header
		}
		
	});
	
})();