const express = require('express');
const router = express.Router();
const User = require('../../models/User');



router.route('/users')
    .get( async (req, res) => {

        const allUsers =  await User.find({}).select(["username", "_id", "__v"]);
        res.json(allUsers)
    })
    .post(async (req, res) => {

        const username = req.body.username;
        const result = await User.create({ username: username, count: 0, });
        res.json({ username: username,_id: result.id});

    })


router.route('/users/:id/exercises')
    .post(async (req, res) => {
        
        
        const user = await User.findOne({_id: req.params.id});
        user.count = user.count + 1;
        
        const dateSet = () => {
            if(req.body.date){
                return  new Date(req.body.date).toDateString()
            } else {
                return new Date().toDateString()
            }
        } 

        const exercise = {
            description: req.body.description,
            duration: req.body.duration,
            date: dateSet()
        }

        user.log.push(exercise)
        await user.save()
        
        res.json(user)

    })

router.route('/users/:id/logs')
    .get(async (req, res) => {

        const user = await User.findOne({_id: req.params.id})
        const startDate = new Date(req.query.from);
        const endDate = new Date(req.query.to);
        const limit = Number(req.query.limit);

        const filterUser = {
             _id: user._id, 
             username: user.username, 
             from: startDate.toDateString(), 
             to: endDate.toDateString(), 
             count: user.count
            };

        if (req.query.from && req.query.to) {
            const log = user.log.filter((p) => {
                const date = new Date(p.date);
                return date >= startDate && date <= endDate
            })

            if (limit) {
                const logLimit = log.slice(0, limit);
                filterUser["log"] = logLimit;
                return res.json(filterUser)
            } else {
                filterUser["log"] = log;
                return res.json(filterUser)
            }
        } else {
            return res.json(user)
        }

    })




module.exports = router




