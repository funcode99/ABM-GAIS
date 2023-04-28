<script setup>
import { ref } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg"

// masih dipakai di table
import editicon from "@/assets/navbar/edit_icon.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";

import arrow from '@/assets/arrow-multi-step-form.png'

import Airline1 from '@/assets/airlines-1.png'
import Airline2 from '@/assets/airlines-2.png'

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

</script>

<template>

  <label
    for="company-business-trip-request-modal"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
    + Add New
  </label>

  <input type="checkbox" id="company-business-trip-request-modal" class="modal-toggle" />

  <div class="modal font-JakartaSans">
    
    <div class="modal-box h-[476px]">
      
      <nav class="bg-white py-4">
        <label for="company-business-trip-request-modal" class="cursor-pointer absolute right-0">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold">New Request Trip</p>
        <div className="divider m-0"></div>
      </nav>

      <!-- step circle -->
      <div class="step-circle-indicator flex justify-center gap-x-[19px]">

        <!-- step 1 circle -->
        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Requester Info</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Purpose of Trip</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Travellers</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <!-- lebar div harus sama kaya text biar lingkarannya gak gepeng -->
        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Airlines</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Taxi Voucher</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 font-medium text-[10px]">Other Transportation</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 font-medium text-[10px]">Accomodation</h1>
          <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt="">
        </div>

        <div class="rounded-full border border-black w-11 h-11 bg-[#d9d9d9] flex flex-col items-center text-center relative">
          <h1 class="mt-11 w-11 font-medium text-[10px]">Cash Advance</h1>
          <!-- <img :src=arrow class="absolute top-[14px] bottom-0 right-[-19px] h-5 w-5" alt=""> -->
        </div>

      </div>

      <!-- step 1 form -->
      <form class="mb-3 mt-10 relative text-left" :class="formStep == 0 ? 'block' : 'hidden'">
        
        <div class="grid grid-cols-2 gap-x-4 sm:gap-x-0 gap-y-6 self-center justify-self-center">
       
          <div class="flex flex-col items-center">
            <div class="sm:w-[65%]">
              <span>Requestor <span class="text-[#f5333f]">*</span></span>
              <select class="w-[100%] border-2 border-black rounded-lg mt-2 px-4 py-2">
                <option hidden selected disabled value="">
                  Name
                </option>
              </select>
            </div>
          </div>
       
     
          <div class="flex flex-col items-center">
            <div>
              <span class="block">Location <span class="text-[#f5333f]">*</span></span>
              <input type="text" class="w-full border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="Location">
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div>
              <span class="block">SN <span class="text-[#f5333f]">*</span></span>
              <input type="text" class="w-full border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="SN">
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div>
              <span class="block">Telephone <span class="text-[#f5333f]">*</span></span>
              <input type="text" class="w-full border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="Telephone">
            </div>
          </div>

        </div>

      </form>

      <!-- step 2 form -->
      <form class="mb-3 mt-10 relative text-left" :class="formStep == 1 ? 'block' : 'hidden'">
      
          <div class="flex flex-col">
            <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
            <select class="max-w-[40%] border-2 border-black rounded-lg mt-2 px-4 py-2">
              <option hidden selected disabled value="">
                Company Business
              </option>
            </select>
          </div>

          <div class="flex flex-col mt-6">
            <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
            <input type="text" class="max-w-[100%] border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="Notes">
          </div>
       
      </form>

      <!-- step 3 form -->
      <form class="mb-3 mt-10 relative" :class="formStep == 2 ? 'block' : 'hidden'">
      
        <label for="traveller-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
            + Add Guest
        </label>

        <input type="checkbox" id="traveller-modal" class="modal-toggle" />

        <div class="modal">

            <div class="modal-box h-[476px]">

              <nav for="traveller-modal" class=" top-0 py-4">
                <label for="traveller-modal" class="cursor-pointer absolute right-0">
                  <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
                </label>
                <p class="font-JakartaSans text-2xl font-semibold">Traveller as Guest</p>
              </nav>

              <div class="grid grid-cols-2 gap-y-6">
                <div class="flex flex-col max-w-[50%]">
                  <span>Type of Traveller <span class="text-[#f5333f]">*</span></span>
                  <select class="border border-black mt-2 px-4 py-2 rounded-lg">
                    <option selected disabled hidden value="">
                      Type
                    </option>
                  </select>
                </div>
                <div class="flex flex-col max-w-[70%]">
                  <span>Department <span class="text-[#f5333f]">*</span></span>
                  <input type="text" placeholder="Department" class="border border-black mt-2 px-4 py-2 rounded-lg">
                </div>
                <div class="flex flex-col max-w-[50%]">
                  <span>Name <span class="text-[#f5333f]">*</span></span>
                  <select class="border border-black mt-2 px-4 py-2 rounded-lg">
                    <option selected disabled hidden value="">
                      Name
                    </option>
                  </select>
                </div>
                <div class="flex flex-col max-w-[50%]">
                  <span>Company <span class="text-[#f5333f]">*</span></span>
                  <select class="border border-black mt-2 px-4 py-2 rounded-lg">
                    <option selected disabled hidden value="">
                      Company
                    </option>
                  </select>
                </div>
                <div class="flex flex-col max-w-[50%]">
                  <span>Gender <span class="text-[#f5333f]">*</span></span>
                  <select class="border border-black mt-2 px-4 py-2 rounded-lg">
                    <option selected disabled hidden value="">
                      Male
                    </option>
                  </select>
                </div>
                <div class="flex flex-col max-w-[50%]">
                  <span>Hotel Fare <span class="text-[#f5333f]">*</span></span>
                  <select class="border border-black mt-2 px-4 py-2 rounded-lg">
                    <option selected disabled hidden value="">
                      Fare
                    </option>
                  </select>
                </div>
                <div class="flex flex-col max-w-[70%]">
                  <span>SN <span class="text-[#f5333f]">*</span></span>
                  <input type="text" placeholder="SN" class="border border-black mt-2 px-4 py-2 rounded-lg">
                </div>
                <div class="flex flex-col max-w-[50%]">
                  <span>Flight Entitlement <span class="text-[#f5333f]">*</span></span>
                  <select class="border border-black mt-2 px-4 py-2 rounded-lg">
                    <option selected disabled hidden value="">
                      Flight Entitlement
                    </option>
                  </select>
                </div>
                <div class="flex flex-col max-w-[70%]">
                  <span>Contact No <span class="text-[#f5333f]">*</span></span>
                  <input type="text" placeholder="Contact No" class="border border-black mt-2 px-4 py-2 rounded-lg">
                </div>
                <div class="flex flex-col max-w-[70%]">
                  <span>Notes <span class="text-[#f5333f]">*</span></span>
                  <input type="text" placeholder="Notes" class="border border-black mt-2 px-4 py-2 rounded-lg">
                </div>
              </div>

              <div class="bg-white py-4 max-w-[100%]">
                <div class="flex justify-end gap-4">
                  <label
                    for="traveller-modal"
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                    >
                    Cancel
                  </label
                  >
                  <button
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>


        </div>

      </form>

      <!-- step 4 form -->
      <form class="mb-3 mt-12 relative" :class="formStep == 3 ? 'block' : 'hidden'">

        <label for="airlines-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add Airlines
        </label>

        <input type="checkbox" id="airlines-modal" class="modal-toggle" />

        <div class="modal p-8">

          <div class="modal-box h-[476px]">

            <nav for="airlines-modal" class=" top-0 py-4">
              <label for="airlines-modal" class="cursor-pointer absolute right-4">
                <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
              </label>
              <p class="font-JakartaSans text-2xl font-semibold">Airlines</p>
            </nav>


            <div class="flex flex-col gap-y-6">
    
              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Traveller <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>
      
                <div class="flex flex-col max-w-[80%]">
                  <span>Departure <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      City
                    </option>
                  </select>
                </div>
              </div>
    
              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Departure Date <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>
      
                <div class="flex flex-col max-w-[80%]">
                  <span>Arrival <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      City
                    </option>
                  </select>
                </div>
              </div>
    
              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Flight Class <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>
    
              </div>

              <div class="flex justify-center text-white">
                <button type="button" class="py-3 px-11 bg-[#1f7793] rounded-lg font-bold">
                  Check
                </button>
              </div>
              
            </div>
            
            <h1 class="text-center mt-[10px]">Flight Schedule</h1>
            <hr class="border-2 border-black w-full">

            <div class="bg-white py-4 max-w-[100%]">
              <div class="flex justify-end gap-4">
                <label
                  for="airlines-modal"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  >
                  Cancel
                </label
                >
                <button
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Next
                </button>
              </div>
            </div>

          </div>


        </div>

      </form>

      <!-- step 5 form -->
      <form class="mb-3 mt-12 relative" :class="formStep == 4 ? 'block' : 'hidden'">

        <label for="taxi-voucher-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add Taxi Voucher
        </label>

        <input type="checkbox" id="taxi-voucher-modal" class="modal-toggle" />

        <div class="modal p-8">

          <div class="modal-box h-[476px]">

            <nav for="taxi-voucher-modal" class=" top-0 py-4">
              <label for="taxi-voucher-modal" class="cursor-pointer absolute right-4">
                <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
              </label>
              <p class="font-JakartaSans text-2xl font-semibold">Taxi Voucher</p>
            </nav>


            <div class="flex flex-col gap-y-6">
    
              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Name <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>
      
                <div class="flex flex-col max-w-[80%]">
                  <span>Departure <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      City
                    </option>
                  </select>
                </div>
              </div>
    
              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Date <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Date
                    </option>
                  </select>
                </div>
      
                <div class="flex flex-col max-w-[80%]">
                  <span>Arrival <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      City
                    </option>
                  </select>
                </div>
              </div>
    
              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Amount <span class="text-[#f5333f]">*</span></span>
                  <input type="text" placeholder="Notes" class="border-[#e0e0e0] border px-4 py-3 rounded-lg">
                </div>

                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Remarks</span>
                  <input type="text" placeholder="Remarks" class="border-[#e0e0e0] border px-4 py-3 rounded-lg">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Voucher</span>
                  <input type="text" placeholder="Voucher" class="border-[#e0e0e0] border px-4 py-3 rounded-lg">
                </div>
              </div>


              
            </div>
            
            <h1 class="text-center mt-[10px]">Flight Schedule</h1>
            <hr class="border-2 border-black w-full">

            <div class="bg-white py-4 max-w-[100%]">
              <div class="flex justify-end gap-4">
                <label
                  for="taxi-voucher-modal"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  >
                  Cancel
                </label
                >
                <button
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Save
                </button>
              </div>
            </div>

          </div>


        </div>

      </form>

      <!-- step 6 form -->
      <form class="mb-3 mt-12 relative" :class="formStep == 5 ? 'block' : 'hidden'">

        <label for="other-transportation-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add Other Transportation
        </label>

        <input type="checkbox" id="other-transportation-modal" class="modal-toggle" />

        <div class="modal p-8">
          <div class="modal-box h-[476px]">

            <nav for="other-transportation-modal" class=" top-0 py-4">
              <label for="other-transportation-modal" class="cursor-pointer absolute right-4">
                <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
              </label>
              <p class="font-JakartaSans text-2xl font-semibold">Other Transportation</p>
            </nav>

            <div class="flex flex-col gap-y-6">

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Traveller <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>

                <div class="flex flex-col max-w-[80%]">
                  <span>City <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      City
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Type of transportation <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Type
                    </option>
                  </select>
                </div>


                <div class="flex flex-col max-w-[80%]">
                  <span>Quantity <span class="text-[#f5333f]">*</span></span>
                  <input type="text" placeholder="Quantity" class="border-[#e0e0e0] border px-4 py-3 rounded-lg">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>From Date <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Date
                    </option>
                  </select>
                </div>

                <div class="flex flex-col max-w-[80%]">
                  <span>Remarks</span>
                  <input type="text" placeholder="Remarks" class="border-[#e0e0e0] border px-4 py-3 rounded-lg">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>To Date <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Date
                    </option>
                  </select>
                </div>
              </div>
              
            </div>

            <div class="bg-white py-4 max-w-[100%]">
              <div class="flex justify-end gap-4">
                <label
                  for="other-transportation-modal"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  >
                  Cancel
                </label
                >
                <button
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>

      </form>

      <!-- step 7 form -->
      <form class="mb-3 mt-12 relative" :class="formStep == 6 ? 'block' : 'hidden'">

        <label for="accomodation-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add Accomodation
        </label>

        <input type="checkbox" id="accomodation-modal" class="modal-toggle" />

        <div class="modal p-8">
          <div class="modal-box h-[476px]">

            <nav for="accomodation-modal" class=" top-0 py-4">
              <label for="accomodation-modal" class="cursor-pointer absolute right-4">
                <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
              </label>
              <p class="font-JakartaSans text-2xl font-semibold">Accomodation</p>
            </nav>

            <div class="flex flex-col gap-y-6">

              <div class="grid grid-cols-2 gap-2 items-center">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Traveller</span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>

                <div class="flex flex-col max-w-[80%]">
                  <span>Gender</span>
                  <input type="text" placeholder="Gender" class="border-2 border-[#e0e0e0] rounded-lg mt-2 px-4 py-2">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 items-center">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Hotel Fare</span>
                  <input type="text" placeholder="Fare" class="border-2 border-[#e0e0e0] rounded-lg mt-2 px-4 py-2">
                </div>
              </div>

              <div>
                <h1 class="text-center mt-[10px] font-bold text-sm">Requested Accomodation</h1>
                <hr class="border-2 border-black w-full">
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Check In</span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Date
                    </option>
                  </select>
                </div>


                <div class="flex flex-col max-w-[80%]">
                  <span>Remarks</span>
                  <input type="text" placeholder="Remarks" class="border-[#e0e0e0] border px-4 py-3 rounded-lg">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Check Out</span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Date
                    </option>
                  </select>
                </div>

                <div class="flex flex-col max-w-[80%]">
                  <div class="flex gap-2">
                    <input type="checkbox">
                    <span>Sharing with</span>
                  </div>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Name
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 items-center">
                <div class="pl-[10%] flex flex-col max-w-[80%]">
                  <span>Accomodation Type</span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      Type
                    </option>
                  </select>
                </div>

                <div class="flex flex-col gap-2">
                  <Label>Create GL?</Label>
                  <div class="flex gap-2">
                    <input type="checkbox">
                    <h1>Yes</h1>
                  </div>
                </div>
              </div>

              <div>
                <h1 class="text-center mt-[10px] font-bold text-sm">Accomodation Availability</h1>
                <hr class="border-2 border-black w-full">
              </div>
              
            </div>

            <div class="bg-white py-4 max-w-[100%]">
              <div class="flex justify-end gap-4">
                <label
                  for="accomodation-modal"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  >
                  Cancel
                </label
                >
                <button
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>

      </form>

      <!-- step 8 form -->
      <form class="mb-3 mt-12 relative" :class="formStep == 7 ? 'block' : 'hidden'">

      <label for="cash-advance-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add
      </label>

      <input type="checkbox" id="cash-advance-modal" class="modal-toggle" />

      <div class="modal p-8">
        <div class="modal-box h-[476px]">

          <nav for="cash-advance-modal" class=" top-0 py-4">
            <label for="cash-advance-modal" class="cursor-pointer absolute right-4">
              <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">Cash Advance</p>
          </nav>

          <div class="flex flex-col gap-y-6">

            <div class="grid grid-cols-2 gap-2 items-center">
              <div class="pl-[10%] flex flex-col max-w-[80%]">
                <span>Traveller <span class="text-[#f5333f]">*</span></span>
                <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                  <option hidden selected disabled value="">
                    Name
                  </option>
                </select>
              </div>

              <div class="flex flex-col max-w-[80%]">
                <span>Nominal <span class="text-[#f5333f]">*</span></span>
                <input type="text" placeholder="Nominal" class="border-2 border-[#e0e0e0] rounded-lg mt-2 px-4 py-2">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 items-center">
              <div class="pl-[10%] flex flex-col max-w-[80%]">
                <span>Item <span class="text-[#f5333f]">*</span></span>
                <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                  <option hidden selected disabled value="">
                    Item
                  </option>
                </select>
              </div>

              <div class="flex flex-col max-w-[80%]">
                <span>Total</span>
                <input type="text" placeholder="Total" class="border-2 border-[#e0e0e0] rounded-lg mt-2 px-4 py-2">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 items-center">
              <div class="pl-[10%] flex flex-col max-w-[80%]">
                <span>Frequency <span class="text-[#f5333f]">*</span></span>
                <input type="text" placeholder="Frequency" class="border-2 border-[#e0e0e0] rounded-lg mt-2 px-4 py-2">
              </div>

              <div class="flex flex-col max-w-[80%]">
                <span>Remarks</span>
                <input type="text" placeholder="Remarks" class="border-2 border-[#e0e0e0] rounded-lg mt-2 px-4 py-2">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 items-center">
              <div class="pl-[10%] flex flex-col max-w-[80%]">
                <span>Currency <span class="text-[#f5333f]">*</span></span>
                <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                  <option hidden selected disabled value="">
                    Currency
                  </option>
                </select>
              </div>
            </div>
            
          </div>

          <div class="bg-white py-4 max-w-[100%]">
            <div class="flex justify-end gap-4">
              <label
                for="cash-advance-modal"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >
                Cancel
              </label
              >
              <button
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              >
                Save
              </button>
            </div>
          </div>

        </div>
      </div>

      </form>

      <div class="fixed bottom-8 left-8 right-8">
        <div class="flex justify-between font-bold">

          <button v-if="formStep > 0" @click="formStep--" class="border border-blue text-blue py-3 px-11 rounded-lg max-w-[141px]">
            Cancel
          </button>
          <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
            Cancel
          </button>

          <button v-if="formStep < 7" @click="formStep++" class="bg-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
            Next
          </button>

          <button v-else disabled class="bg-zinc-300 border border-blue text-white py-3 px-11 rounded-lg max-w-[141px]">
            Next
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
  /* max-width: 32rem 512px; */
  max-width: 700px;
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

</style>
