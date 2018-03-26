(function(w, d, $) {
	
	const state = {};
	state.dom = {};
	state.canScroll = true;
	state.sliderIndex = 0;
	state.resetScroll = () => {
		state.canScroll = false;
		setTimeout(() => state.canScroll = true, 600);
	};
	
	// gather elements
	const collectDOM = () => {
		state.dom.responsiveNavButton = d.getElementById('responsiveNavButton');
		state.dom.slider = d.getElementById('slider');
		state.dom.splashDownArrow = d.getElementById('splashDownArrow');
		state.dom.logo = d.getElementById('logo');
		state.dom.contactForm = d.forms['contactForm'];
		state.dom.contactFormErrorMessage = d.getElementById('contactFormErrorMessage');
		state.dom.$navigators = $('[data-navigate]');
		state.dom.$parallaxImages = $('.parallax .plx-image');
		state.dom.$footerLinks = $('.footer-items li:not(:last-child)');
	};
	
	// navigation for desktop and mobile
	const controlNavigation = () => {
		const $responsiveNav = $('.header .navigation').clone();
		const docInteract = e => {
			const section = $(e.target).attr('data-navigate');
			if (section === 'home') return utils.navigate(0);
			const scrollTo = $(`#${section}Content`).offset().top;
			// -80 here accounts for adjustments in CSS for the sticky header
			utils.navigate(scrollTo - 80);
		};
		$(d).on(utils.interaction(), '[data-navigate]', docInteract);
		// create and control the responsive nav menu
		$responsiveNav.insertAfter('header').attr('id', 'responsiveMenu').attr('class', 'responsive-menu');
		$(state.dom.responsiveNavButton).on(utils.interaction(), () => utils.show('#responsiveMenu', true));
		$('#responsiveMenu li, header .logo').on(utils.interaction(), () => utils.hide('#responsiveMenu'));
		const winResize = () => { if ($(w).width() > 740 && $('#responsiveMenu').hasClass('show')) utils.hide('#responsiveMenu'); };
		$(w).resize(winResize);
	};
	
	// control parallax banner
	const controlParallax = () => {
		const winScroll = () => $(w).width() > 1000 ? utils.parallax() : state.dom.$parallaxImages.css('top', '0px');
		const winResize = () => { if ($(w).width() > 1000) state.dom.$parallaxImages.css('top', '0px'); };
		if (!utils.isMobile()) $(w).scroll(winScroll).resize(winResize);
	};
	
	// control slider animations
	const controlSlider = () => {
		let curHeight = w.innerHeight;
		const slides = d.querySelectorAll('#slider .slide');
		const list = d.getElementById('sliderBullets');
		// '-80' here accounts for adjustments in CSS for the sticky header
		$(state.dom.slider).height(curHeight - 80);
		const winResize = () => {
			if ($(w).height() > curHeight) {
				$(state.dom.slider).height(w.innerHeight - 80);
				curHeight = w.innerHeight;
			}
		};
		const loadResize = () => {
			if ($(w).width() <= 760) {
				const minHeight = $('#responsiveSlide').height() + 150;
				$(state.dom.slider).css('min-height', `${minHeight}px`);
			}
		};
		const winOrientationChange = () => {
			const newHeight = w.innerHeight - 80;
			$(state.dom.slider).height(newHeight).css('min-height', newHeight);
		};
		$(w).resize(winResize).on('load resize', loadResize).on('orientationchange', winOrientationChange);
		// build bullets
		for (let i = 0; i < slides.length; i++) {
			const bullet = d.createElement('li');
			if (i === 0) bullet.className = 'selected';
			list.appendChild(bullet);
		}
		// auto rotations
		const rotate = () => {
			const bullets = d.querySelectorAll('#sliderBullets li');
			state.sliderIndex++;
			if (state.sliderIndex === slides.length) state.sliderIndex = 0;
			utils.hide('#slider .slide').show(slides[state.sliderIndex]).deselect('#sliderBullets li').select(bullets[state.sliderIndex]);
			setTimeout(rotate, 8000);
		};
		setTimeout(rotate, 8000);
	};
	
	// contact form validation
	const submitContactForm = () => {
		let hasErrors = false;
		const { name, email, subject, comments } = state.dom.contactForm;
		const validateForm = (...inputs) => {
			inputs.forEach(item => {
				const regx = item === email ? /^\S+@\S+\.\S+$/ : /^\s*\S/;
				const method = !item.value.match(regx) ? 'add' : 'remove';
				if (!item.value.match(regx) && !hasErrors) hasErrors = true;
				item.classList[method]('invalid');
			});
		};
		const submitForm = e => {
			e.preventDefault();
			hasErrors = false;
			validateForm(name, email, subject, comments);
			const method = hasErrors ? 'show' : 'hide';
			utils[method](state.dom.contactFormErrorMessage);
			const makeAsyncCall = () => {
				const data = {
					name: name.value,
					email: email.value,
					subject: subject.value,
					comments: comments.value
				};
				return new Promise((resolve, reject) => {
					const xmlhttp = new XMLHttpRequest();
					xmlhttp.open('POST', 'api/contact', true);
					xmlhttp.responseType = 'json';
					xmlhttp.setRequestHeader('Content-type', 'application/json');
					xmlhttp.onload = () => resolve(xmlhttp.response);
					xmlhttp.onerror = () => reject('Post failure.');
					xmlhttp.send(JSON.stringify(data));
					return xmlhttp;
				});
			};
			const success = () => {
				console.log('hi');
			};
			const failure = () => {
				console.log('poop');
			};
			// @TODO: ACTUAL SUCCESS AND ERROR HANDLING HERE
			if (!hasErrors) return makeAsyncCall().then(() => success()).catch(() => failure());
		};
		$(state.dom.contactForm).on('submit', submitForm);
	};
	
	// control automatic header > nav > ul > li 'selected' states updates while scrolling
	const controlSelectedStates = () => {
		const winScroll = () => {
			if (state.canScroll) {
				const scrolled = $(w).scrollTop();
				const threshold = ($(w).height() * 0.4);
				const aboutOffset = $('#aboutContent').offset().top;
				const servicesOffset = $('#servicesContent').offset().top;
				const contactOffset = $('#contactContent').offset().top;
				if (aboutOffset - scrolled < threshold) utils.deselect('[data-navigate]').select('[data-navigate="about"]');
				if (servicesOffset - scrolled < threshold) utils.deselect('[data-navigate]').select('[data-navigate="services"]');
				if (contactOffset - scrolled < threshold) utils.deselect('[data-navigate]').select('[data-navigate="contact"]');
				if (!(aboutOffset - scrolled < threshold))	utils.deselect('[data-navigate]').select('[data-navigate="home"]');
			}
		};
		const navigate = section => {
			utils.deselect('[data-navigate]').select(`[data-navigate="${section}"]`);
			state.resetScroll();
		};
		const handleNavClick = e => {
			const section = $(e.target).attr('data-navigate');
			navigate(section);
		};
		$(w).scroll(winScroll);
		$(state.dom.logo).on(utils.interaction(), () => navigate('home'));
		$(state.dom.splashDownArrow).on(utils.interaction(), () => navigate('about'));
		state.dom.$navigators.on(utils.interaction(), handleNavClick);
	};
	
	// 'Privacy Policy' and 'Terms & Conditions' alerts
	const controlAlerts = () => {
		const runAlert = () => {
			const delay = 'ontouchend' in d ? 50 : 0;
			const sendAlert = () => alert('"StreamYourAd" the company no longer exists as a legal entity, thus I am prohibited from sharing any legal bric-a-brac on the site. This site now serves as a dummy practice environment for my portfolio :)');
			setTimeout(sendAlert, delay);
		};
		state.dom.$footerLinks.on(utils.interaction(), runAlert);
	};
	
	// create hover/active states
	const setMouseables = () => $('.navigation li, .social li, #responsiveNavButton, .blue-button, .footer-items li:not(:last-child)').mouseable();

	// update copyright year
	const updateCopyrightYear = () => {
		const copyrightYear = d.getElementById('copyrightYear');
		const dateYear = new Date().getFullYear();
		return copyrightYear.innerHTML = dateYear;
	};
	
	// start
	const init = () => {
		collectDOM();
		controlNavigation();
		controlParallax();
		controlSlider();
		submitContactForm();
		controlAlerts();
		controlSelectedStates();
		setMouseables();
		updateCopyrightYear();
	};
	
	$(d).ready(init);
	
})(window, document, jQuery);