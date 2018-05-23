<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs10 offset-xs1>
      <h1>องค์ประกอบที่ {{ std.stdNo }} : {{ std.stdName }}</h1>
    </v-flex>
    <v-flex xs11 offset-xs1 class="pt-3">
      <v-data-table v-bind:headers="headers" item-key="indicatorNo" v-bind:items="items" v-bind:pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-center">{{std.stdNo}}.{{ props.item.indicatorNo }}</td>
            <td @click="props.expanded = !props.expanded" class="text-xs-left">{{ props.item.indicatorName }}</td>
            <td class="text-xs-left">
              <v-btn color="primary" :to="{path: '/ModifiedInd',query: {indId: props.item.indicatorId,stdId: std.stdId,stdNo: std.stdNo}}"><v-icon>create</v-icon></v-btn>
              <v-btn color="error" @click="delInd(props.item)"><v-icon>delete</v-icon></v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-title primary-title class="title">ชนิดของตัวบ่งชี้</v-card-title>
            <v-card-text>{{ (props.item.indicatorType === false) ? 'เชิงปริมาณ' : 'เชิงคุณภาพ' }}</v-card-text>
            <v-card-title primary-title class="title">คำอธิบาย</v-card-title>
            <v-card-text>{{ props.item.indicatorInfo }}</v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs-12>
      <v-btn :to="{path: '/ModifiedInd', query: {stdId: std.stdId,stdNo: std.stdNo}}" fixed dark fab bottom right color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
      
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
        {{snackbar.text}}
    </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
import IndicatorService from '@/services/IndicatorService'
export default {
  name: 'ManageInd',
  data: () => {
    return {
      dialog: false,
      key: 'sclhhconedzzd6ze9f3qvqgqlhvie7y2cqykydtyqu3o8qla',
      edit: false,
      valid: false,
      pagination: {
        sortBy: 'indicatorNo'
      },
      headers: [{text: 'ตัวบ่งชี้ที่', value: 'indicatorNo', align: 'center'},
      {text: 'ตัวบ่งชี้', value: 'indicatorName', align: 'center'},
      {text: '', value: 'btn', align: 'center'}],
      items: [],
      ind: {
        indId: null,
        indNo: null,
        indName: null,
        indInfo: null,
        indType: '0',
        indGain: null
      },
      std: {
        stdId: null,
        stdNo: null,
        stdName: null
      },
      snackbar: {
        show: false,
        text: null,
        color: null
      },
      opt: {
        height: '300'
      }
    }
  },
  methods: {
    async delInd (val) {
      try {
        if (confirm('ยืนยันการลบตัวบ่งชี้')) {
          await IndicatorService.delIndicator(val.indicatorId)
          this.snackbar.text = 'ลบตัวบ่งชี้สำเร็จ'
          this.snackbar.color = 'success'
          this.snackbar.show = true
        }
      } catch (error) {
        this.snackbar.text = 'ลบตัวบ่งชี้ล้มเหลว'
        this.snackbar.color = 'error'
        this.snackbar.show = true
      }
      this.getIndicator()
    },
    async submit () {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('indicatorNo', this.ind.indNo)
        formData.append('indicatorName', this.ind.indName)
        formData.append('indicatorInfo', this.ind.indInfo)
        formData.append('indicatorType', this.ind.indType)
        formData.append('indicatorGain', this.ind.indGain)
        try {
          if (!this.edit) {
            formData.append('standardId', this.std.stdId)
            await IndicatorService.addIndicator(formData)
            this.snackbar.text = 'เพิ่มตัวบ่งชี้สำเร็จ'
            this.snackbar.color = 'success'
            this.snackbar.show = true
          } else {
            formData.append('indicatorId', this.ind.indId)
            await IndicatorService.editIndicator(formData)
            this.snackbar.text = 'แก้ไขตัวบ่งชี้สำเร็จ'
            this.snackbar.color = 'success'
            this.snackbar.show = true
          }
          this.getIndicator()
        } catch (error) {
          if (!this.edit) {
            this.snackbar.text = 'เพิ่มตัวบ่งชี้ล้มเหลว'
            this.snackbar.color = 'error'
            this.snackbar.show = true
          } else {
            this.snackbar.text = 'แก้ไขตัวบ่งชี้ล้มเหลว'
            this.snackbar.color = 'error'
            this.snackbar.show = true
          }
        }
      }
    },
    async getIndicator () {
      const respones = await IndicatorService.getIndicator(this.std.stdId)
      this.items = respones.data
    }
  },
  beforeMount () {
    if (!this.$store.getters.getUser.standardMgr) {
      this.$router.push('Home')
    } else {
      this.std.stdId = this.$route.query.stdId
      this.std.stdNo = this.$route.query.stdNo
      this.std.stdName = this.$route.query.stdName
      this.getIndicator()
    }
  }
}
</script>
