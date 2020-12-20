const mongoose = require('mongoose');
const url = 'mongodb://localhost/test_vue'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.warn('数据库连接失败：', err)
    }
})

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date,
    session_id: String,
    session_expire_date: Date
});
const User = mongoose.model('user', UserSchema, 'user');

console.log('End.')
module.exports = {
    User
}
