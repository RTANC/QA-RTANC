<template>
<v-app id="inspire" light>
  <v-navigation-drawer clipped fixed v-model="drawer" app>
    <v-list dense>
      <v-list-tile v-if="user.home" to="/Home">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>หน้าหลัก</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.standardMgr" to="/ManageStd">
        <v-list-tile-action>
          <v-icon>content_paste</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>จัดการองค์ประกอบมาตรฐาน</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.commonDoc" to="/CommonDoc">
        <v-list-tile-action>
          <v-icon>file_upload</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>อัพโหลดเอกสารส่วนกลาง</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.manualUpload" to="/ManualUpload">
        <v-list-tile-action>
          <v-icon>unarchive</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>อัพโหลดคู่มือ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.manualDownload" to="/ManualDownload">
        <v-list-tile-action>
          <v-icon>archive</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ดาวน์โหลดคู่มือ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.writeSAR" to="/MakeSAR">
        <v-list-tile-action>
          <v-icon>create</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>เขียนผลการดำเนินงาน</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.userMgr" to="/UserMgr">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ตั้งค่าผู้ใช้งานระบบ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="user.backToMIS" @click="backToMIS">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>กลับสู่หน้า MIS</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar color="green darken-4" dark app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title><span class="body-2">{{user.person_fullname}}</span></v-toolbar-title>
  </v-toolbar>
  <v-content>
    <router-view/>
  </v-content>
  <v-footer app fixed>
    <span>วิทยาลัยพยาบาลกองทัพบก &copy; ๒๕๖๑</span>
  </v-footer>
</v-app>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  data: () => {
    return {
      drawer: false,
      title: 'ระบบประกันคุณภาพการศึกษา',
      user: {
        person_id: null,
        person_fullname: null,
        home: null,
        standardMgr: null,
        manualUpload: null,
        manualDownload: null,
        writeSAR: null,
        commonDoc: null,
        userMgr: null,
        backToMIS: null
      }
    }
  },
  methods: {
    backToMIS () {
      window.location.href = 'http://192.168.100.10/'
    },
    async login () {
      // alert(this.$route.query.pid)
      const response = await UserService.login(54)
      const usr = response.data[0]
      this.$store.dispatch('setUser', usr)
      this.user = this.$store.getters.getUser
    }
  },
  beforeMount () {
    // get name form database here
    // if (this.$route.query.pid === '54') {
    //   this.name = 'ร้อยเอกหญิง ภัทริกา วงศ์อนันต์นนท์'
    // } else {
    //   this.name = 'ไม่รู้จัก'
    // }
    this.login()
  }
}
</script>
