const async = require('async');
const _ = require('lodash');
const Thumbnail = require('thumbnail');

const maxSize = require('../conf/config.json').maxThumbnailSize;
const fullPath = require('../conf/config.json').fullsizeImagePath;
const thumbPath = require('../conf/config.json').thumbnailImagePath;
const reader = require('./dirReader');
const scanner = require('./dirScanner');

module.exports.getImgInfos = (cb) => {
    let imageInfos = {};
    async.series([
            (cb) => {scanner.getAllFilenames(fullPath, cb)},
            (cb) => {scanner.getAllFilenames(thumbPath, cb)}
        ], 
        (err, results) => {
            compareDirs(results[0], results[1]);
    });
    cb(null, imageInfos);
}


function compareDirs(fulls, thumbs) {
    let noThumbs = fulls.filter((item) => {
        return !_.includes(thumbs, item);
    });

    if(noThumbs.length) {
        updateThumbs(noThumbs);
    }
}

function updateThumbs(noThumbs) {
    if(noThumbs.length) {
        async.each(noThumbs, (item, done) => {
            reader.getImageSize(`${fullPath}/${item}`, (err, dim) => {
                if(err) {
                    console.error("Error getting image size", err);
                }
                generateThumb(item, dim);
            }) 
        });
    }    
}

function generateThumb(img, dim) {
    let thumb = new Thumbnail(fullPath, thumbPath);
    let width = null;
    let height = null;
    if (dim.width > dim.height) {
        width = maxSize;
    } else {
        height = maxSize;
    }
    thumb.ensureThumbnail(img, width, height, (err, thumbName) => {
        if (err) {
            console.error("Error creating thumbnail", err);
        }
        console.log(`Created thumbnail ${thumbName}`);
    });
}