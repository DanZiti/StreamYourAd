const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/api', apiRoutes);

app.use((req, res) => {
	res.status(404);
	res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(port, () => {
	console.log(`StreamYourAd booted up on port ${port}`);
});