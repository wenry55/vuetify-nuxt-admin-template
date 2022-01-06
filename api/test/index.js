module.exports = function (app) {
    app.route("/test/n1").get(async function (req, res) {


        if (req.session.authUser) {
            res.send('already logged in');
            return;
        } else {
            res.redirect('/api/saml/login');
        }

    })

}