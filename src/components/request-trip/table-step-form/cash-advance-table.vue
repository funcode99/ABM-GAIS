<script setup>
  import { inject } from 'vue'
  import Api from "@/utils/Api"
  import deleteicon from "@/assets/navbar/delete_icon.svg"
  import editicon from "@/assets/navbar/edit_icon.svg"

    const props = inject('cashAdvanceData')
    const tableHeadCashAdvance = [
      {id: 1, title: 'Cash Advance No'},
      {id: 2, title: 'Total'},
      {id: 3, title: 'Notes'},
      {id: 4, title: 'Status'},
      {id: 5, title: 'Action'}
    ]

    const emits = defineEmits('fetchCashAdvance')

    const deleteData = async (id) => {
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/cash_advance/delete_data/${id}`)
        
        if(props.value.length === 1) {
          props.value = []
        } else {
          emits('fetchCashAdvance')
        }

    }

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
                            {{ data.no_ca }}
                          </td>
                          <td>
                            {{ data.grand_total }}
                          </td>
                          <td>
                            {{ data.notes }}
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <td class="flex flex-wrap gap-4 justify-center">
                            <button>
                              <img :src="editicon" class="w-6 h-6" />
                            </button>
                            <button @click="deleteData(data.id)">
                              <img :src="deleteicon" class="w-6 h-6" />
                            </button>
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