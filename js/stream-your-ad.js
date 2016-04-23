(function(w, d, $) {
	
	var state = {};
	state.dom = {};
	
	// Gather elements
	//
	var collectDom = function() {
		// TODO: FILL THIS!!!
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
	
	
	// Control slider animations
	//
	var controlSlider = function() {
		
		var index = 0;
		var curHeight = w.innerHeight;
		var slides = d.querySelectorAll("#slider .slide");
		var list = d.getElementById("slider-bullets");
		var bullets = d.querySelectorAll("#slider-bullets li");
		
		
		$("#slider").height(initialHeight - 80); // -80 here accounts for adjustments in CSS for the sticky header
		
		$(w).resize(function() {
			if ($(this).height() > curHeight) {
				$("#slider").height(w.innerHeight - 80);
				curHeight = w.innerHeight;
			}
		})
		.on("load resize", function() {
			if ($(this).width() <= 760) {
				var minHeight = $("#responsive-slide").height() + 150;
				$("#slider").css("min-height", minHeight + "px");
			}
		})
		.on("orientationchange", function() {
			
			var newHeight = w.innerHeight - 80;
			
			$("#slider")
				.height(newHeight)
				.css("min-height", newHeight);
		});
		
		// Build bullets
		//
		for (var i = 0; i < slides.length; i++) {
			var bullet = d.createElement("li");
			if (i === 0) bullet.className = "SELECTED";
			list.appendChild(bullet);
		}
		
		// Auto rotations
		//
		function rotate() {
			
			index++;
			
			if (index === slides.length) index = 0;
			
			sya
				.hide("#slider .slide")
				.show(slides[index])
				.deselect("#slider-bullets li")
				.select(bullets[index]);
			
			setTimeout(rotate, 8000); // Trigger rotation every 8 seconds recursively
		};
	};
	
	// Form validation
	//
	var validateForm = function() {
		
		var form = d.forms["contact-form"];
		var name = form["name"];
		var email = form["email"];
		
		$(form).on("submit", function() {
			
			if (name.value === null || name.value === "") {
			
				alert("Hey there, looks like you didn't fill out your name...");
				
				name.className = "invalid";
				name.focus();
				
				return false;
				
			} else {
				name.className = "";
			}
			
			if (!email.value.match("@")) {
				
				alert("Please provide a valid email address, e.g. john@doe.com");
				
				email.className = "invalid";
				email.select();
				email.focus();
				
				return false;
				
			} else {
				email.className = "";
			}
			
			alert("Thank you for your submission: someone will be in touch with you soon!");
			
		});
		
	};
		
	
	/////////////////////////////////////////////////////////////////////
	// TODO: PUT ALL THE RANDOM SHIT FROM "SCRIPT" IN HERE
	/////////////////////////////////////////////////////////////////////
	
	
	
	// Start
	//
	var init = function() {
		collectDom();
		controlNavigation();
		controlParallax();
		controlSlider();
		validateForm();
	};
	
	$(d).ready(init);
	
})(window, document, jQuery);