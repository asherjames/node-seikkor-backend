const async = require('async');
const fs = require('fs');

const scanner = require('../src/dirScanner');

const fullsizeDir = "tempFullsize";
const thumbnailDir = "tempThumbnail";

describe("Directory scanner", () => {
    beforeEach((done) => {
        setupImgDir(done);
    });

    afterEach((done) => {
        removeImgDir();
        done();
    });

    it("returns a list of length 5", (done) => {
        scanner.getAllFilenames(`${fullsizeDir}`, (err, files) => {
            console.log(files);
            expect(files.length).toBe(5);            
            done();
        });
    });
});

function setupImgDir(done) {
    fs.mkdir(`./${fullsizeDir}`, (err) => {
        if(err) {
            console.error("Error creating test directory", err);
        }
        createFiles(fullsizeDir, done);
    });
}

function createFiles(dir, done) {
    async.each([1,2,3,4,5], (item, asyncDone) => {
        fs.writeFile(`./${dir}/file${item}.txt`, 'test', (err) => {
            if (err) throw err;
            asyncDone();
        });
    }, (err) => {
            if(err) {
                console.error("Error writing test files");
            }
            done();
    });
}

function removeImgDir() {
    deleteDir(`./${fullsizeDir}`);
    deleteDir(`./${thumbnailDir}`);
}

function deleteDir(path) {
    if(fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
              let curPath = path + "/" + file;
              if(fs.lstatSync(curPath).isDirectory()) {
                deleteDir(curPath);
              } else {
                fs.unlinkSync(curPath);
              }
    });
    fs.rmdirSync(path);
  }
}