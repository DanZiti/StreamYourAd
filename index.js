const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/contact', (req, res) => {
    const { name, email, subject, comments } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'dan.zervoudakes@gmail.com',
            clientId: '286048389250-86g4pd8jcdes2j6sqtuqbq4s4d3vug7v.apps.googleusercontent.com'//,
            // clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
            // refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
            // accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
            // expires: 1484314697598
        }
    });
    const opts = {
        from: `${name} <${email}>`,
        to: 'dan.zervoudakes@gmail.com',
        subject: `New 'StreamYourAd' inquiry submitted: ${subject}`,
        html: `<p style="font-weight: bold;">${name}'s comments are below:</p><p>${comments}<p>`
    };
    transporter.sendMail(opts, (error, info) => {
        if (error) return console.log(error);
        return console.log('StreamYourAd email sent.');
    });
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(3000, () => {
    console.log('StreamYourAd booted up on port 3000');
});