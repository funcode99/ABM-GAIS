<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "@/components/layout/Sidebar.vue"
import Footer from "@/components/layout/Footer.vue"

import RequestTripModal from "@/components/request-trip/company-business/RequestTripModal.vue"
import RequestTripSiteVisit from '@/components/request-trip/site-visit/RequestTripModal.vue'
import RequestTripFieldBreak from '@/components/request-trip/field-break/RequestTripModal.vue'
import RequestTripTaxiVoucherOnly from '@/components/request-trip/taxi-voucher-only/RequestTripModal.vue'

import icon_receive from "@/assets/icon-receive.svg"
import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"
import editicon from "@/assets/navbar/edit_icon.svg"
import arrowicon from "@/assets/navbar/icon_arrow.svg"

import fieldbreakdata from "@/utils/Api/request-trip/fieldbreakdata.js"
import taxivoucherdata from "@/utils/Api/request-trip/taxivoucherdata.js"

import { ref } from "vue"
import { useSidebarStore } from "@/stores/sidebar.js"

let lengthCounter = 0
const sidebar = useSidebarStore()
let requestTripType = ref("Company Business")

//for check & uncheck all
const selectAll = (checkValue) => {
  const checkList = checkValue;
  if (checkList == true) {
    let check = document.getElementsByName("checks");
    for (let i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") check[i].checked = true;
    }
  } else {
    let check = document.getElementsByName("checks");
    for (let i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") check[i].checked = false;
    }
  }
}

//for tableHeadFieldBreak
const tableHeadFieldBreak = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_date" },
  { Id: 3, title: "Request No", jsonData: "request_no" },
  { Id: 4, title: "Requestor", jsonData: "requestor" },
  { Id: 5, title: "Purpose of Trip", jsonData: "purpose_of_trip" },
  { Id: 6, title: "Status", jsonData: "Status" },
  { Id: 7, title: "Actions" },
]

//for tableHeadVoucherTaxi
const tableHeadVoucherTaxi = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "createdDate" },
  { Id: 3, title: "Request No", jsonData: "RequestNo" },
  { Id: 4, title: "Requestor", jsonData: "Requestor" },
  { Id: 5, title: "Purpose of Trip", jsonData: "PurposeOfTrip" },
  { Id: 6, title: "Status", jsonData: "Status" },
  { Id: 7, title: "Actions" },
]

</script>

<template>
  <div
    class="flex flex-col basis-full grow-0 shrink-0 w-full this"
  >
    <Navbar />
    <div class="flex w-screen mt-[115px]">

      <Sidebar class="flex-none" />

      <ExpandButton />
      
      <div class="bg-[#e4e4e6] py-5 px-8 w-screen h-full clean-margin ease-in-out duration-500"
      :class="[lengthCounter < 6 ? 'backgroundHeight' : 'h-full', sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]']"
      >

        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">

          <!-- TableTopBar -->
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="flex flex-wrap gap-y-2 items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Request Trip
            </p>

            <div class="flex gap-4">

              <RequestTripModal />
              <!-- <RequestTripSiteVisit v-if="requestTripType == 'Site Visit'" />
              <RequestTripFieldBreak v-if="requestTripType == 'Field Break'" />
              <RequestTripTaxiVoucherOnly v-if="requestTripType == 'Taxi Voucher Only'" /> -->

              <button class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green">
                <img :src="icon_receive" class="w-6 h-6" />
              </button>

            </div>

          </div>

          <!-- SORT, DATE & SEARCH -->
          <div class="flex flex-wrap items-center px-4 gap-2">
            <div class="flex flex-wrap items-center gap-2">
              <!-- SORT -->
              <p
                class="capitalize font-JakartaSans text-xs text-black font-medium">
                Purpose of Trip
              </p>

              <select
                v-model="requestTripType"
                class="font-JakartaSans capitalize block bg-white w-[200px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              >
                <option>Company Business</option>
                <option>Site Visit</option>
                <option>Field Break</option>
                <option>Taxi Voucher Only</option>
              </select>

              <!-- DATE -->
              <p class="capitalize font-Fira text-xs text-black font-medium">
                Date
              </p>

              <input
                type="date"
                class="border border-slate-300 h-[40px] rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />

              <!-- FILTER -->
              <div class="flex gap-4 flex-wrap items-center">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]">
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]">
                  <span>
                    <img :src="icon_reset" class="w-5 h-5" />
                  </span>
                  Reset
                </button>
              </div>

              <!-- SEARCH -->
              <div class="py-2">
                <label class="relative block">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full xl:w-[165px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search..."
                    type="text"
                    name="search"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- SHOWING -->
          <div class="flex items-center gap-1 pt-5 pb-4 px-4 h-4">
            <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
            <select
              class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </div>      

        </div>

          <!-- TABLE Company Business -->
          <!-- TABLE Site Visit -->

          <!-- TABLE Field Break -->
          <div v-if="requestTripType === 'Field Break'">
            <div class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden">
              
              <div class="block overflow-x-auto">
                
                <table class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
                >

                  <thead
                    class="text-center font-JakartaSans text-sm font-bold h-10"
                  >
                    <tr>
                      <th>
                        <div class="flex justify-center">
                          <input
                            type="checkbox"
                            name="checked"
                            @click="selectAll((checkList = !checkList))"
                          />
                        </div>
                      </th>

                      <th
                        v-for="data in tableHeadFieldBreak"
                        :key="data.Id"
                        class="overflow-x-hidden cursor-pointer"
                        @click="sortList(`${data.jsonData}`)"
                      >
                        <span class="flex justify-center items-center gap-1">
                          {{ data.title }}
                          <button>
                            <img :src="arrowicon" class="w-[9px] h-3" />
                          </button>
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      class="font-JakartaSans font-normal text-sm"
                      v-for="data in fieldbreakdata"
                      :key="data.no"
                    >
                      <td>
                        <input type="checkbox" name="checks" />
                      </td>
                      <td>{{ data.no }}</td>
                      <td>{{ data.created_date }}</td>
                      <td>{{ data.request_no }}</td>
                      <td>{{ data.requestor }}</td>
                      <td>{{ data.purpose_of_trip }}</td>
                      <td>{{ data.status }}</td>
                      <td class="flex flex-wrap gap-4 justify-center">
                        <button>
                          <img :src="editicon" class="w-6 h-6" />
                        </button>
                        <button>
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  </tbody>

                </table>

              </div>

            </div>
          </div>

          <!-- TABLE Taxi Voucher Only -->
          <div v-if="requestTripType === 'Taxi Voucher Only'">
            <div
              class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden w-full"
            >
              <div class="block overflow-x-auto">
                <table
                  class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
                >
                  <thead
                    class="text-center font-JakartaSans text-sm font-bold h-10"
                  >
                    <tr>
                      <th>
                        <div class="flex justify-center">
                          <input
                            type="checkbox"
                            name="checked"
                            @click="selectAll((checkList = !checkList))"
                          />
                        </div>
                      </th>

                      <th
                        v-for="data in tableHeadVoucherTaxi"
                        :key="data.Id"
                        class="overflow-x-hidden cursor-pointer"
                        @click="sortList(`${data.jsonData}`)"
                      >
                        <span class="flex justify-center items-center gap-1">
                          {{ data.title }}
                          <button>
                            <img :src="arrowicon" class="w-[9px] h-3" />
                          </button>
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      class="font-JakartaSans font-normal text-sm"
                      v-for="data in taxivoucherdata"
                      :key="data.no"
                    >
                      <td>
                        <input type="checkbox" name="checks" />
                      </td>
                      <td>{{ data.no }}</td>
                      <td>{{ data.createdDate }}</td>
                      <td>{{ data.RequestNo }}</td>
                      <td>{{ data.Requestor }}</td>
                      <td>{{ data.PurposeOfTrip }}</td>
                      <td>{{ data.Status }}</td>
                      <td class="flex flex-wrap gap-4 justify-center">
                        <button>
                          <img :src="editicon" class="w-6 h-6" />
                        </button>
                        <button>
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

      </div>

      <Footer class="fixed bottom-0 left-0 right-0" />

    </div>
  </div>
</template>

<style scoped>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}

th {
  padding: 2px;
  text-align: left;
  position: relative;
}

tr td {
  text-align: center;
  white-space: nowrap;
}

tr th {
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}

.table-zebra tbody tr:hover td {
  background-color: rgb(193, 192, 192);
  cursor: pointer;
}

.backgroundHeight {
    min-height: calc(100vh - 115px);
}

.this {
    overflow-x: hidden;
  }

</style>