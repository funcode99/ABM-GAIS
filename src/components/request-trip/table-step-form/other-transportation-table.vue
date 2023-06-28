<script setup>
import { inject } from 'vue'

const props = inject('otherTransportationData')

const tableHeadOtherTransportation = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Type'},
      {id: 3, title: 'From Date'},
      {id: 4, title: 'To Date'},
      {id: 5, title: 'Quantity'},
      {id: 6, title: 'City'},
      {id: 7, title: 'Status'},
      {id: 8, title: 'Action'},
    ]

</script>


<template>

    <div class="overflow-x-auto mt-5">

        <table class="table">
            
            <thead>
                        <tr>
                          <th v-for="data in tableHeadOtherTransportation" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
            </thead>

            <tbody>
                <tr v-for="data in props" :key="data.id">
                          <td>
                            <!-- {{ data.name }} -->
                            {{ employeeName }}
                          </td>
                          <td>
                            {{ data.id_type_transportation }}
                          </td>
                          <td>
                            {{ data.from_date }}
                          </td>
                          <td>
                            {{ data.to_date }}
                          </td>
                          <td>
                            {{ data.qty }}
                          </td>
                          <td>
                            {{ data.id_city }}
                          </td>
                          <td>
                            
                          </td>
                          <td>
                              
                          </td>
                </tr>
            </tbody>

        </table>

    </div>

</template>

<style scoped>
.table :where(th, td) {
  padding: .5rem !important;
}

.table th {
  background: #015289 !important;
  border-color: #b9b9b9 !important;
  border-width: 2px;
  color: white;
}

.table td {
  border-color: #b9b9b9 !important;
  border-width: 2px;
}
</style>