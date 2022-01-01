const routeAuth = require('./auth')

module.exports = function(app) {
    routeAuth(app)
}

