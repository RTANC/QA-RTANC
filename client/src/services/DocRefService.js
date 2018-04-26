import api from './api'

export default {
  getDocBySar (sarId) {
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
  },
  selectDoc (doc) {
    return api().post('api/docRefs/select', doc)
  }
}
