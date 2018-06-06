<template>
  <v-container fluid>
      <v-layout row wrap>
          <v-flex xs10 offset-xs1>
              <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
                  <template slot="items" slot-scope="props">
                      <tr>
                          <td class="text-left">{{ props.item.person_fullname }}</td>
                          <td class="text-center">
                              <v-checkbox @change="editPermission(props.item)" v-model="props.item.standardMgr"></v-checkbox>
                          </td>
                          <td>
                              <v-checkbox @change="editPermission(props.item)" v-model="props.item.commonDoc"></v-checkbox>
                          </td>
                          <td>
                              <v-checkbox @change="editPermission(props.item)" v-model="props.item.manualUpload"></v-checkbox>
                          </td>
                          <td>
                            <v-btn color="error" @click="delUser(props.item.person_id)"><v-icon>delete</v-icon></v-btn>
                          </td>
                      </tr>
                  </template>
              </v-data-table>
          </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">{{snackbar.text}}</v-snackbar>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-btn @click.native="dialog = true" fixed dark fab bottom right color="pink" slot="activator">
          <v-icon>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title class="headline">ค้นหาผู้ใช้งาน</v-card-title>
          <v-card-text>
            <select-person @onPickPerson="getPerson($event)"></select-person>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="addUser">เพิ่ม</v-btn>
            <v-btn color="red darken-1" flat="flat" @click.native="dialog = false">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
  </v-container>
</template>

<script>
import UserSerivce from '@/services/UserService'
import selectPerson from '@/components/selectPerson'
export default {
  name: 'UserMgr',
  components: {
    'select-person': selectPerson
  },
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
        }, {
          text: 'ลบผู้ใช้งาน',
          value: 'delUser',
          align: 'center'
        }
      ],
      items: [],
      snackbar: {
        text: null,
        color: null,
        show: false
      },
      dialog: false,
      person_id: null
    }
  },
  methods: {
    getPerson (val) {
      this.person_id = val
      console.log(this.person_id)
    },
    async getAllUser () {
      const response = await UserSerivce.getAllUser()
      this.items = response.data[0]
    },
    async editPermission (usr) {
      try {
        const permiss = {
          person_id: usr.person_id,
          standardMgr: usr.standardMgr,
          commonDoc: usr.commonDoc,
          manualUpload: usr.manualUpload
        }
        await UserSerivce.editPermission(permiss)
        this.snackbar.color = 'success'
        this.snackbar.text = 'แก้ไขสิทธิ์ผู้ใช้งานสำเร็จ'
        this.getAllUser()
      } catch (error) {
        this.snackbar.color = 'success'
        this.snackbar.text = 'แก้ไขสิทธิ์ผู้ใช้งานล้มเหลว'
      }
      this.snackbar.show = true
    },
    async addUser () {
      try {
        await UserSerivce.addUser({
          person_id: this.person_id
        })
        this.snackbar.color = 'success'
        this.snackbar.text = 'เพิ่มผู้ใช้งานสำเร็จ'
        this.getAllUser()
      } catch (error) {
        this.snackbar.color = 'success'
        this.snackbar.text = 'เพิ่มผู้ใช้งานล้มเหลว'
      }
      this.snackbar.show = true
    },
    async delUser (pid) {
      try {
        await UserSerivce.delUser(pid)
        this.snackbar.text = 'ลบผู้ใช้งานสำเร็จ'
        this.snackbar.color = 'success'
        this.getAllUser()
      } catch (e) {
        this.snackbar.text = 'ลบผู้ใช้งานล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    }
  },
  beforeMount () {
    if (!this.$store.getters.getUser.userMgr) {
      this.$router.push('Root')
    } else {
      this.getAllUser()
    }
  }
}
</script>
