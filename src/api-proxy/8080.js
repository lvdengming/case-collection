const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from API 8080!');
});

app.get('/a', (req, res) => {
    console.log(req.headers);
    res.send('Hello from API 8080 A!');
});

app.get('/b', (req, res) => {
    res.send('Hello from API 8080 B!');
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
