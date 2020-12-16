const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()
const port = 3000

// mongoDB
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/test');

// app.use('/', proxy({
//     target: 'http://localhost:8080',
//     changeOrigin: true,
//     onProxyRes: function (proxyRes, req, res) {
//         res.header('Access-Control-Allow-Origin', '*')
//     }
// }))

app.use(express.static('../views'))
app.use(express.static('../../dist'))

app.post('/server', (req, res) => {
    res.send('hello greg')
})
app.post('/server/supplier/search', (req, res) => {
    const data = [...(function () {
        let data = []
        for (let i = 0; i < 30; i++) {
            let no = Math.floor(Math.random() * 1000000)
            data.push({
                supplierName: `Supplier ${no}`,
                supplierCode: `${no}`,
                supplierAddress: `梧桐路 ${no} 号`,
                activeEndDate: new Date().toLocaleDateString(),
                supplierMaster: `SupplierMater ${no}`,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            })
        }
        return data
    }()), {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }]
    res.send(data)
})
app.get('/server/supplier/search', (req, res) => {
    console.log('search get')
    res.send('hello greg4')
})

app.use((req, res) => {
    res.send('Don\'t found route')
})

app.listen(port, () => console.log(`Start Express Server on port ${port}!`))
