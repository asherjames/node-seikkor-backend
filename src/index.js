const async = require('async');
const express = require('express');
const _ = require('lodash');

const config = require('../conf/config.json');
const scanner = require('./dirScanner');

const app = express();


app.get('/seikkor/photos', (req, res) => {
    let imageInfos = {};
    async.series([
            (cb) => {scanner.getAllFilenames(config.fullsizeImagePath, cb)},
            (cb) => {scanner.getAllFilenames(config.thumbnailImagePath, cb)}
        ], 
        (err, results) => {
            compareDirs(results[0], results[1])
    });
    res.json(imageInfos);
});

app.listen(3000, () => {
	console.log("Seikkor API listening on 3000...");
});

function compareDirs(fulls, thumbs) {
    let noThumbs = fulls.filter((item) => {
        return !_.includes(thumbs, item);
    });

    if(noThumbs.length) {
        
    }
}