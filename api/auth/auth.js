"use strict";

module.exports = function (app) {

    app.route("/auth/hello").get(async function (req, res) {
        res.send('ello boy')
    })

    app.route("/auth/login").post(async function (req, res) {
        console.log('auth.js - login called')
        res.send({ status: 'login - ok'})
    })

    app.route("/auth/logout").post(async function (req, res) {
        console.log('auth.js - logout called')
        res.send({ status: 'ok' })
    })

    app.route("/auth/user").get(async function (req, res) {
        console.log('auth.js - user called')
        res.send({ user: 'bkseo' })
    })

    app.route("/auth/oidc/callback").post(async function (req, res) {
        console.log('auth openid callback post.')
        res.send({ user: 'post' })
    })

    app.route("/auth/oidc/callback").get(async function (req, res) {
        console.log('auth openid callback get.')
        // req.session.authUser = 'bkseo'
        res.send({ user: 'get' })
    })

}