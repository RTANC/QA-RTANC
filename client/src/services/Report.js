import axios from 'axios'
export default {
  SAR (data) {
    return axios.post('http://localhost:5488/api/report', {
      template: {shortid: 'Sk4QNy4Cf'},
      data: data,
      contentType: 'application/pdf',
      fileExtension: '.pdf',
      contentDisposition: 'attachment;filename=ผลการดำเนินงานของตัวบ่งชี้ที่ ' + data.indicatorNo + '.pdf'
    })
  }
}
