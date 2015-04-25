
	// Define project namespace and reusable methods
	//
	var sya = {
		
		interaction: ("createTouch" in document) ? "touchend" : "click", // Basic interaction optimized for desktops and touchscreens
		
		navigate: function(_location) {
			$("html, body").animate({
				scrollTop: _location + "px"
			}, 500);
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
			$(_element)[_toggle ? "toggleClass" : "addClass"]("SELECTED");
			return this;
		},
		
		deselect: function(_element) {
			$(_element).removeClass("SELECTED");
			return this;
		}
		
	};