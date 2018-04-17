<template lang="html">
  <div>
    <h6 class="subheading">หลักฐานเอกสารอ้างอิง
          <v-btn icon color="primary" @click="uploadFile" :disabled="snackbar.show"><v-icon>file_upload</v-icon></v-btn>
    </h6>
    <input @change="filePicked" type="file" style="display:none;" ref="fileInput" accept="application/pdf">
    <v-card>
      <v-card-text>
        <v-list two-line>
          <template v-for="item in docs">
            <v-list-tile avatar :key="item.docRefId">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>ชื่อไฟล์ : {{item.docName}}</v-list-tile-title>
                <v-list-tile-sub-title>ขนาดไฟล์ : {{ (item.fileSize >= 1048567) ? (item.fileSize / 1048567) + "MB" : (item.fileSize / 1024) + " kB"}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="uploadFile(item.docRefId,item.fileName)" :disabled="snackbar.show">
                  <v-icon color="orange" >create</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn :href="'http://localhost:3000/uploads/DocumentRefs/' + item.fileName" target="_blank" icon>
                  <v-icon color="success">launch</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn @click="delDoc(item.docRefId, item.fileName)" icon>
                  <v-icon color="error">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script type="text/javascript">
import DocRefService from '@/services/DocRefService'
export default {
  name: 'sarDocRef',
  props: {
    sarId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      docs: [],
      files: null,
      snackbar: {
        show: true,
        text: null,
        color: null
      }
    }
  },
  methods: {
    async getDoc () {
      try {
        const response = await DocRefService.getDoc(this.sarId)
        this.docs = response.data
      }
    }
    async uploadFile () {
      try {
        this.$refs.fileInput.click()
        const formData = new FormData()
        formData.append('sarId', this.sarId)
        formData.append('docRef', this.files)
        await DocRefService.uploadDoc(formData)
        this.snackbar.text = 'Upload เอกสารอ้างสำเร็จ'
        this.snackbar.color = 'success'
      } catch (e) {
        this.snackbar.text = 'Upload เอกสารอ้างล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async updateFile (docRefId, fileName) {
      try {
        this.$refs.fileInput.click()
        const formData = new FormData()
        formData.append('docRefId', docRefId)
        formData.append('fileName', fileName)
        formData.append('docRef', this.files)
        await DocRefService.updateDoc(formData)
        this.snackbar.text = 'แก้ไขเอกสารอ้างสำเร็จ'
        this.snackbar.color = 'success'
      } catch (e) {
        this.snackbar.text = 'แก้ไขเอกสารอ้างล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    filePicked (evt) {
      if (evt.target.files[0].type !== evt.target.accept) {
        return alert('ชนิดของไฟล์ต้องเป็น PDF เท่านั้น')
      }
      this.files = evt.target.files[0]
    }
  }
}
</script>
