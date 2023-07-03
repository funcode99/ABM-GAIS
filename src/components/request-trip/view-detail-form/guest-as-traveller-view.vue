<script setup>
    
    import { ref, onBeforeMount } from 'vue'

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
          Name <span class="text-red-star">*</span>
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
        Department<span class="text-red-star">*</span>
    </label>

    <input
        type="text"
        placeholder="Department"
        :class="inputStylingClass"
        required
    />

  </div>

</div>

<div :class="columnClass">

  <div class="w-full">
    
    <label class="block mb-2 font-JakartaSans font-medium text-sm">
      Flight Class <span class="text-red-star">*</span>
    </label>
    
    <input 
      type="text"
      placeholder="Flight Class"
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
                SN<span class="text-red-star">*</span>
            </label>

            <input 
                type="text"
                placeholder="SN"
                :class="inputStylingClass"
                required
            />

        </div>
        </div>

        <div :class="columnClass">

        <div class="w-full">

            <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Company<span class="text-red-star">*</span>
            </label>

            <input 
                type="text"
                :class="inputStylingClass"
                placeholder="Company"
                required
            />

        </div>

        </div>

        <div :class="columnClass"></div>

        </div>

        <div :class="rowClass">

        <div :class="columnClass">
        <div class="w-full">
            <label :class="labelStylingClass">
                Gender<span class="text-red-star">*</span>
            </label>
            <select :class="inputStylingClass">
                <option selected hidden disabled>
                Male
                </option>
                <option selected hidden disabled>
                Female
                </option>
            </select>
        </div>
        </div>

        <div :class="columnClass">
        <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Hotel Fare<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass">
                <option selected hidden disabled>
                Fare
                </option>
            </select>
        </div>
        </div>

        <div :class="columnClass"></div>

        </div>

        <div :class="rowClass">

        <div :class="columnClass">
        <div class="w-full">
            <label :class="labelStylingClass">
                NIK<span class="text-red-star">*</span>
            </label>
            <input type="text" placeholder="NIK" :class="inputStylingClass">
        </div>
        </div>

        <div :class="columnClass">
        <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Flight Entitlement<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass">
                <option selected hidden disabled>
                Flight Entitlement
                </option>
            </select>
        </div>
        </div>

        <div :class=columnClass></div>

        </div>

        <div :class="rowClass">

        <div :class="columnClass">
        <div class="w-full">
            <label :class="labelStylingClass">
                Contact No<span class="text-red-star">*</span>
            </label>
            <input :class="inputStylingClass" type="text" placeholder="Contact No">
        </div>
        </div>

        <div :class="columnClass">
        <div class="w-full">
            <label
                :class="labelStylingClass"
                >Notes<span class="text-red-star">*</span></label
            >
            <input type="text" placeholder="Notes" :class="inputStylingClass">
        </div>
        </div>

        <div :class="columnClass"></div>

        </div>

    </div>
</template>