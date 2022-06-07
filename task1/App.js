const express = require('express')
const mongodb = require('mongodb')
const { MongoClient } = require("mongodb");
const app = express()
var db;
let port = process.env.PORT || 3000;
let url = "mongodb://localhost:27017/eventdb";


MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Connection failed for some reason");
    }
    console.log("Connection established - All well");
    db = client.db();
});
// ------------------------------------------------------

app.use(express.json());
const eventR = require('./server/routes/events');
app.use('/api/v3/app/events', eventR);



// ------------------------------------------------------
app.listen(port, () => console.log(`App listening on port ${port}!`));