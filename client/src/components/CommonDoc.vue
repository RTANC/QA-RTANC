<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs2 offset-xs1>
      <select-year @onYearChange="getYear($event)"></select-year>
    </v-flex>
    <v-flex xs2 offset-xs1>
      <v-select :items="docCatalog" v-model="catalog" label="เลือกหมวดหมู่เอกสาร"></v-select>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <select-dept lbl="เลือกแผนก / ภาควิชา" @onDeptChange="getDept($event)"></select-dept>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-subheader>รายการไฟล์เอกสารส่วนกลาง</v-subheader>
      <v-list two-line>
        <template v-for="doc in docs">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>picture_as_pdf</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>ชื่อไฟล์ {{doc.originalName}}</v-list-tile-title>
              <v-list-tile-sub-title>ขนาดไฟล์ : {{ (doc.fileSize >= 1048567) ? (doc.fileSize / 1048567) + "MB" : (doc.fileSize / 1024) + " kB"}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
    <v-flex xs10 offset-xs1 v-if="upload">
      <v-subheader>ส่วนอัพโหลดไฟล์เอกสารส่วนกลาง</v-subheader>
      <v-list two-line v-if="files">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>picture_as_pdf</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>ชื่อไฟล์ {{files.name}}</v-list-tile-title>
            <v-list-tile-sub-title>ขนาดไฟล์ : {{ (files.size >= 1048567) ? (files.size / 1048567) + "MB" : (files.size / 1024) + " kB"}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-btn color="primary" @click="onPickFile">เลือกไฟล์
        <v-icon right>folder</v-icon>
      </v-btn>
      <input @change="onFilePicked" type="file" style="display:none;" ref="fileInput" accept="application/pdf">
      <v-btn color="success" style="float: right;">อัพโหลดไฟล์<v-icon right="">file_upload</v-icon></v-btn>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import selectYear from './selectYear'
import selectDept from './selectDept'
import DocCatalogService from '@/services/DocCatalogService'
export default {
  name: 'CommonDoc',
  components: {
    'select-year': selectYear,
    'select-dept': selectDept
  },
  props: {
    upload: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      year: null,
      dept: null,
      catalog: null,
      docCatalog: DocCatalogService.docCatalog,
      docs: [],
      files: null
    }
  },
  methods: {
    getYear: (val) => {
      this.year = val
    },
    getDept: (val) => {
      console.log(val)
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (evt) {
      if (evt.target.files[0].type !== evt.target.accept) {
        return alert('ชนิดของไฟล์ต้องเป็น PDF เท่านั้น')
      }
      console.log(evt.target.files)
      this.files = evt.target.files[0]
    }
  },
  beforeMount () {
    if (!this.$store.getters.getUser.commonDoc) {
      this.$router.push('Home')
    }
  }
}
</script>
