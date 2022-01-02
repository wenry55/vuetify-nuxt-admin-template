"use strict";
const { google } = require('googleapis');


const googleConfig = {
    clientId: '489923389160-mqk1crnpqkn941gvcddgdm47kq1qclpe.apps.googleusercontent.com',
    clientSecret: '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',
    redirect: 'http://localhost:3000/login'
}

module.exports = function (app) {
    app.route("/auth/google/user").get(async function (req, res) {
        console.log('google-auth.js - user called')
        res.send({ user: 'bkseo' })
    })
}