<script setup>
import { inject } from "vue"
import Api from "@/utils/Api"
import deleteicon from "@/assets/navbar/delete_icon.svg"
import editicon from "@/assets/navbar/edit_icon.svg"

const props = inject('taxiVoucherDataView')

const tableHeadTaxiVoucher = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Date'},
      {id: 3, title: 'Departure'},
      {id: 4, title: 'Arrival'},
      {id: 5, title: 'Amount'},
      {id: 6, title: 'Account Name'},
      {id: 7, title: 'Remarks'},
      {id: 8, title: 'Status'}
]

const emits = defineEmits('fetchTaxiVoucher')

const deleteData = async (id) => {
    
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.delete(`/taxi_voucher/delete_data/${id}`)
    
    if(props.value.length === 1) {
      props.value = []
    } else {
      emits('fetchTaxiVoucher')
    }

}

let employeeName = localStorage.getItem('username')

</script>


<template>

    <div class="overflow-x-auto mt-5 flex justify-center">

        <table class="table">
            
            <thead>
                        <tr>
                          <th v-for="data in tableHeadTaxiVoucher" :key="data.id">
                            {{ data.title }}
                          </th>
                          <th v-if="$route.path === '/request'">
                            Actions
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
                            <td v-if="$route.path === '/request'" class="flex flex-wrap gap-4 justify-center">
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