<template>
<div>
  <v-card flat>
    <v-card-text>
      เลือกระดับองค์ประกอบ
      <v-radio-group row @change="onStdChange" v-model="std">
        <v-radio label="ระดับบหลักสูตร" value="0" color="primary"></v-radio>
        <v-radio label="ระดับสถาบัน" value="1" color="primary"></v-radio>
      </v-radio-group>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'radStd',
  data: () => {
    return {
      std: '0'
    }
  },
  methods: {
    onStdChange (val) {
      this.$emit('onStdChange', val)
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
