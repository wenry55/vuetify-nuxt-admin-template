const express = require('express')
const route = require('./route')
const app = express()

// paths are appended to the base url '/api'
app.get('/', function (req, res) {
    res.send('API root')
})

// register routes 
route(app)

// configure /api/* path to redirect to express server
module.exports = {
    path: '/api',
    handler: app
}