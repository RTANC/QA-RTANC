// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Editor from '@tinymce/tinymce-vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import VueCookie from 'vue-cookie'

import App from './App'
import router from './router'
import { store } from './store/store'

Vue.use(Vuetify)
Vue.use(VueCookie)

Vue.component('editor', Editor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  template: '<App/>',
  components: {App, 'editor': Editor}
})
