const async = require('async');
const fs = require('fs');
const jpg = require('random-jpeg');

const reader = require('../src/imgReader');

describe("Image info reader", () => {
    const fullsizePath = "tempFullsize/image1.jpg";
    const thumbnailPath = "tempThumbnail/image1.jpg";

    beforeEach((done) => {
        async.parallel([
            (cb) => {setupImages(fullsizePath, 800, 600, cb)},
            (cb) => {setupImages(thumbnailPath, 200, 150, cb)}
        ], (err) => {
            if (err) {
                console.error("Error setting up test images", err);
            }
            done();
        });
    });

    afterEach((done) => {
        removeImages(done);
    });

    it("returns image info with correct filename", (done) => {
        reader.getImageInfo(fullsizePath, thumbnailPath, (imgInfo) => {
            expect(imgInfo.src).toEqual("image1.jpg");
            done();
        })
    });
});

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
    jpg.writeJPEG(path, imageOptions, (err) => {
        if (err) {
            console.error("Error creating test image", err);
        }
        done();
    });
}

function removeImages(done) {

}