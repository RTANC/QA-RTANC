<template>
<v-container fluid>
  <v-layout row wrap>
    <v-flex xs2 offset-xs1>
      <select-year @onYearChange="getYear($event)"></select-year>
    </v-flex>
    <v-flex xs2 offset-xs1>
      <v-select :items="docCatalog" v-model="catalog" label="เลือกหมวดหมู่เอกสาร"></v-select>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <select-dept lbl="เลือกแผนก / ภาควิชา" @onDeptChange="getDept($event)"></select-dept>
    </v-flex>
  </v-layout>
</v-container>
  
</template>

<script>
import selectYear from './selectYear'
import selectDept from './selectDept'
import DocCatalogService from '@/services/DocCatalogService'
export default {
  name: 'CommonDoc',
  components: {
    'select-year': selectYear,
    'select-dept': selectDept
  },
  data: () => {
    return {
      year: null,
      dept: null,
      catalog: null,
      docCatalog: DocCatalogService.docCatalog
    }
  },
  methods: {
    getYear: (val) => {
      this.year = val
    },
    getDept: (val) => {
      console.log(val)
    }
  }
}
</script>
