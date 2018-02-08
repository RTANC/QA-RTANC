import api from './api'

export default {
  getSAR (param) {
    return api().get('api/sar', {
      params: {
        indicatorId: param.indicatorId,
        sarLvl: param.sarLvl
      }
    })
  },
  createSAR (sar) {
    return api().post('api/sar/create', sar)
  },
  upsert (sar) {
    return api().post('api/sar/upsert', sar)
  }
}
