import api from '@/services/api'

export default {
  getStandards (std) {
    return api().get('api/standards', {
      params: {
        year: std.year,
        institute: std.institute,
        standardLvl: std.standardLvl
      }
    })
  },
  addStandard (std) {
    return api().post('api/standards', std)
  },
  dupStandard (opt) {
    return api().post('api/standards/dup', opt)
  },
  editStandard (std) {
    return api().patch('api/standards', std)
  },
  delStandard (stdId) {
    return api().delete('api/standards', {
      params: {
        standardId: stdId
      }
    })
  }
}
