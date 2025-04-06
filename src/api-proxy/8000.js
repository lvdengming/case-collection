const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from API 8000!');
});

app.get('/a', (req, res) => {
    res.send('Hello from API 8000 A!');
});

app.get('/b', (req, res) => {
    res.send('Hello from API 8000 B!');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
