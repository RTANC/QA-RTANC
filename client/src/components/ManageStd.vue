<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs2 offset-xs1>
    <selectYear v-on:onYearChange="getYear($event)"></selectYear>
    </v-flex>
    <v-flex xs4 offset-xs1>
      <selectInstitute v-on:onInstituteChange="getInstitute($event)"></selectInstitute>
    </v-flex>
    <v-flex xs5 offset-xs1>
      <v-radio-group row v-model="stdLvl" label="ระดับองค์ประกอบ*" :rules="[v => !!v]">
        <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
        <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs-12>
      <v-btn @click="openAddDialog" fixed dark fab bottom right color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <v-card>
          <v-toolbar dark color="primary">
            <v-icon>details</v-icon>
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
                <v-flex xs10 offset-xs1>
                  <v-text-field label="คำอธิบายองค์ประกอบ" v-model="stdInfo" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" multi-line required></v-text-field>
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
  </v-layout>
</v-container>
</template>

<script>
  import selectYear from './selectYear'
  import selectInstitute from './selectInstitute'
  // import axios from 'axios'
  export default {
    name: 'ManageStd',
    components: {
      'selectYear': selectYear,
      'selectInstitute': selectInstitute
    },
    data: () => {
      return {
        year: null,
        institute: null,
        dialog: false,
        edit: false,
        valid: false,
        stdNo: 1,
        stdName: null,
        stdInfo: null,
        stdLvl: '0'
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
        this.stdNo = 1
      },
      openEditDialog () {
        this.dialog = true
        this.edit = true
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
          console.log(this.stdNo + ' ' + this.stdName + ' ' + this.stdInfo + ' ' + this.stdLvl)
        }
      },
      clear () {
        this.dialog = false
        this.$refs.form.inputs[1].reset()
        this.$refs.form.inputs[2].reset()
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
