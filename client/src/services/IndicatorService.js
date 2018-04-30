import api from '@/services/api'

export default {
  getIndicator (stdId) {
    return api().get('api/indicators', {
      params: {
        standardId: stdId
      }
    })
  },
  getFullIndicator (obj) {
    return api().get('api/indicators/full', {
      params: {
        year: obj.year,
        institute: obj.institute,
        standardLvl: obj.standardLvl
      }
    })
  },
  getOneIndicator (id) {
    return api().get('api/indicators/indicator/' + id)
  },
  addIndicator (ind) {
    return api().post('api/indicators', ind)
  },
  editIndicator (ind) {
    return api().patch('api/indicators', ind)
  },
  delIndicator (indId) {
    return api().delete('api/indicators', {
      params: {
        indicatorId: indId
      }
    })
  }
}
