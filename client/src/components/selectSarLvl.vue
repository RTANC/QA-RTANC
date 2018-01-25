<template>
    <v-select v-model="sarLvl" v-bind:items="allSarLvl" label="กลุ่มผู้รับผิดชอบ">
    </v-select>
</template>

<script>
  export default {
    name: 'selectSarLvl',
    data: () => {
      return {
        sarLvl: null,
        allSarLvl: [{
          text: 'วิทยาลัยพยาบาลกองทัพบก',
          value: {lvl: 3, dept: 1}
        }, {
          text: 'กองอำนวยการ',
          value: {lvl: 2, dept: 1}
        }, {
          text: 'กองการศึกษา',
          value: {lvl: 2, dept: 2}
        }, {
          text: 'กองการปกครอง',
          value: {lvl: 2, dept: 3}
        }, {
          text: 'แผนกเตรียมการ',
          value: {lvl: 1, dept: 1}
        }, {
          text: 'แผนกสนับสนุน',
          value: {lvl: 1, dept: 2}
        }, {
          text: 'แผนกธุรการ/กำลังพล',
          value: {lvl: 1, dept: 3}
        }, {
          text: 'ภาควิชาความรู้พื้นฐาน',
          value: {lvl: 1, dept: 4}
        }, {
          text: 'ภาควิชาการพยาบาลเบื้องต้น',
          value: {lvl: 1, dept: 5}
        }, {
          text: 'ภาควิชาการพยาบาลอายุรศาสตร์และศัลยศาสตร์',
          value: {lvl: 1, dept: 6}
        }, {
          text: 'ภาควิชาพยาบาลสูติศาสตร์',
          value: {lvl: 1, dept: 7}
        }, {
          text: 'ภาควิชาการพยาบาลกุมารเวชศาสตร์',
          value: {lvl: 1, dept: 8}
        }, {
          text: 'ภาควิชาสุขภาพจิตและการพยาบาลจิตเวชศาสตร์',
          value: {lvl: 1, dept: 9}
        }, {
          text: 'ภาควิชาการพยาบาลอนามัยชุมชน',
          value: {lvl: 1, dept: 10}
        }]
      }
    },
    watch: {
      sarLvl: function (val) {
        this.$emit('onSarLvlChange', val)
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
