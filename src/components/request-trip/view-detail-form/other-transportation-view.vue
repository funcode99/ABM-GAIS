<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'

    const status = defineProps({
      isEditing: Boolean,
      currentIndex: Number
    })

    const props = inject('otherTransportationDataView')

    let name = ref()
    let city = ref()
    let transportationType = ref()
    let quantity = ref()
    let fromDate = ref()
    let remarks = ref()
    let toDate = ref()

    const assignValue = () => {
      name.value = localStorage.getItem('username')
      city.value = props.value[status.currentIndex].city_name
      transportationType.value = props.value[status.currentIndex].type_transportation
      quantity.value = props.value[status.currentIndex].qty
      fromDate.value = props.value[status.currentIndex].from_date
      remarks.value = props.value[status.currentIndex].remarks
      toDate.value = props.value[status.currentIndex].to_date
    }

    watch(status, () => {
      assignValue()
    })

    watch(props, () => {
      if(props.value[0].city_name !== undefined) {
        name.value = localStorage.getItem('username')
        city.value = props.value[0].city_name
        transportationType.value = props.value[0].type_transportation
        quantity.value = props.value[0].qty
        fromDate.value = props.value[0].from_date
        remarks.value = props.value[0].remarks
        toDate.value = props.value[0].to_date
      } else {
        assignValue()
      }
    })

    if(props.value[0].city_name !== undefined) {
        name.value = localStorage.getItem('username')
        city.value = props.value[0].city_name
        transportationType.value = props.value[0].type_transportation
        quantity.value = props.value[0].qty
        fromDate.value = props.value[0].from_date
        remarks.value = props.value[0].remarks
        toDate.value = props.value[0].to_date
    }

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

</script>


<template>
    <div>
                              
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
              v-model="city" 
              type="text" 
              :class="inputStylingClass" 
              placeholder="City" 
              required 
              :disabled="!status.isEditing"
            />

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
                v-model="transportationType" 
                type="text" 
                :class="inputStylingClass" 
                placeholder="Type" 
                required
                :disabled="!status.isEditing" 
              />

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
  
    </div>
</template>