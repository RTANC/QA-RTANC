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
  }
}
