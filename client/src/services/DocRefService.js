import api from './api'

export default {
  getDoc (sarId) {
    return api().get('api/docRefs', {
      params: {
        sarId: sarId
      }
    })
  },
  uploadDoc (doc) {
    return api().post('api/docRefs', doc)
  },
  updateDoc (doc) {
    return api().patch('api/docRefs', doc)
  },
  delDoc (doc) {
    return api().put('api/docRefs', doc)
  }
}
