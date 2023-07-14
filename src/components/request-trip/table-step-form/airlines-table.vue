<script setup>
import { inject } from 'vue'
import Api from '@/utils/Api'
import deleteicon from "@/assets/navbar/delete_icon.svg"
import editicon from "@/assets/navbar/edit_icon.svg"

const props = inject('airlinesDataView')
const tableHeadAirlinesRequestTrip = [
      {id: 1, title: 'Name'},
      {id: 2, title: 'Departure'},
      {id: 3, title: 'Arrival'},
      {id: 4, title: 'Flight Number'},
      {id: 5, title: 'Domestic/International'},
      {id: 6, title: 'Status'},
      // {id: 7, title: 'Action'}
]

const emits = defineEmits('fetchAirlines')

const deleteData = async (id) => {
    
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.delete(`/flight_trip/delete_data/${id}`)
    
    if(props.value.length === 1) {
      props.value = []
    } else {
      emits('fetchAirlines')
    }

}

let employeeName = localStorage.getItem('username')
</script>

<template>

    <div class="overflow-x-auto mt-5 flex justify-center">

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
                            {{ employeeName }}
                          </td>
                          <td>
                            {{ data.departure }}
                          </td>
                          <td>
                            {{ data.arrival }}
                          </td>
                          <td>
                            {{ data.flight_no }}
                          </td>
                          <td>
                            Domestic
                          </td>
                          <td>
                            {{ data.status }}
                          </td>
                          <!-- <td class="flex flex-wrap gap-4 justify-center">
                            <button>
                              <img :src="editicon" class="w-6 h-6" />
                            </button>
                            <button @click="deleteData(data.id)">
                              <img :src="deleteicon" class="w-6 h-6" />
                            </button>
                          </td> -->
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