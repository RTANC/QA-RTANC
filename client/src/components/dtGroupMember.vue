<template>
<v-data-table :headers="headers" :items="items" :pagination.sync="pagination" class="elevation-1" no-results-text="ไม่มีผลลัพธ์ปรากฏในหน้านี้" no-data-text="ไม่มีผลัพธิ์ที่จะแสดง">
    <template slot="items" slot-scope="props">
        <tr>
            <td class="text-xs-center">{{ props.item.person_fullname }}</td>
            <td class="text-xs-center">
                <v-btn>
                    <v-icon>delete</v-icon>
                </v-btn>
            </td>
        </tr>
    </template>
    <template slot="footer">
        <td>
            <selectPerson v-on:onPickPerson="getPerson($event)"></selectPerson>
        </td>
    </template>
</v-data-table>
</template>

<script>
import selectPerson from './selectPerson'
export default {
    name: 'dtGroupMember',
    props: ['roleGroupId'],
    components: {
        'selectPerson': selectPerson
    },
    data: () => {
        return {
            
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
