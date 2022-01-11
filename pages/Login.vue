<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>
                <span class="headline">LOGIN</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="login.email"
                    label="E-Mail"
                    prepend-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password"
                    type="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                  <v-checkbox
                    v-model="login.remember"
                    label="Remember Me"
                  ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  :disabled="!valid"
                  @click="AxiosTest"
                >
                  AxiosTest
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  :disabled="!valid"
                  @click="AxiosTestWithNuxt"
                >
                  AxiosTestWithNuxt
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  :disabled="!valid"
                  @click="userLogin"
                >
                  LOGIN
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  :disabled="!valid"
                  @click="userLoginGoogle"
                >
                  LOGIN WITH GOOGLE
                </v-btn>

                <v-btn
                  color="primary"
                  text
                  :disabled="!valid"
                  @click="userLoginSso"
                >
                  SSO LOGIN
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-row>
              <v-col>
                <v-btn
                  color="primary"
                  class="ma-2"
                  outlined
                  large
                  :disabled="!valid"
                  @click="userLoginOIDC"
                >
                  OIDC
                </v-btn>
                <v-btn
                  color="primary"
                  class="ma-2"
                  outlined
                  large
                  :disabled="!valid"
                  @click="userLoginBK"
                >
                  BKAUTH
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  layout: 'LoginLayout',
  data() {
    return {
      login: {
        email: '',
        password: '',
        remember: false,
      },
      valid: false,
    }
  },
  mounted() {
    // if (this.$route.query.code) {
    //   console.log('got code')
    //   window.location.href = '/userlist'
    // }
    // debugger;
    console.log('loggedin', this.$auth.loggedIn)
    console.log('user', this.$auth.user)

    // if (this.$auth.user != null) {
    //   this.$storage.setState("loggedIn", true);
    //    this.$router.push({ name: 'Dashboard' })
    // }

    // if (!this.$route.query.code) {
    //   this.$auth.loginWith('authentik')
    // }
  },
  methods: {
    async userLogin() {
      // const response = await this.$auth.loginWith('local', { data: this.login })
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$toast.error(error.message)
      }

      // console.log(response.status)
      // console.log('user', this.$auth.user)

      // this.$auth.setUser({ id: 1, user: 'bkseo', name: 'admin', email: '' })

      // console.log(this.$auth.user)
      // console.log(this.$auth.loggedIn)
      // this.$router.push('dashboard')
    },
    async userLoginGoogle() {
      try {
        await this.$auth.loginWith('google')
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    async AxiosTest() {
      // const response = await this.$axios.$get('/auth/user') // !same as => axios.get('/api/auth/user')
      await axios.get('/api/auth/user') // !same as => axios.get('/api/auth/user')
    },
    async AxiosTestWithNuxt() {
      await this.$axios.$get('/auth/user') // !same as => axios.get('/api/auth/user')
    },

    userLoginSso() {
      // const response = await axios.get('/saml/login')
      // console.log(response)
      window.location.href = '/api/saml/login'
    },

    async userLoginOIDC() {
      try {
        await this.$auth.loginWith('authentik')

        // this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    userLoginBK() {
      this.$auth.loginWith('authentik')
    },
  },
}
</script>
