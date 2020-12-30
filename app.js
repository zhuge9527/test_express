const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.all('*',(req, res, next) => {
    next()
})
// static file
// const publicPath = path.resolve('./public')
const publicPath = path.resolve('../test_vue/dist')
app.use(express.static(publicPath))

// resolve and generate req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.all('*',(req, res, next) => {
    next()
})
// resolve cookies or body
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// route and server
const loginRouter = require('./server/route/login')
const supplierRouter = require('./server/route/supplier')
const userRouter = require('./server/route/user')

app.use(loginRouter)
app.use('/server/supplier', supplierRouter)
app.use('/server/user', userRouter)

app.listen(port, () => console.log(`Start Express Server on port ${port}!`))
