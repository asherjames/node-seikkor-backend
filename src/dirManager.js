const async = require('async');
const _ = require('lodash');
const Thumbnail = require('thumbnail');

const {maxThumbnailSize: maxSize,
       fullsizeImagePath: fullPath,
       thumbnailImagePath: thumbPath} = require('../conf/config.json');
const reader = require('./imgReader');
const scanner = require('./dirScanner');

module.exports.getImgInfos = (finalCb) => {
    let imageInfos = {};
    async.series([
            (cb) => {scanner.getAllFilenames(fullPath, cb)},
            (cb) => {scanner.getAllFilenames(thumbPath, cb)}
        ], 
        (err, results) => {
            compareDirs(results[0], results[1], (imageInfos) => {
                finalCb(null, imageInfos);
        });
    });
}


function compareDirs(fulls, thumbs, cb) {
    let noThumbs = fulls.filter((item) => {
        return !_.includes(thumbs, item);
    });
        
    async.series([
        (cb) => {updateThumbs(noThumbs, cb)},
        (cb) => {getData()}
    ], 
    (err, results) => {
        cb(results[0])
    });
}

function updateThumbs(noThumbs, cb) {
    if(noThumbs.length) {
        async.each(noThumbs, (item, done) => {
            reader.getImageSize(`${fullPath}/${item}`, (err, dim) => {
                if(err) {
                    console.error("Error getting image size", err);
                }
                generateThumb(item, dim);
            }) 
        }, (err) => {
            cb();
        });
    }    
}

function generateThumb(img, dim, done) {
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
        done();
    });
}

function getData(imgList, cb) {
    reader.getImageData(fullPath, thumbPath, (results) => {
        cb(results);
    });
}