const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// @TODO: MOVE NODEMAILER JANK INTO ITS OWN 'routes/api' DIRECTORY

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
			refreshToken: '1/2sQWV81orFTA7uIsv4WnCnT-SL1TkUq_vGBnJMrBFpo',
			accessToken: 'ya29.GluJBWH2KU-3Mvjc4yYG3Md1wRqMxuquRWwz1hiGRlKdULyr0o-e3yLuOL6KZNaT58EAfkkZi8zhs_lOOPTfMgpy7-xGIF9o1A2YlWoAit2GqG4xJ7sQlVpJ2y7W',
			expires: 1484314697598
		}
	});
	const opts = {
		from: `${name} <${email}>`,
		to: 'dan.zervoudakes@gmail.com',
		subject: `New 'StreamYourAd' inquiry submitted: ${subject}`,
		html: `
			<p><span style="font-weight: bold;">Name:</span> ${name}</p>
			<p><span style="font-weight: bold;">Email:</span> ${email}</p>
			<p><span style="font-weight: bold;">Comments:</span> ${comments}</p>
		`
	};
	transporter.sendMail(opts, (err, info) => {
		res.send(err ? err : info);
	});
});

app.use((req, res) => {
	res.status(404);
	res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(port, () => {
	console.log(`StreamYourAd booted up on port ${port}`);
});