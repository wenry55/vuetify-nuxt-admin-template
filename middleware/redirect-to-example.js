export default function ({ store, redirect }) {
  // if (!this.$auth) {
  //   console.log('No auth found')
  // } else {
  //   console.log(this.$auth.loggedIn)
  // }
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect(301, '/dashboard');
  }
}