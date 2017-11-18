const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mailer = require('express-mailer');
const favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mailer.extend(app, {});

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// @TODO: FIGURE OUT WHY THE THING WON'T SEND... :sadpanda:
// @TODO: TRY https://nodemailer.com/about/ SO WE CAN GET RID OF email.pug
app.post('/api/contact', (req, res) => {
    const { name, email, subject, comments } = req.body;
    app.mailer.send('email', {
        to: 'dan.zervoudakes@gmail.com',
        subject: subject,
        from: email,
        replyTo: email
    }, err => {
        if (!err) res.send(req.body);
        if (err) {
            res.send(err);
            res.status(500);
        }
    });
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(3000, () => {
    console.log('StreamYourAd booted up on port 3000');
});