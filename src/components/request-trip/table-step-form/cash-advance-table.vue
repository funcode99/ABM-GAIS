<script setup>
    import { inject } from 'vue'

    const props = inject('cashAdvanceData')
    const tableHeadCashAdvance = [
      {id: 1, title: 'Cash Advance No'},
      {id: 2, title: 'Total'},
      {id: 3, title: 'Notes'},
      {id: 4, title: 'Status'},
      {id: 5, title: 'Action'}
    ]
</script>

<template>
    
    <div class="overflow-x-auto mt-5 flex justify-center">
                    <table class="table">
                      <thead>
                        <tr>
                          <th v-for="data in tableHeadCashAdvance" :key="data.id">
                            {{ data.title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in props" :key="data.id">
                          <td>
                            {{ data.caNo }}
                          </td>
                          <td>
                            {{ data.total }}
                          </td>
                          <td>
                            {{ data.notes }}
                          </td>
                          <td>
                            {{ data.status }}
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