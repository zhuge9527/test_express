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
    session_id: String,
    session_expire_date: Date
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})
const User = mongoose.model('user', UserSchema, 'user');

const SupplierSchema = new Schema({
    name: String,
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    telephone: String,
    legalRepresentative: String,
    postcodeNumber: {type: String, length: 6},
    dateOfRegistration: Date,
    bankOfDeposit: String,
    organizationCode: String,
    director: String,
    companyWebsite: String,
    productsAndServices: Array(String),
    effectiveTime: Array(Date),
    remark: String,
    address: String,
    expire_date: Date,
    master: String,
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})
const Supplier = mongoose.model('supplier', SupplierSchema, 'supplier')

module.exports = {
    User,
    Supplier
}
