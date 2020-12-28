const User = require('./mongodb/mongoose').User
const express = require('express')
const router = express.Router()

router.all((req,res,next) => {
    debugger
    next()
})
router.get((req,res,next) => {
    debugger
    next()
})
router.get('/server/user', (req, res) => {
    console.log(req.body)
    let criteria = {
        name: req.query.username || req.query.name,
        _id: req.query.id || req.query.userId
    }
    if (!(criteria.name || criteria._id)) {
        res.send({success: false})
    }
    User.findOne(criteria, (err, data) => {
        if (err) {
            console.log(err)
            debugger
            res.send({success: false})
        } else {
            res.send({
                success: true,
                data
            })
        }
    })
})
router.post((req, res) => {
    console.log(req.body)
    // const user = new User({
    //     name: '003',
    //     username: 'user003',
    //     password: 'user003',
    //     admin: true
    // })
    // user.save({}, (err) => {
    //     if (!err) {
    //         console.log(err)
    //     }
    // })
    User.create({'name': 'user004'}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})
router.put((req, res) => {
    console.log(req.body)
    User.findOne({name: 'greg'}, (err, data) => {
        if (data) {
            debugger
            User.update()
        }
    })
})
router.patch((req, res) => {
    console.log(req.body)
    User.findOne({name: 'greg'}, (err, data) => {
        if (data) {
            debugger
            User.update()
        }
    })
})
router.delete((req, res) => {
    console.log(req.body)
    User.delete({name: 'greg'}, (err, data) => {
        if (data) {
            res.send(`delete user ${data.name} success`)
        }
    })
})

exports = module.exports = router
