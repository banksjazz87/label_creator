const express = require('express');
const app = express();
const port = 4500;
//const path = require('path');

app.use('/', express.static('build'));

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})