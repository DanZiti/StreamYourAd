<?php
	
	if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['comments'])) {
		
		// Address and subject
		$formSubject = $_POST['subject'];
		$emailTo = 'dan@drzwebdev.com';
		$emailSubject = 'StreamYourAd Contact Form Submission: $formSubject';
		
		// For redirect after form submission
		$homePage = 'http://www.drzwebdev.com/sites/StreamYourAd/?formSubmitted=true';
		
		// Call form data
		$name = $_POST['name'];
		$emailFrom = $_POST['email'];
		$comments = $_POST['comments'];
		
		// Begin message content
		$emailMessage = 'New inquiry submitted.\n\n';
		
		function cleanString($string) {
			$bad = array('content-type', 'bcc:', 'to:', 'cc:', 'href');
			return str_replace($bad, '', $string);
		}
		
		// Fill email content
		$emailMessage .= 'Name: ' . cleanString($name) . '\n';
		$emailMessage .= 'Email: ' . cleanString($emailFrom) . '\n';
		$emailMessage .= 'Comments: ' . cleanString($comments) . '\n';
		
		// Create email headers
		$headers = 'From: ' . $emailFrom . '\r\n' . 'Reply-To: ' . $emailFrom . '\r\n' . 'X-Mailer: PHP/' . phpversion();
		
		// Send email and redirect back to Home page
		$redirect = 'Location: ' . $homePage;
		@mail($emailTo, $emailSubject, $emailMessage, $headers);
		@header($redirect);
		
	}
	
?>
