const User = require('../mongodb/mongoose').User
const fs = require('fs')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
    if (!req.cookies['session_id']) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('./public/index.html', 'utf-8', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        })
        // res.render()
    } else {
        next()
    }
})

router.all('/*', (req, res, next) => {
    if (req.url === '/server/loginIn') {
        next()
        return
    }
    const sessionId = req.cookies['session_id']
    const resultData = {
        status: '404',
        success: false,
        message: '登录信息过期，请重新登录'
    }
    if (!sessionId) {
        res.send(resultData)
        return
    }
    User.findOne({'session_id': sessionId}, (err, user) => {
        if (!err && user) {
            const expireDate = user['session_expire_date']
            if (expireDate && expireDate.getTime() - Date.now() > 0) {
                next()
                return
            }
        }
        resultData.message = (err && err.message) || resultData.message
        res.send(resultData)
    })
})

router.get('/server/loginOut', (req, res) => {
    const sessionId = req.cookies['session_id']
    User.findOne({'session_id': sessionId}, (err, data) => {
        if (!err) {
            data.set('session_id', undefined)
            data.save(err => {
                console.log(err)
            })
            res.send('登出成功')
        }
    })
})
router.post('/server/loginIn', (req, res) => {
    const param = req.body
    let criteria = {
        name: param.username || param.name,
        password: param.password
    }
    const resData = {
        success: false,
        message: undefined,
        data: undefined
    }
    if (!(criteria.name || criteria.password)) {
        resData.message = '请输入账号和密码'
        res.send(resData)
    } else {
        User.findOne({name: param.username}, (err, data) => {
            if (err) {
                resData.message = err.message
                res.send(resData)
                return
            }
            if (data) {
                if (data.password === param.password) {
                    const sessionId = '123-123-' + Date.now()
                    const activeDate = new Date(Date.now() + 60 * 60 * 1000)
                    res.cookie('session_id', sessionId, {
                        expires: activeDate,
                        httpOnly: true
                    })
                    data.set('session_id', sessionId)
                    data.set('session_expire_date', activeDate)
                    if (!data.username) {
                        data.set('username', data.name)
                    }
                    data.save(err => {
                        console.log(err)
                    })
                    resData.success = true
                } else {
                    resData.message = '密码错误！'
                }
            } else {
                resData.message = '账号不存在！'
            }
            res.send(resData)
        })
    }
})
router.post('/server/loginUp', (req, res) => {
    const param = req.body
    let criteria = {
        name: param.username || param.name,
        password: param.password
    }
    const resData = {
        success: false,
        message: undefined,
        data: undefined
    }
    if (!(criteria.name || criteria.password)) {
        resData.message = '请输入账号和密码'
        res.send(resData)
    } else {
        User.findOne({name: param.username}, (err, data) => {
            if (err) {
                resData.message = err.message
                res.send(resData)
                return
            }
            if (data) {
                resData.message = '该账号已存在！'
                res.send(resData)
            } else {
                const newUser = new User({
                    name: param.username || param.name,
                    username: param.username || param.name,
                    password: param.password
                })
                newUser.save(err => {
                    if (!err) {
                        resData.success = true
                        resData.message = '创建成功，请尝试登录'
                    } else {
                        resData.message = `注册失败, ${err.message}`
                    }
                    res.send(resData)
                })
            }
        })
    }
})

exports = module.exports = router
