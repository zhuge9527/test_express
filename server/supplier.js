const Supplier = require('./mongodb/mongoose').Supplier
module.exports = (app) => {
    app.route('/server/supplier')
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
            Supplier.create({'name': 'user004'}, (err, data) => {
                if (err) {
                    console.log(err)
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

    // const data1 = [...(function () {
    //     let data = []
    //     for (let i = 0; i < 30; i++) {
    //         let no = Math.floor(Math.random() * 1000000)
    //         data.push({
    //             supplierName: `Supplier ${no}`,
    //             supplierCode: `${no}`,
    //             supplierAddress: `梧桐路 ${no} 号`,
    //             activeEndDate: new Date().toLocaleDateString(),
    //             supplierMaster: `SupplierMater ${no}`,
    //             date: '2016-05-02',
    //             name: '王小虎',
    //             address: '上海市普陀区金沙江路 1518 弄'
    //         })
    //     }
    //     return data
    // }()), {
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    // }, {
    //     date: '2016-05-04',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1517 弄'
    // }, {
    //     date: '2016-05-01',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1519 弄'
    // }, {
    //     date: '2016-05-03',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1516 弄'
    // }]
    // res.send(data1)
}