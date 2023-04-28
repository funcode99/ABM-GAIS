<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
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
          <!-- HEADER -->
          <router-link
            to="/cashadvancetravel"
            class="flex items-center gap-2 py-4 mx-4"
          >
            <img :src="arrow" class="w-3 h-3" alt="" />
            <h1 class="text-blue font-semibold font-JakartaSans">
              Cash Advance Travel<span
                class="text-[#0a0a0a] font-semibold font-JakartaSans"
              >
                / TCA-ABM/1309/12.05
              </span>
            </h1>
          </router-link>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                value="23/2/2023"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Reference</span
              >
              <input
                type="text"
                disabled
                value="TRV-ABM/1232/23.04"
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

          <!-- TAB -->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]">
            <div
              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
            >
              <div
                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
              ></div>
              <p class="font-JakartaSans font-normal text-sm mx-8">Details</p>
            </div>
          </div>

          <div class="mx-[70px]">
            <table class="mt-4 w-full">
              <thead class="font-JakartaSans font-bold text-xs">
                <tr class="bg-blue text-white h-8">
                  <th class="border border-[#B9B9B9]">Item Type</th>
                  <th class="border border-[#B9B9B9]">Frequency</th>
                  <th class="border border-[#B9B9B9]">Currency</th>
                  <th class="border border-[#B9B9B9]">Nominal</th>
                  <th class="border border-[#B9B9B9]">Total</th>
                  <th class="border border-[#B9B9B9]">Status</th>
                  <th class="border border-[#B9B9B9]">Action</th>
                </tr>
              </thead>
              <tbody class="font-JakartaSans font-normal text-xs">
                <tr class="h-16">
                  <td class="border border-[#B9B9B9]">Meal</td>
                  <td class="border border-[#B9B9B9]">2</td>
                  <td class="border border-[#B9B9B9]">Rupiah</td>
                  <td class="border border-[#B9B9B9]">120.000</td>
                  <td class="border border-[#B9B9B9]">240.000</td>
                  <td class="border border-[#B9B9B9]">Pending</td>
                  <td class="border border-[#B9B9B9]"></td>
                </tr>
                <tr class="h-16">
                  <td class="border border-[#B9B9B9]">Transport</td>
                  <td class="border border-[#B9B9B9]">2</td>
                  <td class="border border-[#B9B9B9]">Rupiah</td>
                  <td class="border border-[#B9B9B9]">150.000</td>
                  <td class="border border-[#B9B9B9]">300.000</td>
                  <td class="border border-[#B9B9B9]">Pending</td>
                  <td class="border border-[#B9B9B9]"></td>
                </tr>
              </tbody>
            </table>
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