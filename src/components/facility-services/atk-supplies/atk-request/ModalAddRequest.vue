<script setup>

import { ref } from 'vue'

import iconClose from "@/assets/navbar/icon_close.svg";
import icondanger from "@/assets/icon-danger-circle.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";

const emits = defineEmits(["unlockScrollbar"])

let companyModal = ref('')
let dateModal = ref('')
let siteModal = ref('')

let warehouseModal = ref('')
let quantityOpnameModal = ref('')
let itemModal = ref('')
let brandModal = ref('')
let adjusmentTypeModal = ref('')
let UOMModal = ref('')
let quantityModal = ref('')
let remarksModal = ref('')

</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-stock-in"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >Opname</label
  >

  <input type="checkbox" id="my-modal-stock-in" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-stock-in"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          ATK Request
        </p>
      </nav>

      <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
        <img :src="icondanger" class="w-5 h-5" />
        <p class="font-JakartaSans font-semibold text-lg">Request Stock Out Info</p>
      </div>

      <main class="modal-box-inner-brand pr-6 pb-14">
        <div>
          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <input
                v-modal="companyModal"
                type="text"
                name="company"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Company"
                required
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="Date"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Date<span class="text-red">*</span></label
              >
              <input
                v-model="dateModal"
                type="text"
                name="date"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Brand"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="site"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Site<span class="text-red">*</span></label
              >
              <input
                v-model="siteModal"
                type="text"
                name="site"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Site"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="warehouse"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Warehouse<span class="text-red">*</span></label
              >
              <select
                v-model="warehouseModal"
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
              >
                <option disabled selected>Select Warehouse</option>
                <option>Warehouse A</option>
                <option>Warehouse B</option>
              </select>
            </div>

            <div class="mb-6 w-full">
              <label
                for="uom"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Quantity Opname<span class="text-red">*</span></label
              >
              <input
                v-model="quantityOpnameModal"
                type="text"
                name="quantity opname"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Quantity Opname"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="id_item"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Item<span class="text-red">*</span></label
              >
              <input
                v-model="itemModal"
                type="text"
                name="item"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Item"
                required
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="uom"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Brand<span class="text-red">*</span></label
              >
              <input
                v-model="brandModal"
                type="text"
                name="brand"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Brand"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="adjusment_type"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Adjusment Type<span class="text-red">*</span></label
              >
              <input
                v-model="adjusmentTypeModal"
                type="text"
                name="adjusment type"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Adjusment Type"
                required />
            </div>
            <div class="mb-6 w-full">
              <label
                for="uom"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >UOM<span class="text-red">*</span></label
              >
              <input
                v-model="UOMModal"
                type="text"
                name="UOM"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="UOM"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-start gap-2">
            <div class="mb-6 w-full">
              <label
                for="quantity"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Quantity<span class="text-red">*</span></label
              >
              <input
                v-model="quantityModal"
                type="text"
                name="Quantity"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Quantity"
                required
              />
            </div>
            <div class="mb-6 w-full">
              <label
                for="remarks"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Remarks<span class="text-red">*</span></label
              >
              <textarea
                v-model="remarksModal"
                type="text"
                name="Remarks"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Remarks"
                required
              />
            </div>
          </div>

          <div class="flex justify-center py-2">
            <button class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue">
              Add
            </button>
          </div>

        </div>

        <!-- INNER TABLE -->
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
                  Item Name
                </th>

                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                 Quantity
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Remarks
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16">
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]">
                  <div class="flex flex-wrap justify-center items-center gap-2">
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

      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-center gap-4 mr-6">
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
            Save
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

.modal-box-inner-brand {
  height: 450px;
  --tw-scale-x: .9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.inner-table {
  overflow-x: auto;
}
</style>
