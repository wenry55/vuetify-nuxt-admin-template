const routeAuth = require('./auth')
const routeGoogleAuth = require('./google-auth')

module.exports = function(app) {
    routeAuth(app)
    routeGoogleAuth(app)
}

