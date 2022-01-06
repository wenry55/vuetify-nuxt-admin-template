const auth = require('../auth')
const test = require('../test')


module.exports = function (app) {
    auth(app)
    test(app)
}