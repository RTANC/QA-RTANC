<template>
<v-container fluid grid-list-xs>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
      <v-select v-bind:items="year" label="เลือกปีงบประมาณ" class="input-group--focused">
      </v-select>
    </v-flex>
    <v-flex xs3 offset-xs1>
      <v-select v-bind:items="institute" label="เลือกสถาบันผู้ประเมิน" class="input-group--focused">
      </v-select>
    </v-flex>
    <v-flex xs3 offset-xs1>
      <v-select v-bind:items="manlvl" label="ระดับของคู่มือ" class="input-group--focused">
      </v-select>
    </v-flex>
    <v-flex xs5 offset-xs1>
      <v-btn color="primary" @click="onPickFile">ฮัพโหลดคู่มือ
        <v-icon right>cloud_upload</v-icon>
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
  </v-layout>
</v-container>
</template>

<script>
var tmp = []
var nowYear = ((new Date()).getFullYear()) + 543
for (var i = nowYear - 3; i <= nowYear + 3; i++) {
  tmp.push({
    text: '' + i
  })
}
export default {
  name: 'ManualUpload',
  data: () => {
    return {
      year: tmp,
      manualFiles: {
        hasFile: false,
        files: null
      },
      institute: [{
        text: 'สำนักงานคณะกรรมการการอุดมศึกษา',
        value: 1
      }, {
        text: 'สภาการพยาบาล',
        value: 2
      }],
      manlvl: [{
        text: 'วิทยาลัยพยาบาลกองทัพบก',
        value: 1
      }, {
        text: 'กองอำนวยการ',
        value: 2
      }, {
        text: 'กองการศึกษา',
        value: 3
      }, {
        text: 'กองการปกครอง',
        value: 4
      }]
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (evt) {
      if (evt.target.files[0].type !== evt.accept) {
        return alert('ชนิดของไฟล์ต้องเป็น PDF เท่านั้น')
      }
      this.manualFiles.files = evt.target.files
      this.manualFiles.hasFile = true
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
