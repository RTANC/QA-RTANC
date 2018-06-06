import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CommonDoc from '@/components/CommonDoc'
import ManualUpload from '@/components/ManualUpload'
import ManualDownload from '@/components/ManualDownload'
import ManageStd from '@/components/ManageStd'
import ManageInd from '@/components/ManageInd'
import ModifiedInd from '@/components/ModifiedInd'
import MakeSAR from '@/components/MakeSAR'
import WriteSAR from '@/components/WriteSAR'
import UserMgr from '@/components/UserMgr'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/CommonDoc',
      name: CommonDoc,
      component: CommonDoc
    },
    {
      path: '/ManageInd',
      name: 'ManageInd',
      component: ManageInd
    },
    {
      path: '/ModifiedInd',
      name: 'Modified',
      component: ModifiedInd
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
    },
    {
      path: '/MakeSAR',
      name: 'MakeSAR',
      component: MakeSAR
    },
    {
      path: '/WriteSAR',
      name: 'WriteSAR',
      component: WriteSAR
    },
    {
      path: '/UserMgr',
      name: 'UserMgr',
      component: UserMgr
    }
  ],
  mode: 'history'
})
