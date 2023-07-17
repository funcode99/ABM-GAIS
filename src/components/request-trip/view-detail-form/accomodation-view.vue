<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'
    import fetchTypeOfHotelUtils from "@/utils/Fetch/Reference/fetchTypeOfHotel"
    
    const cityData = ref()
    const typeOfHotelData = ref()

    const status = defineProps({
      isEditing: Boolean,
      currentIndex: Number,
      typeOfSubmitData: String
    })

    onBeforeMount(() => {
        fetchCityUtils(cityData)
        fetchTypeOfHotelUtils(typeOfHotelData)
    })

    const props = inject('accomodationDataView')
    const emits = defineEmits('fetchAccomodation', 'resetTypeOfSubmitData')

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
    let hotelCode = ref(0)
    let useGL = ref()
    let remarks = ref()
    let price = ref()

    const assignValue = () => {

      name.value = localStorage.getItem('username')
      city.value = props.value[status.currentIndex].city_name
      hotelName.value = props.value[status.currentIndex].hotel_name
      type.value = props.value[status.currentIndex].type_accomodation
      checkIn.value = props.value[status.currentIndex].check_in_date
      sharingWith.value = props.value[status.currentIndex].sharing_w_name
      checkOut.value = props.value[status.currentIndex].check_out_date

    }

    const resetValue = () => {
      name.value = ''
      city.value = ''
      hotelName.value = ''
      type.value = ''
      checkIn.value = ''
      checkOut.value = ''
      sharingWith.value = ''
    }

    const defaultValue = () => {

      name.value = localStorage.getItem('username')
      city.value = props.value[0].city_name
      hotelName.value = props.value[0].hotel_name
      type.value = props.value[0].type_accomodation
      checkIn.value = props.value[0].check_in_date
      sharingWith.value = props.value[0].sharing_w_name
      checkOut.value = props.value[0].check_out_date

    }

    watch(status, () => {

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

    watch(props, () => {
      if(props.value[0].city_name !== undefined) {
        defaultValue()
      } else {
        assignValue()  
      }
    })

    if(props.value[0].city_name !== undefined) {
        defaultValue()
    }

    const addAccomodation = async () => {

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
        code_hotel: hotelCode.value,
      })
      emits('fetchAccomodation')
      emits('resetTypeOfSubmitData', 'Add')

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
        code_hotel: hotelCode.value,
      })
      emits('fetchAccomodation')
      emits('resetTypeOfSubmitData', 'Edit')

    }

    const deleteAccomodation = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/accomodation_trip/delete_data/${props.value[status.currentIndex].id}`)
      emits('fetchAccomodation')
      emits('resetTypeOfSubmitData')

    }

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

    <form @submit.prevent="">
                              
        <div :class="rowClass">
  
          <!-- Name -->
          <div :class="columnClass">

            <div class="w-full">
                                      
              <label :class="labelStylingClass">
                Name<span class="text-red-star">*</span>
              </label>

              <input
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
                                    
              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                City<span class="text-red-star">*</span>
              </label>

              <input
                v-model="city"
                type="text"
                placeholder="City"
                :class="inputStylingClass"
                required
                :disabled="!status.isEditing"
              />

              <select v-model="idCity">
                <option>

                </option>
              </select>

            </div>

          </div>
  
        </div>
  
        <div :class="rowClass">
  
          <div :class="columnClass">

            <div class="w-full">
                                      
              <label :class="labelStylingClass">
                Hotel Name<span class="text-red-star">*</span>
              </label>

              <input 
                v-model="hotelName"
                type="text"
                placeholder="Hotel Name"
                :class="inputStylingClass"
                required
                :disabled="!status.isEditing"
              />

            </div>

          </div>
    
          <div :class="columnClass">
                                  
            <div class="w-full">

              <label class="block mb-2 font-JakartaSans font-medium text-sm">
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
                v-if="status.isEditing" 
                v-model="idType"
                :class=inputStylingClass 
              >

                <option>

                </option>

              </select>
                                  
            </div>

          </div>
  
        </div>
  
        <div :class="rowClass">
  
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
  
        </div>
  
    </form>

</template>