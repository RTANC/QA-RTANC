<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
    <selectYear v-on:onYearChange="getYear($event)"></selectYear>
    </v-flex>
    <v-flex xs3 offset-xs1>
      <selectInstitute v-on:onInstituteChange="getInstitute($event)"></selectInstitute>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <selectManDept v-on:onManLvlChange="getManDept($event)"></selectManDept>
    </v-flex>
    <v-flex xs5 offset-xs1>
      <v-btn color="primary" @click="onSearchFile">ค้นหาไฟล์
        <v-icon right>search</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs10 offset-xs1 class="pt-3">
      <v-list two-line>
        <v-list-tile avatar v-if="manualFiles.hasFile">
          <v-list-tile-avatar>
            <v-icon>picture_as_pdf</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>ชื่อไฟล์ : {{ manualFiles.files[0].name }}</v-list-tile-title>
            <v-list-tile-sub-title>ขนาดไฟล์ : {{ (manualFiles.files[0].size >= 1048567) ? (manualFiles.files[0].size / 1048567) + "MB" : (manualFiles.files[0].size / 1024) + " kB"}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs3 offset-xs9 class="pt-3">
      <v-btn color="success" v-if=manualFiles.hasFile>ดาวน์โหลดไฟล์
        <v-icon right>archive</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import selectYear from './selectYear'
  import selectInstitute from './selectInstitute'
  import selectManDept from './selectManDept'
  import ManualService from '@/services/ManualService'
  export default {
    name: 'ManualDownload',
    components: {
      'selectYear': selectYear,
      'selectInstitute': selectInstitute,
      'selectManDept': selectManDept
    },
    data: () => {
      return {
        manualFiles: {
          hasFile: false,
          files: null
        },
        manProps: {
          year: null,
          institute: null,
          manDept: null
        }
      }
    },
    methods: {
      async onSearchFile () {
        const respones = await ManualService.download(this.manProps)
        console.log(respones.data)
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
