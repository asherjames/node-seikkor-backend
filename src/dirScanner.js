const fs = require('fs');

module.exports.getAllFilenames = (path, cb) => {
    fs.readdir(path, (err, files) => {
        if(err) {
            console.error("Error reading directory", err);
            return;
        }
        cb(null, files);
    });
}