const async = require('async');
const fs = require('fs');
const jpg = require('random-jpeg');

const reader = require('../src/imgReader');

const fullsizeImagePath = "tempFullsize/image1.jpg";
const thumbnailImagePath = "tempThumbnail/image1.jpg";
const fullsizeDir = "tempFullsize";
const thumbnailDir = "tempThumbnail";

describe("Image info reader", () => {

    beforeAll((done) => {
        async.series([
            (cb) => {setupImgDir(fullsizeDir, cb)},
            (cb) => {setupImgDir(thumbnailDir, cb)},
            (cb) => {setupImages(fullsizeImagePath, 800, 600, cb)},
            (cb) => {setupImages(thumbnailImagePath, 200, 150, cb)}
        ], (err) => {
            if (err) {
                console.error("Error setting up test images", err);
            }
            done();
        });
    });

    afterAll((done) => {
        async.series([
            (cb) => {removeImage(fullsizeImagePath, cb)},
            (cb) => {removeImage(thumbnailImagePath, cb)},
            (cb) => {removeDir(fullsizeDir, cb)},
            (cb) => {removeDir(thumbnailDir, cb)}
        ], (err) => {
            if (err) {
                console.error("Error tearing down test images/directories", err);
            }
            done();
        });
    });

    it("returns image info with correct fullsize filename", (done) => {
        reader.getImageInfo(`./${fullsizeImagePath}`, `./${thumbnailImagePath}`, (imgInfo) => {
            expect(imgInfo.src).toEqual("image1.jpg");
            done();
        });
    });

    it("returns image info with correct thumbnail filename", (done) => {
        reader.getImageInfo(`./${fullsizeImagePath}`, `./${thumbnailImagePath}`, (imgInfo) => {
            expect(imgInfo.thumbnail).toEqual("image1.jpg");
            done();
        });
    });

    it("returns image info with correct fullsize width and height", (done) => {
        reader.getImageInfo(`./${fullsizeImagePath}`, `./${thumbnailImagePath}`, (imgInfo) => {
            expect(imgInfo.w).toBe(800);
            expect(imgInfo.h).toBe(600);
            done();
        });
    });

    it("returns image info with correct thumbnail width and height", (done) => {
        reader.getImageInfo(`./${fullsizeImagePath}`, `./${thumbnailImagePath}`, (imgInfo) => {
            expect(imgInfo.thumbW).toBe(200);
            expect(imgInfo.thumbH).toBe(150);
            done();
        });
    });
});

function setupImgDir(path, done) {
    fs.mkdir(`./${path}`, (err) => {
        if(err) {
            console.error("Error creating test directory", err);
        }
        done();
    });
}

function setupImages(path, w, h, done) {
    let imageOptions = {
        colors: [[0,0,0]],
        width: w,
        height: h,
        columns: 1,
        rows: 1,
        allowSameColorTouch: false,
        quality: 100
    };
    jpg.writeJPEG(`./${path}`, imageOptions, (err) => {
        if(err) {
            console.error("Error creating test image", err);
        }
        done();
    });
}

function removeImage(path, done) {
    fs.unlink(`./${path}`, (err) => {
        if(err) {
            console.error("Error while deleting test image", err);
        }
        done();
    });
}

function removeDir(path, done) {
    fs.rmdir(`./${path}`, (err) => {
        if(err) {
            console.error("Error while deleting test directory", err);
        }
        done();
    });
}