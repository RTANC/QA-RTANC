<template>
  <v-container fluid grid-list-md>
      <v-layout row wrap>
          <v-flex xs10 offset-xs1>
              <v-card>
                <v-card-title primary-title class="d-block">
                  <h3 class="headline">รายงานการประเมินตนเอง {{dept[0].text}}</h3>
                  <h3>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</h3>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.native.stop="dialogSar = true">SAR</v-btn>
                </v-card-actions>
              </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <sar-doc-ref :sarId="sar.sarId"></sar-doc-ref>
          </v-flex>
          <v-flex xs10 offset-xs1>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการดำเนินงาน
              <v-btn icon color="pink" dark @click.native="content = null;edit = false;docs = [];dialog = true;">
                <v-icon>add</v-icon>
              </v-btn>
            </h6>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card>
              <v-list>
                  <template v-for="item in sar.sarResults">
                    <v-list-tile :key="item.sarResultId">
                      <v-list-tile-content>
                        <v-list-tile-sub-title v-html="'<span class=text--primary>' + dept[sar.sarLvl].text + '</span>' + item.sarResultText"></v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn icon @click.native="content = item.sarResultText;sarResultId = item.sarResultId;edit = true;dialog = true;">
                          <v-icon color="orange">create</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    <v-list-tile-action>
                      <v-btn icon @click="delSarResult(item.sarResultId)">
                          <v-icon color="error">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    </v-list-tile>
                  </template>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการประเมินตนเอง
              <v-btn @click="editSAR" color="success" icon>
                <v-icon>save</v-icon>
              </v-btn>
            </h6>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card class="px-3">
              <v-text-field v-model="sar.goal" multi-line label="เป้าหมาย"></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="px-3">
              <v-text-field v-model="sar.sumResult" multi-line label="สรุป ผลการดำเนินงาน"></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card class="pt-3 px-3 d-flex">
              <v-switch label="การบรรลุเป้าหมาย" v-model="sar.goalCk" color="success" class="pt-4"></v-switch>
              <v-text-field v-model="sar.score" type="number" max="5" min="0" label="คะแนนการประเมินตนเอง" :rules="[v => (v > 5) ? 'คะแนนเต็ม 5 คะแนน' : true ]"></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card class="px-3">
              <v-text-field v-model="sar.str" multi-line label="จุดแข็ง"></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="px-3">
              <v-text-field v-model="sar.strEnchance" multi-line label="แนวทางการเสริมจุดแข็ง"></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card class="px-3">
              <v-text-field v-model="sar.weak" multi-line label="จุดที่ควรพัฒนา"></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="px-3">
              <v-text-field v-model="sar.weakEnchance" multi-line label="ข้อเสนอแนะในการปรับปรุง"></v-text-field>
            </v-card>
          </v-flex>
          <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" scrollble>
            <v-card>
              <v-toolbar dark color="pink">
                <v-btn icon @click.native="dialog = false;content = null;Files.files = null;Files.hasFile = false;" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>ผลการดำเนินงาน</v-toolbar-title>
              </v-toolbar>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs10 offset-xs1 v-if="edit && sar.sarLvl >= 0 && sar.sarLvl <= 3">
                  <v-list two-line>
                    <template v-for="item in otherSarResult">
                      <v-list-tile :key="item.sarResultId"></v-list-tile>
                    </template>
                  </v-list>
                  <v-subheader>ผลการดำเนินงานจาก แผนก / ภาควิชา อื่นๆ</v-subheader>
                  <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs10 offset-xs1>
                    <v-subheader>เขียนผลการดำเนินงาน</v-subheader>
                    <quill-editor v-model="content" :options="editorOption"></quill-editor>
                    <v-btn color="primary" @click="addSarResult" v-if="!edit"><v-icon left>add</v-icon>เพิ่มผลการดำเนินงาน</v-btn>
                    <v-btn color="orange" @click="editSarResult" v-if="edit"><v-icon left>create</v-icon>แก้ไขผลการดำเนินงาน</v-btn>
                    <v-btn @click.native="dialog = false;content = null;Files.files = null;Files.hasFile = false;">ยกเลิก</v-btn>
                  </v-flex>
                  <v-flex xs10 offset-xs1>
                    <v-divider class="my-3"></v-divider>
                    <sar-doc-ref :sarId="sar.sarId" :sarResultId="sarResultId"></sar-doc-ref>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogCommonDoc" persistent scrollable>
            <v-card>
              <v-card-title primary-title>เลือกไฟล์เอกสารส่วนกลาง
                <v-spacer></v-spacer>
                <v-btn flat icon @click.native="dialogCommonDoc = false"><v-icon>close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                <common-doc :upload="false" :sarResultId="sarResultId"></common-doc>
              </v-card-text>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogSar" scrollable persistent>
              <v-card>
                <v-card-title>
                  <v-subheader>Self Assessment Report</v-subheader>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <sar-report :sarId="sar.sarId"></sar-report>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click.native="dialogSar = false">ปิด</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
            {{snackbar.text}}
          </v-snackbar>
      </v-layout>
  </v-container>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import SarService from '@/services/SarService'
import SarResultService from '@/services/SarResultService'
import Dept from '@/services/DeptService'
import CommonDoc from '@/components/CommonDoc'
import Report from '@/components/report'
import sarDocRef from '@/components/sarDocRef'
export default {
  name: 'WriteSAR',
  components: {
    quillEditor,
    'common-doc': CommonDoc,
    'sar-report': Report,
    sarDocRef
  },
  data: () => {
    return {
      dialog: false,
      dialogCommonDoc: false,
      dialogSar: false,
      dialogm1: null,
      edit: false,
      editorOption: {
        placeholder: 'เขียนผลการดำเนินงานที่นี้...'
      },
      indicator: {
        indicatorId: null,
        indicatorNo: null,
        indicatorName: null,
        indicatorType: null
      },
      sar: {
        sarId: null,
        indicatorId: null,
        sarLvl: null,
        goal: null,
        sumResult: null,
        goalCk: null,
        score: null,
        str: null,
        strEnchance: null,
        weak: null,
        weakEnchance: null,
        sarResults: []
      },
      snackbar: {
        show: false,
        text: null,
        color: null
      },
      dept: Dept.Dept,
      content: null,
      sarResultId: null,
      Files: {
        hasFile: false,
        files: null
      },
      docRefId: null,
      fileName: null,
      otherSarResult: [],
      uploading: false
    }
  },
  methods: {
    async getSAR () {
      try {
        const respones = await SarService.getSAR({
          indicatorId: this.indicator.indicatorId,
          sarLvl: this.sar.sarLvl
        })
        if (respones.data.length === 0) {
          this.createSAR()
        } else {
          this.sar = respones.data[0]
        }
      } catch (error) {
      }
    },
    async createSAR () {
      try {
        const formData = new FormData()
        formData.append('indicatorId', this.indicator.indicatorId)
        formData.append('sarLvl', this.sar.sarLvl)
        const respones = await SarService.createSAR(formData)
        this.sar.sarId = respones.data.sarId
        this.sar.sarLvl = respones.data.sarLvl
        this.sar.indicatorId = respones.data.indicatorId
        this.sar.goalCk = respones.data.goalCk
        this.sar.score = respones.data.score
        this.snackbar.text = 'สร้าง SAR สำเร็จ'
        this.snackbar.color = 'success'
      } catch (error) {
        this.snackbar.text = 'สร้าง SAR ล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async editSAR () {
      try {
        const formData = new FormData()
        formData.append('indicatorId', this.sar.indicatorId)
        formData.append('sarLvl', this.sar.sarLvl)
        formData.append('goal', this.sar.goal)
        formData.append('sumResult', this.sar.sumResult)
        formData.append('goalCk', this.sar.goalCk)
        formData.append('score', this.sar.score)
        formData.append('str', this.sar.str)
        formData.append('strEnchance', this.sar.strEnchance)
        formData.append('weak', this.sar.weak)
        formData.append('weakEnchance', this.sar.weakEnchance)
        await SarService.upsert(formData)
        this.getSAR()
        this.snackbar.text = 'บันทึกผลการประเมินตยเองสำเร็จ'
        this.snackbar.color = 'success'
      } catch (error) {
        this.snackbar.text = 'บันทึกผลการประเมินตยเองล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async addSarResult () {
      try {
        const formData = new FormData()
        formData.append('sarId', this.sar.sarId)
        formData.append('sarResultText', this.content)
        await SarResultService.addSarResult(formData)
        this.snackbar.text = 'เพิ่มผลการดำเนินงานสำเร็จ'
        this.snackbar.color = 'success'
        this.getSAR()
      } catch (error) {
        this.snackbar.text = 'เพิ่มผลการดำเนินงานล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async editSarResult () {
      try {
        const formData = new FormData()
        formData.append('sarResultId', this.sarResultId)
        formData.append('sarResultText', this.content)
        await SarResultService.editSarResult(formData)
        this.snackbar.text = 'แก้ไขผลการดำเนินงานสำเร็จ'
        this.snackbar.color = 'success'
        this.getSAR()
      } catch (error) {
        this.snackbar.text = 'แก้ไขผลการดำเนินงานล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    },
    async delSarResult (sarResultId) {
      try {
        await SarResultService.delSarResult(sarResultId)
        this.snackbar.text = 'ลบผลการดำเนินงานสำเร็จ'
        this.snackbar.color = 'success'
        this.getSAR()
      } catch (error) {
        this.snackbar.text = 'ลบผลการดำเนินงานล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
    }
  },
  watch: {
    'sar.sarId': function (val) {
      console.log(val)
    }
  },
  beforeMount () {
    this.sar.sarLvl = this.$route.query.sarLvl
    this.sar.indicatorId = this.indicator.indicatorId = this.$route.query.indicatorId
    this.indicator.indicatorNo = this.$route.query.indicatorNo
    this.indicator.indicatorName = this.$route.query.indicatorName
    this.indicator.indicatorType = this.$route.query.indicatorType
    this.getSAR()
  }
}
</script>
