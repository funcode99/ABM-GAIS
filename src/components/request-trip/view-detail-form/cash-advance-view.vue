<script setup>
    import { ref, inject, onBeforeMount, watch } from 'vue'

    const props = inject('cashAdvanceDataView')

    let name = localStorage.getItem('username')
    let grandTotal = ref()
    let notes = ref()

    let item = ref()
    let nominal = ref()
    let frequency = ref()
    let total = ref()
    let currency = ref()
    let remarks = ref()

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
          <label>Traveller</label>
          <input v-model="name" :class="inputStylingClass" placeholder="Name" />
        </div>

        <div :class="columnClass">
          <label>Grand Total</label>
          <input v-model="grandTotal" :class="inputStylingClass" placeholder="Grand Total" />
        </div>

        <div :class="columnClass">
          
        </div>

      </div>

      <div :class="rowClass">
        
        <div :class="columnClass">
          
          <label :class="labelStylingClass">
            Notes  
          </label>
          
          <textarea :class="inputStylingClass" placeholder="Notes"></textarea>
        
        </div>

        <div></div>
        <div></div>

      </div>

      <div class="mx-4">
        <h1 class="font-medium">Details Item</h1>
        <hr class="border border-black" />
      </div>

      <form @submit.prevent="">

        <div :class="rowClass">
          
          <div :class="columnClass">
            <label :class="labelStylingClass">
              Item <span class="text-red-star">*</span>
            </label>
            <input :class="inputStylingClass" placeholder="Item" />
          </div>
          
          <div :class="columnClass">
            <label :class="labelStylingClass">
              Nominal <span class="text-red-star">*</span>
            </label>
            <input :class="inputStylingClass" placeholder="Nominal" />
          </div>

          <div :class="columnClass"></div>

        </div>
        
        <div :class="rowClass">
        
          <div :class="columnClass">
            <label :class="labelStylingClass">
              Days<span class="text-red-star">*</span>
            </label>
            <input :class="inputStylingClass" placeholder="Days" />
          </div>
          
          <div :class="columnClass">
            <label :class="labelStylingClass">
              Total
            </label>
            <input :class="inputStylingClass" placeholder="Total" />
          </div>

          <div :class="columnClass"></div>

        </div>
        
        <div :class="rowClassStart">
        
          <div :class="columnClass">

            <label :class="labelStylingClass">
              Currency<span class="text-red-star">*</span>
            </label>

            <select :class="inputStylingClass">
              <option>
                Currency
              </option>
            </select>
          
          </div>

          <div :class="columnClass">
            
            <label :class="labelStylingClass">
              Remarks<span class="text-red-star">*</span>
            </label>

            <textarea :class="inputStylingClass" placeholder="Remarks"></textarea>

          </div>

          <div :class="columnClass"></div>

        </div>

      </form>

    </div>
</template>