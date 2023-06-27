<script setup>
import { inject } from 'vue'

const props = inject('taxiVoucherData')
const tableHeadTaxiVoucher = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Date'},
      {id: 3, title: 'Departure'},
      {id: 4, title: 'Arrival'},
      {id: 5, title: 'Amount'},
      {id: 6, title: 'Account Name'},
      {id: 7, title: 'Remarks'},
      {id: 8, title: 'Status'},
      {id: 9, title: 'Action'},
]

</script>


<template>

    <div class="overflow-x-auto mt-5">

        <table class="table">
            
            <thead>
                        <tr>
                          <th v-for="data in tableHeadTaxiVoucher" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
            </thead>
                    
            <tbody>
                <tr v-for="data in props" :key="data.id">
                            <td>

                              {{ employeeName }}
                            </td>
                            <td>
                              {{ data.date }}
                            </td>
                            <td>
                              {{ data.name_departure_city }}
                            </td>
                            <td>
                              {{ data.name_arrival_city }}
                            </td>
                            <td>
                              {{ data.amount }}
                            </td>
                            <td>
                              {{ data.account_name }}
                            </td>
                            <td>
                              {{ data.remarks }}
                            </td>
                            <td>

                            </td>
                            <td></td>
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