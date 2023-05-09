<script setup>
import { ref } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg"

import arrow from '@/assets/arrow-multi-step-form.png'
import check from '@/assets/step-done-check.png'

import Airline1 from '@/assets/airlines-1.png'
import Airline2 from '@/assets/airlines-2.png'

import modalHeader from '@/components/molecules/modalHeader.vue'
import confirmationButton from '@/components/molecules/confirmationButton.vue'
import checkButton from '@/components/molecules/checkButton.vue'

import { Modal } from 'usemodal-vue3'

let isVisibleGuest = ref(false)
let isVisibleAirlines = ref(false)
let isVisibleTaxiVoucher = ref(false)
let isVisibleOtherTransportation = ref(false)
let isVisibleAccomodation = ref(false)
let isVisibleCashAdvance = ref(false)

let type = '' 
let modalPaddingHeight = 50

let formStep = ref(0)

const tableHeadAirlines = [
  {id: 1, title: 'Airline'},
  {id: 2, title: 'Flight No'},
  {id: 3, title: 'Depart'},
  {id: 4, title: 'Arrival'},
  {id: 5, title: 'Stops'},
  {id: 6, title: 'Class'},
  {id: 7, title: 'Price'},
  {id: 8, title: 'Confirm'},
]

const airlinesDummy = [
  {
    id: 1,
    Airline: Airline1,
    flightNo: 'QG-121',
    Depart: 'Jakarta',
    Arrival: 'Surabaya',
    Stops: '2h 30m',
    StopsMethod: 'Direct',
    Class: 'Economy',
    Price: '832.000'
  },
  {
    id: 2,
    Airline: Airline2,
    flightNo: 'QG-121',
    Depart: 'Jakarta',
    Arrival: 'Surabaya',
    Stops: '2h 30m',
    StopsMethod: 'Direct',
    Class: 'Economy',
    Price: '832.000'
  }
]

const tableHeadAccomodation = [
  {id: 1, title: 'Hotel Name'},
  {id: 2, title: 'Location'},
  {id: 3, title: 'Hotel Rating'},
  {id: 4, title: 'Room Type'},
  {id: 5, title: 'Price'},
  {id: 6, title: 'Confirm'}
]

const accomodationDummy = [
{
    id: 1,
    HotelName: 'Aston',
    Location: 'Gubeng, Surabaya',
    HotelRating: 'Jakarta',
    RoomType: 'Surabaya',
    Price: '950.000',
  },
  {
    id: 2,
    HotelName: 'Harris Hotel',
    Location: 'Entalsewu, Surabaya',
    HotelRating: 'Jakarta',
    RoomType: 'Surabaya',
    Price: '1.104.000',
  }
]

const tableHeadTravellers = [
 {id: 1, title: 'Name'},
 {id: 2, title: 'SN'},
 {id: 3, title: 'Gender'},
 {id: 4, title: 'Contact No'},
 {id: 5, title: 'Department'},
 {id: 6, title: 'Company'},
 {id: 7, title: 'Type'},
 {id: 8, title: 'Max Hotel Fare'},
 {id: 9, title: 'Flight Class'},
 {id: 10, title: 'Action'}
]

const tableBodyTravellers = [
  {
    id: 1,
    name: 'Gavin McFarland',
    sn: '212123',
    gender: 'Male',
    contactNo: '(820)340234-3294',
    department: 'IT',
    company: 'PT ABM',
    type: 'requestor',
    maxHotelFare: '700.000',
    flightClass: 'Economy'
  },
  {
    id: 2,
    name: 'Evelyn Reid',
    sn: '322232',
    gender: 'Female',
    contactNo: '(260)360274-3514',
    department: 'Sales',
    company: 'PT ABC',
    type: 'employee',
    maxHotelFare: '700.000',
    flightClass: 'Economy'
  },
]

const tableHeadTaxiVoucher = [
  {id: 1, title: 'Name'},
  {id: 2, title: 'Date'},
  {id: 3, title: 'Departure'},
  {id: 4, title: 'Arrival'},
  {id: 5, title: 'Amount'},
  {id: 6, title: 'Account Name'},
  {id: 7, title: 'Remarks'},
  {id: 8, title: 'Status'},
  {id: 9, title: 'Action'},
]

const tableBodyTaxiVoucher = [
  {
    id: 1,
    name: 'Gavin McFarland',
    date: '223/12/23',
    departure: 'Airport Sub',
    arrival: 'Site A',
    amount: '120.000',
    accountName: '',
    remarks: '',
    status: ''
  },
]

const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
const columnClass = 'flex flex-col flex-1'

const inputStylingWithoutWidthClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
const circleStepBasicStylingClass = 'rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative'

</script>

<template>

    <!-- trigger button to open modal -->
    <label
      for="company-business-trip-request-modal"
      class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
      + Add New
    </label>

    <input type="checkbox" id="company-business-trip-request-modal" class="modal-toggle" />

    <!-- modal trip request -->
    <div class="modal font-JakartaSans">
      
      <div class="modal-box min-h-[500px] relative">

        <!-- modal title -->
        <div class="sticky p-4 top-0 z-50 bg-[#015289]">
          <label for="company-business-trip-request-modal" class="cursor-pointer absolute right-4">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold text-white">New Request Trip</p>
        </div>

        <!-- step circle -->
        <div class="flex justify-center pt-3 gap-x-[19px] modal-inner">

        <!-- step 1 circle -->
        <div :class="[formStep > 0 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Requester Info</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
          <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 0 ? 'block' : 'hidden'">
        </div>

        <!-- step 2 circle -->
        <div :class="[formStep > 1 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Purpose of Trip</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
          <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 1 ? 'block' : 'hidden'">
        </div>

        <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
          <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
        </div>


        <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
          <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
        </div>

        </div>

        <!-- modal body -->
        <div class="modal-box-inner mt-[30px]">

            <!-- step 1 form -->
            <div class="text-left" :class="formStep == 0 ? 'block' : 'hidden'">

            <div :class="rowClass">

              <div :class="columnClass">
                <div class="w-full">
                  <span>Requestor <span class="text-[#f5333f]">*</span></span>
                  <select :class="inputStylingClass">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>
              </div>

              <div :class="columnClass">
                <div class="w-full">
                  <span class="block">Location <span class="text-[#f5333f]">*</span></span>
                  <input type="text" :class="inputStylingClass" placeholder="Location">
                </div>
              </div>

            </div>

            <div :class="rowClass">

              <div :class="columnClass">
                <div class="w-full">
                  <span class="block">SN <span class="text-red-star">*</span></span>
                  <input type="text" :class="inputStylingClass" placeholder="SN">
                </div>

              </div>

              <div :class="columnClass">
                <div class="w-full">
                  <span class="block">Telephone <span class="text-red-star">*</span></span>
                  <input type="text" :class="inputStylingClass" placeholder="Telephone">
                </div>
              </div>

            </div>

            </div>

            <!-- step 2 form -->
            <div class="text-left px-4 pb-[60px] flex flex-col" :class="formStep == 1 ? 'block' : 'hidden'">

              <div :class="columnClass + ' mx-4 mb-3'">
        
                  <span :class="labelStylingClass">Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                  <select :class="inputStylingWithoutWidthClass">
                    <option selected value="">
                      Company Business
                    </option>
                    <option>
                      Site Visit
                    </option>
                    <option>
                      Field Break
                    </option>
                    <option>
                      Taxi Voucher Only
                    </option>
                  </select>
            
              </div>

              <div :class="columnClass + ' mx-4 my-3'">
                <span :class="labelStylingClass">Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                <input type="text" class="border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2 px-4 py-2" placeholder="Notes">
              </div>
              
            </div>

            <!-- step 3 form Traveller -->
            <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">

              <button @click="isVisibleGuest = !isVisibleGuest" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                + Add Guest
              </button>

              <div class="overflow-x-auto mt-5">
                <table class="table">
                  <thead>
                    <tr>
                      <th v-for="data in tableHeadTravellers" :key="data.id">
                        {{ data.title }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in tableBodyTravellers" :key="data.id">
                      <td>
                        {{ data.name }}
                      </td>
                      <td>
                        {{ data.sn }}
                      </td>
                      <td>
                        {{ data.gender }}
                      </td>
                      <td>
                        {{ data.contactNo }}
                      </td>
                      <td>
                        {{ data.department }}
                      </td>
                      <td>
                        {{ data.company }}
                      </td>
                      <td>
                        {{ data.type }}
                      </td>
                      <td>
                        {{ data.maxHotelFare }}
                      </td>
                      <td>
                        {{ data.flightClass }}
                      </td>
                      <td>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <!-- step 4 form Taxi Voucher -->
            <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">

              <button @click="isVisibleTaxiVoucher = !isVisibleTaxiVoucher" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                + Add Taxi Voucher
              </button>

              <div class="overflow-x-auto mt-5">
                <table class="table">
                  <thead>
                    <tr>
                      <th v-for="data in tableHeadTaxiVoucher" :key="data.id">
                        {{ data.title }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in tableBodyTaxiVoucher" :key="data.id">
                        <td>
                          {{ data.name }}
                        </td>
                        <td>
                          {{ data.date }}
                        </td>
                        <td>
                          {{ data.departure }}
                        </td>
                        <td>
                          {{ data.arrival }}
                        </td>
                        <td>
                          {{ data.amount }}
                        </td>
                        <td>
                          {{ data.accountName }}
                        </td>
                        <td>
                          {{ data.remarks }}
                        </td>
                        <td>
                          {{ data.status }}
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

        </div>

        <!-- change step button -->
        <div class="fixed left-0 right-0 bg-white bottom-0 px-5 py-2">
            <div class="flex justify-between font-bold">

              <button v-if="formStep > 0" @click="formStep--" class="border border-blue text-blue py-3 px-11 rounded-lg max-w-[141px]">
                Back
              </button>
              <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                Back
              </button>

              <button v-if="formStep < 3" @click="formStep++" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                Next
              </button>

              <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
                Next
              </button>

            </div>
        </div>

      </div>
      
    </div>

    <!-- Modal step 3 form modal Add Guest as Traveller -->
    <Modal type="clean" v-model:visible="isVisibleGuest" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleGuest = false" :title="'Guest as Traveller'" />

    <!-- pb-28 -->
    <div class="px-3 text-left modal-box-inner">

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

    <confirmationButton @cancel-click="isVisibleGuest = false" />

    </Modal>

    <!-- Modal step 4 form modal Add Taxi Voucher -->
    <Modal type="clean" v-model:visible="isVisibleTaxiVoucher" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleTaxiVoucher = false" :title="'Taxi Voucher'" />

    <!-- pb-28 -->
    <div class="px-3 text-left modal-box-inner pb-4">

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
                >Date<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass">
                <option selected hidden disabled>
                  Date
                </option>
              </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                   Arrival<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass">
                <option selected hidden disabled>
                  City
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Arrival<span class="text-red-star">*</span></label
            >
            <select :class="inputStylingClass">
                <option selected hidden disabled>
                  City
                </option>
              </select>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Amount<span class="text-red-star">*</span>
              </label>
              <input type="text" :class='inputStylingClass' placeholder="Amount">
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  <span>Remarks</span>
              </label>
              <input type="text" :class='inputStylingClass' placeholder="Remarks">
          </div>
        </div>

      </div>

      <div :class="rowClass">

      <div :class="columnClass">
        <div class="w-full">
            <label :class="labelStylingClass">
                <span>Account Name <span class="text-red-star">*</span></span>
            </label>
            <input type="text" :class='inputStylingClass' placeholder="Account Name">
        </div>
      </div>

      </div>



    </div>

    <confirmationButton @cancel-click="isVisibleTaxiVoucher = false" />

    </Modal>

</template>

<style scoped>

.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-inner {
  --tw-scale-x: 0.90;
  --tw-scale-y: 0.90;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.table th {
  background: #015289 !important;
  border-color: #b9b9b9 !important;
  border-width: 2px;
  color: white;
}

.table td {
  border-color: #b9b9b9 !important;
  border-width: 2px;
}

</style>
