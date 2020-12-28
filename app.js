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
// const userRouter = require('./server/user')
// app.use('/server/user', userRouter)
require('./server/supplier')(app)
require('./server/login')(app)

app.listen(port, () => console.log(`Start Express Server on port ${port}!`))
