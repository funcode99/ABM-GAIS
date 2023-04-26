<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import icon_receive from "@/assets/icon-receive.svg";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";

import CompanyBusinessRequestTripModal from "@/components/request-trip/CompanyBusinessRequestTripModal.vue";
import TableVoucherTaxiVue from "@/components/request-trip/vouchertaxi/TableVoucherTaxi.vue";
import TableFieldBreak from "@/components/request-trip/fieldbreak/TableFieldBreak.vue";

import { ref } from "vue";
let requestTripType = ref("Company Business");
</script>

<template>
  <div
    class="flex flex-col basis-full grow-0 shrink-0 w-full h-full overflow-y-hidden"
  >
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />
      <div class="bg-[#e4e4e6] flex-1 pt-5 pb-16 pl-4 pr-8 ml-[260px]">
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
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
              <CompanyBusinessRequestTripModal />

              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT, DATE & SEARCH -->
          <div class="flex flex-wrap items-center px-4 gap-2">
            <div class="flex flex-wrap items-center gap-2">
              <!-- SORT -->
              <p
                class="capitalize font-JakartaSans text-xs text-black font-medium"
              >
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
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                >
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                >
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

          <!-- table -->
          <table v-if="requestTripType === 'Taxi Voucher Only'">
            <TableVoucherTaxiVue />
          </table>

          <table v-if="requestTripType === 'Field Break'">
            <TableFieldBreak class="" />
          </table>
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
</style>
