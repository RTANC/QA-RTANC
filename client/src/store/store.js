import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
      person_id: null,
      person_fullname: null,
      home: null,
      standardMgr: null,
      manualUpload: null,
      manualDownload: null,
      writeSAR: null,
      commonDoc: null,
      userMgr: null,
      backToMIS: null
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user.person_id = user.person_id
      state.user.person_fullname = user.person_fullname
      state.user.home = user.home
      state.user.standardMgr = user.standardMgr
      state.user.manualUpload = user.manualUpload
      state.user.manualDownload = user.manualDownload
      state.user.writeSAR = user.writeSAR
      state.user.commonDoc = user.commonDoc
      state.user.userMgr = user.userMgr
      state.user.backToMIS = user.backToMIS
    }
  },
  actions: {
    setUser (context, user) {
      context.commit('setUser', user)
    }
  }
})
