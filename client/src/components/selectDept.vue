<template>
    <v-select :items="allDept | fileterA(limit) " v-model="dept" :label="lbl">
    </v-select>
</template>

<script>
  import Dept from '@/services/DeptService'
  export default {
    name: 'selectDept',
    props: {
      lbl: {
        type: String,
        default: ''
      },
      limit: {
        type: Number,
        default: -1
      }
    },
    data: () => {
      return {
        dept: null,
        allDept: Dept.Dept
      }
    },
    watch: {
      dept: function (val) {
        this.$emit('onDeptChange', val)
      }
    },
    filters: {
      fileterA: function (val, lim) {
        return val.filter(v => {
          return v.value > lim
        })
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
