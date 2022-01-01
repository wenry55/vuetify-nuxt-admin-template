const auth = require('../auth')


module.exports = function (app) {
    auth(app)
//    console.log('router called')

    
//     auth.imported()
//     app.route("/hello").get(auth.hello);

}