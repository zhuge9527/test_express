const express = require('express')
const app = express()
const port = 3000

// static file
app.use(express.static('./public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
