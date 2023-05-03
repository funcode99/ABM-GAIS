<script setup>
import { ref } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg"

import arrow from '@/assets/arrow-multi-step-form.png'

import Airline1 from '@/assets/airlines-1.png'
import Airline2 from '@/assets/airlines-2.png'

import { Modal } from 'usemodal-vue3'
let isVisible = ref(false)
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

</script>

<template>

    <!-- Modal step 3 form -->
    <Modal type="clean" v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

      <!-- sticky top-0 -->
      <nav class="z-50 bg-white py-4 px-2 flex justify-between scale">
          <p class="font-JakartaSans text-2xl font-semibold">Edit User</p>
          <button @click="isVisible = false" class="cursor-pointer">
              <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </button>
      </nav>

      <!-- pb-28 -->
      <div class="px-3 text-left modal-box-inner">

      <div class="mb-6">
      <span>Employee?<span class="text-red-star">*</span></span>
      <div class="flex gap-2 pt-2">
          <div class="flex gap-1">
          <!-- fill the same name value for individual select -->
          <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]">
          <label for="">Yes</label>
          </div>
          <div class="flex gap-1">
          <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]">
          <label for="">No</label>
          </div>
      </div>
      </div>

      <div class="mb-6">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
                  Username<span class="text-red">*</span>
          </label>
          <input
              type="text"
              placeholder="Username"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
          />
      </div>

      <div class="mb-6">
      <label
          class="block mb-2 font-JakartaSans font-medium text-sm"
          >Passwords<span class="text-red">*</span></label
      >
      <input
          type="password"
          placeholder="Passwords"
          class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
          required
      />
      </div>

      <div class="mb-6 flex flex-col text-left justify-start">
      <span
          for="company"
          class="block mb-2 font-JakartaSans font-medium text-sm"
          id="company"
          >User Role<span class="text-red">*</span></span
      >
      <select class="select select-accent w-full" required>
          <option disabled selected hidden>Role</option>
          <option>Administrator</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Receptionist</option>
          <option>Employee</option>
          <option>Driver</option>
      </select>
      </div>

      <div class="mb-6">
              <label
                  for="name"
                  class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                  >Approval Authorities<span class="text-red">*</span></label
              >
              <div class="flex justify-between">
                  <div class="flex items-center gap-2">
                      <input type="checkbox" name="PM" id="">
                      <label for="">PM</label>
                  </div>
                  <div class="flex items-center gap-2">
                      <input type="checkbox" name="GA" id="">
                      <label for="">GA</label>
                  </div>
                  <div class="flex items-center gap-2">
                      <input type="checkbox" name="HR" id="">
                      <label for="">HR</label>
                  </div>
                  <div class="flex items-center gap-2">                
                      <input type="checkbox" name="Finance / Accounting" id="">
                      <label class="" for="">Finance / Accounting</label>
                  </div>
              </div>
      </div>

      <div class="mb-6">
      <label
          class="block mb-2 font-JakartaSans font-medium text-sm"
          >Email<span class="text-red">*</span></label
      >
      <input
          type="text"
          placeholder="Email"
          class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
          required
      />
      </div>

      </div>

      <!-- fixed bottom-0 left-6 right-6 -->
      <nav class="bg-white py-4 px-2 z-50 fixed left-0 right-0 bottom-3 scale">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
              <button
                  @click="isVisible = false"
                  class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</button
              >
              <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
              >
              Save
              </button>
          </div>
      </nav>

    </Modal>

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
        <label for="company-business-trip-request-modal" class="cursor-pointer absolute right-4">
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white">New Request Trip</p>
      </nav>

      <!-- step circle -->
      <div class="flex justify-center pt-3 gap-x-[19px] modal-inner">

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

      <!-- modal body -->
      <!-- mt-[30px] -->
      <div class="modal-box-inner mt-[30px]">

          <!-- step 1 form -->
          <div class="text-left" :class="formStep == 0 ? 'block' : 'hidden'">

          <div class="flex justify-between mx-4 items-center gap-2 my-6">

            <div class="flex flex-col items-center flex-1">

              <div class="w-full">
                <span>Requestor <span class="text-[#f5333f]">*</span></span>
                <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer">
                  <option hidden selected disabled value="">
                    Name
                  </option>
                </select>
              </div>

            </div>

            <div class="flex flex-col items-center flex-1">

              <div>
                <span class="block">Location <span class="text-[#f5333f]">*</span></span>
                <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer" placeholder="Location">
              </div>

            </div>

          </div>

          <div class="flex justify-between mx-4 items-center gap-2">

            <div class="flex flex-col items-center">
              <div>
                <span class="block">SN <span class="text-[#f5333f]">*</span></span>
                <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer" placeholder="SN">
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div>
                <span class="block">Telephone <span class="text-[#f5333f]">*</span></span>
                <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer" placeholder="Telephone">
              </div>
            </div>

          </div>

          </div>

          <!-- step 2 form -->
          <div class="text-left px-4 pb-[60px] flex flex-col gap-6" :class="formStep == 1 ? 'block' : 'hidden'">

            <div class="flex flex-col mx-4">
              <span>Purpose of Trip <span class="text-[#f5333f]">*</span></span>
              <select class="w-full border border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer rounded-lg mt-2 px-4 py-3">
                <option hidden selected disabled value="">
                  Company Business
                </option>
              </select>
            </div>

            <div class="flex flex-col mx-4">
              <span>Notes to Purpose of Trip <span class="text-[#f5333f]">*</span></span>
              <input type="text" class="border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2 px-4 py-3" placeholder="Notes">
            </div>

            <h1 class="mx-4">Itinerary</h1>
            
            <div class="flex justify-between mx-4 items-center gap-2">

              <!-- From -->
              <div class="flex flex-col w-full">
                <span>From<span class="text-red-star">*</span></span>
                <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="From">
                  <option hidden disabled selected>
                    City
                  </option>
                </select>
              </div>

              <!-- Zona -->
              <div class="flex flex-col w-full">
                <span>TLK/Day<span class="text-red-star">*</span></span>
                <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="Zona">
              </div>

            </div>

            <div class="flex justify-between mx-4 items-center gap-2">

              <!-- To -->
              <div class="flex flex-col w-full">
                <span>To<span class="text-red-star">*</span></span>
                <select class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="City">
                  <option hidden disabled selected>
                    City
                  </option>
                </select>
              </div>
              
              <!-- TLK/Day -->
              <div class="flex flex-col w-full">
                <span>TLK/Day<span class="text-red-star">*</span></span>
                <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="TLK/Day">
              </div>

            </div>

            <div class="flex justify-between mx-4 items-center gap-2">
              
              <!-- Date Departure -->
              <div class="flex flex-col w-[49%]">
                <span>Date Departure<span class="text-red-star">*</span></span>
                <input type="date" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="Date">
              </div>

                <!-- Total TLK -->
                <div class="flex flex-col w-full">
                  <span class="">Total TLK<span class="text-red-star">*</span></span>
                  <input type="text" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="Total">
                </div>



            </div>

            <div class="flex justify-between mx-4 items-center gap-2">
              <!-- Return date -->
               <div class="flex flex-col w-full">
                  <span class="">Return Date<span class="text-red-star">*</span></span>
                  <input type="date" class="w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer mt-2" placeholder="Date">
              </div>
            </div>

            
          </div>

          <!-- step 3 form -->
          <div class="px-2" :class="formStep == 2 ? 'block' : 'hidden'">

            <button @click="isVisible = !isVisible" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
              + Add 
            </button>

          </div>

          <!-- step 4 form -->
          <div class="px-2" :class="formStep == 3 ? 'block' : 'hidden'">

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

        </div>

          <!-- step 5 form -->
          <form class="px-2" :class="formStep == 4 ? 'block' : 'hidden'">

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
          <form class="px-2" :class="formStep == 5 ? 'block' : 'hidden'">

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
          <form class="px-2" :class="formStep == 6 ? 'block' : 'hidden'">

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
          <form class="px-2" :class="formStep == 7 ? 'block' : 'hidden'">

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

      </div>

      <!-- change step button -->
      <div class="fixed left-0 right-0 bg-white bottom-0 px-5 py-2">
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

</style>
