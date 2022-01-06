const routeAuth = require('./auth')
const routeSaml = require('./saml')
const routeGoogleAuth = require('./google-auth')

module.exports = function(app) {
    routeAuth(app)
    routeSaml(app)
    routeGoogleAuth(app)
}

