<template>
<v-container fluid grid-list-xs>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
      <v-select @change="onYearChange" v-bind:items="allYear" label="เลือกปีงบประมาณ" class="input-group--focused">
      </v-select>
    </v-flex>
    <v-flex xs3 offset-xs1>
      <v-select @change="onInstituteChange" v-bind:items="allinstitute" label="เลือกสถาบันผู้ประเมิน" class="input-group--focused">
      </v-select>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <v-select @change="onManLvlChange" v-bind:items="allManLvl" label="ระดับของคู่มือ" class="input-group--focused">
      </v-select>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  var tmp = []
  var nowYear = ((new Date()).getFullYear()) + 543
  for (var i = nowYear - 3; i <= nowYear + 3; i++) {
    tmp.push({
      text: i,
      value: i
    })
  }
  export default {
    name: 'manualFilter',
    data: () => {
      return {
        allYear: tmp,
        allinstitute: [{
          text: 'สำนักงานคณะกรรมการการอุดมศึกษา',
          value: 1
        }, {
          text: 'สภาการพยาบาล',
          value: 2
        }, {
          text: 'สถาบันวิชาการป้องกันประเทศ',
          value: 3
        }, {
          text: 'กรมยุทธศึกษาทหารบก',
          value: 4
        }],
        allManLvl: [{
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
        }, {
          text: 'แผนกเตรียมการ',
          value: 5
        }, {
          text: 'แผนกสนับสนุน',
          value: 6
        }, {
          text: 'แผนกธุรการ/กำลังพล',
          value: 7
        }, {
          text: 'ภาควิชาความรู้พื้นฐาน',
          value: 8
        }, {
          text: 'ภาควิชาการพยาบาลเบื้องต้น',
          value: 9
        }, {
          text: 'ภาควิชาการพยาบาลอายุรศาสตร์และศัลยศาสตร์',
          value: 10
        }, {
          text: 'ภาควิชาพยาบาลสูติศาสตร์',
          value: 11
        }, {
          text: 'ภาควิชาการพยาบาลกุมารเวชศาสตร์',
          value: 12
        }, {
          text: 'ภาควิชาสุขภาพจิตและการพยาบาลจิตเวชศาสตร์',
          value: 13
        }, {
          text: 'ภาควิชาการพยาบาลอนามัยชุมชน',
          value: 14
        }]
      }
    },
    methods: {
      onYearChange (val) {
        this.$emit('onYearChange', val)
      },
      onInstituteChange (val) {
        this.$emit('onInstituteChange', val)
      },
      onManLvlChange (val) {
        this.$emit('onManLvlChange', val)
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
