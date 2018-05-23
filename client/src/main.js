// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import tinymce from 'vue-tinymce-editor'
import VueCookie from 'vue-cookie'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import { store } from './store/store'

Vue.use(Vuetify)
Vue.use(VueCookie)
Vue.component('tinymce', tinymce)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
