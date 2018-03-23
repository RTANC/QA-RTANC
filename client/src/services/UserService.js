import api from './api'

export default {
  getAllUser () {
    return api().get('/api/users/all')
  },
  login (pid) {
    return api().get('/api/users', {
      params: {
        pid: pid
      }
    })
  }
}
