import api from '@/services/api'

export default {
  getAllPerson () {
    return api().get('api/persons')
  }
}
