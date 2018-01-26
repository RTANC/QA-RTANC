<template>
    <v-select :items="persons" v-model="p1" item-text="person_fullname" item-value="person_id" label="เลือกบุคลากร" autocomplete>
    </v-select>
</template>

<script>
  import PersonService from '@/services/PersonService'
  export default {
    name: 'selectPerson',
    data: () => {
      return {
        persons: [],
        p1: null
      }
    },
    methods: {
      async getAllPerson () {
        const respones = await PersonService.getAllPerson()
        this.persons = respones.data
      }
    },
    watch: {
      p1: function (val) {
        this.$emit('onPickPerson', val)
      }
    },
    beforeMount () {
      this.getAllPerson()
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
