<template>
    <v-select @change="onYearChange" v-bind:items="allYear" label="เลือกปีงบประมาณ">
    </v-select>
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
    name: 'selectYear',
    data: () => {
      return {
        allYear: tmp
      }
    },
    methods: {
      onYearChange (val) {
        this.$emit('onYearChange', val)
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
