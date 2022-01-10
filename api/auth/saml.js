"use strict";
const fs = require('fs');
const saml2 = require('saml2-js');

const sp_options = {
  entity_id: "http://localhost:3000/api/saml/metadata.xml",
  private_key: fs.readFileSync("./api/auth/certs/key.pem").toString(),
  certificate: fs.readFileSync("./api/auth/certs/cert.pem").toString(),
  assert_endpoint: "http://localhost:3000/api/saml/acs",
  force_authn: true,
  auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:1.0:am:password"] },
  nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
  sign_get_request: true,
  allow_unencrypted_assertion: true
}

const sp = new saml2.ServiceProvider(sp_options);
const metadata = sp.create_metadata();
// Create identity provider
const idp_options = {
  sso_login_url: "https://authentik.codiplay.com/application/saml/localhost-3000-app/sso/binding/redirect/",
  sso_logout_url: "https://authentik.codiplay.com/logout",
  certificates: [fs.readFileSync("./api/auth/certs/auth-cert.pem").toString()],
  force_authn: true,
  sign_get_request: true,
  allow_unencrypted_assertion: true
};
const idp = new saml2.IdentityProvider(idp_options);

module.exports = function (app) {
  // assert endpoint

  app.route("/saml/acs").get(async function (req, res) {
    
    const saml_response = req.params.SAMLResponse;
    sp.redirect_assert(idp, idp_options, function (err, saml_response) {
      if (err != null) {
        console.log(err)
        return res.sendStatus(500);
      }
      // Save name_id and session_index for logout
      // Note:  In practice these should be saved in the user session, not globally.
      // name_id = saml_response.user.name_id;
      // session_index = saml_response.user.session_index;
      res.send("Hello #{saml_response.user.name_id}!");

    })
  })

  app.route("/saml/acs").post(function (req, res) {
    console.log('/saml/acs called ');

    var options = { request_body: req.body };
    if (req.session.authUser) {
      // res.send('already logged in');
      res.redirect('/dashboard')
      return;
    }

    sp.post_assert(idp, options, function (err, saml_response) {
      if (err != null) {
        console.log('error: ' + err);
        return res.sendStatus(500);
      }
      // Save name_id and session_index for logout
      // Note:  In practice these should be saved in the user session, not globally.
      // var name_id = saml_response.user.name_id;
      // session_index = saml_response.user.session_index;

      req.session.authUser = saml_response.user.name_id;
      // res.send(`Hello ${saml_response.user.name_id}!`);
      res.redirect('/dashboard');
    });
  })



  app.route("/saml/metadata.xml").get(async function (req, res) {
    res.set('Content-Type', 'text/xml');
    res.send(metadata);
  })

  app.route("/saml/login").get(async function (req, res) {

    sp.create_login_request_url(idp, { sign_get_request: true }, function (err, login_url, request_id) {
      if (err != null)
        return res.send(500);
      res.redirect(login_url);
    });
  })

  app.route("/saml/logout").get(async function (req, res) {
    const options = {
      name_id: name_id,
      session_index: session_index,
    }
    sp.create_logout_request_url(idp, options, function (err, logout_url) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.redirect(logout_url);
      }
    });
  })
}