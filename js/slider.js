(function() {
	
	// Ensure the height of this section is 100% of the window height when loaded and when resizing
	//
	var _windowHeight = [];
	
	$(document).ready(function() {
		
		var _newHeight = window.innerHeight;
		
		_windowHeight.push(_newHeight);
		$("#slider").height(_newHeight - 80); // -80 here accounts for adjustments in CSS for the sticky header
	});
	
	$(window).resize(function() {
		
		if ($(this).height() > _windowHeight[0]) {
			$("#slider").height(window.innerHeight - 80);
			_windowHeight[0] = window.innerHeight;
		}
		
	});
	
	// Make sure the slider section resizes when orientation changes on tablets and mobile
	//
	$(window).on("load resize", function() {
		
		if ($(this).width() <= 760) {
			var minHeight = $("#responsive-slide").height() + 150;
			$("#slider").css("min-height", minHeight + "px");
		}
		
	});
	
	$(window).on("orientationchange", function() {
		
		var newHeight = window.innerHeight - 80;
		
		$("#slider").height(newHeight);
		$("#slider").css("min-height", newHeight);
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
	
	setInterval(rotate, 8000);
	
})();