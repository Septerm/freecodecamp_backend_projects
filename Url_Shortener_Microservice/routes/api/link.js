
const Link = require('../../models/Link');
const express = require('express');
const router = express.Router();
const dns = require("dns");


router.route('/shorturl')
    .post( async (req, res) => {

        const docCount = await Link.countDocuments({});
        const orignalUrl = req.body.url;
        const urlObject = new URL(orignalUrl);

        
        
        dns.lookup(urlObject.hostname, async (error, address) => {
  
            // if an error occurs, eg. the hostname is incorrect!
            if (error) {
              
              res.json({error: "invaild url"})
              
            } else {
              // if no error exists
              await Link.create({
                originalUrl: orignalUrl,
                newUrl: docCount
              });

              res.json({
                    original_url: orignalUrl,
                    short_url: docCount
              })
              
            }
        });

    })

router.route('/shorturl/:newurl')
    .get( async (req, res) => {
        
        const link = await Link.findOne({newUrl: req.params.newurl})
        res.redirect(link.originalUrl)
    })


module.exports = router
