<template>
    <v-select @change="onInstituteChange" v-bind:items="allInstitute" label="เลือกสถาบันผู้ประเมิน" class="input-group--focused">
    </v-select>
</template>

<script>
  export default {
    name: 'selectInstitute',
    data: () => {
      return {
        allInstitute: [{
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
        }]
      }
    },
    methods: {
      onInstituteChange (val) {
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
