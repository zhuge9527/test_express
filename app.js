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
const supplierRouter = require('./server/route/supplier')
const userRouter = require('./server/route/user')
const loginRouter = require('./server/route/login')

app.use('/server/supplier', supplierRouter)
app.use('/server/user', userRouter)
app.use(loginRouter)

app.listen(port, () => console.log(`Start Express Server on port ${port}!`))
