<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs2 offset-xs1>
      <select-year @onYearChange="getYear($event)"></select-year>
    </v-flex>
    <v-flex xs2 offset-xs1>
      <v-select :items="docCatalog" v-model="catalog" label="เลือกหมวดหมู่เอกสาร"></v-select>
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
              <v-list-tile-title>ชื่อไฟล์ {{doc.docName}}</v-list-tile-title>
              <v-list-tile-sub-title>ขนาดไฟล์ : {{ (doc.fileSize >= 1048567) ? (doc.fileSize / 1048567) + "MB" : (doc.fileSize / 1024) + " kB"}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="sarResultId">
              <v-btn color="primary" icon flat @click="selectDoc(doc)"><v-icon>done</v-icon></v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if="upload">
              <v-btn color="orange" icon flat :loading="editing" :disabled="editing" @click.native="edit = true;commonDocId = doc.commonDocId;fileName = doc.fileName;onPickFile();"><v-icon>create</v-icon></v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if="upload">
              <v-btn color="error" icon flat @click.native="commonDocId = doc.commonDocId;fileName = doc.fileName;delDoc();"><v-icon>delete</v-icon></v-btn>
            </v-list-tile-action>
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
      <v-btn color="primary" @click.native="edit = false;onPickFile();" :loading="uploading" :disabled="uploading">เลือกไฟล์
        <v-icon right>folder</v-icon>
      </v-btn>
      <input @change="onFilePicked" type="file" style="display:none;" ref="fileInput" accept="application/pdf">
    </v-flex>
    <v-snackbar :timeout='3000' :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
    </v-snackbar>
  </v-layout>
</v-container>

</template>

<script>
import selectYear from './selectYear'
import selectDept from './selectDept'
import DocCatalogService from '@/services/DocCatalogService'
import CommonDocService from '@/services/CommonDocService'
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
    },
    sarResultId: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {
      year: null,
      catalog: null,
      docCatalog: DocCatalogService.docCatalog,
      docs: [],
      files: null,
      snackbar: {
        show: false,
        text: null,
        color: null
      },
      uploading: false,
      editing: false,
      edit: false,
      commonDocId: null,
      fileName: null
    }
  },
  methods: {
    getYear (val) {
      this.year = val
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (evt) {
      if (evt.target.files[0].type !== evt.target.accept) {
        return alert('ชนิดของไฟล์ต้องเป็น PDF เท่านั้น')
      }
      this.files = evt.target.files[0]
      if (!this.edit) {
        this.uploadDoc()
      } else {
        this.updateDoc()
      }
    },
    async getDoc () {
      try {
        const response = await CommonDocService.getDoc(this.year, this.catalog)
        this.docs = response.data
      } catch (e) {
        this.docs = []
      }
    },
    async updateDoc () {
      try {
        this.editing = true
        const formData = new FormData()
        formData.append('fileName', this.fileName)
        formData.append('commonDocId', this.commonDocId)
        formData.append('commonDoc', this.files)
        await CommonDocService.updateDoc(formData)
        this.snackbar.text = 'แก้ไข เอกสารส่วนกลางสำเร็จ'
        this.snackbar.color = 'success'
        this.getDoc()
      } catch (e) {
        this.snackbar.text = 'แก้ไข เอกสารส่วนกลางล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
      this.editing = false
      this.files = null
    },
    async uploadDoc () {
      try {
        this.uploading = true
        const formData = new FormData()
        formData.append('year', this.year)
        formData.append('catalog', this.catalog)
        formData.append('commonDoc', this.files)
        await CommonDocService.uploadDoc(formData)
        this.snackbar.text = 'Upload เอกสารส่วนกลางสำเร็จ'
        this.snackbar.color = 'success'
        this.getDoc()
      } catch (e) {
        this.snackbar.text = 'Upload เอกสารส่วนกลางล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
      this.uploading = false
      this.files = null
    },
    async delDoc () {
      try {
        await CommonDocService.delDoc(this.commonDocId, this.fileName)
        this.snackbar.text = 'ลบเอกสารส่วนกลางสำเร็จ'
        this.snackbar.color = 'success'
        this.getDoc()
      } catch (e) {
        this.snackbar.text = 'ลบเอกสารส่วนกลางล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async selectDoc (doc) {
      try {
        const docFile = {
          sarResultId: this.sarResultId,
          docName: doc.docName,
          fileName: doc.fileName,
          fileSize: doc.fileSize,
          fileType: doc.fileType
        }
        await CommonDocService.selectDoc(docFile)
        this.snackbar.text = 'เลือกไฟล์เอกสารส่วนกลางสำเร็จ'
        this.snackbar.color = 'success'
      } catch (e) {
        this.snackbar.text = 'เลือกไฟล์เอกสารส่วนกลางล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    }
  },
  watch: {
    year: function (val) {
      if (this.year !== null && this.catalog !== null) {
        this.getDoc()
      }
    },
    catalog: function (val) {
      if (this.year !== null && this.catalog !== null) {
        this.getDoc()
      }
    }
  },
  beforeMount () {
    if (!this.$store.getters.getUser.commonDoc) {
      this.$router.push('Home')
    }
  }
}
</script>
