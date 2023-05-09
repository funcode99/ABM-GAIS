<script setup>
    import { ref } from 'vue'
    
    import expandArrow from '@/assets/ExpandArrow.png'
    
    import Navbar from '@/components/layout/Navbar.vue'
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Footer from '@/components/layout/Footer.vue'
    import multiStepCircleVertical from '@/components/molecules/multiStepCircleVertical.vue'
    import detailsFormHeader from '@/components/organisms/detailsFormHeader.vue'

    import buttonEditFormView from '@/components/atomics/buttonEditFormView.vue'
    import buttonSaveFormView from '@/components/atomics/buttonSaveFormView.vue'

    import arrow from '@/assets/request-trip-view-arrow.png'

    import { useSidebarStore } from "@/stores/sidebar.js"
    const sidebar = useSidebarStore()

    let tab = ref('details')
    let showTravel = ref(true)
    let showAirlines = ref(true)
    let headerTitle = ref('Traveller')

    const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
    const columnClass = 'flex flex-col flex-1'
    const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
    const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
</script>

<template>

    <div class="flex flex-col w-full this h-[100vh]">

        <Navbar />

        <div class="flex w-screen content mt-[115px]">

            <Sidebar class="flex-none" />

            <div class="bg-[#e4e4e6] pb-20 pt-10 px-8 w-screen clean-margin duration-500 ease-in-out"
            :class="[sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
            >
                
                <div class="bg-white rounded-xl pb-3 relative py-9 px-5">

                    <div class="flex items-center gap-2">
                        <img :src="arrow" class="w-3 h-3" alt="">
                        <h1 class="text-blue font-semibold">Request Trip<span class="text-[#0a0a0a]"> / TRV-ABM/1232/23.04</span> </h1>
                    </div>

                    <div class="flex gap-4 mt-6 mb-3 ml-5">
                        <buttonEditFormView />
                        <buttonSaveFormView />
                    </div>

                    <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">
                            <div class="flex flex-col gap-2">
                                <span>Date Created <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="13/5/2023" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                            <div class="flex flex-col gap-2">
                                <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="Company Business" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                            <div class="flex flex-col gap-2">
                                <span>Requestor <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="Gavin McFarland" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                            <div class="flex flex-col gap-2">
                                <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                                <input type="text" disabled value="Gavin McFarland" class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%]">
                            </div>
                    </div>

                    <div class="bg-blue rounded-lg pt-2">
                            <button @click="tab = 'details'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'details' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                Details
                            </button>
                            <button @click="tab = 'tlk'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'tlk' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                TLK Info
                            </button>
                            <button @click="tab = 'approval'" class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative">
                                <div :class="tab == 'approval' ? 'block' : 'hidden'" class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"></div>
                                Approval
                            </button>
                    </div>

                    <div v-if="tab == 'details'" class="flex">
                                               
                        <div class="">

                            <div class="py-12 px-4">

                                <!-- harus refresh page dulu baru props nya masuk -->
                                <multiStepCircleVertical number="1" title="Traveler" />
                                <multiStepCircleVertical number="2" title="Airlines" />
                                <multiStepCircleVertical number="3" title="Taxi Voucher" />
                                <multiStepCircleVertical number="4" title="Other Transportation" />
                                <multiStepCircleVertical number="5" title="Accomodation" />
                                <multiStepCircleVertical number="6" title="Cash Advance" limit="6" />

                            </div>

                            <div>

                            </div>

                        </div>

                        <div class="flex-1">
                            
                            <detailsFormHeader :title="headerTitle" />

                            <div class="ml-8">
                                <div :class="rowClass">

<div :class="columnClass">
  <div class="w-full">
      <label :class="labelStylingClass">
          Type of Traveller<span class="text-red-star">*</span>
      </label>
      <select :class="inputStylingClass">
        <option selected hidden disabled>
          Type
        </option>
      </select>
  </div>
</div>

<div :class="columnClass">
  <div class="w-full">
    <label
        class="block mb-2 font-JakartaSans font-medium text-sm"
        >Department<span class="text-red-star">*</span></label
    >
    <input
        type="text"
        placeholder="Department"
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
          Name<span class="text-red-star">*</span>
      </label>
      <select :class="inputStylingClass">
        <option selected hidden disabled>
          Name
        </option>
      </select>
  </div>
</div>

<div :class="columnClass">
  <div class="w-full">
    <label
        class="block mb-2 font-JakartaSans font-medium text-sm"
        >Company<span class="text-red-star">*</span></label
    >
    <select :class="inputStylingClass">
        <option selected hidden disabled>
          Company
        </option>
      </select>
  </div>
</div>

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

</div>
                            </div>

                        </div>

                    </div>
                        
                    <div v-else-if="tab == 'tlk'">

                            <h1>TLK</h1>
                            <hr class="border-black border-2">

                            <div class="flex flex-col mt-3">
                                <span>Requestor <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="Gavin McFarland" disabled>
                            </div>

                            <div class="flex flex-col mt-3">
                                <span>Job Band <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="B" disabled>
                            </div>

                            <div class="flex flex-col mt-3">
                                <span>TLK <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="A" disabled>
                            </div>

                            <div class="flex flex-col mt-3">
                                <span>Total TLK <span class="text-red-star">*</span></span>
                                <input type="text" class="px-4 py-3 max-w-[80%] rounded-lg" value="569.000" disabled>
                            </div>

                    </div>

                    <div v-else-if="tab == 'approval'">

                    </div>

                </div>

            </div>

        </div>

    </div>

    <Footer />

</template>

<style scoped>

</style>