import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ManualUpload from '@/components/ManualUpload'
import ManualDownload from '@/components/ManualDownload'
import ManageStd from '@/components/ManageStd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ManageStd',
      name: 'ManageStd',
      component: ManageStd
    },
    {
      path: '/ManualUpload',
      name: 'ManualUpload',
      component: ManualUpload
    },
    {
      path: '/ManualDownload',
      name: 'ManualDownload',
      component: ManualDownload
    }
  ]
})
