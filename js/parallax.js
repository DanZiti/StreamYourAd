(function() {
	
	// Controls parallax image scrolling above "About (How it Works)" and "Services" sections
	//
	sya.parallax = function() {
		var scrolled = $(window).scrollTop();
		$(".parallax > img").css("top", -(scrolled * 0.25) + "px");
	};
	
	$(window).scroll(function() {
		sya.parallax();
	});
	
})();