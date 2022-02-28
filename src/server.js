const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;
const MongoClient = require("mongodb").MongoClient;

require('dotenv').config();
console.log(process.env.TESTING);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('build'));

//all information pertaining to connecting to Mongo.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

//inserts a new pack slip into the database.
async function insertNewPackSlip(currentData) {
    try {
        await client.connect();
        const database = client.db('senecaPrinting');
        const slip = database.collection('packSlips');
        const result = await slip.insertOne(currentData);
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
    }finally{
        await client.close();
    }
}


let currentData = {};
let allData = [];

//Route for the post request for the label creator page.
app.post('/shipping_creator/data', (req, res) => {
    currentData = req.body;
    allData.unshift(currentData);
    insertNewPackSlip(currentData);
    console.log(allData);
    console.log(`current data type = ${typeof(currentData)}`)
})


const searchDataArray = [];

/**
 * 
 * @param {*} searchData 
 * This function is used to update the searchDataArray and provide information for the /options/data page.
 */
async function fetchPastPackSlips(searchData){

    try{
        await client.connect();
        const database = client.db('senecaPrinting');
        const slip = database.collection('packSlips');
        let result = slip.find(searchData);
        
        if((await result.count()) === 0){
            console.log("No documents found");
        }
        await result.forEach((item) => {
            searchDataArray.push(item)
        });
    }catch(e){
        console.log('error', e)
    }finally {
        await client.close();
    }
}

//Route for the search request on the options page.
app.post('/options/data', (req, res, next) => {
    let optionData = req.body;
    fetchPastPackSlips(optionData);
    console.log(optionData);
    next();
})

//Route for the search data
app.get('/options/data', (req, res, next) => {
    res.send(searchDataArray);
    next();
})

//Route for all of the data
app.get('/allData', (req, res, next) => {
    res.send(allData);
    next();
})

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})