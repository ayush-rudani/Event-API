const mongo = require('mongodb');
const express = require('express');
const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/eventdb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("eventdb");
    // dbo.createCollection("events", function (err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    //     db.close();
    // });
});


