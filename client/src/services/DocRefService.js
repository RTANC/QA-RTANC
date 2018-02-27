import api from './api'

export default {
  getDoc (sarResultId) {
    return api().get('api/docRefs', {
      params: {
        sarResultId: sarResultId
      }
    })
  },
  uploadDoc (doc) {
    return api().post('api/docRefs', doc)
  },
  delDoc (doc) {
    return api().put('api/docRefs', doc)
  }
}
