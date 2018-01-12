<template>
    <v-select @change="onManLvlChange" v-bind:items="allManLvl" label="ระดับของคู่มือ" class="input-group--focused">
    </v-select>
</template>

<script>
  export default {
    name: 'selectManLvl',
    data: () => {
      return {
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
