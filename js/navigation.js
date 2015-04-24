(function() {
	
	// Navigation throughout the site
	//
	$("[data-navigate]").on(sya.interaction, function() {
		
		var value = $(this).attr("data-navigate");
		
		if (value === "home") {
			sya.navigate(0);
		}
		
		else {
			var scrollTo = $("#" + value + "-content").offset().top;
			sya.navigate(scrollTo);
		}
		
	});
	
})();