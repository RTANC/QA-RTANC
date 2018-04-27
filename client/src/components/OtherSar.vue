<template>
  <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>
          <v-card>
            <v-card-actions>
              <select-dept @onDeptChange="getDept($event)" lbl="เลือกระดับผลการดำเนินงานที่ต้องการ" :limit="dept"></select-dept>
            </v-card-actions>
          </v-card>
        </v-flex>
          <v-flex xs10 offset-xs1>
              <v-card>
                <v-card-title primary-title class="d-block">
                  <h3 class="headline">รายงานการประเมินตนเอง {{(sar.sarLvl === null)? '' : allDept[sar.sarLvl].text}}</h3>
                  <h3>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</h3>
                </v-card-title>
              </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <sar-doc-ref :sarId="sar.sarId" :selectSarId="sarId" readonly></sar-doc-ref>
          </v-flex>
          <v-flex xs10 offset-xs1>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการดำเนินงาน</h6>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card>
              <v-card-text v-html="sar.sarResult">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการประเมินตนเอง</h6>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card class="px-3">
              <v-text-field v-model="sar.goal" multi-line label="เป้าหมาย" readonly></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="px-3">
              <v-text-field v-model="sar.sumResult" multi-line label="สรุป ผลการดำเนินงาน" readonly></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card class="pt-3 px-3 d-flex">
              <v-switch label="การบรรลุเป้าหมาย" v-model="sar.goalCk" color="success" class="pt-4" readonly></v-switch>
              <v-text-field v-model="sar.score" type="number" max="5" min="0" label="คะแนนการประเมินตนเอง" :rules="[v => (v > 5) ? 'คะแนนเต็ม 5 คะแนน' : true ]" readonly></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card class="px-3">
              <v-text-field v-model="sar.str" multi-line label="จุดแข็ง" readonly></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="px-3">
              <v-text-field v-model="sar.strEnchance" multi-line label="แนวทางการเสริมจุดแข็ง" readonly></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card class="px-3">
              <v-text-field v-model="sar.weak" multi-line label="จุดที่ควรพัฒนา" readonly></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="px-3">
              <v-text-field v-model="sar.weakEnchance" multi-line label="ข้อเสนอแนะในการปรับปรุง" readonly></v-text-field>
            </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import SarService from '@/services/SarService'
import Dept from '@/services/DeptService'
import sarDocRef from '@/components/sarDocRef'
import selectDept from '@/components/selectDept'
export default {
  name: 'OtherSar',
  props: {
    indicator: {
      type: Object
    },
    dept: {
      type: Number,
      default: 0
    },
    sarId: {
      type: Number,
      default: 0
    }
  },
  components: {
    sarDocRef,
    selectDept
  },
  data: () => {
    return {
      editorOption: {
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
        height: '300'
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
      allDept: Dept.Dept,
      value: null
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
          this.sar = {
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
          }
        } else {
          this.sar = respones.data[0]
          this.sar.sarResult = /<body.*?>([\s\S]*)<\/body>/.exec(this.sar.sarResult)[1]
        }
      } catch (error) {
      }
    },
    getDept (val) {
      this.sar.sarLvl = val
      this.getSAR()
    }
  }
}
</script>
