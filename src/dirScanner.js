const fs = require('fs');

module.exports.getAllFilenames = (path, callback) => {
    fs.readdir(path, (err, files) => {
        if(err) {
            console.error("Error reading directory", err);
        }
        callback(null, files);
    });
}