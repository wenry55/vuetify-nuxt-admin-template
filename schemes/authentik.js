import { OpenIDConnectScheme } from '~auth/runtime'

const AUTHENTIK$1 = {
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
        super($auth, options, ...defaults, AUTHENTIK$1);
    }
}
