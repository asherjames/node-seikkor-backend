const express = require('express');
const router = express.Router();

const manager = require('./dirManager');

router.use((req, res, next) => {
    console.log(`Request received, ${Date.now()}`);
    next();
});

router.get('/photos/allphotoinfo', (req, res) => {
    manager.getImgInfos((err, imgInfos) => {
        res.json(imgInfos);
    });
});

module.exports = router;