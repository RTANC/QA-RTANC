<template>
    <v-select v-bind:items="allInstitute" label="เลือกสถาบันผู้ประเมิน" v-model="institute">
    </v-select>
</template>

<script>
  export default {
    name: 'selectInstitute',
    data: () => {
      return {
        allInstitute: [{
          text: 'สำนักงานคณะกรรมการการอุดมศึกษา',
          value: 0
        }, {
          text: 'สภาการพยาบาล',
          value: 1
        }, {
          text: 'สถาบันวิชาการป้องกันประเทศ',
          value: 2
        }, {
          text: 'กรมยุทธศึกษาทหารบก',
          value: 3
        }],
        institute: null
      }
    },
    watch: {
      institute: function (val) {
        this.$emit('onInstituteChange', val)
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
