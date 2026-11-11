const express = require('express');
const app = express();

// Middleware required to parse incoming form data from POST requests
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the EC2 Deployment Homepage!');
});

// 1. GET route: Renders the HTML form to the user
app.get('/hobby', (req, res) => {
    res.send(`
        <form method="POST" action="/hobby">
            <label>Name: <input type="text" name="userName" required></label><br>
            <label>Hobby: <input type="text" name="userHobby" required></label><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

// 2. POST route: Receives the form submission and extracts the variables
app.post('/hobby', (req, res) => {
    const { userName, userHobby } = req.body;
    res.send(`Hey ${userName} your hobby is ${userHobby}!!`);
});

// 3. Dynamic wildcard route (must stay at the bottom)
app.get('/:name', (req, res) => {
    res.send(`Welcome ${req.params.name}`);
});

module.exports = app;