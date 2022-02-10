const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;
//const path = require('path');


require('dotenv').config();
console.log(process.env.TESTING);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('build'));

let currentData = {};
let allData = [];

//Route for the post request
app.post('/shipping_creator/data', (req, res) => {
    currentData = req.body;
    allData.unshift(currentData);

    console.log(allData);

})

//Route for all of the data
app.get('/allData', (req, res, next) => {
    res.send(allData);
    next();
})

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})