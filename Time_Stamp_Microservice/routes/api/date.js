const express = require('express');
router = express.Router();


router.route('/')
    .get((req, res) => {
        res.json({
            unix: new Date().getTime(),
            utc:  new Date().toUTCString()
            
        })
    })

router.route("/:id")
    .get( (req, res) => {

        const timestamp = req.params.id;

        if(!isNaN(Number(timestamp)) && timestamp.length === 13) {
            return res.json({
                unix: Number(timestamp),
                utc: new Date(Number(timestamp)).toUTCString(),
            })
        } 

        if ( new Date(timestamp).toUTCString() !== "Invalid Date") {
            return res.json({
                unix: new Date(timestamp).getTime(),
                utc: new Date(timestamp).toUTCString()
            })
        }

        res.json({error: "Invalid Date"})

        
        
    })



    module.exports = router