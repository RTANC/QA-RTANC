import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ManualUpload from '@/components/ManualUpload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ManualUpload',
      name: 'ManualUpload',
      component: ManualUpload
    }
  ]
})
