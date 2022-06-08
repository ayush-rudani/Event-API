const express = require("express");
const router = require('express').Router();
const dbo = require('../Dao')
const multer = require('multer');

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
    db_con.collection("events").find({}).toArray((err, result) => {
        if (err)
            throw err;
        res.json(result);
    });
});

router.post("/events", upload.single('eventImage'), async (req, res) => {
    // console.log(req.file);
    // res.send(req.file);
    const event = {
        type: req.body.type,
        uid: req.body.uid,
        name: req.body.name,
        tagline: req.body.tagline,
        schedule: req.body.schedule,
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



module.exports = router;

