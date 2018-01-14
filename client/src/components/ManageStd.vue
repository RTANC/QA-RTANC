<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
    <selectYear v-on:onYearChange="getYear($event)"></selectYear>
    </v-flex>
    <v-flex xs3 offset-xs1>
      <selectInstitute v-on:onInstituteChange="getInstitute($event)"></selectInstitute>
    </v-flex>
    <v-flex xs5 offset-xs1>
      <radStd v-on:onStdChange="getStd($event)"></radStd>
    </v-flex>
    <v-flex xs-12>
      <v-btn to="/StdForm" fixed dark fab bottom right color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import selectYear from './selectYear'
  import selectInstitute from './selectInstitute'
  import radStd from './radStd'
  export default {
    name: 'ManageStd',
    components: {
      'selectYear': selectYear,
      'selectInstitute': selectInstitute,
      'radStd': radStd
    },
    data: () => {
      return {
        year: null,
        institute: null,
        std: null
      }
    },
    methods: {
      getYear (val) {
        this.year = val
      },
      getInstitute (val) {
        this.institute = val
      },
      getStd (val) {
        this.std = val
      }
    },
    watch: {
      year: function (val) {
        console.log(val)
      },
      institute: function (val) {
        console.log(val)
      },
      std: function (val) {
        console.log(val)
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
