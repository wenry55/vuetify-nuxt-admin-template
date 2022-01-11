import { OpenIDConnectScheme } from '~auth/runtime'

function getProp(holder, propName) {
  if (!propName || !holder || typeof holder !== "object") {
    return holder;
  }
  if (propName in holder) {
    return holder[propName];
  }
  const propParts = Array.isArray(propName) ? propName : (propName + "").split(".");
  let result = holder;
  while (propParts.length && result) {
    result = result[propParts.shift()];
  }
  return result;
}

function encodeQuery(queryObject) {
  return Object.entries(queryObject).filter(([_key, value]) => typeof value !== "undefined").map(([key, value]) => encodeURIComponent(key) + (value != null ? "=" + encodeURIComponent(value) : "")).join("&");
}

function parseQuery(queryString) {
  const query = {};
  const pairs = queryString.split("&");
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}

function normalizePath(path = "", ctx) {
  let result = path.split("?")[0];
  if (ctx && ctx.base) {
    result = result.replace(ctx.base, "/");
  }
  if (result.charAt(result.length - 1) === "/") {
    result = result.slice(0, -1);
  }
  result = result.replace(/\/+/g, "/");
  return result;
}

const DEFAULTS$1 = {
  name: "openIDConnect",
  responseType: "code",
  grantType: "authorization_code",
  scope: ["openid", "profile", "offline_access"],
  idToken: {
    property: "id_token",
    maxAge: 1800,
    prefix: "_id_token.",
    expirationPrefix: "_id_token_expiration."
  },
  codeChallengeMethod: "S256",
  refreshToken: {
    property: "refresh_token",
    maxAge: 60 * 60 * 24 * 30,
    prefix: "_refresh_token.",
    expirationPrefix: "_refresh_token_expiration."
  },
};

export default class Authentik extends OpenIDConnectScheme {

  constructor($auth, options, ...defaults) {

    super($auth, options, ...defaults, DEFAULTS$1);
    // this.idToken = new IdToken(this, this.$auth.$storage);
    // this.configurationDocument = new ConfigurationDocument(this, this.$auth.$storage);
  }

  updateTokens(response) {
    console.log('authentik.js - updateTokens')
    super.updateTokens(response);
    // const idToken = getProp(response.data, this.options.idToken.property);
    // if (idToken) {
    //   this.idToken.set(idToken);
    // }
  }

  check(checkStatus = false) {
    console.log('authentik.js - check')
    const response = {
      valid: false,
      tokenExpired: false,
      refreshTokenExpired: false,
      idTokenExpired: false,
      isRefreshable: true
    };
    const token = this.token.sync();
    console.log('authentik.js - check - token', token)
    // this.refreshToken.sync();
    console.log('authentik.js - check - refresh.sync', )
    this.idToken.sync();
    console.log('authentik.js - check - idtoken.sync',)
    if (!token) {
      console.log('authentik.js - check - not token')
      return response;
    }
    if (!checkStatus) {
      response.valid = true;
      console.log('authentik.js - check - not valid')
      return response;
    }

    const tokenStatus = this.token.status();
    debugger;
    const refreshTokenStatus = this.refreshToken.status();
    console.log('reftok', refreshTokenStatus)
    const idTokenStatus = this.idToken.status();

   //  console.log('tokenStatus', tokenStatus, refreshTokenStatus, idTokenStatus)

    // if (refreshTokenStatus.expired()) {
    //   response.refreshTokenExpired = true;
    //   return response;
    // }
    if (idTokenStatus.expired()) {
      response.idTokenExpired = true;
      return response;
    }
    if (tokenStatus.expired()) {
      response.tokenExpired = true;
      return response;
    }
    response.valid = true;
    return response;
  }

  async mounted() {
    console.log('authentik.js - mounted')
    await this.configurationDocument.init();
    const { tokenExpired, refreshTokenExpired } = this.check(true);
    if (refreshTokenExpired || tokenExpired && this.options.autoLogout) {
      this.$auth.reset();
    }
    this.requestHandler.initializeRequestInterceptor(this.options.endpoints.token);
    const redirected = await this._handleCallback();
    if (!redirected) {
      return this.$auth.fetchUserOnce();
    }
  }

  reset() {
    console.log('authentik.js - reset')
    this.$auth.setUser(false);
    this.token.reset();
    this.idToken.reset();
    this.refreshToken.reset();
    this.requestHandler.reset();
    this.configurationDocument.reset();
  }

  logout() {
    console.log('authentik.js - logout')
    if (this.options.endpoints.logout) {
      const opts = {
        id_token_hint: this.idToken.get(),
        post_logout_redirect_uri: this.logoutRedirectURI
      };
      const url = this.options.endpoints.logout + "?" + encodeQuery(opts);
      window.location.replace(url);
    }
    return this.$auth.reset();
  }

  async fetchUser() {
    console.log('authentik.js - fetchUser')
    if (!this.check().valid) {
      return;
    }
    if (this.idToken.get()) {
      const data2 = this.idToken.userInfo();
      this.$auth.setUser(data2);
      return;
    }
    if (!this.options.endpoints.userInfo) {
      this.$auth.setUser({});
      return;
    }
    const { data } = await this.$auth.requestWith(this.name, {
      url: this.options.endpoints.userInfo
    });
    this.$auth.setUser(data);
  }

  async _handleCallback() {
    console.log('authentik.js - _handleCallback')
    if (this.$auth.options.redirect && normalizePath(this.$auth.ctx.route.path) !== normalizePath(this.$auth.options.redirect.callback)) {
      return;
    }
    if (process.server) {
      return;
    }



    const hash = parseQuery(this.$auth.ctx.route.hash.substr(1));
    const parsedQuery = Object.assign({}, this.$auth.ctx.route.query, hash);
    let token = parsedQuery[this.options.token.property];
    let refreshToken;
    if (this.options.refreshToken.property) {
      refreshToken = parsedQuery[this.options.refreshToken.property];
    }
    let idToken = parsedQuery[this.options.idToken.property];
    const state = this.$auth.$storage.getUniversal(this.name + ".state");
    this.$auth.$storage.setUniversal(this.name + ".state", null);
    if (state && parsedQuery.state !== state) {
      return;
    }
    if (this.options.responseType === "code" && parsedQuery.code) {
      
      let codeVerifier;
      if (this.options.codeChallengeMethod && this.options.codeChallengeMethod !== "implicit") {
        codeVerifier = this.$auth.$storage.getUniversal(this.name + ".pkce_code_verifier");
        this.$auth.$storage.setUniversal(this.name + ".pkce_code_verifier", null);
      }
      const queryStr = encodeQuery({
        code: parsedQuery.code,
        client_id: this.options.clientId,
        // client_secret: this.options.clientSecret,
        redirect_uri: this.redirectURI,
        response_type: this.options.responseType,
        audience: this.options.audience,
        grant_type: this.options.grantType,
        code_verifier: codeVerifier
      })


      const response = await this.$auth.request({
        method: "post",
        url: this.options.endpoints.token,
        baseURL: "",
        data: queryStr
      });
      token = getProp(response.data, this.options.token.property) || token;
      refreshToken = getProp(response.data, this.options.refreshToken.property) || refreshToken;
      idToken = getProp(response.data, this.options.idToken.property) || idToken;
    }
    if (!token || !token.length) {
      return;
    }
    this.token.set(token);
    if (refreshToken && refreshToken.length) {
      this.refreshToken.set(refreshToken);
    }
    if (idToken && idToken.length) {
      this.idToken.set(idToken);
    }
    this.$auth.redirect("home", true);
    return true;
  }
}
