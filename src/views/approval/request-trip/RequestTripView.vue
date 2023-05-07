<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import ModalAdd from "@/components/approval/request-trip//ModalAdd.vue";
import ModalReject from "@/components/approval/request-trip/ModalReject.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import expandArrow from "@/assets/ExpandArrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import iconplus from "@/assets/navbar/icon_plus.svg";

import { onBeforeMount, ref } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();

let lengthCounter = 0;

onBeforeMount(() => {
  getSessionForSidebar();
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

let tab = ref("details");
let showTraveller = ref(true);
let showAirlines = ref(true);
let showTaxiVoucher = ref(true);
let showOtherTransportation = ref(true);
let showAccomodation = ref(true);
let showCashAdvance = ref(true);
</script>

<template>
  <div
    class="flex flex-col basis-full grow-0 shrink-0 w-full h-full overflow-y-hidden"
  >
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />
      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- HEADER -->
          <router-link
            to="/approvalrequesttrip"
            class="flex items-center gap-2 py-4 mx-4"
          >
            <img :src="arrow" class="w-3 h-3" alt="" />
            <h1 class="text-blue text-2xl font-semibold font-JakartaSans">
              Request Trip
              <span class="text-black text-2xl font-semibold font-JakartaSans">
                / TRV-ABM/1232/23.04
              </span>
            </h1>
          </router-link>

          <div class="flex flex-wrap justify-start gap-4 px-[70px]">
            <ModalAdd />
            <ModalReject />
          </div>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
            <div class="flex flex-col gap-2">
              <div class="font-JakartaSans font-medium text-sm">
                Created Date<span class="text-red">*</span>
              </div>
              <input
                type="text"
                disabled
                value="13/5/2023"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <div class="font-JakartaSans font-medium text-sm">
                Purpose Of Trip<span class="text-red">*</span>
              </div>
              <input
                type="text"
                disabled
                value="Company Business"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <div class="font-JakartaSans font-medium text-sm">
                Requestor<span class="text-red">*</span>
              </div>
              <input
                type="text"
                disabled
                value="Jack H"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE-->
          <div
            class="bbg-blue capitalize font-JakartaSans font-bold text-xs rounded-lg pt-2 mx-[70px]"
          >
            <div class="bg-blue rounded-lg pt-2">
              <button
                @click="tab = 'details'"
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative"
              >
                <div
                  :class="tab == 'details' ? 'block' : 'hidden'"
                  class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
                ></div>
                Details
              </button>
              <button
                @click="tab = 'tlk'"
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative"
              >
                <div
                  :class="tab == 'tlk' ? 'block' : 'hidden'"
                  class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
                ></div>
                TLK Info
              </button>
            </div>

            <div v-if="tab == 'details'">
              <!-- Traveller -->
              <div
                class="flex items-center cursor-pointer z-50"
                @click="showTraveller = !showTraveller"
              >
                <h1 class="font-JakartaSans font-semibold text-lg">
                  Traveller
                </h1>
                <img :src="expandArrow" class="w-3 h-3" alt="" />
              </div>
              <hr class="border-2 border-black z-50" />
              <Transition name="fade">
                <table v-if="showTraveller" class="mt-4 w-full z-3">
                  <thead>
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        SN
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Gender
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Contact No
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Department
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Company
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Type
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Max Hotel Fare
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Flight Entitlement
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h-16">
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        <div class="flex flex-wrap gap-4 justify-center">
                          <button>
                            <img :src="editicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="deleteicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="iconplus" class="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Transition>

              <!-- Airlines -->
              <div
                class="flex items-center cursor-pointer z-50"
                @click="showAirlines = !showAirlines"
              >
                <h1 class="font-JakartaSans font-semibold text-lg">Airlines</h1>
                <img :src="expandArrow" class="w-3 h-3" alt="" />
              </div>
              <hr class="border-2 border-black z-50" />
              <Transition name="fade">
                <table v-if="showAirlines" class="mt-4 w-full z-3">
                  <thead>
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Departurre
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Arrival
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Flight Number
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Domestic / international
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Status
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h-16">
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        <div class="flex flex-wrap gap-4 justify-center">
                          <button>
                            <img :src="editicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="deleteicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="iconplus" class="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Transition>

              <!-- Taxi Voucher -->
              <div
                class="flex items-center cursor-pointer z-50"
                @click="showTaxiVoucher = !showTaxiVoucher"
              >
                <h1 class="font-JakartaSans font-semibold text-lg">
                  Taxi Voucher
                </h1>
                <img :src="expandArrow" class="w-3 h-3" alt="" />
              </div>
              <hr class="border-2 border-black z-50" />
              <Transition name="fade">
                <table v-if="showTaxiVoucher" class="mt-4 w-full z-3">
                  <thead>
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Date
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Departure
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Arrival
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Nominal
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Kode Voucher
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Remarks
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h-16">
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        <div class="flex flex-wrap gap-4 justify-center">
                          <button>
                            <img :src="editicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="deleteicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="iconplus" class="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Transition>

              <!-- Other Transportation -->
              <div
                class="flex items-center cursor-pointer z-50"
                @click="showOtherTransportation = !showOtherTransportation"
              >
                <h1 class="font-JakartaSans font-semibold text-lg">
                  Other Transportation
                </h1>
                <img :src="expandArrow" class="w-3 h-3" alt="" />
              </div>
              <hr class="border-2 border-black z-50" />
              <Transition name="fade">
                <table v-if="showOtherTransportation" class="mt-4 w-full z-3">
                  <thead>
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Type
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        From Date
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        To Date
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Quantity
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        City
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Status
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h-16">
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        <div class="flex flex-wrap gap-4 justify-center">
                          <button>
                            <img :src="editicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="deleteicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="iconplus" class="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Transition>

              <!-- Accomodation -->
              <div
                class="flex items-center cursor-pointer z-50"
                @click="showAccomodation = !showAccomodation"
              >
                <h1 class="font-JakartaSans font-semibold text-lg">
                  Accomodation
                </h1>
                <img :src="expandArrow" class="w-3 h-3" alt="" />
              </div>
              <hr class="border-2 border-black z-50" />
              <Transition name="fade">
                <table v-if="showAccomodation" class="mt-4 w-full z-3">
                  <thead>
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Hotel Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Check In
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Check Out
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        City
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Type
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Sharing With
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Status
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h-16">
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        <div class="flex flex-wrap gap-4 justify-center">
                          <button>
                            <img :src="editicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="deleteicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="iconplus" class="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Transition>

              <!-- Cash Advance -->
              <div
                class="flex items-center cursor-pointer z-50"
                @click="showCashAdvance = !showCashAdvance"
              >
                <h1 class="font-JakartaSans font-semibold text-lg">
                  Cash Advance
                </h1>
                <img :src="expandArrow" class="w-3 h-3" alt="" />
              </div>
              <hr class="border-2 border-black z-50" />
              <Transition name="fade">
                <table v-if="showCashAdvance" class="mt-4 w-full z-3">
                  <thead>
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Name
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Item
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Frerquency
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Currency
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Nominal
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Total
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Remarks
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Status
                      </th>
                      <th
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h-16">
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      ></td>
                      <td
                        class="border-2 border-[#8b8b8b] font-JakartaSans font-normal text-xs"
                      >
                        <div class="flex flex-wrap gap-4 justify-center">
                          <button>
                            <img :src="editicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="deleteicon" class="w-6 h-6" />
                          </button>
                          <button>
                            <img :src="iconplus" class="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Transition>
            </div>

            <div v-else-if="tab == 'tlk'">
              <h1 class="font-JakartaSans font-semibold text-lg">TLK</h1>
              <hr class="border-black border-2" />
              <div class="flex flex-col mt-3">
                <div>Requestor <span class="text-red-star">*</span></div>
                <input
                  type="text"
                  class="px-4 py-3 max-w-[80%] rounded-lg"
                  value="Jack H"
                  disabled
                />
              </div>
              <div class="flex flex-col mt-3">
                <div>Created Date <span class="text-red-star">*</span></div>
                <input
                  type="text"
                  class="px-4 py-3 max-w-[80%] rounded-lg"
                  value="13/05/2023"
                  disabled
                />
              </div>
              <div class="flex flex-col mt-3">
                <div>Purpose of Trip <span class="text-red-star">*</span></div>
                <input
                  type="text"
                  class="px-4 py-3 max-w-[80%] rounded-lg"
                  value="Company Business"
                  disabled
                />
              </div>
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
</style>
