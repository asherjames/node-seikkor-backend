const async = require('async');
const express = require('express');
const router = express.Router();

const fullPath = require('../conf/config.json').fullsizeImagePath;
const thumbPath = require('../conf/config.json').thumbnailImagePath;
const scanner = require('./dirScanner');

router.use((req, res, next) => {
    console.log(`Request received, ${Date.now()}`);
    next();
});

router.get('/photos', (req, res) => {
    let imageInfos = {};
    async.series([
            (cb) => {scanner.getAllFilenames(fullPath, cb)},
            (cb) => {scanner.getAllFilenames(thumbPath, cb)}
        ], 
        (err, results) => {
            compareDirs(results[0], results[1]);
    });
    res.json(imageInfos);
});

module.exports = router;