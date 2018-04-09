import api from './api'

export default {
  getDoc (year, catalog) {
    return api().get('api/commonDoc', {
      params: {
        year: year,
        catalog: catalog
      }
    })
  },
  uploadDoc (doc) {
    return api().post('api/commonDoc', doc)
  },
  updateDoc (doc) {
    return api().patch('api/commonDoc', doc)
  },
  delDoc (docId, filename) {
    return api().delete('api/commonDoc', {
      params: {
        commonDocId: docId,
        filename: filename
      }
    })
  }
}
