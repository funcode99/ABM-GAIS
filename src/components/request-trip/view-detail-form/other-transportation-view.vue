<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    import fetchCityUtils from '@/utils/Fetch/Reference/fetchCity'
    
    let cityData = ref()
    let optionDataTransportationType = ref()

    const fetchTypeOfTransportation = async () => {
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.get('/other_transport/get_type_transport')
      optionDataTransportationType.value = api.data.data
    }

    onBeforeMount(() => {
        fetchCityUtils(cityData)
        fetchTypeOfTransportation()
    })

    const status = defineProps({
      isEditing: Boolean,
      currentIndex: Number,
      typeOfSubmitData: String
    })

    const props = inject('otherTransportationDataView')
    const emits = defineEmits('fetchOtherTransportation', 'resetTypeOfSubmitData')

    let name = ref()
    let city = ref()
    let idCity = ref()
    let transportationType = ref()
    let idTypeTransportation = ref()
    let quantity = ref()
    let fromDate = ref()
    let remarks = ref()
    let toDate = ref()

    const assignValue = () => {
      name.value = localStorage.getItem('username')
      city.value = props.value[status.currentIndex].city_name
      idCity.value = props.value[status.currentIndex].id_city
      transportationType.value = props.value[status.currentIndex].type_transportation
      idTypeTransportation.value = props.value[status.currentIndex].id_type_transportation
      quantity.value = props.value[status.currentIndex].qty
      fromDate.value = props.value[status.currentIndex].from_date
      toDate.value = props.value[status.currentIndex].to_date
      remarks.value = props.value[status.currentIndex].remarks
    }

    const resetValue = () => {
      city.value = ''
      transportationType.value = ''
      quantity.value = ''
      fromDate.value = ''
      toDate.value = ''
      remarks.value = ''
      idCity.value = 0
      idTypeTransportation.value = 0
    }

    const defaultValue = () => {
      name.value = localStorage.getItem('username')
      city.value = props.value[0].city_name
      idCity.value = props.value[0].id_city
      transportationType.value = props.value[0].type_transportation
      idTypeTransportation.value = props.value[0].id_type_transportation
      quantity.value = props.value[0].qty
      fromDate.value = props.value[0].from_date
      toDate.value = props.value[0].to_date
      remarks.value = props.value[0].remarks
    }

    watch(status, () => {
      if (status.typeOfSubmitData === 'Edit') {
            updateOtherTransportation()
        }
        else if (status.typeOfSubmitData === 'Submit Add') {
            addOtherTransportation()
        }
        else if (status.typeOfSubmitData === 'Delete') {
            deleteOtherTransportation()
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

    const addOtherTransportation = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      
      const api = await Api.post('/other_transport/store', {
        id_request_trip: localStorage.getItem('tripIdView'),
        id_type_transportation: idTypeTransportation.value,
        id_city: idCity.value,
        from_date: fromDate.value,
        to_date: toDate.value,
        remarks: remarks.value,
        qty: quantity.value
      })

      emits('fetchOtherTransportation')
      emits('resetTypeOfSubmitData', 'Add')

    }

    const updateOtherTransportation = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      
      const api = await Api.post(`/other_transport/update_data/${props.value[status.currentIndex].id}`, {
        id_request_trip: localStorage.getItem('tripIdView'),
        id_type_transportation: idTypeTransportation.value,
        id_city: idCity.value,
        from_date: fromDate.value,
        to_date: toDate.value,
        remarks: remarks.value,
        qty: quantity.value
      })

      emits('fetchOtherTransportation')
      emits('resetTypeOfSubmitData', 'Edit')

    }

    const deleteOtherTransportation = async () => {
    
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.delete(`/other_transport/delete_data/${props.value[status.currentIndex].id}`)
      emits('fetchOtherTransportation')
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
  
        <!-- Traveller -->
        <div :class="columnClass">

          <div class="w-full">

                <label :class="labelStylingClass">
                    Traveller<span class="text-red-star">*</span>
                </label>

                <input 
                  v-model="name"
                  type="text"
                  :class="inputStylingClass"
                  placeholder="Name"
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
              v-if="!status.isEditing"
              v-model="city" 
              type="text" 
              :class="inputStylingClass" 
              placeholder="City"
              disabled
            />

            <select 
              v-model="idCity"
              :class="inputStylingClass" 
              v-if="status.isEditing" 
            >

              <option 
                v-for="data in cityData" 
                :key="data.id" 
                :value="data.id"
              >
                {{ data.city_name }}
              </option>

            </select>

          </div>

        </div>
  
      </div>
  
      <div :class="rowClass">
  
        <!-- Type of Transportation -->
        <div :class="columnClass">
            <div class="w-full">
                
              <label :class="labelStylingClass">
                Type of Transportation<span class="text-red-star">*</span>
              </label>

              <input 
                v-if="!status.isEditing"
                v-model="transportationType" 
                type="text" 
                :class="inputStylingClass"
                placeholder="Type"
                disabled 
              />

              <select 
                :class="inputStylingClass" 
                v-if="status.isEditing" 
                v-model="idTypeTransportation"
              >

                <option v-for="data in optionDataTransportationType" :key="data.id" :value="data.id">
                  {{ data.type_transportation }}
                </option>

              </select>

            </div>
        </div>
  
        <!-- Quantity -->
        <div :class="columnClass">
          <div class="w-full">

            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Quantity<span class="text-red-star">*</span>
            </label>

            <input 
              v-model="quantity" 
              type="text" 
              placeholder="Quantity" 
              :class=inputStylingClass 
              required 
              :disabled="!status.isEditing"
            />
          
          </div>
        </div>
  
      </div>
  
      <div :class="rowClass">
  
        <!-- From Date -->
        <div :class="columnClass">
          <div class="w-full">
            
            <label :class="labelStylingClass">
              From Date<span class="text-red-star">*</span>
            </label>

            <input 
              v-model="fromDate" 
              type="date" 
              :class="inputStylingClass" 
              placeholder="From Date" 
              required 
              :disabled="!status.isEditing"
            />  

          </div>
        </div>
  
        <!-- Remarks -->
        <div :class="columnClass">
          <div class="w-full">

            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Remarks<span class="text-red-star">*</span>
            </label>

            <textarea 
              v-model="remarks" 
              placeholder="Remarks" 
              :class="inputStylingClass" 
              required
              :disabled="!status.isEditing"
            ></textarea>

          </div>
        </div>
  
      </div>
  
      <div :class="rowClass">
  
        <!-- To Date -->
        <div :class="columnClass">
          <div class="w-full">
            <label :class="labelStylingClass">
              To Date<span class="text-red-star">*</span>
            </label>
            <input 
              v-model="toDate" 
              type="date" 
              :class="inputStylingClass" 
              placeholder="To Date" 
              required 
              :disabled="!status.isEditing"  
            />
          </div>
        </div>
  
      </div>
  
    </form>

</template>