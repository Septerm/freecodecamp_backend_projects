const express = require('express');
router = express.Router();
const multer = require('multer');
const upload = multer({});
path = require('path');

router.route('/fileanalyse')
    .post(upload.single('upfile'), (req, res) => {
        const name = req.file.originalname;
        const type = req.file.mimetype;
        const size = req.file.size;
        res.json({name: name, type: type, size:size})
    })

module.exports = router