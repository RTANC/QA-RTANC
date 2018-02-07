<template>
  <v-container fluid>
      <v-layout row wrap>
          <v-flex xs10 offset-xs1>
              <v-card>
                  <v-list subheader="">
                      <v-subheader>ตัวบ่งชี้ที่ {{indicator.indicatorNo}} : {{indicator.indicatorName}}</v-subheader>
                      <v-list-tile>
                          <v-list-tile-content>
                              <v-list-tile-title></v-list-tile-title>
                          </v-list-tile-content>
                      </v-list-tile>
                  </v-list>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'WriteSAR',
  data: () => {
    return {
      sarLvl: null,
      indicator: {
        indicatorId: null,
        indicatorNo: null,
        indicatorName: null,
        indicatorType: null
      }
    }
  },
  methods: {

  },
  beforeMount () {
    this.sarLvl = this.$route.query.sarLvl
    this.indicator.indicatorId = this.$route.query.indicatorId
    this.indicator.indicatorNo = this.$route.query.indicatorNo
    this.indicator.indicatorName = this.$route.query.indicatorName
    this.indicator.indicatorType = this.$route.query.indicatorType
  }
}
</script>

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
