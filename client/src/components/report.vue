<template lang="html">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <v-subheader>Self Assessment Report</v-subheader>
            <v-spacer></v-spacer>
            <v-btn color="green darken-4" dark><v-icon>picture_as_excel</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <table border="1" cellspacing="0">
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
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ReportService from '@/services/ReportService'
export default {
  name: 'report',
  data: () => {
    return {
      sarId: null,
      sar: null
    }
  },
  methods: {
    async getReport () {
      const respones = await ReportService.getReport(this.sarId)
      this.sar = respones.data.sar
      console.log(this.sar)
    }
  },
  beforeMount () {
    this.sarId = this.$route.query.sarId
    this.getReport()
  }
}
</script>
