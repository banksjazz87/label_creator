const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;
const MongoClient = require("mongodb").MongoClient;
const {ObjectId} = require('mongodb');

require('dotenv').config();
console.log(process.env.TESTING);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('build'));

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})

//all information pertaining to connecting to Mongo.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let currentData = {};
let allData = [];
//Route for the post request for the label creator page.
app.post('/shipping_creator/data', (req, res) => {
    currentData = req.body;
    removeId(currentData, "_id");
    allData.unshift(currentData);
    updatePastPackSlip(currentData);
})

//This post request will delete the current item from the database.
app.post('/delete_current_item', (req, res, next) => {
    currentData = req.body;
    deletePastPackSlip(currentData, "_id");
    next();
})

let searchDataArray = [];
/**
 * 
 * @param {*} searchData 
 * This function is used to update the searchDataArray and provide information for the /options/data page.
 */
async function fetchPastPackSlips(searchData){
    searchDataArray = [];

    try {
        await client.connect();
        const database = client.db('senecaPrinting');
        const slip = database.collection('packSlips');
        let result = slip.find(searchData);
        
        if ((await result.count()) === 0) {
            console.log("No documents found");
        }
        await result.forEach((item) => {
            searchDataArray.push(item)
        });
    } catch(e) {
        console.log('error', e)
    } finally {
        await client.close();
    }
}

//This will remove the _id field if it exists
const removeId = (object, id) => {
    if (object[id]) {
        console.log('index was present');
        return delete object[id];
    }else{
        console.log('index was NOT present')
        return;
    }
}
//Update method for the database, this is going to first take the information from the current pack slip that is being revised.  It's going to check that it has a currentId, po and job in the database.
async function updatePastPackSlip(currentObject){
    try {
        await client.connect();

        const database = client.db('senecaPrinting');
        const slip = database.collection('packSlips');
        const filter =  {'Job': currentObject.Job, 'PO': currentObject.PO, 'shipTo.company': currentObject.shipTo.company };
        const updateDoc = currentObject;
        const options = {upsert: true};

        const result = await slip.replaceOne(filter, updateDoc, options);
        console.log(`${result.matchedCount} documents matched the filter, updated ${result.modifiedCount} documents`);

    } finally {
        await client.close();
    }
}

//Delete method for the database, this is going to get the current _id from the item that has been selected.
async function deletePastPackSlip(currentObject, key){
    try {
        await client.connect();

        const database = client.db('senecaPrinting');
        const slip = database.collection('packSlips');
        const currentIndex = currentObject[key];
        const currentDoc = {'_id': ObjectId(currentIndex)};

        const result = await slip.deleteOne(currentDoc);
        console.log(currentIndex);
        if (result.deletedCount === 1) {
            console.log('One document has been deleted');
        } else {
            console.log('no document found');
        }
        /*console.log(currentIndex);
        console.log(currentDoc);
        console.dir(result.resultCount);*/

    } catch(e) {
        console.log('error', e)
    } finally {

    }
}

//Route for the search request on the options page.
app.post('/options/data', (req, res, next) => {
    let optionData = req.body;
    fetchPastPackSlips(optionData);
    res.send(searchDataArray);
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

//Route for all of the data pertaining to the search results for what the user is looking for.
let confirmedSelection;
app.post('/chosen/data', (req, res, next) => {
    confirmedSelection = req.body;
    res.send(confirmedSelection);
    next();
})

app.get('/chosen/data', (req, res, next) => {
    res.send(confirmedSelection);
    next();
})