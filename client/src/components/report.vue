<template lang="html">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <table border="1" cellspacing="0" id="tblSar">
          <thead>
            <tr>
              <th>ผลการดำเนินงาน</th>
              <th class="px-2">หลักฐานเอกสารอ้างอิง</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="result in sar.sarResults">
              <tr>
                <td v-html="result.sarResultText" class="px-2 py-1"></td>
                <td class="px-2 py-1">
                  <template v-for="doc in result.sarDocRefs">
                    {{doc.docName}}
                    <br>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ReportService from '@/services/ReportService'
import XLSX from 'xlsx'
export default {
  name: 'report',
  props: {
    sarId: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {
      sar: {
        sarResults: [{
          sarResultText: '',
          sarDocRefs: []
        }]
      }
    }
  },
  methods: {
    async getReport () {
      const respones = await ReportService.getReport(this.sarId)
      this.sar = respones.data.sar
      console.log(this.sar)
    },
    onExport () {
      var wb = XLSX.utils.table_to_book(document.getElementById('tblSar'))
      XLSX.writeFile(wb, 'SAR.xlsx')
    }
  },
  watch: {
    sarId: function () {
      this.getReport()
    }
  }
}
</script>
