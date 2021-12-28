<template>
  <v-app>
    <default-bar />

    <default-drawer />
    
    <v-container>
      <Nuxt />
    </v-container>
  </v-app>
</template>

<script>
import '@/assets/styles/overrides.sass'

export default {
  name: 'AdminLayout',
  components: {
    DefaultBar: () =>
      import(
        /* webpackChunkName: "default-app-bar" */
        '@/components/AppBar'
      ),
    DefaultDrawer: () =>
      import(
        /* webpackChunkName: "default-drawer" */
        '@/components/Drawer'
      ),
  },

  data() {
    return {}
  },
}
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
