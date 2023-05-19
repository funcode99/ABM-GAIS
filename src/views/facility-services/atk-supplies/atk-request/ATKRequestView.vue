<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";

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

const buttonStyling = 'p-4 border border-[#8c8c8c] rounded-lg rounded-bl-3xl w-[114px] h-[42px] flex items-center justify-center text-sm'

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
          <div class="flex justify-between">
            <router-link
              to="/stockinatk"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h1 class="text-blue font-semibold font-JakartaSans text-2xl">
                ATK Request<span
                  class="text-[#0a0a0a] font-semibold font-JakartaSans text-2xl"
                >
                  Request No. 1232312
                </span>
              </h1>
            </router-link>
            <div class="flex justify-start gap-4 mx-4 py-4">
              <button
                :class="buttonStyling"
              >
                Draft
              </button>
              <button
              :class="buttonStyling"
              >
                Booked
              </button>
              <button
                :class="buttonStyling"
              >
                Done
              </button>
              <button
              :class="buttonStyling"
              >
                Cancelled
              </button>
            </div>
          </div>

          <div class="flex justify-between ml-10">
            <div class="flex gap-2">
              <button
                class="btn btn-sm text-black text-base font-JakartaSans font-bold capitalize w-[100px] border-black bg-[#fdfdfd] hover:bg-blue hover:text-white hover:border-blue"
              >
                Edit
              </button>
              <button
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              >
                Submit
              </button>
            </div>
          </div>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                value=""
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Site</span
              >
              <input
                type="text"
                disabled
                value=""
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
                value=""
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Warehouse</span
              >
              <input
                type="text"
                disabled
                value=""
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE-->
          <div class="pt-2 mx-[70px]">

            <div
              class="bg-[#8b8b8b] py-3 px-4 rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
            >
              <p class="font-JakartaSans font-normal text-sm mx-8 text-white">Details</p>
            </div>

            <div class="overflow-x-auto">
              <table class="table table-compact w-full text-center">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      ID Item
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Nama Item
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                     Brand
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                    Quantity
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      UOM
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Remarks
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
                    <td class="border border-[#B9B9B9]"></td>
                    <td class="border border-[#B9B9B9]"></td>
                    <td class="border border-[#B9B9B9]"></td>
                    <td class="border border-[#B9B9B9]"></td>
                    <td class="border border-[#B9B9B9]"></td>
                    <td class="border border-[#B9B9B9]"></td>
                    <td class="border border-[#B9B9B9]">
                      <div class="flex justify-center items-center gap-2">
                        <button>
                          <img :src="editicon" class="w-6 h-6" />
                        </button>
                        <button>
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button>
                      </div>
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
</style>
