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

app.listen(port, () => {
    console.log(`App listening at http://localhost: ${port}`);
})

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

    if (currentData.changing) {
        updatePastPackSlip(currentData._id, currentData.PO, currentData.Job, currentData);
    } else {   
        insertNewPackSlip(currentData);
    }
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

//Update method for the database, this is going to first take the information from the current pack slip that is being revised.  It's going to check that it has a currentId, po and job in the database.
async function updatePastPackSlip(currentId, po, job, currentObject){
    try{
        await client.connect();
        const database = client.db('senecaPrinting');
        const slip = database.collection('packSlips');
        
        const filter = {"_id": currentId, "PO": po, "Job": job};
        const options = {upsert: true};

        const updateDoc = {
            $set: {
                shipFrom: currentObject.shipFrom, 
                shipTo: currentObject.shipTo, 
                skid: currentObject.skid, 
                PO: currentObject.PO,
                Job: currentObject.job,
                lines: currentObject.lines,
                date: currentObject.date,
                totalCartons: currentObject.totalCartons,
                totalQty: currentObject.totalQty,
                numberOfLinesSubmitClicked: currentObject.numberOfLinesSubmitClicked,
                submitClicked: currentObject.submitClicked,
                showSkidHeader: currentObject.showSkidHeader,
                changing: currentObject.changing,
                lines_input: currentObject.lines_input,
                clicked: currentObject.clicked,
            }
        }
        const result = await slip.updateOne(filter, updateDoc, options);

        console.log(`${result.matchedCount} documents matched the filter, updated ${result.modifiedCount} documents`);

    } finally {
        await client.close();
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