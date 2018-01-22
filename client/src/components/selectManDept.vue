<template>
    <v-select @change="onManLvlChange" v-bind:items="allManLvl" label="ระดับของคู่มือ">
    </v-select>
</template>

<script>
  export default {
    name: 'selectManLvl',
    data: () => {
      return {
        allManLvl: [{
          text: 'วิทยาลัยพยาบาลกองทัพบก',
          value: 0
        }, {
          text: 'กองอำนวยการ',
          value: 1
        }, {
          text: 'กองการศึกษา',
          value: 2
        }, {
          text: 'กองการปกครอง',
          value: 3
        }, {
          text: 'แผนกเตรียมการ',
          value: 4
        }, {
          text: 'แผนกสนับสนุน',
          value: 5
        }, {
          text: 'แผนกธุรการ/กำลังพล',
          value: 6
        }, {
          text: 'ภาควิชาความรู้พื้นฐาน',
          value: 7
        }, {
          text: 'ภาควิชาการพยาบาลเบื้องต้น',
          value: 8
        }, {
          text: 'ภาควิชาการพยาบาลอายุรศาสตร์และศัลยศาสตร์',
          value: 9
        }, {
          text: 'ภาควิชาพยาบาลสูติศาสตร์',
          value: 10
        }, {
          text: 'ภาควิชาการพยาบาลกุมารเวชศาสตร์',
          value: 11
        }, {
          text: 'ภาควิชาสุขภาพจิตและการพยาบาลจิตเวชศาสตร์',
          value: 12
        }, {
          text: 'ภาควิชาการพยาบาลอนามัยชุมชน',
          value: 13
        }]
      }
    },
    methods: {
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
