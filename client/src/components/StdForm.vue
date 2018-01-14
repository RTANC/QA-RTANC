<template>
<v-form v-model="valid" ref="form" lazy-validation>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs1 offset-xs1>
        <v-text-field v-model.number="stdNo" type="number" label="ลำดับที่่"></v-text-field>
      </v-flex>
      <v-flex xs7 offset-xs1>
        <v-text-field label="ชื่อองค์ประกอบ" v-model="stdName" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" required></v-text-field>
      </v-flex>
      <v-flex xs9 offset-xs1>
        <v-text-field label="คำอธิบายองค์ประกอบ" v-model="stdInfo" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้!']" multi-line required></v-text-field>
      </v-flex>
      <v-flex xs5 offset-xs1>
        <v-card flat>
          <v-card-text>
            ระดับองค์ประกอบ
            <v-radio-group row @change="onStdChange" v-model="stdLvl">
              <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
              <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-btn @click="submit" :disabled="!valid">ยืนยัน</v-btn>
        <v-btn @click="clear">ยกเลิก</v-btn>
      </v-flex>
    </v-layout>
  </v-container>

</v-form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'stdForm',
  data: () => {
    return {
      valid: false,
      stdNo: 1,
      stdName: '',
      stdInfo: '',
      stdLvl: '0'
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          stdNo: this.stdNo,
          stdName: this.stdName,
          stdInfo: this.stdInfo,
          stdLvl: this.stdLvl
        })
      }
    },
    clear () {
      // this.$refs.form.reset()
      window.history.back()
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
