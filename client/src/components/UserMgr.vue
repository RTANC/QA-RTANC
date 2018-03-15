<template>
  <v-container fluid>
      <v-layout row wrap>
          <v-flex xs10 offset-xs1>
              <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
                  <template slot="items" slot-scope="props">
                      <tr>
                          <td class="text-left">{{ props.item.person_fullname }}</td>
                          <td class="text-center">
                              <v-checkbox v-model="props.item.standardMgr"></v-checkbox>
                          </td>
                          <td>
                              <v-checkbox v-model="props.item.commonDoc"></v-checkbox>
                          </td>
                          <td>
                              <v-checkbox v-model="props.item.manualUpload"></v-checkbox>
                          </td>
                      </tr>
                  </template>
              </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import UserSerivce from '@/services/UserService'
export default {
  name: 'UserMgr',
  data: () => {
    return {
      pagination: {
        sortBy: null
      },
      headers: [
        {
          text: 'ชื่อ-นามสกุล',
          value: 'full_name',
          align: 'center'
        },
        {
          text: 'จัดการองค์ประกอบมาตรฐาน',
          value: 'standardMgr',
          align: 'center'
        },
        {
          text: 'อัพโหลดเอกสารส่วนกลาง',
          value: 'commonDoc',
          align: 'center'
        },
        {
          text: 'อัพโหลดคู่มือ',
          value: 'manualUpload',
          align: 'center'
        }
      ],
      items: []
    }
  },
  methods: {
    async getAllUser () {
      const response = await UserSerivce.getAllUser()
      this.items = response.data[0]
    }
  },
  beforeMount () {
    this.getAllUser()
  }
}
</script>
