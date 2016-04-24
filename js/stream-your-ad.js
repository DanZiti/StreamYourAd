(function(w, d, $) {
	
	var state = {};
	state.dom = {};
	state.canScroll = true; // For page scroll checks
	state.sliderIndex = 0; // For slider rotations
	
	state.resetScroll = function() {
		state.canScroll = false;
		setTimeout(function() {
			return state.canScroll = true;
		}, 600);
	 };
	
	// Gather elements
	//
	var collectDom = function() {
		state.dom.responsiveNavButton = d.getElementById("responsive-nav-button");
		state.dom.slider = d.getElementById("slider");
		state.dom.splashDownArrow = d.getElementById("splash-down-arrow");
		state.dom.logo = d.getElementById("logo");
		state.dom.contactForm = d.forms["contact-form"];
		state.dom.$navigators = $("[data-navigate]");
		state.dom.$parallaxImages = $(".parallax > img");
		state.dom.$footerLinks = $("footer ul li:not(:last-child)");
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
			.attr("id", "responsive-menu")
			.attr("class", "responsive-menu");
		
		// Controls responsive nav/menu button and opening/closing of the nav menu while in mobile/responsive view
		//
		$(state.dom.responsiveNavButton).on(services.interaction(), function() {
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
						state.dom.$parallaxImages.css("top", "0px");
					}
				})			
				.resize(function() {
					if ($(this).width() > 1000) state.dom.$parallaxImages.css("top", "0px");
				});
		}
	};
	
	
	// Control slider animations
	//
	var controlSlider = function() {
		
		var curHeight = w.innerHeight;
		var slides = d.querySelectorAll("#slider .slide");
		var list = d.getElementById("slider-bullets");
		
		$(state.dom.slider).height(curHeight - 80); // -80 here accounts for adjustments in CSS for the sticky header
		
		$(w).resize(function() {
			if ($(this).height() > curHeight) {
				$(state.dom.slider).height(w.innerHeight - 80);
				curHeight = w.innerHeight;
			}
		})
		.on("load resize", function() {
			if ($(this).width() <= 760) {
				var minHeight = $("#responsive-slide").height() + 150;
				$(state.dom.slider).css("min-height", minHeight + "px");
			}
		})
		.on("orientationchange", function() {
			
			var newHeight = w.innerHeight - 80;
			
			$(state.dom.slider)
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
			
			var bullets = d.querySelectorAll("#slider-bullets li");
			
			state.sliderIndex++;
			
			if (state.sliderIndex === slides.length) state.sliderIndex = 0;
			
			services
				.hide("#slider .slide")
				.show(slides[state.sliderIndex])
				.deselect("#slider-bullets li")
				.select(bullets[state.sliderIndex]);
			
			setTimeout(rotate, 8000); // Recursively trigger rotation every 8 seconds
		};
		
		setTimeout(rotate, 8000); // Init slider
	};
	
	// Contact form validation
	//
	var validateContactForm = function() {
		
		var name = state.dom.contactForm["name"];
		var email = state.dom.contactForm["email"];
		
		$(state.dom.contactForm).on("submit", function() { // TODO: REFACTOR VALIDATION ERROR MESSAGING AND INCLUDE REQUIREMENT FOR SUBJECT
			
			if (name.value === null || name.value === "") {
			
				//alert("Hey there, looks like you didn't fill out your name...");
				
				name.className = "invalid";
				name.focus();
				
				return false;
				
			} else {
				name.className = "";
			}
			
			if (!email.value.match("@")) {
				
				//alert("Please provide a valid email address, e.g. john@doe.com");
				
				email.className = "invalid";
				email.select();
				email.focus();
				
				return false;
				
			} else {
				email.className = "";
			}
			
			//alert("Thank you for your submission: someone will be in touch with you soon!");
			
		});
		
	};
	
	// Control automatic header > nav > ul > li "SELECTED" states updates while scrolling
	//
	var controlSelectedStates = function() {
		
		$(w).scroll(function() {
			
			if (state.canScroll) { // Necessary to prevent weird transition errors after clicking/tapping on nav items
			
				var scrolled = $(w).scrollTop();
				var threshold = ($(w).height() * 0.4);
				var aboutOffset = $("#about-content").offset().top;
				var servicesOffset = $("#services-content").offset().top;
				var contactOffset = $("#contact-content").offset().top;
				
				if (aboutOffset - scrolled < threshold) {
					services
						.deselect("[data-navigate]")
						.select("[data-navigate='about']"); // How it Works
					
					if (servicesOffset - scrolled < threshold) {
						services
							.deselect("[data-navigate]")
							.select("[data-navigate='services']"); // Our Services
						
						if (contactOffset - scrolled < threshold) {
							services
								.deselect("[data-navigate]")
								.select("[data-navigate='contact']"); // Contact Us
						}
					}
					
				} else {
					services
						.deselect("[data-navigate]")
						.select("[data-navigate='home']"); // Home
				}
			
			} // End state.canScroll check
		});
		
		// Control "SELECTED" states in header > nav > ul > li based on user location
		//
		state.dom.$navigators.on(services.interaction(), function() {
			
			var section = $(this).attr("data-navigate");
			
			services
				.deselect("[data-navigate]")
				.select("[data-navigate='" + section + "']");
			
			state.resetScroll();
		});
		
		$(state.dom.logo).on(services.interaction(), function() {
			services
				.deselect("[data-navigate]")
				.select("[data-navigate='home']");
			
			state.resetScroll();
		});
		
		$(state.dom.splashDownArrow).on(services.interaction(), function() {
			services
				.deselect("[data-navigate='home']")
				.select("[data-navigate='about']");
			
			state.resetScroll();
		});
		
	};
	
	
	// "Privacy Policy" / "Terms & Conditions" alerts
	//
	var controlAlerts = function() {
		state.dom.$footerLinks.on(services.interaction(), function() {
			var delay = ("ontouchend" in d) ? 50 : 0;
			setTimeout(function() {
				alert("'StreamYourAd' the company no longer exists as a legal entity, thus I am prohibited from sharing any legal bric-a-brac on the site. This site now serves as a dummy practice environment for my portfolio :)");
			}, delay);
		});
	};
	
	
	// Create hover/active states
	//
	var initMousables = function() {
		return $("nav li, #responsive-nav-button, .blue-button, footer ul li:not(:last-child)").mouseable();
	};
	
	
	// Start
	//
	var init = function() {
		collectDom();
		controlNavigation();
		controlParallax();
		controlSlider();
		validateContactForm();
		controlAlerts();
		controlSelectedStates();
		initMousables();
	};
	
	$(d).ready(init);
	
})(window, document, jQuery);