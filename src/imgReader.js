const async = require('async');
const path = require('path');
const sizeOf = require('image-size');

module.exports.getImageInfo = (fullPath, thumbPath, cb) => {
    async.parallel([
        (asyncCb) => {
            getImageSize(thumbPath, asyncCb);           
        },
        (asyncCb) => {
            getImageSize(thumbPath, asyncCb);                       
        }
    ], (err, results) => {
        let imgName = path.basename(fullPath);
        let imgInfo = {
            src: imgName,
            thumbnail: imgName,
            w: results[0].width,
            h: results[0].height,
            thumbW: results[1].width,
            thumbH: results[1].height
        };
        cb(imgInfo);
    });
}

function getImageSize(path, asyncCb) {
    sizeOf(path, (err, dim) => {
        if(err) {
            console.error("Error reading image information", err);
            return;
        }
        asyncCb(dim);
    });
}