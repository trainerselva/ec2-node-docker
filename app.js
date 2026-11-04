const express = require('express');
const app = express();

// Path 1: Root welcome page
app.get('/', (req, res) => {
    res.send('Welcome to the EC2 Deployment Homepage!');
});

// Path 2: Dynamic name route
app.get('/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`Welcome ${userName}`);
});

module.exports = app;
