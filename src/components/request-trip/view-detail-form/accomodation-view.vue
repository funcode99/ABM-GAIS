<script setup>
    import { ref, onBeforeMount } from 'vue'

    const props = defineProps({
        apiData: Array
    })

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
                                      type="text"
                                      placeholder="Name"
                                      :class="inputStylingClass"
                                      required
                                    />

                                  </div>

                                </div>
                                
                                <div :class="columnClass">
                                  <div class="w-full">
                                    
                                    <label class="block mb-2 font-JakartaSans font-medium text-sm">
                                        City<span class="text-red-star">*</span>
                                    </label>

                                    <input 
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

                                    <input type="text" placeholder="Type" :class=inputStylingClass>
                                  
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

                                    <input type="text" placeholder="Sharing With" :class=inputStylingClass>
                                  
                                  </div>

                                </div>
  
        </div>
  
        <div :class="rowClass">
  
                                <div :class="columnClass">
                                  <div class="w-full">

                                    <label :class="labelStylingClass">
                                      To Date<span class="text-red-star">*</span>
                                    </label>

                                    <input 
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