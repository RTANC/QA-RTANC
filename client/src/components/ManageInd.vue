<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs10 offset-xs1>
      <h1>องค์ประกอบที่ {{ std.stdNo }} : {{ std.stdName }}</h1>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-data-table v-bind:headers="headers" item-key="indNo" v-bind:items="items" v-bind:pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-center">{{std.stdNo}}.{{ props.item.indNo }}</td>
            <td @click="props.expanded = !props.expanded" class="text-xs-left">{{ props.item.indName }}</td>
            <td class="text-xs-center">
              <v-btn color="primary" @click="openEditDialog(props.item)"><v-icon>create</v-icon></v-btn>
              <v-btn color="error" @click="delInd(props.item)"><v-icon>delete</v-icon></v-btn>
              <v-btn color="deep-purple" :to="{ path: '/ManageRoleGroup', query: { indId: props.item.indId, indNo: std.stdNo + '.' + props.item.indNo ,indName: props.item.indName }}" dark >
                <v-icon>people</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-title primary-title class="title">ชนิดของตัวบ่งชี้</v-card-title>
            <v-card-text>{{ (props.item.indType === '0') ? 'เชิงปริมาณ' : 'เชิงคุณภาพ' }}</v-card-text>
            <v-card-title primary-title class="title">คำอธิบาย</v-card-title>
            <v-card-text>{{ props.item.indInfo }}</v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs-12>
      <v-btn @click="openAddDialog" fixed dark fab bottom right color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="clear" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>ข้อมูลตัวบ่งชี้</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form v-model="valid" ref="form">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs1 offset-xs1>
                <v-text-field v-model.number="ind.indNo" :prefix="std.stdNo+'.'" type="number" label="ลำดับที่่" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
              </v-flex>
              <v-flex xs7 offset-xs1>
                <v-text-field label="ตัวบ่งชี้" v-model="ind.indName" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
              </v-flex>
              <v-flex xs9 offset-xs1>
                <v-text-field label="คำอธิบาย" v-model="ind.indInfo" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required multi-line></v-text-field>
              </v-flex>
              <v-flex xs5 offset-xs1>
                <v-radio-group row v-model="ind.indType" label="ชนิดของตัวบ่งชี้*" :rules="[v => !!v]">
                  <v-radio label="เชิงปริมาณ" value="0" color="primary"></v-radio>
                  <v-radio label="เชิงคุณภาพ" value="1" color="primary"></v-radio>
                </v-radio-group>
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
  </v-layout>
</v-container>
</template>

<script>
// import axios from 'axios'
import selectPerson from './selectPerson'
import selectSarLvl from './selectSarLvl'
export default {
  name: 'ManageInd',
  components: {
    'selectPerson': selectPerson,
    'selectSarLvl': selectSarLvl
  },
  data: () => {
    return {
      dialog: false,
      edit: false,
      valid: false,
      pagination: {
        sortBy: 'IndNo'
      },
      headers: [{text: 'ตัวบ่งชี้ที่', value: 'indNo', align: 'center'},
      {text: 'ตัวบ่งชี้', value: 'indName', align: 'center'}],
      items: [{indId: 1, indNo: 1, indName: 'คุณภาพบัณฑิตรามกรอบมาตรฐานคุณวุฒิระดับอุดมศึกษาแห่งชาติ', indInfo: 'ผลประเมินคุณภาพบัณฑิตตามกรอบมาตรฐานคุณวุฒิระดับอุดมศึกษาแห่งชาติ(โดยผู้ใช้บัณฑิต/ผู้มีส่วนได้ส่วนเสีย)', indType: '0', stdId: this.stdId},
      {indId: 2, indNo: 2, indName: 'การได้งานทำหรือผลงานวิจัยของผู้สำเร็จการศึกษา', indInfo: 'ผลบัณฑิตปริญญาตรีที่ได้งานทำหรือประกอบอาชีพอิสระ', indType: '1', stdId: this.stdId}],
      ind: {
        indId: null,
        indNo: null,
        indName: null,
        indInfo: null,
        indType: '0'
      },
      std: {
        stdId: null,
        stdNo: null,
        stdName: null
      }
    }
  },
  methods: {
    openAddDialog () {
      this.dialog = true
      this.edit = false
      this.ind.indNo = 1
      this.ind.indType = '0'
    },
    openEditDialog (val) {
      this.dialog = true
      this.edit = true
      this.ind.indId = val.indId
      this.ind.indNo = val.indNo
      this.ind.indName = val.indName
      this.ind.indInfo = val.indInfo
      this.ind.indType = val.indType
      console.log(this.ind)
    },
    delInd (val) {
      console.log(val)
    },
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //   stdNo: this.stdNo,
        //   stdName: this.stdName,
        //   stdInfo: this.stdInfo,
        //   stdLvl: this.stdLvl
        // })
      }
    },
    clear () {
      this.dialog = false
      this.$refs.form.inputs[1].reset()
      this.$refs.form.inputs[2].reset()
    }
  },
  beforeMount () {
    this.std.stdId = this.$route.query.stdId
    this.std.stdNo = this.$route.query.stdNo
    this.std.stdName = this.$route.query.stdName
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
