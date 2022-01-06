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
                  @click="AxiosTest"
                  :disabled="!valid"
                >
                  AxiosTest
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="AxiosTestWithNuxt"
                  :disabled="!valid"
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

  beforeCreate() {
    // console.log('beforeCreate')
    // console.log(this.$route)

    if (this.$route.query.code) {
      console.log('got code')
      // this.$axios.get("/auth/user").then(response => {
      //   console.log(response)
      // })
      // this.$router.push("/userlist")
      // this.$axios.setToken('123', 'Bearer')
      // this.$axios.get('/auth/google/user?code=' + this.$route.query.code)
      //   .then(response => {
      //     console.log('response~~')
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    }
  },

  // beforeMount() {
  //   console.log('beforeMount')
  //   console.log(this.$route)
  // },

  // mounted() {
  //   console.log('mounted')
  //   console.log(this.$route)
  // },

  methods: {
    async userLogin() {
      // const response = await this.$auth.loginWith('local', { data: this.login })
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        console.log(response)
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$toast.error(error.message)
      }

      console.log('Login success')

      // console.log(response.status)
      // console.log('user', this.$auth.user)

      // this.$auth.setUser({ id: 1, user: 'bkseo', name: 'admin', email: '' })

      // console.log(this.$auth.user)
      // console.log(this.$auth.loggedIn)
      // this.$router.push('dashboard')
    },
    async userLoginGoogle() {
      try {
        console.log('userLoginGoogle')
        const response = await this.$auth.loginWith('google')
        console.log(response)
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    async AxiosTest() {
      // const response = await this.$axios.$get('/auth/user') // !same as => axios.get('/api/auth/user')
      const response = await axios.get('/api/auth/user') // !same as => axios.get('/api/auth/user')
      console.log(response)
    },
    async AxiosTestWithNuxt() {
      const response = await this.$axios.$get('/auth/user') // !same as => axios.get('/api/auth/user')
      console.log(response)
    },

    userLoginSso() {
      // const response = await axios.get('/saml/login')
      // console.log(response)
      this.$router.push('/api/saml/login')
    },
  },
}
</script>
