const async = require('async');
const express = require('express');
const _ = require('lodash');
const Thumbnail = require('thumbnail');

const fullPath = require('../conf/config.json').fullsizeImagePath;
const thumbPath = require('../conf/config.json').thumbnailImagePath;
const maxSize = require('../conf/config.json').maxThumbnailSize;
const scanner = require('./dirScanner');

const app = express();


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

function compareDirs(fulls, thumbs) {
    let noThumbs = fulls.filter((item) => {
        return !_.includes(thumbs, item);
    });

    if(noThumbs.length) {
        updateThumbs(noThumbs);
    }
}

function updateThumbs(noThumbs) {
    let thumb = new Thumbnail(fullPath, thumbPath);

    if(noThumbs.length) {
        async.each(noThumbs, (item, done) => {
            
        });
    }    
}