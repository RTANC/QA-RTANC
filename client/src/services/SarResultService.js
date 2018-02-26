import api from './api'

export default {
  addSarResult (sarResult) {
    return api().post('/api/sarResult', sarResult)
  },
  editSarResult (sarResult) {
    return api().patch('/api/sarResult', sarResult)
  },
  delSarResult (sarResultId) {
    return api().delete('/api/sarResult', {
      params: {
        sarResultId: sarResultId
      }
    })
  }
}
