const express = require('express');

const app = express();

app.get('/is_alive', (req, res) => res.send(200));
app.get('/is_ready', (req, res) => res.send(200));