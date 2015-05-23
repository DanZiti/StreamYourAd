<?php
	
	if (isset($_POST["email"])) {
		
		// Address and subject
		//
		$form_subject = $_POST["subject"];
		$email_to = "dan@drzwebdev.com";
		$email_subject = "StreamYourAd Contact Form Submission: $form_subject";
		
		// For redirect after form submission
		//
		$home_page = "http://www.drzwebdev.com/sites/StreamYourAd/";
		
		// Call form data
		//
		$name = $_POST["name"];
		$email_from = $_POST["email"];
		$comments = $_POST["comments"];
		
		// Begin message content
		//
		$email_message = "New inquiry submitted.\n\n";
		
		function clean_string($string) {
			$bad = array("content-type", "bcc:", "to:", "cc:", "href");
			return str_replace($bad, "", $string);
		}
		
		// Fill email content
		//
		$email_message .= "Name: " . clean_string($name) . "\n";
		$email_message .= "Email: " . clean_string($email_from) . "\n";
		$email_message .= "Comments: " . clean_string($comments) . "\n";
		
		// Create email headers
		//
		$headers = "From: " . $email_from . "\r\n" . "Reply-To: " . $email_from . "\r\n" . "X-Mailer: PHP/" . phpversion();
		
		// Send email and redirect back to Home page
		//
		@mail($email_to, $email_subject, $email_message, $headers);
		@header("Location: $home_page");
		
	}
	
?>
