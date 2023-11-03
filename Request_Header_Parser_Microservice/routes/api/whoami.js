const express =  require('express');
router = express.Router();




router.route('/whoami')
    .get((req, res) => {  
        res.json({
            ipaddress:  req.ip,
            language: req.headers['accept-language'],
            software: req.headers['user-agent']
        });  
    });


    module.exports = router