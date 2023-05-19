<script setup>
import { ref, watch } from 'vue'

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

let requestType = ref('Company Business')
let stepCounter = ref(7)

watch(requestType, (newValue, oldValue) => {

  console.log('nilai baru ' + newValue)
  console.log('nilai lama ' + oldValue)

  if(newValue == 'Company Business') {
    stepCounter.value = 7
  } else if(newValue == 'Site Visit') {
    stepCounter.value = 7
  } else if (newValue == 'Field Break') {
    stepCounter.value = 4
  } else if (newValue == 'Taxi Voucher Only') {
    stepCounter.value = 3
  }

  console.log(stepCounter.value)

})

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

const tableHeadAirlinesRequestTrip = [
  {id: 1, title: 'Name'},
  {id: 2, title: 'Departure'},
  {id: 3, title: 'Arrival'},
  {id: 4, title: 'Flight Number'},
  {id: 5, title: 'Domestic/International'},
  {id: 6, title: 'Status'},
  {id: 7, title: 'Action'}
]

const tableBodyAirlinesRequestTrip = [
  {
    id: 1,
    name: 'Gavin McFarland',
    departure: 'Jakarta',
    arrival: 'Surabaya',
    flightNumber: 'CL-212',
    flightRegion: 'Domestic',
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Evelyn Reid',
    departure: 'Jakarta',
    arrival: 'Surabaya',
    flightNumber: 'CL-212',
    flightRegion: 'Domestic',
    status: 'Pending'
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

const tableHeadOtherTransportation = [
  {id: 1, title: 'Name'},
  {id: 2, title: 'Type'},
  {id: 3, title: 'From Date'},
  {id: 4, title: 'To Date'},
  {id: 5, title: 'Quantity'},
  {id: 6, title: 'City'},
  {id: 7, title: 'Status'},
  {id: 8, title: 'Action'},
]

const tableBodyOtherTransportation = [
  {
    id: 1,
    name: 'Gavin McFarland',
    type: 'Rent Car',
    fromDate: '23/4/23',
    toDate: '24/4/23',
    quantity: '1',
    city: 'Surabaya',
    status: 'Pending'
  }  
]

const tableHeadAccomodationRequestTrip = [
  {id: 1, title: 'Name'},
  {id: 2, title: 'Hotel Name'},
  {id: 3, title: 'Check In'},
  {id: 4, title: 'Check Out'},
  {id: 5, title: 'City'},
  {id: 6, title: 'Type'},
  {id: 7, title: 'Sharing With'},
  {id: 8, title: 'Status'},
  {id: 9, title: 'Action'}
]

const tableBodyAccomodationRequestTrip = [
  {
    id: 1,
    name: 'Gavin McFarland',
    hotelName: 'Aston',
    checkIn: '23/4/23',
    checkOut: '24/4/23',
    city: 'Surabaya',
    type: 'Hotel',
    sharingWith: 'Leo',
    status: 'Pending'
  }
]

const tableHeadCashAdvance = [
  {id: 1, title: 'Cash Advance No'},
  {id: 2, title: 'Total'},
  {id: 3, title: 'Notes'},
  {id: 4, title: 'Status'},
  {id: 5, title: 'Action'}
]

const tableBodyCashAdvance = [
  {
    id: 1,
    caNo: '230505',
    total: '800.000',
    notes: 'abc',
    status: 'Pending'
  }
]

const rowClass = 'flex justify-between mx-4 items-center gap-2 my-6'
const columnClass = 'flex flex-col flex-1'

const inputStylingWithoutWidthClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'
const circleStepBasicStylingClass = 'rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative'

let requestor = ref('')
let location = ref('')
let sn = ref('')
let telephone = ref('')

let purposeOfTrip = ref('')
let notesToPurposeOfTrip = ref('')
let fromCity = ref('')
let toCity = ref('')
let zona = ref('')
let TLKperDay = ref('')
let dateDeparture = ref('')
let totalTLK = ref('')
let returnDate = ref('')


// guest as a traveller
let typeOfTraveller = ref('')
let department = ref('')
let name = ref('')
let company = ref('')
let gender = ref('')
let hotelFare = ref('')
let NIK = ref('')
let flightClass = ref('')
let contactNo = ref('')
let notesGuestAsTraveller = ref('')

const resetRef = () => {
  
}

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
        <nav class="sticky p-4 top-0 z-50 bg-[#015289]">
          <label @click="resetRef" for="company-business-trip-request-modal" class="cursor-pointer absolute right-4">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold text-white">New Request Trip</p>
        </nav>

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


          <div class="flex justify-center gap-x-[19px]" v-if="requestType == 'Company Business'">

            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>
  
            <!-- lebar div harus sama kaya text biar lingkarannya gak gepeng -->
            <!-- step 4 circle airlines -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 5 circle taxi voucher -->
            <div :class="[formStep > 4 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 4 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 6 circle other transportation -->
            <div :class="[formStep > 5 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 5 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 7 circle -->
            <div :class="[formStep > 6 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Accomodation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 6 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 8 circle -->
            <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Cash Advance</h1>
              <!-- <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt=""> -->
            </div>

          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType == 'Site Visit'">

            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>

            <!-- lebar div harus sama kaya text biar lingkarannya gak gepeng -->
            <!-- step 4 circle airlines -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
            </div>

            <!-- step 5 circle taxi voucher -->
            <div :class="[formStep > 4 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 4 ? 'block' : 'hidden'">
            </div>

            <!-- step 6 circle other transportation -->
            <div :class="[formStep > 5 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 5 ? 'block' : 'hidden'">
            </div>

            <!-- step 7 circle -->
            <div :class="[formStep > 6 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Accomodation</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 6 ? 'block' : 'hidden'">
            </div>

            <!-- step 8 circle -->
            <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Cash Advance</h1>
              <!-- <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt=""> -->
            </div>

          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType == 'Field Break'">
             
            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>
  
            <!-- step 4 circle airlines -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 3 ? 'block' : 'hidden'">
            </div>

            <!-- step 5 circle other transportation -->
            <div :class="[formStep > 4 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 5 ? 'block' : 'hidden'">
            </div>

          </div>

          <div class="flex justify-center gap-x-[19px]" v-if="requestType == 'Taxi Voucher Only'">
             
            <!-- step 3 circle travellers -->
            <div :class="[formStep > 2 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
              <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 2 ? 'block' : 'hidden'">
            </div>

            <!-- step 4 circle taxi voucher -->
            <div :class="[formStep > 3 ? 'bg-[#fff]' : 'bg-[#d9d9d9]', circleStepBasicStylingClass]">
              <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
              <img :src="check" class="absolute top-[12px] bottom-0 h-5 w-5" :class="formStep > 4 ? 'block' : 'hidden'">
            </div>

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

              <div :class="columnClass + ' mx-4'">
        
                  <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                  <select v-model="requestType" :class="inputStylingWithoutWidthClass">
                    <option>
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
                <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
                <input type="text" class="border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2 px-4 py-2" placeholder="Notes">
              </div>

              <h1 class="mx-4 mt-6">Itinerary</h1>
              
              <div :class="rowClass">

                <!-- From -->
                <div class="w-full">
                  <div :class="columnClass">
                    <span>From<span class="text-red-star">*</span></span>
                    <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="From">
                      <option hidden disabled selected>
                        City
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Zona -->
                <div class="w-full">
                  <div :class="columnClass">
                    <span>Zona<span class="text-red-star">*</span></span>
                    <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="Zona">
                  </div>
                </div>

              </div>

              <div :class="rowClass">

                <!-- To -->
                <div :class="columnClass">
                  <span>To<span class="text-red-star">*</span></span>
                  <select :class="inputStylingClass" placeholder="City">
                    <option hidden disabled selected>
                      City
                    </option>
                  </select>
                </div>
                
                <!-- TLK/Day -->
                <div :class="columnClass">
                  <span>TLK/Day<span class="text-red-star">*</span></span>
                  <input type="text" :class="inputStylingClass" placeholder="TLK/Day">
                </div>

              </div>

              <div :class="rowClass">
                
                <!-- Date Departure -->
                <div :class="columnClass">
                  <span>Date Departure<span class="text-red-star">*</span></span>
                  <input type="date" :class="inputStylingClass" placeholder="Date">
                </div>

                  <!-- Total TLK -->
                <div :class="columnClass">
                  <span class="">Total TLK<span class="text-red-star">*</span></span>
                  <input type="text" :class="inputStylingClass" placeholder="Total">
                </div>

              </div>

              <div :class="rowClass">
                <!-- Return date -->
                <div :class="columnClass">
                    <span class="">Return Date<span class="text-red-star">*</span></span>
                    <input type="date" :class="inputStylingClass" placeholder="Date">
                </div>
                <div :class="columnClass">

                </div>
              </div>

              
            </div>

            <div v-if="requestType == 'Company Business'">

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

            <!-- step 4 form Airlines -->
            <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">

            <button @click="isVisibleAirlines = !isVisibleAirlines" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
              + Add Airlines
            </button>

            <div class="overflow-x-auto mt-5">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tableBodyAirlinesRequestTrip" :key="data.id">
                    <td>
                      {{ data.name }}
                    </td>
                    <td>
                      {{ data.departure }}
                    </td>
                    <td>
                      {{ data.arrival }}
                    </td>
                    <td>
                      {{ data.flightNumber }}
                    </td>
                    <td>
                      {{ data.flightRegion }}
                    </td>
                    <td>
                      {{ data.status }}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            </div>

            <!-- step 5 form Taxi Voucher -->
            <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

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

            <!-- step 6 form Other Transportation -->
            <div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">

            <button @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
              + Add Other Transportation
            </button>

            <div class="overflow-x-auto mt-5">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="data in tableHeadOtherTransportation" :key="data.id">
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tableBodyOtherTransportation" :key="data.id">
                    <td>
                      {{ data.name }}
                    </td>
                    <td>
                      {{ data.type }}
                    </td>
                    <td>
                      {{ data.fromDate }}
                    </td>
                    <td>
                      {{ data.toDate }}
                    </td>
                    <td>
                      {{ data.quantity }}
                    </td>
                    <td>
                      {{ data.city }}
                    </td>
                    <td>
                      {{ data.status }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            </div>

            <!-- step 7 form Accomodation -->
            <div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">

            <button @click="isVisibleAccomodation = !isVisibleAccomodation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
              + Add Accomodation
            </button>

            <div class="overflow-x-auto mt-5">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="data in tableHeadAccomodationRequestTrip" :key="data.id">
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tableBodyAccomodationRequestTrip" :key="data.id">
                    <td>
                      {{ data.name }}
                    </td>
                    <td>
                      {{ data.hotelName }}
                    </td>
                    <td>
                      {{ data.checkIn }}
                    </td>
                    <td>
                      {{ data.checkOut }}
                    </td>
                    <td>
                      {{ data.city }}
                    </td>
                    <td>
                      {{ data.type }}
                    </td>
                    <td>
                      {{ data.sharingWith }}
                    </td>
                    <td>
                      {{ data.status }}
                    </td>
                    <td>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            </div>

            <!-- step 8 form -->
            <div class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">

            <button @click="isVisibleCashAdvance = !isVisibleCashAdvance" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
              + Add Cash Advance
            </button>

            <div class="overflow-x-auto mt-5">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="data in tableHeadCashAdvance" :key="data.id">
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tableBodyCashAdvance" :key="data.id">
                    <td>
                      {{ data.caNo }}
                    </td>
                    <td>
                      {{ data.total }}
                    </td>
                    <td>
                      {{ data.notes }}
                    </td>
                    <td>
                      {{ data.status }}
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            </div>
            </div>

            <div v-if="requestType == 'Site Visit'">

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

<!-- step 4 form Airlines -->
<div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">

<button @click="isVisibleAirlines = !isVisibleAirlines" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
  + Add Airlines
</button>

<div class="overflow-x-auto mt-5">
  <table class="table">
    <thead>
      <tr>
        <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
          {{ data.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in tableBodyAirlinesRequestTrip" :key="data.id">
        <td>
          {{ data.name }}
        </td>
        <td>
          {{ data.departure }}
        </td>
        <td>
          {{ data.arrival }}
        </td>
        <td>
          {{ data.flightNumber }}
        </td>
        <td>
          {{ data.flightRegion }}
        </td>
        <td>
          {{ data.status }}
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

</div>

<!-- step 5 form Taxi Voucher -->
<div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

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

<!-- step 6 form Other Transportation -->
<div class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">

<button @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
  + Add Other Transportation
</button>

<div class="overflow-x-auto mt-5">
  <table class="table">
    <thead>
      <tr>
        <th v-for="data in tableHeadOtherTransportation" :key="data.id">
          {{ data.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in tableBodyOtherTransportation" :key="data.id">
        <td>
          {{ data.name }}
        </td>
        <td>
          {{ data.type }}
        </td>
        <td>
          {{ data.fromDate }}
        </td>
        <td>
          {{ data.toDate }}
        </td>
        <td>
          {{ data.quantity }}
        </td>
        <td>
          {{ data.city }}
        </td>
        <td>
          {{ data.status }}
        </td>
      </tr>
    </tbody>
  </table>
</div>

</div>

<!-- step 7 form Accomodation -->
<div class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">

<button @click="isVisibleAccomodation = !isVisibleAccomodation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
  + Add Accomodation
</button>

<div class="overflow-x-auto mt-5">
  <table class="table">
    <thead>
      <tr>
        <th v-for="data in tableHeadAccomodationRequestTrip" :key="data.id">
          {{ data.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in tableBodyAccomodationRequestTrip" :key="data.id">
        <td>
          {{ data.name }}
        </td>
        <td>
          {{ data.hotelName }}
        </td>
        <td>
          {{ data.checkIn }}
        </td>
        <td>
          {{ data.checkOut }}
        </td>
        <td>
          {{ data.city }}
        </td>
        <td>
          {{ data.type }}
        </td>
        <td>
          {{ data.sharingWith }}
        </td>
        <td>
          {{ data.status }}
        </td>
        <td>

        </td>
      </tr>
    </tbody>
  </table>
</div>

</div>

<!-- step 8 form -->
<div class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">

<button @click="isVisibleCashAdvance = !isVisibleCashAdvance" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
  + Add Cash Advance
</button>

<div class="overflow-x-auto mt-5">
  <table class="table">
    <thead>
      <tr>
        <th v-for="data in tableHeadCashAdvance" :key="data.id">
          {{ data.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in tableBodyCashAdvance" :key="data.id">
        <td>
          {{ data.caNo }}
        </td>
        <td>
          {{ data.total }}
        </td>
        <td>
          {{ data.notes }}
        </td>
        <td>
          {{ data.status }}
        </td>
        <td>
          
        </td>
      </tr>
    </tbody>
  </table>
</div>

</div>
            </div>

            <div v-if="requestType == 'Field Break'">
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

                <!-- step 4 form Airlines -->
                <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">

                <button @click="isVisibleAirlines = !isVisibleAirlines" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
                  + Add Airlines
                </button>

                <div class="overflow-x-auto mt-5">
                  <table class="table">
                    <thead>
                      <tr>
                        <th v-for="data in tableHeadAirlinesRequestTrip" :key="data.id">
                          {{ data.title }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in tableBodyAirlinesRequestTrip" :key="data.id">
                        <td>
                          {{ data.name }}
                        </td>
                        <td>
                          {{ data.departure }}
                        </td>
                        <td>
                          {{ data.arrival }}
                        </td>
                        <td>
                          {{ data.flightNumber }}
                        </td>
                        <td>
                          {{ data.flightRegion }}
                        </td>
                        <td>
                          {{ data.status }}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                </div>

                <!-- step 6 form Other Transportation -->
                <div class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

<button @click="isVisibleOtherTransportation = !isVisibleOtherTransportation" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
  + Add Other Transportation
</button>

<div class="overflow-x-auto mt-5">
  <table class="table">
    <thead>
      <tr>
        <th v-for="data in tableHeadOtherTransportation" :key="data.id">
          {{ data.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in tableBodyOtherTransportation" :key="data.id">
        <td>
          {{ data.name }}
        </td>
        <td>
          {{ data.type }}
        </td>
        <td>
          {{ data.fromDate }}
        </td>
        <td>
          {{ data.toDate }}
        </td>
        <td>
          {{ data.quantity }}
        </td>
        <td>
          {{ data.city }}
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

            <div v-if="requestType == 'Taxi Voucher Only'">

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

              <button v-if="formStep < stepCounter" @click="formStep++" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
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

    <!-- Modal step 4 form modal Add Airlines -->
    <Modal type="clean" v-model:visible="isVisibleAirlines" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleAirlines = false" :title="'Airlines'" />

    <!-- pb-28 -->
    <div class="px-3 text-left modal-box-inner pb-4">

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Traveller<span class="text-red-star">*</span>
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
                >Departure<span class="text-red-star">*</span></label
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
                  Departure Date<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass">
                <option selected hidden disabled>
                  Date
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

      <div class="flex justify-between mx-4 items-start gap-2 my-6">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Flight Class<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass">
                <option selected hidden disabled>
                  Class
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Vendor<span class="text-red-star">*</span></label
            >
            <div>
              <input class="w-6 h-6" type="radio" name="vendor">
              <label class="ml-4">Antavaya</label>
            </div>
            <div>
              <input class="w-6 h-6" type="radio" name="vendor">
              <label class="ml-4">Aerowisata</label>
            </div>
          </div>
        </div>

      </div>

      <checkButton />

      <h1 class="mt-4 text-center text-sm font-bold">Flight Schedule</h1>
      <hr class="w-full border border-black">

      <div class="overflow-x-auto block">
        <table class="table">
          <thead>
            <tr>
              <th v-for="data in tableHeadAirlines" :key="data.id">
                {{ data.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in airlinesDummy" :key="data.id">
              <td>
                <img :src="data.Airline">
              </td>
              <td>
                {{ data.flightNo }}
              </td>
              <td>
                {{ data.Depart }}
              </td>
              <td>
                {{ data.Arrival }}
              </td>
              <td>
                {{ data.Stops }}
                {{ data.StopsMethod}}
              </td>
              <td>
                {{ data.Class }}
              </td>
              <td>
                {{ data.Price }}
              </td>
              <td>
                <button class="bg-green text-white rounded-lg px-4 py-3 font-bold">
                  Select
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>

    <confirmationButton @cancel-click="isVisibleAirlines = false" />

    </Modal>

    <!-- Modal step 5 form modal Add Taxi Voucher -->
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
                <span>Account Name</span>
            </label>
            <input type="text" :class='inputStylingClass' placeholder="Account Name">
        </div>
      </div>

      </div>

    </div>

    <confirmationButton @cancel-click="isVisibleTaxiVoucher = false" />

    </Modal>

    <!-- Modal step 6 form modal Add Other Transportation -->
    <Modal type="clean" v-model:visible="isVisibleOtherTransportation" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <modalHeader @close-click="isVisibleOtherTransportation = false" :title="'Other Transportation'" />

    <!-- pb-28 -->
    <div class="px-3 text-left modal-box-inner pb-4">

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
              <label :class="labelStylingClass">
                  Traveller<span class="text-red-star">*</span>
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
                >City<span class="text-red-star">*</span></label
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
                  Type of Transportation<span class="text-red-star">*</span>
              </label>
              <select :class="inputStylingClass">
                <option selected hidden disabled>
                  City
                </option>
                <option>
                  RWA HO Office Car
                </option>
                <option>
                  Rent Car
                </option>
                <option>
                  TIA Site Car
                </option>
                <option>
                  CK MIFA Site Car
                </option>
                <option>
                  TIA HO Car
                </option>
                <option>
                  SSB Pool Car
                </option>
              </select>
          </div>
        </div>

        <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Quantity<span class="text-red-star">*</span></label
            >
            <input type="text" placeholder="Quantity" :class=inputStylingClass>
          </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
  <div class="w-full">
      <label :class="labelStylingClass">
          From Date<span class="text-red-star">*</span>
      </label>
      <select :class="inputStylingClass">
        <option selected hidden disabled>
          Date
        </option>
      </select>
  </div>
        </div>

        <div :class="columnClass">
    <div class="w-full">
      <label
          class="block mb-2 font-JakartaSans font-medium text-sm"
          >Remarks<span class="text-red-star">*</span></label
      >
      <input type="text" placeholder="Remarks" :class=inputStylingClass>
    </div>
        </div>

      </div>

      <div :class="rowClass">

        <div :class="columnClass">
          <div class="w-full">
            <label :class="labelStylingClass">
              To Date<span class="text-red-star">*</span>
            </label>
            <select :class="inputStylingClass">
            <option selected hidden disabled>
              Date
            </option>
            </select>
          </div>
        </div>

      </div>

    </div>

    <confirmationButton @cancel-click="isVisibleOtherTransportation = false" />

    </Modal>

    <!-- Modal step 7 form modal Add Accomodation -->
    <Modal type="clean" v-model:visible="isVisibleAccomodation" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

      <modalHeader @close-click="isVisibleAccomodation = false" :title="'Accomodation'" />

      <div class="px-3 text-left modal-box-inner pb-4">

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
                <label :class="labelStylingClass">
                    Traveller<span class="text-red-star">*</span>
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
                  >Gender</label
              >
              <input type="text" placeholder="Gender" :class="inputStylingClass">
            </div>
          </div>

        </div>

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label
                  class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Hotel Fare</label
              >
              <input type="text" placeholder="Max Fare" :class="inputStylingClass">
            </div>
          </div>

        </div>

        <h1 class="mt-2 font-bold text-center">Requested Accomodation</h1>
        <hr class="border border-black">

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">City</label>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  City
                </option>
              </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">Remarks</label>
              <input :class="inputStylingClass" placeholder="Remarks">
            </div>
          </div>

        </div>

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">
                Check In
              </label>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  Date
                </option>
              </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="w-full ">
              <div class="flex gap-2 items-center ml-2 mb-2">
                <input type="checkbox" class="w-5 h-5 rounded-2xl">
                <label>Sharing with</label>
              </div>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  Name
                </option>
              </select>
            </div>
          </div>
        </div>

        <div :class="rowClass">

          <div :class="columnClass">
            <div class="w-full">
              <label :class="labelStylingClass">
                Check Out
              </label>
              <select :class="inputStylingClass">
                <option hidden selected disabled>
                  Date
                </option>
              </select>
            </div>
          </div>

          <div :class="columnClass">
            <div class="flex flex-col gap-2">
              <span :class="labelStylingClass">Create GL?</span>
              <div>
                <input type="checkbox" class="w-5 h-5 rounded-2xl ml-2 mb-2">
                <label class="ml-2">Yes</label>
              </div>
            </div>
          </div>

        </div>

        <div class="flex justify-between mx-4 items-start gap-2 my-6">

          <div :class="columnClass">
            <label :class="labelStylingClass">
              Accomodation Type
            </label>
            <select :class="inputStylingClass">
              <option selected hidden disabled>
                Type
              </option>
            </select>
          </div>

          <div :class="columnClass">
          <div class="w-full">
            <label
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Vendor<span class="text-red-star">*</span></label
            >
            <div class="pb-3 flex items-center">
              <input class="w-6 h-6" type="radio" name="vendor">
              <label class="ml-4">Antavaya</label>
            </div>
            <div class="flex items-center">
              <input class="w-6 h-6" type="radio" name="vendor">
              <label class="ml-4">Aerowisata</label>
            </div>
          </div>
          </div>

        </div>

        <checkButton />

        <h1 class="mt-2 font-bold text-center">Accomodation Availability</h1>
        <hr class="border border-black">

        <div class="overflow-x-auto block">
          <table class="table">
            <thead>
              <tr>
                <th v-for="data in tableHeadAccomodation" :key=data.id>
                  {{ data.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in accomodationDummy" :key=data.id>
                <td>
                  {{ data.HotelName }}
                </td>
                <td>
                  {{ data.Location }}
                </td>
                <td>
                  {{ data.HotelRating }}
                </td>
                <td>
                  {{ data.RoomType }}
                </td>
                <td>
                  {{ data.Price }}
                </td>
                <td>
                  <button class="bg-green text-white rounded-lg px-4 py-3 font-bold">
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <confirmationButton @cancel-click="isVisibleAccomodation = false" />

    </Modal>

    <!-- Modal step 8 form modal Add Cash Advance -->
    <Modal type="clean" v-model:visible="isVisibleCashAdvance" v-model:title="type" v-model:offsetTop="modalPaddingHeight">

      <modalHeader @close-click="isVisibleCashAdvance = false" :title="'Cash Advance'" />

      <div class="px-3 text-left modal-box-inner pb-4">
          
          <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Traveller <span class="text-red-star">*</span>
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
                <label :class=labelStylingClass>
                  Nominal <span class="text-red-star">*</span>
                </label>
                <input type="text" placeholder="Nominal" :class="inputStylingClass">
              </div>
            </div>

          </div>

          <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Item <span class="text-red-star">*</span>
                </label>
                <select :class="inputStylingClass">
                  <option selected hidden disabled>
                    Item
                  </option>
                </select>
              </div>
            </div>

            <div :class="columnClass">
              <div class="w-full">  
                <label :class=labelStylingClass>
                  Total
                </label>
                <input type="text" placeholder="Total" :class="inputStylingClass">
              </div>
            </div>

          </div>

          <div :class="rowClass">

            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Frequency <span class="text-red-star">*</span>
                </label>
                <input type="text" placeholder="Frequency" :class="inputStylingClass">
              </div>
            </div>

            <div :class="columnClass">
              <div class="w-full">  
                <label :class=labelStylingClass>
                  Remarks
                </label>
                <input type="text" placeholder="Remarks" :class="inputStylingClass">
              </div>
            </div>

          </div>

          <div :class="rowClass">
            <div :class="columnClass">
              <div class="w-full">
                <label :class="labelStylingClass">
                  Currency <span class="text-red-star">*</span>
                </label>
                <select :class="inputStylingClass">
                  <option>
                    Currency
                  </option>
                </select>
              </div>
            </div>
          </div>

      </div>

      <confirmationButton @cancel-click="isVisibleCashAdvance = false" />

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
