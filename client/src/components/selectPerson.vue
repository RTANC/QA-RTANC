<template>
    <v-select :items="persons" v-model="p1" item-text="fullName" item-value="personId" label="เลือกบุคลากร" autocomplete allow-overflow>
    </v-select>
</template>

<script>
  export default {
    name: 'selectPerson',
    data: () => {
      return {
        persons: [{personId: 1, fullName: 'ร.ต.วงศธร นาคสุวรรณ์'},
                  {personId: 2, fullName: 'ส.ต.สุธิวัตร กาญจนอุทัย'},
                  {personId: 3, fullName: 'ร.อ.หญิง ภัทริกา วงศ์อนันต์นนท์'}],
        p1: null
      }
    },
    watch: {
      p1: function (val) {
        this.$emit('onPickPerson', val)
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
