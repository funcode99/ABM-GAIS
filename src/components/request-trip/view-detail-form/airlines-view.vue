<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'
    import Api from '@/utils/Api'

    const statusEdit = defineProps({
        isEditing: Boolean,
        currentIndex: Number,
        typeOfSubmitData: String
    })

    const props = inject('airlinesDataView')
    const emits = defineEmits('fetchAirlines', 'resetTypeOfSubmitData')

    let name = ref()
    let flightType = ref()
    let departure = ref()
    let price = ref()
    let arrival = ref()
    let status = ref()
    let flightNumber = ref()
    let vendor = ref()
    let codeAirlines = ref()


    const assignValue = () => {
        name.value = localStorage.getItem('username')
        flightType.value = props.value[statusEdit.currentIndex]
        departure.value = props.value[statusEdit.currentIndex]
        price.value = props.value[statusEdit.currentIndex].ticket_price
        arrival.value = props.value[statusEdit.currentIndex]
        // dikasih id vendor biar keliatan
        status.value = props.value[statusEdit.currentIndex].id_vendor
        flightNumber.value = props.value[statusEdit.currentIndex].flight_no
        codeAirlines.value = props.value[statusEdit.currentIndex].code_airlines
    }

    const resetValue = () => {
        name.value = ''
        flightType.value = ''
        departure.value = ''
        price.value = ''
        arrival.value = ''
        status.value = ''
        flightNumber.value = ''
    }

    watch(statusEdit, () => {
        if (statusEdit.typeOfSubmitData === 'Edit') {
            updateAirlines()
        }
        else if (statusEdit.typeOfSubmitData === 'Submit Add') {
            addAirlines()
        }
        else if (statusEdit.typeOfSubmitData === 'Delete') {
            deleteAirlines()
        }
        else if (statusEdit.typeOfSubmitData === 'Add') {
            resetValue()
        }
        else {
            assignValue()
        }
    })

    const updateAirlines = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      const api = await Api.post(`/flight_trip/update_data/${props.value[status.currentIndex].id}`, {
          id_request_trip: props.value[statusEdit.currentIndex].id_request_trip,
          id_vendor: vendor.value,
          flight_no: flightNumber.value,
          code_airlines: codeAirlines.value,
          ticket_price: price.value
      })

      console.log(api)
      emits('fetchAirlines')
      emits('resetTypeOfSubmitData', 'Edit')

    }

    const addAirlines = async () => {
      
      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`

      const api = await Api.post(`/flight_trip/store`, {
          id_request_trip: props.value[statusEdit.currentIndex].id_request_trip,
          id_vendor: vendor.value,
          flight_no: flightNumber.value,
          code_airlines: codeAirlines.value,
          ticket_price: price.value
      })

      console.log(api)
      emits('fetchAirlines')
      emits('resetTypeOfSubmitData', 'Add')

    }
    
    const deleteAirlines = async () => {

      const token = JSON.parse(localStorage.getItem('token'))
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      
      const api = await Api.delete(`/flight_trip/delete_data/${props.value[status.currentIndex].id}`)
        
      console.log(api)
      emits('fetchAirlines')  
      emits('resetTypeOfSubmitData')

    }

    watch(props, () => {

      name.value = localStorage.getItem('username')
      flightType.value = props.value[0]
      departure.value = props.value[0]
      price.value = props.value[0].ticket_price
      arrival.value = props.value[0]
      status.value = props.value[0].id_vendor
      flightNumber.value = props.value[0].flight_no

    })

    if(props.value[0].ticket_price !== undefined) {
      name.value = localStorage.getItem('username')
      flightType.value = props.value[0]
      departure.value = props.value[0]
      price.value = props.value[0].ticket_price
      arrival.value = props.value[0]
      status.value = props.value[0].id_vendor
      flightNumber.value = props.value[0].flight_no
    }

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>

<template>

    <div>

          <div :class="rowClass">

              <div :class="columnClass">
                                    
                  <div class="w-full">
                                        
                      <label :class="labelStylingClass">
                                            Name<span class="text-red-star">*</span>
                      </label>

                      <input 
                                            v-model="name"
                                            :class="inputStylingClass"
                                            placeholder="Name"
                                            required
                                            :disabled="!statusEdit.isEditing"
                      />

                  </div>

              </div>

              <div :class="columnClass">

                <div class="w-full">
                                        
                                    <label :class="labelStylingClass">
                                      Domestic/International<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      :class="inputStylingClass"
                                      placeholder="Domestic/International"
                                      required
                                      :disabled="!statusEdit.isEditing"
                                    />

                </div>

              </div>

              <div :class="columnClass"></div>

          </div>

          <div :class="rowClass">

            <div :class="columnClass">
                                  
                                  <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Departure<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Departure"
                                      :class="inputStylingClass"
                                      required
                                      :disabled="!statusEdit.isEditing"
                                    />

                                  </div>

            </div>

            <div :class="columnClass">

                                <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                      Price<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      v-model="price"
                                      type="text"
                                      placeholder="Price"
                                      :class="inputStylingClass"
                                      required
                                      :disabled="!statusEdit.isEditing"
                                    />

                                </div>

            </div>

            <div :class="columnClass"></div>

          </div>

          <div :class="rowClass">

            <div :class="columnClass">
                                  
              <div class="w-full">

                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Arrival<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      type="text"
                                      placeholder="Arrival"
                                      :class="inputStylingClass"
                                      required
                                      :disabled="!statusEdit.isEditing"
                                    />

              </div>

            </div>

            <div :class="columnClass">
                                  
              <div class="w-full">

                <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        Status<span class="text-red-star">*</span>
                </label>

                <input
                                      v-model="status"
                                      type="text"
                                      placeholder="Status"
                                      :class="inputStylingClass"
                                      required
                                      :disabled="!statusEdit.isEditing"
                />

              </div>

            </div>

            <div :class="columnClass"></div>

          </div>

          <div class="flex justify-between mx-4 items-start gap-2 my-6">

            <div :class="columnClass">
                                  
              <div class="w-full">
                                      
                                    <label :class="labelStylingClass">
                                      Flight Number<span class="text-red-star">*</span>
                                    </label>

                                    <input 
                                      v-model="flightNumber"
                                      type="text"
                                      placeholder="Flight Number"
                                      :class="inputStylingClass"
                                      required
                                      :disabled="!statusEdit.isEditing"
                                    />

              </div>

            </div>

            <div :class="columnClass"></div>

          </div>

    </div>
    
</template>