const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/contact', (req, res) => {
	const { comments, email, name, subject } = req.body;
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: 'dan.zervoudakes@gmail.com',
			clientId: '286048389250-86g4pd8jcdes2j6sqtuqbq4s4d3vug7v.apps.googleusercontent.com',
			clientSecret: 'A29tNNT8dvOZK0ezVpOldI-0',
			refreshToken: '1/k0EwXre8wYPA9U5Bre62S7vtmKeOlYpShV5CJY0Cx8s',
			accessToken: 'ya29.Glt7BfLL4p_Zsrth73gv0aY-6K4NwbBSBgAU6YXAvuJlq5iNWsD4OC9QzsIx1qmnH3-pwgVDHf3Ua5-7OIRwoeG9OiS3ckLVPoTL1JiRk-nCbjz90iPjECPxel_8',
			expires: 1484314697598
		}
	});
	const opts = {
		from: `${name} <${email}>`,
		to: 'dan.zervoudakes@gmail.com',
		subject: `New 'StreamYourAd' inquiry submitted: ${subject}`,
		html: `<p style="font-weight: bold;">${name}'s comments are below:</p><p>${comments}<p>`
	};
	transporter.sendMail(opts, (error, info) => {
		console.log(error);
		console.log(info);
		res.send(error ? error : info);
	});
});

app.use((req, res) => {
	res.status(404);
	res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(port, () => {
	console.log(`StreamYourAd booted up on port ${port}`);
});