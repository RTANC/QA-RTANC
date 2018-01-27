<template>
<v-container fluid>
  <v-layout class="pt-5" row wrap>
    <v-flex xs10 offset-xs1 >
      <h1>ตัวบ่งชี้ที่ {{ ind.indNo }} : {{ ind.indName }}</h1>
    </v-flex>
    <v-flex xs4 offset-xs1 class="pt-2">
      <selectDept lbl="กลุ่มผู้รับผิดชอบ" v-on:onDeptChange="getDept($event)" ref="roleGroup"></selectDept>
    </v-flex>
    <v-flex xs1 offset-xs1 class="pt-3">
      <v-btn color="pink" dark @click="addRoleGroup">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-data-table :headers="headers" :items="items" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-center">{{ props.item.deptName }}</td>
            <td class="text-xs-center">
              <v-btn color="deep-purple" @click="addGroupMember" dark><v-icon>account_circle</v-icon></v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-card>
        <v-toolbar dark color="deep-purple">
          <v-btn dark icon @click.native="dialog = !dialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>จัดการสมาชิก</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs10 offset-xs1>
              <dtGroupMember></dtGroupMember>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</v-container>
</template>

<script>
  import selectDept from './selectDept'
  import dtGroupMember from './dtGroupMember'
  export default {
    name: 'ManageRoleGroup',
    components: {
      'selectDept': selectDept,
      'dtGroupMember': dtGroupMember
    },
    data: () => {
      return {
        dept: null,
        dialog: false,
        pagination: {
          sortBy: null
        },
        headers: [{text: 'กลุ่มผู้รับผิดชอบ', align: 'center', value: 'roleGroup'}],
        items: [],
        ind: {
          indId: null,
          indNo: null,
          indName: null
        }
      }
    },
    methods: {
      getDept (val) {
        this.dept = val
      },
      addRoleGroup () {
        this.items.push({
          deptName: this.$refs.roleGroup.allDept[this.dept].text,
          value: this.dept
        })
      },
      addGroupMember () {
        this.dialog = true
      }
    },
    beforeMount () {
      this.ind.indId = this.$route.query.indId
      this.ind.indNo = this.$route.query.indNo
      this.ind.indName = this.$route.query.indName
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
