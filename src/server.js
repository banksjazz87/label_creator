const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;
//const path = require('path');

app.use(cors());
app.use('/', express.static('build'));

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})