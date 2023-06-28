<script setup>
import { inject } from 'vue'

const props = inject('airlinesData')
const tableHeadAirlinesRequestTrip = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Departure'},
      {id: 3, title: 'Arrival'},
      {id: 4, title: 'Flight Number'},
      {id: 5, title: 'Domestic/International'},
      {id: 6, title: 'Status'},
      {id: 7, title: 'Action'}
]

</script>

<template>

    <div class="overflow-x-auto mt-5">

        <table class="table">
              
              <thead>
                        <tr>
                          <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
              </thead>

              <tbody>
                        <tr v-for="data in props" :key="data.id">
                          <td>
                            {{ data.name }}
                          </td>
                          <td>
                            {{ data.departure }}
                          </td>
                          <td>
                            {{ data.arrival }}
                          </td>
                          <td>
                            {{ data.flightNumber }}
                          </td>
                          <td>
                            {{ data.flightRegion }}
                          </td>
                          <td>
                            {{ data.status }}
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