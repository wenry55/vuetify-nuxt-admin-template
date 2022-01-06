import session from "express-session"
import bodyParser from "body-parser"

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
    '~/api/index.js'],

  auth: {
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
          type: false
        },
        user: {
          // field name in response body of '/api/auth/user'
          property: 'user',
          // setUser(user) should be called when user.autoFetch is disabled.
          // if autoFetch is enabled, setUser will be called when user is fetched.
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      },
      google: {
        clientId: '489923389160-mqk1crnpqkn941gvcddgdm47kq1qclpe.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: ['token', 'id_token'],
        // endpoints: {
        //   // somm backend url to resolve your auth with google and give you the token back
        //   token: 'http://localhost:3000/api/auth/google/user',
        //   // the endpoint to get the user info after you recived the token 
        //   userInfo: 'http://localhost:3000/api/auth/user'
        // }
      }
    }
  },

  // google auth 연동 => https://gmyankee.tistory.com/348
  router: {
    middleware: ['auth']
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
    }
  }
}
