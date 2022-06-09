const express = require("express");
const router = require('express').Router();
const dbo = require('../Dao')
const multer = require('multer');
const ObjectId = require("mongodb").ObjectId;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storage })

router.get("/events", async (req, res) => {
    let db_con = dbo.getDb();
    let { id, type, limit, page } = req.query;
    if (id != undefined) {
        let myquery = { _id: ObjectId(id) };
        db_con.collection("events").findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }

    else if (limit != undefined && page != undefined) {
        limit = parseInt(limit);
        page = parseInt(page);
        db_con.collection("events").find().sort({ schedule: -1 }).skip(page).limit(limit).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });;
    }
});


router.post("/events", upload.single('eventImage'), async (req, res) => {

    const event = {
        type: req.body.type,
        uid: req.body.uid,
        name: req.body.name,
        tagline: req.body.tagline,
        schedule: new Date(req.body.schedule),  //Date Formate -> 2020-01-21
        images: [req.file.path],
        description: req.body.description,
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: req.body.rigor_rank,
        attendees: [...req.body.attendees],
    }

    let db_con = dbo.getDb();

    db_con.collection("events").insertOne(event, (err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});

router.patch("/events/:id", (req, res) => {
    let db_con = dbo.getDb();
    const id = req.params.id;
    let myquery = { _id: ObjectId(id) };
    const newValues = req.body;

    db_con.collection("events").updateOne(myquery, { $set: { ...newValues } }, (err, result) => {
        if (err)
            throw err;
        res.json(result);
    })
});


router.delete("/events/:id", (req, res) => {
    let db_con = dbo.getDb();
    const id = req.params.id;
    let myquery = { _id: ObjectId(id) };
    db_con.collection("events").deleteOne(myquery, (err, result) => {
        if (err)
            throw err;
        res.json(result);
    })
});


module.exports = router;

