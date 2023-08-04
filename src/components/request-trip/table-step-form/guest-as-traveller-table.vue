<script setup>
    import { inject, ref, watch } from 'vue'
    import Api from '@/utils/Api'
    import deleteicon from "@/assets/navbar/delete_icon.svg"
    import editicon from "@/assets/navbar/edit_icon.svg"

    import { useRequestTripStore } from "@/stores/requesttrip.js"
     const requestTrip = useRequestTripStore()

    const props = inject('travellerDataView')
    const tableHeadTravellers = [
        {id: 1, title: 'Name'},
        {id: 3, title: 'Gender'},
        {id: 4, title: 'Contact No'},
        {id: 5, title: 'Department'},
        {id: 6, title: 'Company'},
        {id: 7, title: 'Type'},
        {id: 8, title: 'Max Hotel Fare'},
        {id: 9, title: 'Flight Class'}
    ]

    const emits = defineEmits('fetchTravellerGuest')

    const deleteData = async (id) => {
        
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.delete(`/travel_guest/delete_data/${id}`)
        
        if(props.value.length === 1) {
          props.value = []
        } else {
          emits('fetchTravellerGuest')
        }

    }

    let employeeLoginData = ref([])

  const submitGuestTraveller = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      const api = await Api.get('/employee/get_by_login')
      employeeLoginData.value = api.data.data

      const api2 = await Api.post('/travel_guest/store', {
          nik: employeeLoginData.value[0].nik,
          notes: '',
          gender: employeeLoginData.value[0].jenkel,
          company: employeeLoginData.value[0].company_name,
          name_guest: employeeLoginData.value[0].employee_name,
          hotel_fare: employeeLoginData.value[0].hotel_fare,
          departement: employeeLoginData.value[0].departement_name || '-',
          contact_no: employeeLoginData.value[0].phone_number,
          id_type_traveller: 0,
          id_flight_class: employeeLoginData.value[0].flight_class[0].id_flight_class,
          id_request_trip: localStorage.getItem('tripId')
      })

      emits('fetchTravellerGuest')
      emits('changeVisibility')

  }

  watch(props, () => {

      if(!requestTrip.isFetched & props.value.length === 0) {
        submitGuestTraveller()
        requestTrip.isFetched = true
      } 
      else if (requestTrip.isFetched & props.value.length === 0) {
        emits('fetchTravellerGuest')
      }

  })

</script>

<template>

    <div class="overflow-x-auto mt-5 flex justify-center">

      <!-- <div>
        {{ requestTrip.isFetched }}
        {{ props.length }}
      </div> -->

      <table class="table">
      
        <thead>
          <tr>
            <th v-for="data in tableHeadTravellers" :key="data.id">
              {{ data.title }}
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="data in props" :key="data.id">
            <td>
              {{ data.name_guest }}
            </td>
            <td>
              {{ data.gender }}
            </td>
            <td>
              {{ data.contact_no }}
            </td>
            <td>
              {{ data.departement }}
            </td>
            <td>
              {{ data.company }}
            </td>
            <td>
              {{ data.type_traveller }}
            </td>
            <td>
              {{ data.hotel_fare }}
            </td>
            <td>
              {{ data.flight_class }}
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