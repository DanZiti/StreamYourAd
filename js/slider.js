(function() {
	
	// Ensure the height of this section is 100% of the window height when loaded
	//
	$(window).on("load resize", function() {
		var newHeight = $(window).height();
		$("#slider").height(newHeight - 80); // -80 here accounts for adjustments in CSS for the sticky header
	});
	
	// Build slider bullets
	//
	var _slides = document.querySelectorAll("#slider .slide");
	var _list = document.getElementById("slider-bullets");
	
	for (var i = 0; i < _slides.length; i++) {
		
		var bullet = document.createElement("li");
		
		if (i === 0) bullet.className = "SELECTED";
		
		_list.appendChild(bullet);
	}
	
	// Control slider rotations
	//
	var _index = 0;
	var _bullets = document.querySelectorAll("#slider-bullets li");
	
	function rotate() {
		
		_index++;
		
		if (_index === _slides.length) _index = 0;
		
		sya
			.hide("#slider .slide")
			.show(_slides[_index])
			.deselect("#slider-bullets li")
			.select(_bullets[_index]);
	};
	
	setInterval(rotate, 6000);
	
})();