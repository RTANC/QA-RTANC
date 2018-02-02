import api from '@/services/api'

export default {
  getRoleGroups (indId) {
    return api().get('/api/roleGroups', {
      params: {
        indicatorId: indId
      }
    })
  },
  addRoleGroup (roleGroup) {
    return api().post('/api/roleGroups', roleGroup)
  },
  delRoleGroup (rgId) {
    return api().delete('/api/roleGroups', {
      params: {
        roleGroupId: rgId
      }
    })
  }
}
