<script setup>
import Layout from "@/components/layout/Layout.vue";
import TableJob from "@/components/reference/jobband/TableJob.vue";
import Pagination from "@/components/reference/jobband/Pagination.vue";
import ModalAdd from "@/components/reference/jobband/ModalAdd.vue";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import icon_receive from "@/assets/icon-receive.svg";
</script>

<template>
  <Layout />
  <div class="card card-compact bg-white rounded-lg custom-card">
    <div
      class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
    >
      <p
        class="font-JakartaSans text-xs lg:text-base capitalize text-[#0A0A0A] font-semibold"
      >
        Job Band
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

    <div class="flex flex-wrap justify-between items-center mx-4 py-2">
      <div class="grid grid-flow-col auto-cols-max items-center gap-4">
        <p class="capitalize font-JakartaSans text-xs text-black font-medium">
          sort
        </p>
        <div
          class="dropdown dropdown-bottom bg-white rounded-lg h-9 border border-[#015289]"
        >
          <button tabindex="0">
            <div tabindex="0" class="collapse collapse-arrow">
              <div class="collapse-title min-h-max py-3">
                <p
                  class="flex justify-center items-center capitalize font-JakartaSans text-xs text-black font-medium"
                >
                  A to Z
                </p>
              </div>
            </div>
          </button>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 capitalize"
          >
            <li><a>A</a></li>
            <li><a>B</a></li>
            <li><a>C</a></li>
          </ul>
        </div>

        <p class="capitalize font-JakartaSans text-xs text-black font-medium">
          company
        </p>

        <div
          class="dropdown dropdown-bottom bg-white rounded-lg h-9 border border-[#015289]"
        >
          <button tabindex="0">
            <div tabindex="0" class="collapse collapse-arrow">
              <div class="collapse-title min-h-max py-3">
                <p
                  class="flex justify-center items-center capitalize font-JakartaSans text-xs text-black font-medium"
                >
                  company
                </p>
              </div>
            </div>
          </button>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 capitalize"
          >
            <li><a>company A</a></li>
            <li><a>company B</a></li>
            <li><a>company C</a></li>
          </ul>
        </div>
      </div>

      <div class="flex gap-4 mr-96 items-center my-4 md:my-0">
        <button
          class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#015289] hover:text-white hover:border-[#015289]"
        >
          <span>
            <img :src="icon_filter" class="w-5 h-5" />
          </span>
          Filter
        </button>
        <button
          class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#015289] hover:text-white hover:border-[#015289]"
        >
          <span>
            <img :src="icon_reset" class="w-5 h-5" />
          </span>
          Reset
        </button>
      </div>

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

    <TableJob class="py-2 mx-4 overflow-x-auto" />

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
