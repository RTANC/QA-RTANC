<template>
<v-data-table :headers="headers" :items="items" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
    <template slot="items" slot-scope="props">
        <tr>
            <td class="text-xs-left">{{ props.item.person_fullname }}</td>
            <td class="text-xs-center">
                <v-btn color="error">
                    <v-icon>delete</v-icon>
                </v-btn>
            </td>
        </tr>
    </template>
    <template slot="footer">
        <td>
            <selectPerson v-on:onPickPerson="getPerson($event)"></selectPerson>
        </td>
        <td>
            <v-btn dark color="pink">
                <v-icon>add</v-icon>
            </v-btn>
        </td>
    </template>
</v-data-table>
</template>

<script>
import selectPerson from './selectPerson'
export default {
  name: 'dtGroupMember',
  props: {
    roleGroupId: {
      default: 0,
      type: Number
    }
  },
  components: {
    selectPerson: selectPerson
  },
  data: () => {
    return {
      pagination: {
        orderBy: null
      },
      headers: [
        { text: 'ชื่อ-นามสกุล', value: 'person_fullname', align: 'center' }
      ],
      items: [
        { person_id: 54, person_fullname: 'ร.อ. หญิง ภัทริกา วงศอนันต์นนท์' },
        { person_id: 0, person_fullname: 'ร.ต. วงศธร นาคสุววรณ์' }
      ]
    }
  },
  methods: {
    getPerson (val) {
      this.personId = val
      console.log(this.personId)
    }
  }
}
</script>
