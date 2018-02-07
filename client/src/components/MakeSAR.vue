<template>
  <v-container fluid>
      <v-layout row wrap>
          <v-flex xs2 offset-xs1>
            <select-year v-on:onYearChange="getYear($event)"></select-year>
          </v-flex>
          <v-flex xs5 offset-xs2>
            <select-institute v-on:onInstituteChange="getInstitute($event)"></select-institute>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-radio-group row v-model="stdLvl" label="ระดับองค์ประกอบ*" :rules="[v => !!v]">
              <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
              <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs4 class="pt-4">
            <select-dept v-on:onDeptChange="getSarLvl($event)" lbl="ระดับของการประเมินตนเอง"></select-dept>
          </v-flex>
          <v-flex xs10 offset-xs1>
              <v-data-table :headers="header" :items="indicators" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="text-xs-center">{{ props.item.indicatorNo }}</td>
                        <td class="text-xs-left">{{ props.item.indicatorName }}</td>
                        <td><v-btn color="teal" dark :to="{path: '/WriteSAR', query: {sarLvl: sarLvl, indicatorId: props.item.indicatorId, indicatorNo: props.item.indicatorNo, indicatorName: props.item.indicatorName, indicatorType: props.item.indicatorType}}">
                          <v-icon>create</v-icon>
                        </v-btn></td>
                    </tr>
                </template>
              </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import selectYear from '@/components/selectYear'
import selectInstitute from '@/components/selectInstitute'
import selectDept from '@/components/selectDept'
import IndicatorService from '@/services/IndicatorService'
export default {
  name: 'MakeSAR',
  components: {
    'select-year': selectYear,
    'select-institute': selectInstitute,
    'select-dept': selectDept
  },
  data: () => {
    return {
      year: null,
      institute: null,
      stdLvl: '0',
      sarLvl: null,
      pagination: {
        sortBy: 'indicatorNo'
      },
      header: [{
        text: 'ตัวบ่งชี้ที่',
        align: 'center',
        value: 'indicatorNo'
      },
      {
        text: 'ตัวบ่งชี้',
        align: 'center',
        value: 'indicatorName'
      }],
      indicators: []
    }
  },
  methods: {
    getYear (val) {
      this.year = val
      this.getFullIndicator()
    },
    getInstitute (val) {
      this.institute = val
      this.getFullIndicator()
    },
    getSarLvl (val) {
      if (this.sarLvl === null) {
        this.sarLvl = val
        this.getFullIndicator()
      } else {
        this.sarLvl = val
      }
    },
    async getFullIndicator () {
      try {
        if (this.year !== null && this.institute !== null && this.stdLvl !== null && this.sarLvl !== null) {
          const response = await IndicatorService.getFullIndicator({
            year: this.year,
            institute: this.institute,
            standardLvl: this.stdLvl
          })
          const data = response.data
          if (data.length !== 0) {
            for (const i in data) {
              for (const j in data[i].indicators) {
                this.indicators.push({
                  indicatorId: data[i].indicators[j].indicatorId,
                  indicatorNo: data[i].standardNo + '.' + data[i].indicators[j].indicatorNo,
                  indicatorName: data[i].indicators[j].indicatorName,
                  indicatorType: data[i].indicators[j].indicatorType
                })
              }
            }
          } else {
            this.indicators = data
          }
        }
      } catch (error) {
      }
    }
  },
  watch: {
    stdLvl: function (val) {
      this.stdLvl = val
      this.getFullIndicator()
    }
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
