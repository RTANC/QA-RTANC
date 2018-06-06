<template>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs>
          <v-card>
            <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs1 offset-xs1>
                    <v-text-field v-model.number="ind.indNo" :prefix="std.stdNo+'.'" type="number" label="ลำดับที่่" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
                  </v-flex>
                  <v-flex xs7 offset-xs1>
                    <v-text-field label="ตัวบ่งชี้" v-model="ind.indName" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
                  </v-flex>
                  <v-flex xs5 offset-xs1>
                    <v-radio-group row v-model="ind.indType" label="ชนิดของตัวบ่งชี้*" :rules="[v => !!v]">
                      <v-radio label="เชิงปริมาณ" value="0" color="primary"></v-radio>
                      <v-radio label="เชิงคุณภาพ" value="1" color="primary"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs9 offset-xs1>
                    <!-- <v-text-field label="คำอธิบาย" v-model="ind.indInfo" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required multi-line></v-text-field> -->
                    <h4 class="subheading mb-1">คำอธิบายตัวบ่งชี้*</h4>
                    <tinymce id="indInfo" v-model="ind.indInfo" :other_options="opt"></tinymce>
                  </v-flex>
                  <v-flex xs9 offset-xs1>
                    <!-- <v-text-field label="คำอธิบาย" v-model="ind.indInfo" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required multi-line></v-text-field> -->
                    <h4 class="subheading mt-3 mb-2">เกณฑ์การประเมิน*</h4>
                    <tinymce id="indGain" v-model="ind.indGain" :other_options="opt"></tinymce>
                  </v-flex>
                  <v-flex xs10 offset-xs1 class="my-2">
                    <v-btn @click="submit" :disabled="!valid" color="primary">ยืนยัน</v-btn>
                    <v-btn @click="clear" color="error">ยกเลิก</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
        {{snackbar.text}}
    </v-snackbar>
    </v-container>
</template>

<script>
import IndicatorService from '@/services/IndicatorService'
export default {
  name: 'ModifiedInd',
  data: () => {
    return {
      edit: false,
      std: {
        stdId: null,
        stdNo: null
      },
      ind: {
        indId: null,
        indNo: null,
        indName: null,
        indInfo: null,
        indType: '0',
        indGain: null
      },
      snackbar: {
        show: false,
        text: null,
        color: null
      },
      opt: {
        height: '300'
      },
      valid: false
    }
  },
  methods: {
    async getIndicator (indId) {
      try {
        const response = await IndicatorService.getOneIndicator(indId)
        this.ind.indId = response.data.indicatorId
        this.ind.indNo = response.data.indicatorNo
        this.ind.indName = response.data.indicatorName
        this.ind.indInfo = response.data.indicatorInfo
        this.ind.indType = !response.data.indicatorType ? '0' : '1'
        this.ind.indGain = response.data.indicatorGain
      } catch (error) {
        this.snackbar.text = 'ไม่พบตัวบ่งชี้ที่ค้นหา'
        this.snackbar.color = 'error'
        this.snackbar.show = true
      }
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
          this.$router.go(-1)
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
    clear () {
    }
  },
  beforeMount () {
    if (!this.$store.getters.getUser.standardMgr) {
      this.$router.push('Root')
    } else {
      if (typeof this.$route.query.indId === 'undefined') {
        this.edit = false
      } else {
        this.edit = true
        this.getIndicator(this.$route.query.indId)
      }
      this.std.stdId = this.$route.query.stdId
      this.std.stdNo = this.$route.query.stdNo
    }
  }
}
</script>
