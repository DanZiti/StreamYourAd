
	// Define project namespace and reusable methods
	//
	var sya = {
		
		interaction: ("createTouch" in document) ? "touchend" : "click", // Basic interaction optimized for desktops and touchscreens
		
		navigate: function(_location) { // Firefox scrolls at the "html" level only, thus including this in the selector
			$("html, body").animate({
				scrollTop: _location + "px"
			}, 600);
			return this;
		},
		
		show: function(_element, _toggle) {
			$(_element)[_toggle ? "toggleClass" : "addClass"]("SHOW");
			return this;
		},
		
		hide: function(_element) {
			$(_element).removeClass("SHOW");
			return this;
		},
		
		select: function(_element, _toggle) {
			$(_element).addClass("SELECTED");
			return this;
		},
		
		deselect: function(_element) {
			$(_element).removeClass("SELECTED");
			return this;
		}
		
	};