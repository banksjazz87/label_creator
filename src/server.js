const express = require('express');
const app = express();
const port = 4500;
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})