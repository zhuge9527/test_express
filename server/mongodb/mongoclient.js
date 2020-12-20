const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test_vue'
const db = MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) {
        console.error(err)
    } else {
        console.log('connect correctly to server')
        return db
        // db.close()
    }
})
module.exports = db
module.exports = MongoClient
