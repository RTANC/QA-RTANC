import api from './api'

export default {
  getAllUser () {
    return api().get('/api/users/all')
  }
}
