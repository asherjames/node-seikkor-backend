const async = require('async');
const express = require('express');

const config = require('../conf/config.json');
const scanner = require('./dirScanner');

const app = express();


app.get('/seikkor/photos', (req, res) => {
    async.series([
            (cb) => {scanner.getAllFilenames(config.fullsizeImagePath, cb)},
            (cb) => {scanner.getAllFilenames(config.thumbnailImagePath, cb)}
        ], 
        (err, results) => {
            compareDirs(results[0], results[1])
    });
});

app.listen(3000, () => {
	console.log("Seikkor API listening on 3000...");
});

const compareDirs = (full, thumb) => {
    console.log(full);
    console.log(thumb);
};