import { OpenIDConnectScheme, } from '~auth/runtime'
// import { RefreshToken, IdToken, ConfigurationDocument } from '~auth/runtime'

// function getProp(holder, propName) {
//   if (!propName || !holder || typeof holder !== "object") {
//     return holder;
//   }
//   if (propName in holder) {
//     return holder[propName];
//   }
//   const propParts = Array.isArray(propName) ? propName : (propName + "").split(".");
//   let result = holder;
//   while (propParts.length && result) {
//     result = result[propParts.shift()];
//   }
//   return result;
// }

// function encodeQuery(queryObject) {
//   return Object.entries(queryObject).filter(([_key, value]) => typeof value !== "undefined").map(([key, value]) => encodeURIComponent(key) + (value != null ? "=" + encodeURIComponent(value) : "")).join("&");
// }

// function parseQuery(queryString) {
//   const query = {};
//   const pairs = queryString.split("&");
//   for (let i = 0; i < pairs.length; i++) {
//     const pair = pairs[i].split("=");
//     query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
//   }
//   return query;
// }

// function normalizePath(path = "", ctx) {
//   let result = path.split("?")[0];
//   if (ctx && ctx.base) {
//     result = result.replace(ctx.base, "/");
//   }
//   if (result.charAt(result.length - 1) === "/") {
//     result = result.slice(0, -1);
//   }
//   result = result.replace(/\/+/g, "/");
//   return result;
// }

// const AHTHENTIK$1 = {
//   name: "openIDConnect",
//   responseType: "code",
//   grantType: "authorization_code",
//   scope: ["openid", "profile", "offline_access"],
//   idToken: {
//     property: "id_token",
//     maxAge: 1800,
//     prefix: "_id_token.",
//     expirationPrefix: "_id_token_expiration."
//   },
//   codeChallengeMethod: "S256",
//   refreshToken: {
//     property: "refresh_token",
//     maxAge: 60 * 60 * 24 * 30,
//     prefix: "_refresh_token.",
//     expirationPrefix: "_refresh_token_expiration."
//   },
// };


export default class Authentik extends OpenIDConnectScheme {

    //   constructor($auth, options, ...defaults) {
    //     super($auth, options, ...defaults, AHTHENTIK$1);
    //   }

    check(checkStatus = false) {
        const response = {
            valid: false,
            tokenExpired: false,
            refreshTokenExpired: false,
            idTokenExpired: false,
            isRefreshable: true
        };
        const token = this.token.sync();
        // this.refreshToken.sync();
        this.idToken.sync();
        if (!token) {
            return response;
        }
        if (!checkStatus) {
            response.valid = true;
            return response;
        }

        const tokenStatus = this.token.status();
        // debugger;
        // const refreshTokenStatus = this.refreshToken.status();
        // console.log('reftok', refreshTokenStatus)
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

}
