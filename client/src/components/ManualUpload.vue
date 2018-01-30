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
      <v-btn color="primary" @click="onPickFile">เลือกไฟล์
        <v-icon right>folder</v-icon>
      </v-btn>
      <input @change="onFilePicked" type="file" style="display:none;" ref="fileInput" accept="application/pdf">
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
      <v-btn color="success" v-if=manualFiles.hasFile @click="uploadManual">อัพโหลดไฟล์
        <v-icon right >unarchive</v-icon>
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
    name: 'ManualUpload',
    components: {
      'selectYear': selectYear,
      'selectInstitute': selectInstitute,
      'selectDept': selectDept
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
        },
        snackbar: {
          show: false,
          message: null,
          color: null
        }
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (evt) {
        if (evt.target.files[0].type !== evt.target.accept) {
          return alert('ชนิดของไฟล์ต้องเป็น PDF เท่านั้น')
        }
        this.manualFiles.files = evt.target.files
        this.manualFiles.hasFile = true
      },
      async uploadManual () {
        const formData = new FormData()
        formData.append('year', this.manProps.year)
        formData.append('institute', this.manProps.institute)
        formData.append('manDept', this.manProps.manDept)
        formData.append('man', this.manualFiles.files[0])
        try {
          const response = await ManualService.upload(formData)

          if (response.status === 200) {
            this.snackbar.color = 'success'
            this.snackbar.message = 'Upload ไฟล์คู่มือสำเร็จ'
            this.snackbar.show = true
            this.manualFiles.files = null
            this.manualFiles.hasFile = false
          } else {
            this.snackbar.color = 'error'
            this.snackbar.message = 'Upload ไฟล์คู่มือล้มเหลว'
            this.snackbar.show = true
          }
        } catch (e) {
          this.snackbar.color = 'error'
          this.snackbar.message = 'Upload ไฟล์คู่มือล้มเหลว'
          this.snackbar.show = true
        }
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
