<template>
  <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>
          <v-card>
            <v-card-actions>
              <v-btn color="primary" @click.native="dialogOther = true"><v-icon left>search</v-icon>ดูผลการดำเนินงานอื่นๆ</v-btn>
              <v-btn color="cyan" dark><v-icon left>description</v-icon>ออกรายงานผลการดำเนินงาน</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
          <v-flex xs10 offset-xs1>
              <v-card>
                <v-card-title primary-title class="d-block">
                  <h3 class="headline">รายงานการประเมินตนเอง {{dept[sar.sarLvl].text}}</h3>
                  <h3>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</h3>
                </v-card-title>
              </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <sar-doc-ref :sarId="sar.sarId"></sar-doc-ref>
          </v-flex>
          <v-flex xs10 offset-xs1>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการดำเนินงาน</h6>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card>
              <editor v-model="sar.sarResult" :init="editorOption" api-key="sclhhconedzzd6ze9f3qvqgqlhvie7y2cqykydtyqu3o8qla"></editor>
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
                <v-btn icon @click.native="dialogOther = false" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>ดูผลการดำเนินงานอื่นๆ</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="grey lighten-4">
                <other-sar :indicator="indicator" :dept="sar.sarLvl"></other-sar>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogCommonDoc" persistent scrollable>
            <v-card>
              <v-card-title primary-title>เลือกไฟล์เอกสารส่วนกลาง
                <v-spacer></v-spacer>
                <v-btn flat icon @click.native="dialogCommonDoc = false"><v-icon>close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                <!-- <common-doc :upload="false" :sarResultId="sarResultId"></common-doc> -->
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
import Dept from '@/services/DeptService'
import commonDoc from '@/components/CommonDoc'
import sarDocRef from '@/components/sarDocRef'
import otherSar from '@/components/OtherSar'
export default {
  name: 'WriteSAR',
  components: {
    commonDoc,
    sarDocRef,
    otherSar
  },
  data: () => {
    return {
      dialogOther: false,
      dialogCommonDoc: false,
      editorOption: {
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
        height: '300'
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
    this.sar.sarLvl = this.$route.query.sarLvl
    this.sar.indicatorId = this.indicator.indicatorId = this.$route.query.indicatorId
    this.indicator.indicatorNo = this.$route.query.indicatorNo
    this.indicator.indicatorName = this.$route.query.indicatorName
    this.indicator.indicatorType = this.$route.query.indicatorType
    this.getSAR()
  }
}
</script>
