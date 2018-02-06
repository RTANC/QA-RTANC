<template>
  <v-container fluid>
      <v-layout row wrap>
          <v-flex xs2 offset-xs1>
            <select-year></select-year>
          </v-flex>
          <v-flex xs5 offset-xs2>
            <select-institute></select-institute>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-radio-group row v-model="stdLvl" label="ระดับองค์ประกอบ*" :rules="[v => !!v]">
              <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
              <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs4 class="pt-4">
            <select-dept lbl="ระดับของการประเมินตนเอง"></select-dept>
          </v-flex>
          <v-flex xs10 offset-xs1>
              <v-data-table :headers="header" :items="indicators" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="text-xs-center"></td>
                        <td class="text-xs-left"></td>
                        <td></td>
                    </tr>
                </template>
              </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import selectYear from '@/components/selectYear'
import selectInstitute from '@/components/selectInstitute'
import selectDept from '@/components/selectDept'
export default {
  name: 'MakeSAR',
  components: {
    'select-year': selectYear,
    'select-institute': selectInstitute,
    'select-dept': selectDept
  },
  data: () => {
    return {
      year: null,
      institute: null,
      stdLvl: '0',
      pagination: {
        sortBy: 'indicatorNo'
      },
      header: [{
        text: 'ตัวบ่งชี้ที่',
        align: 'center',
        value: 'indicatorNo'
      },
      {
        text: 'ตัวบ่งชี้',
        align: 'left',
        value: 'indicatorName'
      }]
    }
  }
}
</script>

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
