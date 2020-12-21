const express = require('express')
const app = require('express')()
const port = 3000

// static file
app.use(express.static('./public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// resolve cookies or body
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// route and server
require('./server/user')(app)
require('./server/supplier')(app)
require('./server/login')(app)

app.listen(port, () => console.log(`Start Express Server on port ${port}!`))
