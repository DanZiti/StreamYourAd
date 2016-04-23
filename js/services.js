var services = (function(w, d, $, pub) {
	
	pub.interaction = function() {
		return ("ontouchend" in d) ? "touchend" : "click";
	};
	
	pub.navigate = function(location) {
		$("html, body").animate({
			scrollTop: location + "px"
		}, 600);
		return this;
	};
	
	pub.show = function(elem, toggle) {
		$(elem)[toggle ? "toggleClass" : "addClass"]("SHOW");
		return this;
	};
	
	pub.hide = function(elem) {
		$(elem).removeClass("SHOW");
		return this;
	};
	
	pub.select = function(elem, toggle) {
		$(elem)[toggle ? "toggleClass" : "addClass"]("SELECTED");
		return this;
	};
	
	pub.deselect = function(elem) {
		$(elem).removeClass("SELECTED");
		return this;
	};
	
	pub.isMobile = function() {
		return navigator.userAgent.match(/Android|webOS|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i) !== null;
	};
	
	pub.parallax = function() {
		var scrolled = $(w).scrollTop();
		$(".parallax > img.parallax-about").css("top", -(scrolled * 0.2) + "px");
		$(".parallax > img.parallax-contact").css("top", -(scrolled * 0.2) + 462 + "px"); // 462 accounts for the image's location further down the page
	};
	
	return pub;
	
})(window, document, jQuery, services || {});