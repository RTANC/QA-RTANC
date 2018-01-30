<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
    <selectYear v-on:onYearChange="getYear($event)"></selectYear>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <selectInstitute v-on:onInstituteChange="getInstitute($event)"></selectInstitute>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <selectDept lbl="ระดับของคู่มือ" v-on:onDeptChange="getManDept($event)"></selectDept>
    </v-flex>
    <v-flex xs5 offset-xs1>
      <v-btn color="primary" @click="onSearchFile">ค้นหาไฟล์
        <v-icon right>search</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs10 offset-xs1 class="pt-3">
      <v-list two-line>
        <v-list-tile avatar v-if="manualFiles.fileURL !== null">
          <v-list-tile-avatar>
            <v-icon>picture_as_pdf</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>ชื่อไฟล์ : {{ manualFiles.originalName }}</v-list-tile-title>
            <v-list-tile-sub-title>ขนาดไฟล์ : {{ (manualFiles.fileSize >= 1048567) ? (manualFiles.fileSize / 1048567) + "MB" : (manualFiles.fileSize / 1024) + " kB"}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs3 offset-xs9 class="pt-3">
      <v-btn color="success" v-if='manualFiles.fileURL !== null' @click="onDownload">ดาวน์โหลดไฟล์
        <v-icon right>archive</v-icon>
      </v-btn>
    </v-flex>
    <v-snackbar :timeout='3000' :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
  import selectYear from './selectYear'
  import selectInstitute from './selectInstitute'
  import selectDept from './selectDept'
  import ManualService from '@/services/ManualService'
  export default {
    name: 'ManualDownload',
    components: {
      'selectYear': selectYear,
      'selectInstitute': selectInstitute,
      'selectDept': selectDept
    },
    data: () => {
      return {
        manualFiles: {
          originalName: null,
          fileSize: null,
          fileURL: null
        },
        manProps: {
          year: null,
          institute: null,
          manDept: null
        },
        snackbar: {
          show: false,
          message: 'ไม่พบไฟล์ที่ท่านค้นหา',
          color: 'error'
        }
      }
    },
    methods: {
      async onSearchFile () {
        try {
          const respones = await ManualService.download(this.manProps)
          if (respones.status === 200) {
            const data = respones.data
            this.manualFiles.originalName = data.manual.originalName
            this.manualFiles.fileSize = data.manual.fileSize
            this.manualFiles.fileURL = data.url
          } else {
            this.manualFiles.originalName = null
            this.manualFiles.fileSize = null
            this.manualFiles.fileURL = null
            this.snackbar.show = true
          }
        } catch (e) {
          this.manualFiles.originalName = null
          this.manualFiles.fileSize = null
          this.manualFiles.fileURL = null
          this.snackbar.show = true
        }
      },
      onDownload () {
        const win = window.open(this.manualFiles.fileURL, '_blank')
        win.focus()
      },
      getYear (val) {
        this.manProps.year = val
      },
      getInstitute (val) {
        this.manProps.institute = val
      },
      getManDept (val) {
        this.manProps.manDept = val
      }
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
