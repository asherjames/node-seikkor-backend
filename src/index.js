const async = require('async');
const express = require('express');

const fullPath = require('../conf/config.json').fullsizeImagePath;
const thumbPath = require('../conf/config.json').thumbnailImagePath;
const scanner = require('./dirScanner');

const app = express();

const logger = (req, res, next) => {
    console.log("Request received...");
    next();
};

app.use(logger);

app.get('/seikkor/photos', (req, res) => {
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

app.listen(3000, () => {
	console.log("Seikkor API listening on 3000...");
});