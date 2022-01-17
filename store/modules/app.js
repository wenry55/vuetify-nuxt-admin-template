// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/dashboard',
    },
    {
      title: 'User Profile',
      icon: 'mdi-account',
      to: '/userprofile',
    },
    {
      title: 'Regular Tables',
      icon: 'mdi-clipboard-outline',
      to: '/regulartables',
    },
    {
      title: 'Typography',
      icon: 'mdi-format-font',
      to: '/typography',
    },
    {
      title: 'Icons',
      icon: 'mdi-chart-bubble',
      to: '/icons',
    },
    {
      title: 'Google Maps',
      icon: 'mdi-map-marker',
      to: '/googlemaps',
    },
    {
      title: 'Notifications',
      icon: 'mdi-bell',
      to: '/notifications',
    },
    {
      title: 'User List',
      icon: 'mdi-account-multiple',
      to: '/userlist',
    },
    {
      title: 'Role List',
      icon: 'mdi-account-check',
      to: '/rolelist',
    },
    {
      title: 'Resource List',
      icon: 'mdi-archive',
      to: '/resourcelist',
    },
    {
      title: '스케쥴',
      icon: 'mdi-calendar-clock',
      to: '/calendar',
    },
    {
      title: '스케쥴-연속',
      icon: 'mdi-calendar-clock',
      to: '/slotcalendar',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async () => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
