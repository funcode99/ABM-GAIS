<script setup>
import Layout from "../../../components/layout/Layout.vue";
import TableCompany from "../../../components/reference/company/TableCompany.vue";
import Pagination from "../../../components/reference/company/Pagination.vue";
import ModalAdd from "../../../components/reference/company/ModalAdd.vue";
import icon_filter from "../../../assets/icon_filter.svg";
import icon_reset from "../../../assets/icon_reset.svg";
import icon_received from "../../../assets/icon-received.svg";
</script>

<template>
  <Layout />
  <div class="card card-compact bg-white rounded-lg custom-card">
    <div
      class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
    >
      <p
        class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
      >
        company
      </p>
      <div class="flex gap-4">
        <ModalAdd />
        <button
          class="btn btn-md text-white text-sm font-JakartaSans font-bold capitalize border-green bg-green gap-2 items-center hover:bg-[#015289] hover:text-white hover:border-[#015289]"
        >
          <img :src="icon_received" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div class="flex flex-wrap justify-start items-center mx-4 py-2">
      <form class="py-2 flex justify-center md:mx-0">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
          </div>
          <input
            type="text"
            placeholder="Search..."
            class="input input-bordered input-info w-full px-12 font-JakartaSans"
          />
        </div>
      </form>
    </div>

    <div
      class="grid grid-flow-col auto-cols-max justify-start items-center gap-2 px-4 py-2"
    >
      <p class="font-JakartaSans font-normal text-xs">Showing</p>
      <input
        type="number"
        value="1"
        class="input w-14 h-7 rounded-sm p-0 border border-[#015289] font-JakartaSans font-normal text-xs px-2"
      />
    </div>

    <TableCompany class="py-2 mx-4 overflow-x-auto" />

    <div
      class="flex flex-wrap justify-center items-center mx-4 py-4 md:justify-between"
    >
      <p class="font-Inter text-xs font-normal text-[#888888] py-2">
        Showing 1 to 10 of 50 entries
      </p>
      <Pagination />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  width: calc(100% - 260px);
}

.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}
</style>
