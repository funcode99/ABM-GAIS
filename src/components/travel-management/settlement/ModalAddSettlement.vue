<script setup>
import multiStepCircle from '@/components/molecules/multiStepCircle.vue'

import iconClose from "@/assets/navbar/icon_close.svg";

// cuma gara2 lupa import ref sidebar gua error terus anjing
import { ref } from 'vue'
import Api from '@/utils/Api'

let menuName = ref('')
let idStatusMenu = ref('Active')
let titleArray = [
    {id: 0, title: 'Choose Cash Advance'},
    {id: 1, title: 'Settlement Cash Advance'}
]

let stepLength = 2
let stepForm = ref(0)
let CAOption = ref('CA Travel')

let CANo = ref('')
let reference = ref('')

const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'

const tableHeadCATravel = [
    {id: 1, title: 'CANo'},
    {id: 2, title: 'Reference'},
    {id: 3, title: 'Total'},
    {id: 4, title: 'Status'}
]

const tableBodyCATravel = [
    {
        id: 1,
        CANo: 'TCA-ABM/2111/12.04',
        reference: 'TRV-ABM/3122/03.06',
        total: '470.000',
        status: 'Need Settlement'
    },
    {
        id: 2,
        CANo: 'TCA-ABM/2111/12.04',
        reference: 'TRV-ABM/3122/03.06',
        total: '470.000',
        status: 'Need Settlement'
    }
]

const tableHeadCANonTravel = [
    {id: 1, title: 'CANo'},
    {id: 2, title: 'Event'},
    {id: 3, title: 'Total'}
]

const tableBodyCANonTravel = [
    {
        id: 1,
        CANo: 'NCA-ABM/2111/12.04',
        event: 'Sport',
        total: 700.000
    },
    {
        id: 2,
        CANo: 'NCA-ABM/2111/12.04',
        event: 'Meeting',
        total: 470.000
    }
]

const tableHeadDetailsItem = [
    {id: 1, title: 'Item'},
    {id: 2, title: 'Frequency'},
    {id: 3, title: 'Currency'},
    {id: 4, title: 'Nominal'},
    {id: 5, title: 'Total'},
    {id: 6, title: 'Total Pemakaian Real'},
    {id: 7, title: 'Attachment'}
]

const tableBodyDetailsItem = [
    {
        id: 1,
        item: 'Meals',
        frequency: 2,
        currency: 'Rupiah',
        nominal: 120.000,
        total: 240.000,
        totalPemakaianReal: 350.000,
        attachment: 'stlm.jpg'
    },
    {
        id: 2,
        item: 'Transport',
        frequency: 2,
        currency: 'Rupiah',
        nominal: 200.000,
        total: 400.000,
        totalPemakaianReal: 0,
        attachment: ''
    }
]

</script>

<template>
  
    <label for="add-menu-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add New
    </label>

  <input type="checkbox" id="add-menu-modal" class="modal-toggle" />
  
  <div class="modal">

    <div class="modal-box relative">
      
        <div class="sticky top-0 z-50 bg-white py-4">
            <label for="add-menu-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">New Settlement</p>
            <div className="divider m-0"></div>
        </div>

        <div class="mb-8">
        
            <div>
                <multiStepCircle :title="titleArray" :length="stepLength" :step="stepForm" />
            </div>

        </div>

        <div v-if="stepForm == 0">
            <div class="flex flex-col items-center gap-3 mt-20">
                
                <div>
                    <h1 class="text-sm font-medium">CA Type</h1>
                    <select v-model="CAOption" :class="'w-[163px] mt-2 ' + inputStylingClass">
                        <option>
                            CA Travel
                        </option>
                        <option>
                            CA Non Travel
                        </option>
                    </select>
                </div>
                
            </div>
            
            <div class="overflow-x-auto flex justify-center mt-6">
    
                <table v-if="CAOption == 'CA Travel'" class="table">
                    <thead>
                            <tr>
                                <th v-for="data in tableHeadCATravel" :key="data.id">
                                    {{ data.title }}
                                </th>
                                <th></th>
                            </tr>
                    </thead>
                    <tbody>
                            <tr v-for="data in tableBodyCATravel" :key="data.id">
                                <td>
                                    {{ data.CANo }}
                                </td>
                                <td>
                                    {{ data.reference }}
                                </td>
                                <td>
                                    {{ data.total }}
                                </td>
                                <td>
                                    {{ data.status }}
                                </td>
                                <td>
                                    <button class="text-white bg-[#87c556] px-3 py-2 rounded-lg font-bold text-base text-center">
                                        Select
                                    </button>
                                </td>
                            </tr>
                    </tbody>
                </table>
    
                <table v-if="CAOption == 'CA Non Travel'" class="table">
                    <thead>
                            <tr>
                                <th v-for="data in tableHeadCANonTravel" :key="data.id">
                                    {{ data.title }}
                                </th>
                                <th></th>
                            </tr>
                    </thead>
                    <tbody>
                            <tr v-for="data in tableBodyCANonTravel" :key="data.id">
                                <td>
                                    {{ data.CANo }}
                                </td>
                                <td>
                                    {{ data.event }}
                                </td>
                                <td>
                                    {{ data.total }}
                                </td>
                                <td>
                                    <button class="text-white bg-[#87c556] px-3 py-2 rounded-lg font-bold text-base text-center">
                                        Select
                                    </button>
                                </td>
                            </tr>
                    </tbody>
                </table>
    
            </div>
        </div>

        <div v-if="stepForm == 1" class="mt-12 flex flex-col gap-6">
            <div class="flex flex-col gap-1">
                <label>CA No<span class="text-red-star">*</span></label>
                <input type="text" :class="inputStylingClass" v-model="CANo" />
            </div>

            <div v-if="CAOption === 'CA Travel'">
                <label>Reference<span class="text-red-star">*</span></label>
                <input type="text" :class="inputStylingClass" v-model="reference" />
            </div>

            <div>
                <h1 class="mb-10">Details Item</h1>
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th v-for="data in tableHeadDetailsItem" :key="data.id">
                                    {{ data.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in tableBodyDetailsItem" :key="data.id">
                                <td>    
                                    {{ data.item }}
                                </td>
                                <td>
                                    {{ data.frequency }}
                                </td>
                                <td>
                                    {{ data.currency }}
                                </td>
                                <td>
                                    {{ data.nominal }}
                                </td>
                                <td>
                                    {{ data.total }}
                                </td>
                                <td>
                                    {{ data.totalPemakaianReal }}
                                </td>
                                <td v-if="data.attachment !== ''">
                                    {{ data.attachment }}
                                </td>
                                <td v-else>
                                    <input type="file" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="sticky bottom-0 bg-white mt-4 py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
            <label
            @click="stepForm--"
            for="add-menu-modal"
            class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
                Cancel
            </label>
          <button
          @click="stepForm+1 == stepLength ? '' : stepForm++"
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
            Save
          </button>
        </div>
        </div>

    </div>

  </div>
</template>

<style scoped>

.modal-box {
  max-height: calc(100vh - 5em);
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 91.666667%;
  max-width: 50rem /* 512px */;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-top-left-radius: var(--rounded-box, 1rem);
  border-top-right-radius: var(--rounded-box, 1rem);
  border-bottom-left-radius: var(--rounded-box, 1rem);
  border-bottom-right-radius: var(--rounded-box, 1rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.table th {
  background: #015289 !important;
  border-color: #b9b9b9 !important;
  border-width: 2px;
  color: white;
  padding: 16px 12px;
}

.table td {
  border-color: #b9b9b9 !important;
  border-width: 2px;
  padding: 16px 12px;
}

input::file-selector-button {
    background: white;
    font-size: 10px !important;
    border-color: #1F7793;
    color: #1F7793 !important;
    font-weight: 700 !important;
    line-height: 0px !important;
    border-radius: 2px;
    height: 18px;
    padding: 3px 3px;
    text-align:center;
}


</style>
