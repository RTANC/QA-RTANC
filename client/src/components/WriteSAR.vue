<template>
  <v-container fluid grid-list-md>
      <v-layout row wrap>
          <v-flex xs10 offset-xs1>
              <v-card>
                <v-card-title primary-title class="d-block">
                  <h3 class="headline">รายงานการประเมินตนเอง {{dept[0].text}}</h3>
                  <h3>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</h3>
                </v-card-title>
              </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการดำเนินงาน
              <v-btn icon color="orange" dark @click="writeSAR">
                <v-icon>create</v-icon>
              </v-btn>
            </h6>         
          </v-flex>
          <v-flex xs10 offset-xs1>
            <v-card>
              <v-list>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1>
            <h6 class="subheading">ผลการประเมินตนเอง
              <v-btn color="success" icon>
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
              <v-text-field v-model="sar.score" type="number" label="คะแนนการประเมินตนเอง"></v-text-field>
            </v-card>
          </v-flex>
          <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" scrollble>
            <v-card>
              <v-toolbar dark color="orange">
                <v-btn icon @click.native="dialog = false" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>เขียนผลการดำเนินงาน</v-toolbar-title>
              </v-toolbar>
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
export default {
  name: 'WriteSAR',
  data: () => {
    return {
      dialog: false,
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
          this.sar = respones.data
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
    writeSAR () {
      this.dialog = true
    }
  },
  watch: {
    'sar.goalCk': function (val) {
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
