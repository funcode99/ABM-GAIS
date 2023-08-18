<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'
    import fetchTypeOfHotelUtils from "@/utils/Fetch/Reference/fetchTypeOfHotel"


    import Swal from "sweetalert2"
    
    const cityData = ref()
    const typeOfHotelData = ref()
    const accomodationData = ref()
    const dataLength = ref(0)
    const selectRoomAndPriceData = ref([])
    const bundleData = ref()

    const fetchAccomodation = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.get('/get_hotel')
        accomodationData.value = api.data.data
        dataLength.value = accomodationData.value.length
        for(let i=0; i<accomodationData.value.length; i++) {
            selectRoomAndPriceData.value.push({})
        }
        for(let i=0; i<accomodationData.value.length; i++) {
            selectRoomAndPriceData.value[i] = accomodationData.value[i].room_type[0]
        }
    }

    const assignHotelData = (data, forPrice) => {
        codeHotel.value = data.code_hotel
        price.value = forPrice.price
    }

    const tableHeadAccomodation = [
      {id: 1, title: 'Hotel Name'},
      {id: 2, title: 'Location'},
      {id: 3, title: 'Hotel Rating'},
      {id: 4, title: 'Room Type'},
      {id: 5, title: 'Price'},
      {id: 6, title: 'Confirm'}
    ]

    const status = defineProps({
      isEditing: Boolean,
      currentIndex: Number,
      typeOfSubmitData: String
    })

    onBeforeMount(() => {
        fetchCityUtils(cityData)
        fetchTypeOfHotelUtils(typeOfHotelData)
        fetchAccomodation()
    })

    const props = inject('accomodationDataView')
    const emits = defineEmits(['fetchAccomodation', 'resetTypeOfSubmitData'])

    let name = ref()
    let city = ref()
    let hotelName = ref()
    let type = ref()
    let checkIn = ref()
    let sharingWith = ref()
    let checkOut = ref()

    let idCity = ref(0)
    let idType = ref(0)
    let vendor = ref(0)
    let codeHotel = ref(0)
    let useGL = ref(0)
    let remarks = ref()
    let price = ref(0)

    const assignValue = () => {

      // console.log(props.value)

      name.value = localStorage.getItem('username')
      city.value = props.value[status.currentIndex].city_name
      hotelName.value = props.value[status.currentIndex].hotel_name
      type.value = props.value[status.currentIndex].type_accomodation
      checkIn.value = props.value[status.currentIndex].check_in_date
      sharingWith.value = props.value[status.currentIndex].sharing_w_name
      checkOut.value = props.value[status.currentIndex].check_out_date

      idCity.value = props.value[status.currentIndex].id_city
      idType.value = props.value[status.currentIndex].id_type_accomodation

    }

    const resetValue = () => {

      city.value = ''
      hotelName.value = ''
      type.value = ''
      checkIn.value = ''
      checkOut.value = ''
      sharingWith.value = ''
      idCity.value = 0
      idType.value = 0
      vendor.value = 0

    }

    const defaultValue = () => {

      name.value = localStorage.getItem('username')
      city.value = props.value[0].city_name
      hotelName.value = props.value[0].hotel_name
      type.value = props.value[0].type_accomodation
      checkIn.value = props.value[0].check_in_date
      sharingWith.value = props.value[0].sharing_w_name
      checkOut.value = props.value[0].check_out_date
      idCity.value = props.value[0].id_city
      idType.value = props.value[0].id_type_accomodation

    }

    watch(props, () => {

      if(props.value[0].city_name !== undefined) {
        defaultValue()
      } else {
        assignValue()
      }
    })

    watch(status, () => {
        // console.log('perubahan di status')

        if (status.typeOfSubmitData === 'Edit') {
            updateAccomodation()
        }
        else if (status.typeOfSubmitData === 'Submit Add') {
            addAccomodation()
        }
        else if (status.typeOfSubmitData === 'Delete') {
            deleteAccomodation()
        }
        else if (status.typeOfSubmitData === 'Add') {
            resetValue()
        }
        else {
          assignValue()
        }

    })



    if(props.value[0].city_name !== undefined) {
        defaultValue()
    }

    const addAccomodation = async () => {

      if(codeHotel.value === 0 & price.value === 0) {
              Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please choose your hotel & price",
            showConfirmButton: false,
            timer: 1500,
          })
          emits('resetTypeOfSubmitData', 'Add')
      } 
      else {
        try {
          const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post(`/accomodation_trip/store`, {
          id_request_trip: localStorage.getItem('tripIdView'),
          id_type_accomodation: idType.value,
          id_city: idCity.value,
          check_in_date: checkIn.value,
          check_out_date: checkOut.value,
          id_vendor: vendor.value,
          use_gl: useGL.value,
          sharing_w_name: sharingWith.value,
          remarks: remarks.value,
          price: price.value,
          code_hotel: codeHotel.value,
        })        
        } catch (error) {
          
        }
        emits('fetchAccomodation')
        emits('resetTypeOfSubmitData', 'Add')
      }

    }

    const updateAccomodation = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.post(`/accomodation_trip/update_data/${props.value[status.currentIndex].id}`, {
        id_request_trip: localStorage.getItem('tripIdView'),
        id_type_accomodation: idType.value,
        id_city: idCity.value,
        check_in_date: checkIn.value,
        check_out_date: checkOut.value,
        id_vendor: vendor.value,
        use_gl: useGL.value,
        sharing_w_name: sharingWith.value,
        remarks: remarks.value,
        price: price.value,
        code_hotel: codeHotel.value,
        // hotelname nya gak ada
      })
      emits('fetchAccomodation')
      emits('resetTypeOfSubmitData')

    }

    const deleteAccomodation = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/accomodation_trip/delete_data/${props.value[status.currentIndex].id}`)
      emits('fetchAccomodation')
      emits('resetTypeOfSubmitData')

    }

    watch(useGL, () => {
      useGL.value === true ? useGL.value = 1 : useGL.value = 0
    })

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

    <div>

          <div :class="rowClass">
    
            <!-- Name -->
            <div :class="columnClass">
  
              <div class="w-full">
                                        
                <label :class="labelStylingClass" for="name">
                  Name<span class="text-red-star">*</span>
                </label>
  
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  placeholder="Name"
                  :class="inputStylingClass"
                  required
                  :disabled="!status.isEditing"
                />
  
              </div>
  
            </div>
                       
            <!-- City -->
            <div :class="columnClass">
  
              <div class="w-full">
                                      
                <label class="block mb-2 font-JakartaSans font-medium text-sm" for="city">
                  City<span class="text-red-star">*</span>
                </label>
  
                <input
                  v-if="!status.isEditing"
                  v-model="city"
                  type="text"
                  placeholder="City"
                  :class="inputStylingClass"
                  disabled
                />
  
                <select 
                  v-if="status.isEditing"
                  v-model="idCity"
                  :class="inputStylingClass"
                  required
                  id="city"
                >
                  <option v-for="data in cityData" :value="data.id">
                    {{ data.city_name }}
                  </option>
                </select>
  
              </div>
  
            </div>
    
          </div>
    
          <div :class="rowClass">
    
            <!-- Hotel Name -->
            <div :class="columnClass">
  
              <div class="w-full">
                                        
                <!-- for="hotel name" -->
                <label :class="labelStylingClass">
                  Hotel Name<span class="text-red-star">*</span>
                </label>
                <!-- id="hotel name" -->
  
                <input 
                  v-model="hotelName"
                  type="text"
                  placeholder="Hotel Name"
                  :class="inputStylingClass"
                  required
                  disabled
                  />
                  <!-- :disabled="!status.isEditing" -->
  
              </div>
  
            </div>
      
            <!-- Hotel Type -->
            <div :class="columnClass">
                                    
              <div class="w-full">
  
                <label class="block mb-2 font-JakartaSans font-medium text-sm" for="type">
                  Type<span class="text-red-star">*</span>
                </label>
  
                <input
                  v-if="!status.isEditing"
                  v-model="type" 
                  type="text" 
                  placeholder="Type" 
                  :class=inputStylingClass 
                  :disabled="!status.isEditing"
                />
  
                <select
                  id="type"
                  v-if="status.isEditing" 
                  v-model="idType"
                  :class=inputStylingClass 
                  required
                >
  
                  <option v-for="data in typeOfHotelData" :value="data.id">
                    {{ data.type_accomodation }}
                  </option>
  
                </select>
                                    
              </div>
  
            </div>
            
    
          </div>
    
          <div :class="rowClass">
    
            <!-- Check In -->
            <div :class="columnClass">
                                    
              <div class="w-full">
  
                <label :class="labelStylingClass">
                  Check In<span class="text-red-star">*</span>
                </label>
  
                <input 
                  v-model="checkIn"
                  type="date"
                  :class="inputStylingClass"
                  placeholder="Date"
                  required
                  :disabled="!status.isEditing"
                />
  
              </div>
  
            </div>
    
            <!-- Sharing With -->
            <div :class="columnClass">
  
              <div class="w-full">
                                      
                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                  Sharing With
                </label>
  
                <input
                  v-model="sharingWith" 
                  type="text" 
                  placeholder="Sharing With"
                  :class=inputStylingClass
                  :disabled="!status.isEditing"
                >
                                    
              </div>
  
            </div>
    
          </div>
    
          <div :class="rowClass">
    
            <!-- Check Out -->
            <div :class="columnClass">
  
              <div class="w-full">
  
                <label :class="labelStylingClass">
                  Check Out<span class="text-red-star">*</span>
                </label>
  
                <input
                  v-model="checkOut"
                  type="date"
                  :class="inputStylingClass"           
                  placeholder="Date"
                  required 
                  :disabled="!status.isEditing"
                />
  
              </div>
  
            </div>
  
            <!-- Remarks -->
            <div v-if="idType === 1" :class="columnClass">
  
            <div class="w-full">
                                      
                  <label :class="labelStylingClass">
                    Remarks
                  </label>
  
                  <input 
                    v-model="remarks"
                    type="text"
                    placeholder="Remarks"
                    :class="inputStylingClass"
                    :disabled="!status.isEditing"
                  />
  
            </div>
  
            </div>
    
          </div>
  
          <div :class="rowClass" v-if="status.typeOfSubmitData === 'Add'">
  
            <!-- Create GL -->
            <div :class="columnClass">
              <div class="w-full">
  
                <label :class="labelStylingClass">
                  Create GL
                </label>
  
                <div class="flex gap-2">
                  <input
                    v-model="useGL"
                    type="checkbox"
                  />
                  <h1>Yes</h1>
                </div>
  
              </div>
            </div>
  
            <!-- Vendor -->
            <div :class="columnClass">
  
              <div class="w-full">
                
                <label :class="labelStylingClass">
                  Vendor <span class="text-red-star">*</span>
                </label>
  
                <select :class="inputStylingClass" v-model="vendor" required>
                  
                  <option value="1">Antavaya</option>
                  <option value="2">Aerowisata</option>
  
                </select>
  
              </div>
  
            </div>
  
          </div>

    </div>

    <div>
      
      <table class="table w-full" v-if="status.isEditing">
        
        <thead>
          <tr>
            <th v-for="data in tableHeadAccomodation" :key=data.id>
              {{ data.title }}
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(data, index) in accomodationData">
            <td>
              {{ data.hotel }}
            </td>
            <td>
              {{ data.location }}
            </td>
            <td class="text-center">
              {{ data.rating }}
            </td>
            <td>
              <select :id="index" v-model="selectRoomAndPriceData[index]">
                                        <option v-for="option in data.room_type" :value="option">
                                            {{ option.room }}
                                        </option>
              </select>
            </td>
            <td>
              {{ selectRoomAndPriceData[index].price }}
            </td>
            <td @click="bundleData = data.code_hotel">
              <button @click="assignHotelData(data, selectRoomAndPriceData[index])" type="button" :class="bundleData === data.code_hotel ? 'bg-blue' : 'bg-green'" class="text-white rounded-lg px-4 py-3 font-bold">
                Select
              </button>
            </td>
          </tr>
        </tbody>

      </table>

    </div>

</template>