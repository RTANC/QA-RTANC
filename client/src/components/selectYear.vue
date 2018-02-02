<template>
    <v-select v-bind:items="allYear" label="เลือกปีงบประมาณ" v-model="year">
    </v-select>
</template>

<script>
  export default {
    name: 'selectYear',
    data: () => {
      return {
        allYear: [],
        year: null
      }
    },
    methods: {
      initYearSelect () {
        var nowYear = ((new Date()).getFullYear()) + 543
        for (var i = nowYear - 3; i <= nowYear + 3; i++) {
          this.allYear.push({
            text: i,
            value: i
          })
        }
      }
    },
    watch: {
      year: function (val) {
        this.$emit('onYearChange', val)
      }
    },
    beforeMount () {
      this.initYearSelect()
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
