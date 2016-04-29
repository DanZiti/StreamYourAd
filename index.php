<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>StreamYourAd | Promotion in Motion</title>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="msapplication-tap-highlight" content="no">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0">
		<meta name="description" content="Leverage the world's most advanced native ads platform to delight users with ads that blend seamlessly into your app's content.">
		<meta name="keywords" content="StreamYourAd, digital branding, social solutions, brand promotions, stream, ad, advertisement, promote, ads platform, app content, mobile, iOS, Android, Windows, HTML5">
		<meta name="author" content="Dan Zervoudakes, Genevieve Calingo">
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/style.css" media="all">
		<script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
		<script type="text/javascript" src="js/jquery-mouseable.min.js"></script>
		<script type="text/javascript" src="js/services.js"></script>
	</head>
	<body class="overflow-<?= ($_GET["formSubmitted"]) ? 'hidden' : 'visible' ?>">
		<?php
			if ($_GET["formSubmitted"]) { ?>
				<div id="successful-form-submission-overlay" class="successful-form-submission-overlay">
					<div class="enclosure">
						<button class="close-button">X</button>
						<h3>Thank you for your submission!</h2>
						<p>Someone will be in touch with you shortly.</p>
					</div>
				</div>
			<?php }
		?>
		<?php
			include 'includes/header.php';
			include 'includes/slider.php';
			include 'includes/about.php';
			include 'includes/services.php';
			include 'includes/contact.php';
			include 'includes/footer.php';
		?>
		<script type="text/javascript" src="js/stream-your-ad.js"></script>
	</body>
</html>