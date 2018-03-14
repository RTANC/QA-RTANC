<template>
<v-app id="inspire" light>
  <v-navigation-drawer clipped fixed v-model="drawer" app>
    <v-list dense>
      <v-list-tile to="/Home">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>หน้าหลัก</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/ManageStd">
        <v-list-tile-action>
          <v-icon>content_paste</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>จัดการองค์ประกอบมาตรฐาน</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/CommonDoc">
        <v-list-tile-action>
          <v-icon>file_upload</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>อัพโหลดเอกสารส่วนกลาง</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/ManualUpload">
        <v-list-tile-action>
          <v-icon>unarchive</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>อัพโหลดคู่มือ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/ManualDownload">
        <v-list-tile-action>
          <v-icon>archive</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ดาวน์โหลดคู่มือ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/MakeSAR">
        <v-list-tile-action>
          <v-icon>create</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>เขียนผลการดำเนินงาน</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="backToMIS">
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
    <v-toolbar-title><span class="body-2">{{name}}</span></v-toolbar-title>
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
  export default {
    data: () => ({
      drawer: false,
      title: 'ระบบประกันคุณภาพการศึกษา',
      name: null
    }),
    methods: {
      backToMIS () {
        window.location.href = 'http://192.168.100.10/'
      },
      login () {
        // alert(this.$route.query.pid)
        this.$store.dispatch('setUser', {
          person_id: 54,
          fullname: 'ร้อยเอกหญิง ภัทริกา วงศ์อนันต์นนท์'
        })
        this.name = this.$store.state.user.fullname
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
