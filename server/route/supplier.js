const Supplier = require('../mongodb/mongoose').Supplier
const express = require('express')
const router = express.Router()
router.all('*', (req, res, next) => {
    console.log(req.url + ' Method: ' + req.method)
    next()
})
router.post('/search', (req, res) => {
    Supplier.find(req.body, (err, data) => {
        if (err) {
            console.error(err)
            res.send(err.message)
        } else {
            res.send(data)
        }
    })
})
router.route('/')
    .get((req, res) => {
        Supplier.find({}, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })

    })
    .post((req, res) => {
        const supplierData = req.body
        Supplier.create(supplierData, (err, data) => {
            if (err) {
                res.status(500).send(err.stack)
            } else {
                res.send(data)
            }
        })
    })
    .put((req, res) => {
        Supplier.findOne({name: 'greg'}, (err, data) => {
            if (data) {
                debugger
                Supplier.update()
            }
        })
    })
    .delete((req, res) => {
        Supplier.delete({name: 'greg'}, (err, data) => {
            if (data) {
                res.send(`delete supplier ${data.name} success`)
            }
        })
    })
exports = module.exports = router

