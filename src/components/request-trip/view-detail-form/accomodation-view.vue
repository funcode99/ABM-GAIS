<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'

    const props = inject('accomodationDataView')
    const status = defineProps({
      isEditing: Boolean
    })

    let name = ref()
    let city = ref()
    let hotelName = ref()
    let type = ref()
    let checkIn = ref()
    let sharingWith = ref()
    let checkOut = ref()

    if(props.value[0].city_name !== undefined) {
        
        name.value = localStorage.getItem('username')
        city.value = props.value[0].city_name
        hotelName.value = props.value[0].hotel_name
        type.value = props.value[0].type_accomodation
        checkIn.value = props.value[0].check_in_date
        sharingWith.value = props.value[0].sharing_w_name
        checkOut.value = props.value[0].check_out_date

    }

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const rowClassStart = 'flex justify-between mx-4 items-start gap-2 my-6'
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
                type="text"
                placeholder="Name"
                :class="inputStylingClass"
                required
                :disabled="!status.isEditing"
              />

            </div>

          </div>
                                
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
              />

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
              />

            </div>

          </div>
    
          <div :class="columnClass">
                                  
            <div class="w-full">

              <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Type<span class="text-red-star">*</span>
              </label>

              <input
                v-model="type" 
                type="text" 
                placeholder="Type" 
                :class=inputStylingClass 
                required 
              />
                                  
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
              />

            </div>
          </div>
  
        </div>
  
    </div>
</template>