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
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  :disabled="!valid"
                  @click="userLogin"
                >
                  LOGIN
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

  methods: {
    async userLogin() {
      // const response = await this.$auth.loginWith('local', { data: this.login })
      await this.$auth.loginWith('local', { data: this.login })

      console.log('Login success')

      // console.log(response.status)
      // console.log('user', this.$auth.user)

      this.$auth.setUser({ id: 1, user: 'bkseo', name: 'admin', email: '' })

      // console.log(this.$auth.user)
      // console.log(this.$auth.loggedIn)
      // this.$router.push('dashboard')

      this.$router.push({ name: 'Dashboard' })
    },
  },
}
</script>
