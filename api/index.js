const express = require('express')

const app = express()

// paths are appended to the base url '/api'
app.get('/', function (req, res) {
    res.send('API root')
})

// configure /api/* path to redirect to express server
module.exports = {
    path: '/api',
    handler: app
}