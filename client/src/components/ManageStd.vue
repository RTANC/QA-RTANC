<template>
<div>
  <v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
      <selectYear v-on:onYearChange="getYear($event)"></selectYear>
    </v-flex>
    <v-flex xs5 offset-xs1>
      <selectInstitute v-on:onInstituteChange="getInstitute($event)"></selectInstitute>
    </v-flex>
    <v-flex xs6 offset-xs1>
      <v-radio-group row v-model="stdLvl" label="ระดับองค์ประกอบ*" :rules="[v => !!v]">
        <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
        <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-center">{{ props.item.standardNo }}</td>
            <td class="text-xs-left">{{ props.item.standardName }}</td>
            <td class="text-xs-right">
              <v-btn color="primary" @click="openEditDialog(props.item)"><v-icon>create</v-icon></v-btn>
              <v-btn color="error" @click.native.stop="confirm = true;stdId = props.item.standardId;"><v-icon>delete</v-icon></v-btn>
              <v-btn color="success" :to="{ path: '/ManageInd', query: { stdId: props.item.standardId, stdNo: props.item.standardNo ,stdName: props.item.standardName }}"><v-icon>launch</v-icon></v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</v-container>
 <v-speed-dial v-model="fab" fixed bottom right direction="top" transition="slide-y-reverse-transition" v-if="(year !== null && institute !== null)">
      <v-btn fab hover dark color="cyan" slot="activator" v-model="fab">
        <v-icon>keyboard_arrow_up</v-icon>
          <v-icon>close</v-icon>
      </v-btn>
      <v-btn dark  fab color="indigo">
        <v-icon>content_copy</v-icon>
      </v-btn>
      <v-btn @click="openAddDialog" dark fab color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="clear" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>ข้อมูลองค์ประกอบ</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form v-model="valid" ref="form">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs1 offset-xs1>
                <v-text-field v-model.number="stdNo" type="number" label="ลำดับที่่" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
              </v-flex>
              <v-flex xs7 offset-xs1>
                <v-text-field label="ชื่อองค์ประกอบ" v-model="stdName" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
              </v-flex>
              <v-flex xs5 offset-xs1>
                <v-card flat>
                  <v-card-text>
                    <v-radio-group row v-model="stdLvl" label="ระดับองค์ประกอบ*" :rules="[v => !!v]">
                      <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
                      <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs10 offset-xs1>
                <v-btn @click="submit" :disabled="!valid" color="primary">ยืนยัน</v-btn>
                <v-btn @click="clear" color="error">ยกเลิก</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
      <v-dialog v-model="confirm" max-width="290">
        <v-card>
          <v-card-title class="headline">ยืนยัน</v-card-title>
          <v-card-text>ท่านยืนยันที่จะลบ องค์ประกอบมาตรฐาน นี้หรือไม่?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" flat="flat" @click.native="confirm = false">ไม่ใช่</v-btn>
            <v-btn color="primary" flat="flat" @click.native="delStd();confirm = false;">ใช่</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
</div>
</template>

<script>
import selectYear from './selectYear'
import selectInstitute from './selectInstitute'
import StandardService from '@/services/StandardService'
export default {
  name: 'ManageStd',
  components: {
    'selectYear': selectYear,
    'selectInstitute': selectInstitute
  },
  data: () => {
    return {
      fab: false,
      year: null,
      institute: null,
      dialog: false,
      confirm: false,
      edit: false,
      valid: false,
      stdId: null,
      stdNo: 1,
      stdName: null,
      stdLvl: '0',
      pagination: {
        sortBy: 'stdNo'
      },
      headers: [ {text: 'องค์ประกอบที่', value: 'standardNo', align: 'center'}, {text: 'องค์ประกอบ', value: 'standardName', align: 'center'}, {text: '', value: 'btn', align: 'center'} ],
      items: [],
      snackbar: {
        show: false,
        text: null,
        color: null
      }
    }
  },
  methods: {
    getYear (val) {
      this.year = val
    },
    getInstitute (val) {
      this.institute = val
    },
    openAddDialog () {
      this.dialog = true
      this.edit = false
      this.stdNo = (this.items.length !== 0) ? Math.max.apply(Math, this.items.map(function (o) {
        return o.standardNo + 1
      })) : 1
    },
    openEditDialog (std) {
      this.dialog = true
      this.edit = true
      this.stdId = std.standardId
      this.stdNo = std.standardNo
      this.stdName = std.standardName
      this.stdLvl = (std.standardLvl) ? '1' : '0'
    },
    async dupStandard () {
      try {
        await StandardService.dupStandard({
          year: this.year,
          institute: this.institute
        })
        this.snackbar.text = 'Copy องค์ประกอบสำเร็จ'
        this.snackbar.color = 'success'
      } catch (error) {
        this.snackbar.text = 'Copy องค์ประกอบล้มเหลว'
        this.snackbar.color = 'error'
      } finally {
        this.snackbar.show = true
      }
    },
    async getStd () {
      if (this.year !== null && this.institute !== null && this.stdLvl !== null) {
        const respones = await StandardService.getStandards({
          year: this.year,
          institute: this.institute,
          standardLvl: this.stdLvl
        })
        this.items = respones.data
      }
    },
    async delStd () {
      try {
        await StandardService.delStandard(this.stdId)
        this.snackbar.text = 'ลบองค์ประกอบมาตรฐานสำเร็จ'
        this.snackbar.color = 'success'
        this.snackbar.show = true
        await this.getStd()
      } catch (error) {
        this.snackbar.text = 'ลบองค์ประกอบมาตรฐานล้มเหลว'
        this.snackbar.color = 'error'
        this.snackbar.show = true
      }
    },
    async submit () {
      if (this.$refs.form.validate()) {
        try {
          const formData = new FormData()
          formData.append('year', this.year)
          formData.append('institute', this.institute)
          formData.append('standardNo', this.stdNo)
          formData.append('standardName', this.stdName)
          formData.append('standardLvl', this.stdLvl)
          if (!this.edit) {
            await StandardService.addStandard(formData)
            this.snackbar.text = 'เพิ่มองค์ประกอบมาตรฐานสำเร็จ'
          } else {
            formData.append('standardId', this.stdId)
            await StandardService.editStandard(formData)
            this.snackbar.text = 'แก้ไของค์ประกอบมาตรฐานสำเร็จ'
          }
          this.snackbar.show = true
          this.snackbar.color = 'success'
          await this.getStd()
        } catch (error) {
          if (!this.edit) {
            this.snackbar.text = 'เพิ่มองค์ประกอบมาตรฐานล้มเหลว'
          } else {
            this.snackbar.text = 'แก้ไของค์ประกอบมาตรฐานล้มเหลว'
          }
          this.snackbar.show = true
          this.snackbar.color = 'error'
        }
      }
    },
    clear () {
      this.dialog = false
      this.$refs.form.inputs[1].reset()
    }
  },
  watch: {
    year: function () {
      this.getStd()
    },
    institute: function () {
      this.getStd()
    },
    stdLvl: function () {
      this.getStd()
    }
  },
  beforeMount () {
    if (!this.$store.getters.getUser.standardMgr) {
      this.$router.push('Root')
    }
  }
}
</script>
