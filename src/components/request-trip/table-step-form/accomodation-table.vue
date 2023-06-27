<script setup>

    import { inject } from 'vue'

    const props = inject('accomodationData')
    const tableHeadAccomodationRequestTrip = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Hotel Name'},
      {id: 3, title: 'Check In'},
      {id: 4, title: 'Check Out'},
      {id: 5, title: 'City'},
      {id: 6, title: 'Type'},
      {id: 7, title: 'Sharing With'},
      {id: 8, title: 'Status'},
      {id: 9, title: 'Action'}
    ]

</script>

<template>
        
    <div class="overflow-x-auto mt-5">
        <table class="table">
            
            <thead>
                        <tr>
                          <th v-for="data in tableHeadAccomodationRequestTrip" :key="data.id">
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
                            {{ data.code_hotel }}
                          </td>
                          <td>
                            {{ data.check_in_date }}
                          </td>
                          <td>
                            {{ data.check_out_date }}
                          </td>
                          <td>
                            {{ data.id_city }}
                          </td>
                          <td>
                            {{ data.id_type_accomodation }}
                          </td>
                          <td>
                            {{ data.sharing_w_name }}
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