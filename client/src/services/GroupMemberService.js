import api from '@/services/api'

export default {
  getMembers (roleGroupId) {
    return api().get('/api/groupMembers', {
      params: {
        roleGroupId: roleGroupId
      }
    })
  },
  addMember (member) {
    return api().post('/api/groupMembers', member)
  },
  delMember (memberId) {
    return api().delete('/api/groupMembers', {
      params: {
        memberId: memberId
      }
    })
  }
}
