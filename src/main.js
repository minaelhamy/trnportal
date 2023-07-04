import Vue from 'vue'
import store from './lib/store'
import router from './router'
import App from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)


import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

Vue.component('navigation', require('./components/sections/Navigation.vue'))
Vue.component('footers', require('./components/sections/Footer.vue'))

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app')