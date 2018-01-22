import api from '@/services/api'

export default {
  upload (man) {
    return api().post('api/manuals', man)
  },
  download (manProps) {
    return api().get('api/manuals', {
      params: {
        year: manProps.year,
        institute: manProps.institute,
        manDept: manProps.manDept
      }
    })
  }
}
