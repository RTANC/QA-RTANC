<template>
<v-layout class="pt-5" row wrap>
  <v-flex xs2 offset-xs1>
    <v-select v-bind:items="year" label="เลือกปีการศึกษา" class="input-group--focused">
    </v-select>
  </v-flex>
  <v-flex xs3 offset-xs1>
    <v-select v-bind:items="institute" label="เลือกสถาบันผู้ประเมิน" class="input-group--focused">
    </v-select>
  </v-flex>
</v-layout>
</template>

<script>
var tmp = []
var nowYear = ((new Date()).getFullYear()) + 543
for (var i = nowYear - 3; i <= nowYear + 3; i++) {
  tmp.push({
    text: '' + i
  })
}
export default {
  name: 'ManualUpload',
  data: () => {
    return {
      year: tmp,
      institute: [{
        text: 'สำนักงานคณะกรรมการการอุดมศึกษา',
        value: 1
      }, {
        text: 'สภาการพยาบาล',
        value: 2
      }]
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
