const express = require('express')
const app = require('express')()
const port = 3000

// static file
app.use(express.static('../public'))
app.use('/static', express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/server', (req, res) => {
    res.send('hello greg')
})

// route and server
require('./server/user')(app)
require('./server/supplier')(app)
require('./server/login')(app)

// 404
app.use((req, res) => {
    res.send('Don\'t found route')
})

app.listen(port, () => console.log(`Start Express Server on port ${port}!`))
