(function() {
	
	// Validate the contact form in browsers that don't yet support web form validation attributes
	//
	var _form = document.forms["contact-form"];
	var _name = _form["name"];
	var _email = _form["email"];
	
	_form.onsubmit = function() {
		
		if (_name.value === null || _name.value === "") {
			
			alert("Hey there, looks like you didn't fill out your name...");
			
			_name.className = "invalid";
			_name.focus();
			
			return false;
		}
		
		else {
			_name.className = "";
		}
		
		if (!_email.value.match("@")) {
			
			alert("Please provide a valid email address, e.g. john@doe.com");
			
			_email.className = "invalid";
			_email.focus();
			
			return false;
		}
		
		else {
			_email.className = "";
		}
		
		alert("Thank you for your submission: someone will be in touch with you soon!");
	};
	
})();
