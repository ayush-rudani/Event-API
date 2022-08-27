const express = require('express')
const mongodb = require('mongodb')
const { MongoClient, Db } = require("mongodb");
const dbo = require('./server/Dao');
const app = express()
let db;
let port = process.env.PORT || 3000;

// let url = "mongodb://localhost:27017/eventdb";
// MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log("Connection failed for some reason");
//     }
//     console.log("Connection established - All well");
//     db = client.db();
// });
// module.exports.db = db;

// ------------------------------------------------------

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our events API' })
});

app.use(express.json());
const eventR = require('./server/routes/events');
app.use('/api/v3/app', eventR);



// ------------------------------------------------------
app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log(`App listening on port ${port}!`)
});

module.exports.app = app;