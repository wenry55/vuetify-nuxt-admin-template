import session from 'express-session'
import bodyParser from 'body-parser'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - rbac-v2',
    title: 'rbac-v2',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/chartist.js', mode: 'client' }
    // { src: '~/plugins/index.js', mode: 'client' }
    '@/plugins/vuetify.js',
    '@/plugins/chartist.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
    // Api middleware
    '~/api/index.js',
  ],

  auth: {
    watchLoggedIn: true,
    resetOnError: true,
    // vuex: {
    //   namespace: 'auth',
    // },
    strategies: {
      customStrategy: {
        scheme: '~/schemes/customScheme.js',
      },
      local: {
        token: {
          //property: 'token',
          //global: true,
          // required: true,
          // type: 'Bearer'
          required: false,
          type: false,
        },
        user: {
          // field name in response body of '/api/auth/user'
          property: 'user',
          // setUser(user) should be called when user.autoFetch is disabled.
          // if autoFetch is enabled, setUser will be called when user is fetched.
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
      google: {
        clientId:
          '489923389160-mqk1crnpqkn941gvcddgdm47kq1qclpe.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: ['token', 'id_token'],
        // endpoints: {
        //   // somm backend url to resolve your auth with google and give you the token back
        //   token: 'http://localhost:3000/api/auth/google/user',
        //   // the endpoint to get the user info after you recived the token
        //   userInfo: 'http://localhost:3000/api/auth/user'
        // }
      },

      // authentik: {
      //   scheme: 'openIDConnect',
      //   clientId: '0f47e28da03ee9d929150f9f5c7200f0c9cd1e6a',
      //   endpoints: {
      //     configuration:
      //       'https://authentik.codiplay.com/application/o/vue-nuxt/.well-known/openid-configuration',
      //   },
      //   idToken: {
      //     property: 'id_token',
      //     maxAge: 60 * 60 * 24 * 30,
      //     prefix: '_id_token.',
      //     expirationPrefix: '_id_token_expiration.',
      //   },
      //   responseType: 'code',
      //   grantType: 'authorization_code',
      //   scope: ['openid', 'profile', 'offline_access'],
      //   codeChallengeMethod: 'S256',
      //   refreshToken: {
      //     property: 'refresh_token',
      //     maxAge: 60 * 60 * 24 * 30
      //   },
      // },

      authentik: {
        scheme: '~/schemes/authentik.js',
        clientId: '23cd2d50b8d338ef9bd0d8a542218c7436755e47',
        endpoints: {
          configuration:
            'https://authentik.codiplay.com/application/o/bkauth-app/.well-known/openid-configuration',

        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: ['openid', 'profile'],
        acrValues: ['goauthentik.io/providers/oauth2/default'],
        codeChallengeMethod: 'S256',
        // redirectUri: 'http://localhost:3000/api/auth/oidc/callback',
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
          prefix: '_refresh_token.',
          expirationPrefix: '_refresh_token_expiration.',
        },
      },


    },
    // redirect: {
    //   login: '/login',
    //   logout: '/',
    //   home: '/dashboard',
    // },
  },

  // google auth ?????? => https://gmyankee.tistory.com/348
  router: {
    middleware: ['auth'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/api/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#E91E63',
          secondary: '#9C27b0',
          accent: '#e91e63',
          info: '#00CAE3',
          success: '#4CAF50',
          warning: '#FB8C00',
          error: '#FF5252',
        },
        light: {
          primary: '#E91E63',
          secondary: '#9C27b0',
          accent: '#e91e63',
          info: '#00CAE3',
          success: '#4CAF50',
          warning: '#FB8C00',
          error: '#FF5252',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
}
