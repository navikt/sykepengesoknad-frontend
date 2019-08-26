const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/is_alive', (req, res) => res.status(200).send('Application is alive!'));
app.get('/is_ready', (req, res) => res.status(200).send('Application is ready!'));

app.listen(3000);