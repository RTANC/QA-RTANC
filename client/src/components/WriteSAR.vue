<template>
  <v-container fluid>
      <v-layout row wrap>
          <v-flex xs10 offset-xs1>
              <v-card>
                <v-card-title primary-title>
                  <h3 class="headline">รายงานการประเมินตนเอง {{dept[0].text}}</h3> <br>
                  <h3>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</h3>
                </v-card-title>
                  <v-list>
                    <v-divider></v-divider>
                      <v-list-tile>
                          <v-list-tile-content>
                              <v-list-tile-title></v-list-tile-title>
                          </v-list-tile-content>
                      </v-list-tile>
                  </v-list>
              </v-card>
          </v-flex>
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
          console.log(this.sar)
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
        this.snackbar.text = 'สร้าง SAR สำเร็จ'
        this.snackbar.color = 'success'
      } catch (error) {
        this.snackbar.text = 'สร้าง SAR ล้มเหลว'
        this.snackbar.color = 'error'
      }
      this.snackbar.show = true
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
