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
  },
  editPermission (permiss) {
    return api().patch('/api/users', permiss)
  },
  addUser (person) {
    return api().post('/api/users', person)
  },
  delUser (pid) {
    return api().delete('/api/users', {
      params: {
        pid: pid
      }
    })
  }
}
