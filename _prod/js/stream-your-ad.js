!function(a,b,c){var d={};d.dom={},d.canScroll=!0,d.sliderIndex=0,d.resetScroll=function(){d.canScroll=!1,setTimeout(function(){return d.canScroll=!0},600)};var e=function(){d.dom.responsiveNavButton=b.getElementById("responsive-nav-button"),d.dom.slider=b.getElementById("slider"),d.dom.splashDownArrow=b.getElementById("splash-down-arrow"),d.dom.logo=b.getElementById("logo"),d.dom.contactForm=b.forms["contact-form"],d.dom.contactFormErrorMessage=b.getElementById("contact-form-error-message"),d.dom.formSubmissionOverlay=b.getElementById("successful-form-submission-overlay"),d.dom.$navigators=c("[data-navigate]"),d.dom.$parallaxImages=c(".parallax > img"),d.dom.$footerLinks=c("footer ul li:not(:last-child)")},f=function(){var e=c("header nav").clone();c(b).on(services.interaction(),"[data-navigate]",function(){var a=c(this).attr("data-navigate");if("home"===a)services.navigate(0);else{var b=c("#"+a+"-content").offset().top;services.navigate(b-80)}}),e.insertAfter("header").attr("id","responsive-menu").attr("class","responsive-menu"),c(d.dom.responsiveNavButton).on(services.interaction(),function(){services.show("#responsive-menu",!0)}),c("#responsive-menu li, header .logo").on(services.interaction(),function(){services.hide("#responsive-menu")}),c(a).resize(function(){c(this).width()>740&&c("#responsive-menu").hasClass("SHOW")&&services.hide("#responsive-menu")})},g=function(){services.isMobile()||c(a).scroll(function(){c(this).width()>1e3?services.parallax():d.dom.$parallaxImages.css("top","0px")}).resize(function(){c(this).width()>1e3&&d.dom.$parallaxImages.css("top","0px")})},h=function(){function e(){var a=b.querySelectorAll("#slider-bullets li");d.sliderIndex++,d.sliderIndex===g.length&&(d.sliderIndex=0),services.hide("#slider .slide").show(g[d.sliderIndex]).deselect("#slider-bullets li").select(a[d.sliderIndex]),setTimeout(e,8e3)}var f=a.innerHeight,g=b.querySelectorAll("#slider .slide"),h=b.getElementById("slider-bullets");c(d.dom.slider).height(f-80),c(a).resize(function(){c(this).height()>f&&(c(d.dom.slider).height(a.innerHeight-80),f=a.innerHeight)}).on("load resize",function(){if(c(this).width()<=760){var a=c("#responsive-slide").height()+150;c(d.dom.slider).css("min-height",a+"px")}}).on("orientationchange",function(){var b=a.innerHeight-80;c(d.dom.slider).height(b).css("min-height",b)});for(var i=0;i<g.length;i++){var j=b.createElement("li");0===i&&(j.className="SELECTED"),h.appendChild(j)}setTimeout(e,8e3)},i=function(){var a=d.dom.contactForm.name,b=d.dom.contactForm.email,e=d.dom.contactForm.subject,f=d.dom.contactForm.comments;c(d.dom.contactForm).on("submit",function(){var g=!1;return a.value.match(/^\s*\S/)?a.className="":(g=!0,a.className="invalid"),b.value.match(/^\S+@\S+$/)?b.className="":(g=!0,b.className="invalid"),e.value.match(/^\s*\S/)?e.className="":(g=!0,e.className="invalid"),f.value.match(/^\s*\S/)?f.className="":(g=!0,f.className="invalid"),g?(c(d.dom.contactFormErrorMessage).hasClass("SHOW")||services.show(d.dom.contactFormErrorMessage),!1):void(c(d.dom.contactFormErrorMessage).hasClass("SHOW")&&services.hide(d.dom.contactFormErrorMessage))})},j=function(){if(null!==d.dom.formSubmissionOverlay){var e=b.querySelector("#successful-form-submission-overlay .close-button");c(e).on(services.interaction(),function(){return a.location.href="http://www.drzwebdev.com/sites/StreamYourAd/"})}},k=function(){c(a).scroll(function(){if(d.canScroll){var b=c(a).scrollTop(),e=.4*c(a).height(),f=c("#about-content").offset().top,g=c("#services-content").offset().top,h=c("#contact-content").offset().top;e>f-b?(services.deselect("[data-navigate]").select("[data-navigate='about']"),e>g-b&&(services.deselect("[data-navigate]").select("[data-navigate='services']"),e>h-b&&services.deselect("[data-navigate]").select("[data-navigate='contact']"))):services.deselect("[data-navigate]").select("[data-navigate='home']")}}),d.dom.$navigators.on(services.interaction(),function(){var a=c(this).attr("data-navigate");services.deselect("[data-navigate]").select("[data-navigate='"+a+"']"),d.resetScroll()}),c(d.dom.logo).on(services.interaction(),function(){services.deselect("[data-navigate]").select("[data-navigate='home']"),d.resetScroll()}),c(d.dom.splashDownArrow).on(services.interaction(),function(){services.deselect("[data-navigate='home']").select("[data-navigate='about']"),d.resetScroll()})},l=function(){d.dom.$footerLinks.on(services.interaction(),function(){var a="ontouchend"in b?50:0;setTimeout(function(){alert("'StreamYourAd' the company no longer exists as a legal entity, thus I am prohibited from sharing any legal bric-a-brac on the site. This site now serves as a dummy practice environment for my portfolio :)")},a)})},m=function(){return c("nav li, #responsive-nav-button, .blue-button, footer ul li:not(:last-child)").mouseable()},n=function(){e(),f(),g(),h(),i(),l(),j(),k(),m()};c(b).ready(n)}(window,document,jQuery);