<script setup>
import Layout from "@/components/layout/Layout.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import TableFlight from "@/components/reference/flight/TableFlight.vue";
import Pagination from "@/components/reference/flight/Pagination.vue";
import ModalAdd from "@/components/reference/flight/ModalAdd.vue";
import icon_receive from "@/assets/icon-receive.svg";
</script>

<template>
  <div class="flex overflow-y-hidden">
    <Sidebar class="flex-none" />

    <div class="card card-compact w-full bg-white rounded-lg">
      <Layout />

      <div class="bg-slate-300 pt-5 px-5 h-[100%]">
        <div class="card card-compact bg-white rounded-lg custom-card">
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              flight entitlement
            </p>
            <div class="flex gap-4">
              <ModalAdd />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <div class="flex flex-wrap justify-start items-center mx-4">
            <form class="flex md:mx-0">
              <label class="relative block">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
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
                  class="placeholder:text-slate-400 placeholder:font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search..."
                  type="text"
                  name="search"
                />
              </label>
            </form>
          </div>

          <div class="flex items-center gap-1 px-4 py-2">
            <h1 class="text-xs font-JakartaSans">Showing</h1>
            <select class="border-2 border-black rounded-lg w-15" name="" id="">
              <option value="">10</option>
              <option value="">25</option>
              <option value="">50</option>
              <option value="">75</option>
              <option value="">100</option>
            </select>
          </div>

          <TableFlight class="py-2 mx-4 overflow-x-auto" />

          <div
            class="flex flex-wrap justify-center items-center mx-4 py-4 lg:justify-between"
          >
            <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
              Showing 1 to 10 of 50 entries
            </p>
            <Pagination />
          </div>
        </div>
      </div>
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
