<script setup>
import Layout from "@/components/layout/Layout.vue";
import TableCompany from "@/components/reference/company/TableCompany.vue";
import Pagination from "@/components/reference/company/Pagination.vue";
import ModalAdd from "@/components/reference/company/ModalAdd.vue";
import icon_receive from "@/assets/icon-receive.svg";
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

    <div
      class="grid grid-flow-col auto-cols-max justify-start items-center gap-5 px-4 py-2"
    >
      <p class="font-JakartaSans font-normal text-xs">Showing</p>
      <div
        class="dropdown dropdown-bottom bg-white rounded-lg h-9 border border-slate-300"
      >
        <button tabindex="0">
          <div tabindex="0" class="collapse collapse-arrow mx-1">
            <div class="collapse-title min-h-max py-3">
              <p
                class="flex justify-center items-center capitalize font-JakartaSans text-xs text-black font-medium"
              >
                Showing
              </p>
            </div>
          </div>
        </button>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 capitalize"
        >
          <li><a>10</a></li>
          <li><a>25</a></li>
          <li><a>75</a></li>
          <li><a>100</a></li>
        </ul>
      </div>
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
