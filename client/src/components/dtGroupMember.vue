<template>
<div>
  <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
    <template slot="items" slot-scope="props">
        <tr>
            <td class="text-xs-left">{{ props.item.person_fullname }}</td>
            <td class="text-xs-center">
                <v-btn color="error" @click="delMember(props.item.memberId)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </td>
        </tr>
    </template>
    <template slot="footer">
        <td>
            <selectPerson v-on:onPickPerson="getPerson($event)"></selectPerson>
        </td>
        <td>
            <v-btn dark color="pink">
                <v-icon>add</v-icon>
            </v-btn>
        </td>
    </template>
  </v-data-table>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
    {{snackbar.text}}
  </v-snackbar>
</div>
</template>

<script>
import selectPerson from './selectPerson'
import GroupMemberService from '@/services/GroupMemberService'
export default {
  name: 'dtGroupMember',
  props: {
    roleGroupId: {
      default: 0,
      type: Number
    }
  },
  components: {
    selectPerson: selectPerson
  },
  data: () => {
    return {
      pagination: {
        orderBy: null
      },
      headers: [
        { text: 'ชื่อ-นามสกุล', value: 'person_fullname', align: 'center' }
      ],
      items: [],
      snackbar: {
        show: false,
        text: null,
        color: null
      }
    }
  },
  methods: {
    getPerson (val) {
      this.personId = val
      console.log(this.personId)
    },
    async getMembers () {
      try {
        const respones = await GroupMemberService.getMembers(this.roleGroupId)
        this.items = respones.data
      } catch (error) {}
    },
    async addMember () {
      try {
        const formData = new FormData()
        formData.append('roleGroupId', this.roleGroupId)
        formData.append('person_id', this.personId)
        await GroupMemberService.addMember(formData)
        this.snackbar.text = 'เพิ่มผู้ใช้งานสำเร็จ'
        this.snackbar.color = 'success'
        this.getMembers()
      } catch (error) {
        this.snackbar.text = 'เพิ่มผู้ใช้งานล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async delMember (val) {
      try {
        await GroupMemberService.delMember(val)
        this.snackbar.text = 'ลบผู้ใช้งานออกจากกลุ่มผู้รับผิดชอบสำเร็จ'
        this.snackbar.color = 'success'
        this.getMembers()
      } catch (error) {
        this.snackbar.text = 'ลบผู้ใช้งานออกจากกลุ่มผู้รับผิดชอบล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    }
  },
  watch: {
    roleGroupId: function () {
      this.getMembers()
    }
  }
}
</script>
