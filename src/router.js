const express = require('express');
const morgan = require('morgan');

const router = express.Router();

const manager = require('./dirManager');

router.use(morgan('tiny'));

router.get('/photos/allphotoinfo', (req, res) => {
    manager.getImgInfos((err, imgInfos) => {
        res.json(imgInfos);
    });
});

module.exports = router;