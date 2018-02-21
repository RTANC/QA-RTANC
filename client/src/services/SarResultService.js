import api from './api'

export default {
  getSarResult (sarId) {
    return api().get('/api/sarResult', {
      params: {
        sarId: sarId
      }
    })
  },
  addSarResult (sarResult) {
    return api().post('/api/sarResult', sarResult)
  },
  editSarResult (sarResult) {
    return api().patch('/api/sarResult', sarResult)
  },
  delSarResult (sarResultId) {
    return api().delete('/api/sarResult', sarResultId)
  }
}
