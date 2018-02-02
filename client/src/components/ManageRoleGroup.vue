<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs10 offset-xs1 >
      <h1>ตัวบ่งชี้ที่ {{ ind.indNo }} : {{ ind.indName }}</h1>
    </v-flex>
    <!-- <v-flex xs4 offset-xs1 class="pt-2">
      <selectDept lbl="กลุ่มผู้รับผิดชอบ" v-on:onDeptChange="getDept($event)" ref="roleGroup"></selectDept>
    </v-flex>
    <v-flex xs1 offset-xs1 class="pt-3">
      <v-btn color="pink" dark @click="addRoleGroup">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex> -->
    <v-flex xs10 offset-xs1 class="pt-2">
      <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-center">{{ groupName[props.item.groupId].text }}</td>
            <td class="text-xs-center">
              <v-btn color="error" @click="delRoleGroup(props.item.roleGroupId)"><v-icon>delete</v-icon></v-btn>
              <v-btn color="deep-purple" @click="addGroupMember" dark><v-icon>account_circle</v-icon></v-btn>
            </td>
          </tr>
        </template>
        <template slot="footer">
          <td><selectDept lbl="กลุ่มผู้รับผิดชอบ" v-on:onDeptChange="getDept($event)" ref="roleGroup"></selectDept></td>
          <td>
            <v-btn color="pink" dark @click="addRoleGroup">
              <v-icon>add</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-card>
        <v-toolbar dark color="deep-purple">
          <v-btn dark icon @click.native="dialog = !dialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>จัดการสมาชิก</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs10 offset-xs1>
              <dtGroupMember></dtGroupMember>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{snackbar.text}}
    </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
  import selectDept from './selectDept'
  import dtGroupMember from './dtGroupMember'
  import RoleGroupService from '@/services/RoleGroupService'
  export default {
    name: 'ManageRoleGroup',
    components: {
      'selectDept': selectDept,
      'dtGroupMember': dtGroupMember
    },
    data: () => {
      return {
        deptId: null,
        dialog: false,
        pagination: {
          sortBy: null
        },
        headers: [{text: 'กลุ่มผู้รับผิดชอบ', align: 'center', value: 'roleGroup'}],
        items: [],
        ind: {
          indId: null,
          indNo: null,
          indName: null
        },
        snackbar: {
          show: false,
          text: null,
          color: null
        },
        groupName: [{
          text: 'วิทยาลัยพยาบาลกองทัพบก',
          value: 0
        }, {
          text: 'กองอำนวยการ',
          value: 1
        }, {
          text: 'กองการศึกษา',
          value: 2
        }, {
          text: 'กองการปกครอง',
          value: 3
        }, {
          text: 'แผนกเตรียมการ',
          value: 4
        }, {
          text: 'แผนกสนับสนุน',
          value: 5
        }, {
          text: 'แผนกธุรการ/กำลังพล',
          value: 6
        }, {
          text: 'ภาควิชาความรู้พื้นฐาน',
          value: 7
        }, {
          text: 'ภาควิชาการพยาบาลเบื้องต้น',
          value: 8
        }, {
          text: 'ภาควิชาการพยาบาลอายุรศาสตร์และศัลยศาสตร์',
          value: 9
        }, {
          text: 'ภาควิชาพยาบาลสูติศาสตร์',
          value: 10
        }, {
          text: 'ภาควิชาการพยาบาลกุมารเวชศาสตร์',
          value: 11
        }, {
          text: 'ภาควิชาสุขภาพจิตและการพยาบาลจิตเวชศาสตร์',
          value: 12
        }, {
          text: 'ภาควิชาการพยาบาลอนามัยชุมชน',
          value: 13
        }]
      }
    },
    methods: {
      getDept (val) {
        this.deptId = val
      },
      async getRoleGroup () {
        try {
          const respones = await RoleGroupService.getRoleGroups(this.ind.indId)
          this.items = respones.data
        } catch (error) {
          console.log(error)
        }
      },
      async addRoleGroup () {
        try {
          const formData = new FormData()
          formData.append('indicatorId', this.ind.indId)
          formData.append('groupId', this.deptId)
          await RoleGroupService.addRoleGroup(formData)
          this.snackbar.text = 'เพิ่มกลุ่มผู้รับผิดชอบสำเร็จ'
          this.snackbar.color = 'success'
        } catch (error) {
          this.snackbar.text = 'เพิ่มกลุ่มผู้รับผิดชอบล้มเหลว'
          this.snackbar.color = 'error'
        }
        this.snackbar.show = true
        this.getRoleGroup()
      },
      async delRoleGroup (val) {
        try {
          await RoleGroupService.delRoleGroup(val)
          this.snackbar.text = 'ลบกลุ่มผู้รับผิดชอบสำเร็จ'
          this.snackbar.color = 'success'
        } catch (error) {
          this.snackbar.text = 'ลบกลุ่มผู้รับผิดชอบล้มเหลว'
          this.snackbar.color = 'error'
        }
        this.snackbar.show = true
        this.getRoleGroup()
      },
      addGroupMember () {
        this.dialog = true
      }
    },
    beforeMount () {
      this.ind.indId = this.$route.query.indId
      this.ind.indNo = this.$route.query.indNo
      this.ind.indName = this.$route.query.indName
      this.getRoleGroup()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
