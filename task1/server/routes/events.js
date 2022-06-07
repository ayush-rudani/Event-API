const express = require("express");
const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send("Hello events");
});

module.exports = router;

