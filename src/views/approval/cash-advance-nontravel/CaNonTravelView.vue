<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import ExpandButton from "@/components/layout/ExpandButton.vue";

import ModalApproveNonTravel from "@/components/approval/cash-advance-non-travel/ModalApproveNonTravel.vue";
import ModalRejectNonTravel from "@/components/approval/cash-advance-non-travel/ModalRejectNonTravel.vue";

import arrow from "@/assets/request-trip-view-arrow.png";

import { onBeforeMount } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();

let lengthCounter = 0;

onBeforeMount(() => {
  getSessionForSidebar();
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
</script>

<template>
  <div
    class="flex flex-col basis-full grow-0 shrink-0 w-full h-full overflow-y-hidden"
  >
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />
      <ExpandButton />
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
            to="/approvalcanontravel"
            class="flex items-center gap-2 py-4 mx-4"
          >
            <img :src="arrow" class="w-3 h-3" alt="" />
            <h1 class="text-black font-semibold font-JakartaSans">
              NCA-ABM/1232/23.04
            </h1>
          </router-link>

          <div class="flex flex-wrap justify-start gap-4 px-[70px]">
            <ModalApproveNonTravel />
            <ModalRejectNonTravel />
          </div>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-1 pl-[71px] gap-y-3 mb-7 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                value="23/4/2023"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created By</span
              >
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
            <div
              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
            >
              <div
                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
              ></div>
              <p class="font-JakartaSans font-normal text-sm mx-8">Details</p>
            </div>

            <div class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Event
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Date
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Cost Center
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Nominal
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Remarks
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Status
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="font-JakartaSans font-normal text-xs">
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">Jack H</td>
                    <td class="border border-[#B9B9B9]">13/04/23</td>
                    <td class="border border-[#B9B9B9]">13222</td>
                    <td class="border border-[#B9B9B9]">231000</td>
                    <td class="border border-[#B9B9B9]">Tanding</td>
                    <td class="border border-[#B9B9B9]">Panding</td>
                    <td class="border border-[#B9B9B9]"></td>
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
</style>
