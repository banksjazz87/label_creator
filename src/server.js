const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;
const MongoClient = require("mongodb").MongoClient;

//const path = require('path');


require('dotenv').config();
console.log(process.env.TESTING);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('build'));

//all information pertaining to connecting to Mongo
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let currentData = {};
let allData = [];

//Route for the post request
app.post('/shipping_creator/data', (req, res) => {
    currentData = req.body;
    allData.unshift(currentData);

    const result = async() => await client.insertOne(currentData);
    
    result();

    console.log(`A document was inserted with the _id: ${result.insertId}`);

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