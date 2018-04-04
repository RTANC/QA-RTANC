import api from './api'
export default {
  getReport (sarId) {
    return api().get('/api/sar/report', {
      params: {
        sarId: sarId
      }
    })
  }
}
