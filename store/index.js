// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import * as modules from './modules'

// options
pathify.options.mapping = 'simple'
pathify.options.strict = true
// Modules

Vue.use(Vuex)

// eslint-disable-next-line import/no-named-as-default-member
const store = new Vuex.Store({
    modules,
    plugins: [
        pathify.plugin,
    ],
})

store.subscribe(mutation => {
    if (!mutation.type.startsWith('user/')) return

    store.dispatch('user/update', mutation)
})

store.dispatch('app/init')

export default () => store

export const ROOT_DISPATCH = Object.freeze({ root: true })
