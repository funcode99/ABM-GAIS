<script setup>
import { ref } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg"
import iconPlus from "@/assets/navbar/icon_plus.svg"
import editicon from "@/assets/navbar/edit_icon.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"

import arrow from '@/assets/arrow-multi-step-form.png'

import Airline1 from '@/assets/airlines-1.png'
import Airline2 from '@/assets/airlines-2.png'

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
    id: 1,
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
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

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
      <!-- <form class="mb-3 mt-10 relative">
        <div class="grid grid-cols-2 gap-y-6">
          <div class="flex flex-col">
            <span>Requestor <span class="text-[#f5333f]">*</span></span>
            <select class="max-w-[50%] border-2 border-black rounded-lg mt-2 px-4 py-2">
              <option hidden selected disabled value="">
                Name
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <span>Location <span class="text-[#f5333f]">*</span></span>
            <input type="text" class="max-w-[70%] border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="Location">
          </div>
          <div class="flex flex-col">
            <span>SN <span class="text-[#f5333f]">*</span></span>
            <input type="text" class="max-w-[70%] border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="SN">
          </div>
          <div class="flex flex-col">
            <span>Telephone <span class="text-[#f5333f]">*</span></span>
            <input type="text" class="max-w-[70%] border-2 border-black rounded-lg mt-2 px-4 py-2" placeholder="Telephone">
          </div>
        </div>
      </form> -->

      <!-- step 2 form -->
      <!-- <form class="mb-3 mt-10 relative">
      
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
       
      </form> -->

      <!-- step 3 form -->
      <!-- <form class="mb-3 mt-10 relative">
      <label for="traveller-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
          + Add Guest
      </label> -->


      <!-- step 3 sub-form -->
      <!-- <input type="checkbox" id="traveller-modal" class="modal-toggle" />

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


      </div> -->

      <!-- </form> -->

      <!-- step 4 form -->
      <form class="mb-3 mt-12 relative">

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
      
                <!-- <div class="flex flex-col">
                  <span>Departure <span class="text-[#f5333f]">*</span></span>
                  <select class="border-2 border-black rounded-lg mt-2 px-4 py-2">
                    <option hidden selected disabled value="">
                      City
                    </option>
                  </select>
                </div> -->
              </div>

              <div class="flex justify-center text-white">
                <button type="button" class="py-3 px-11 bg-[#1f7793] rounded-lg font-bold">
                  Check
                </button>
              </div>
              
            </div>
            
            <h1 class="text-center mt-[10px]">Flight Schedule</h1>
            <hr class="border-2 border-black w-full">

            <table class="border w-full rounded-lg table-fixed">
              
              <!-- ajg lah, laptop pake nge blink segala lagi -->
              <!-- biang kerok nya disini ajg -->
              <thead class="flex flex-row w-full table-auto">
                <tr v-for="data in tableHeadAirlines" :key="data.id">
                  <th class="capitalize w-full" >
                    {{ data.title }}
                  </th>
                </tr>
              </thead>

              <div class="flex flex-row w-full">
              </div>

              <tbody>
                <tr v-for="data in airlinesDummy" :key="data.id">
                  <!-- lebar tabel akan mengikuti lebar gambar asli -->
                  <td>
                    <img :src=data.Airline alt="" class="w-[97px] h-[21px]">
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
                  </td>
                  <td>
                    {{ data.Class }}
                  </td>
                  <td>
                    {{ data.Price }}
                  </td>
                  <td>
                    <button class="bg-[#87c556] px-4 py-3 text-white rounded-lg font-bold">
                      SELECT
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>

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

      <!-- step 4 sub-form -->

      <div class="bg-white py-4">
        <div class="flex justify-between gap-4">
          <label
            for="traveller-modal"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</label
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

.display {
  display: flex;
}

#display {
  display: flex;
}
</style>
