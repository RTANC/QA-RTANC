<template>
  <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>
          <v-card>
            <v-card-actions>
              <v-btn color="primary" @click.native="dialogOther = true" v-if="sar.sarLvl < 4"><v-icon left>search</v-icon>ดูผลการดำเนินงานอื่นๆ</v-btn>
              <v-btn color="cyan" dark :href="target + sar.sarId + '?indicatorId=' + indicator.indicatorId" target="_blank"><v-icon left>description</v-icon>ออกรายงานผลการดำเนินงาน</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
          <v-flex xs10 offset-xs1>
              <v-card>
                <v-card-title primary-title class="d-block">
                  <h3 class="headline">รายงานการประเมินตนเอง {{dept[sar.sarLvl].text}}</h3>
                  <h3>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</h3>
                  <h3 class="d-inline-flex">ชนิดของตัวบ่งชี้ : </h3><span class="subheading">   {{(!indicator.indicatorType) ? 'เชิงปริมาณ' : 'เชิงคุณภาพ'}}</span>
                  <h3>คำอธิบายตัวบ่งชี้</h3>
                  <p v-html="indicator.indicatorInfo"></p>
                  <h3>เกณฑ์การประเมิน</h3>
                  <p v-html="indicator.indicatorGain"></p>
                </v-card-title>
              </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <sar-doc-ref :sarId="sar.sarId" ref="listDocs"></sar-doc-ref>
          </v-flex>
          <v-flex xs10 offset-xs1>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการดำเนินงาน</h6>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card>
              <tinymce id="d1" v-model="sar.sarResult" :other_options="editorOption"></tinymce>
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
          <v-dialog v-model="dialogOther" fullscreen transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon @click.native="dialogOther = false;getDocBySar();" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>ดูผลการดำเนินงานอื่นๆ</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="grey lighten-4">
                <other-sar :indicator="indicator" :dept="sar.sarLvl" :sarId="sar.sarId"></other-sar>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
            {{snackbar.text}}
          </v-snackbar>
      </v-layout>
  </v-container>
</template>

<script>
import SarService from '@/services/SarService'
import IndicatorService from '@/services/IndicatorService'
import Dept from '@/services/DeptService'
import sarDocRef from '@/components/sarDocRef'
import otherSar from '@/components/OtherSar'
import ReportService from '@/services/Report'
export default {
  name: 'WriteSAR',
  components: {
    sarDocRef,
    otherSar
  },
  data: () => {
    return {
      target: 'http://192.168.100.10:3000/api/sar/report/',
      dialogOther: false,
      editorOption: {
        height: '300'
      },
      indicator: {
        indicatorId: null,
        indicatorNo: null,
        indicatorName: null,
        indicatorType: null,
        indicatorInfo: null,
        indicatorGain: null
      },
      sar: {
        sarId: null,
        indicatorId: null,
        sarLvl: null,
        sarResult: null,
        goal: null,
        sumResult: null,
        goalCk: null,
        score: null,
        str: null,
        strEnchance: null,
        weak: null,
        weakEnchance: null
      },
      report: {
        indicatorNo: null,
        indicatorName: null,
        indicatorType: null,
        indicatorInfo: null,
        indicatorGain: null,
        sarResult: null,
        goal: null,
        sumResult: null,
        goalCk: null,
        score: null,
        str: null,
        strEnchance: null,
        weak: null,
        weakEnchance: null
      },
      snackbar: {
        show: false,
        text: null,
        color: null
      },
      dept: Dept.Dept
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
          this.report.sarResult = this.sar.sarResult
          this.report.goal = this.sar.goal
          this.report.sumResult = this.sar.sumResult
          this.report.goalCk = (this.sar.goalCk) ? '&#x2713;' : '&#x2717;'
          this.report.score = this.sar.score
          this.report.str = this.sar.str
          this.report.strEnchance = this.sar.strEnchance
          this.report.weak = this.sar.weak
          this.report.weakEnchance = this.sar.weakEnchance
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
        formData.append('sarResult', this.sar.sarResult)
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
    getDocBySar () {
      this.$refs.listDocs.getDocBySar()
    },
    async getOneIndicator (id) {
      try {
        const response = await IndicatorService.getOneIndicator(id)
        this.report.indicatorNo = this.indicator.indicatorNo
        this.report.indicatorName = this.indicatorName
        this.report.indicatorType = (!this.indicator.indicatorType) ? 'เชิงปริมาณ' : 'เชิงคุณภาพ'
        this.report.indicatorInfo = this.indicator.indicatorInfo = response.data.indicatorInfo
        this.report.indicatorGain = this.indicator.indicatorGain = response.data.indicatorGain
      } catch (e) {
      }
    },
    async SAR () {
      try {
        const response = await ReportService.SAR(this.report)
        console.log(response.data)
        // var blob = new Blob([response.data], {type: 'application/pdf'})
        // console.log(window.URL.createObjectURL(blob))
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    'sar.sarId': function (val) {
      console.log(val)
    }
    // 'sar.sarResult': function (val) {
    //   var bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(val)[1]
    //   console.log(bodyHtml)
    // }
  },
  beforeMount () {
    this.sar.sarLvl = parseInt(this.$route.query.sarLvl)
    this.sar.indicatorId = this.indicator.indicatorId = parseInt(this.$route.query.indicatorId)
    this.indicator.indicatorNo = this.$route.query.indicatorNo
    this.indicator.indicatorName = this.$route.query.indicatorName
    this.indicator.indicatorType = this.$route.query.indicatorType
    this.getSAR()
    this.getOneIndicator(this.indicator.indicatorId)
  }
}
</script>
