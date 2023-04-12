<script setup>
    import Sidebar from '@/components/layout/Sidebar.vue'
    import Navbar from '@/components/layout/Navbar.vue'
    import Pagination from "@/components/reference/employee/Pagination.vue";
    import ModalAdd from "@/components/system-configuration/approval/ModalAdd.vue";
    import TableApproval from '@/components/system-configuration/approval/TableApproval.vue';

    import icon_filter from "@/assets/icon_filter.svg";
    import icon_reset from "@/assets/icon_reset.svg";
</script>

<template>
    <div class="flex">
      <Sidebar class="flex-none" />
      <div class="dashboard card card-compact w-screen bg-white rounded-lg">
      <Navbar />

      <div
        class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
      >
        <p class="font-Poppins text-base capitalize text-[#0A0A0A] font-semibold">
          Approval Matrix
        </p>
        <ModalAdd />
      </div>

    <div class="flex flex-wrap justify-between items-center mx-4 py-2">
      
      <div class="grid grid-flow-col auto-cols-max items-center gap-4">
        <p class="capitalize font-Fira text-xs text-black font-medium">Sort</p>

        <div class="dropdown dropdown-bottom bg-white rounded-lg h-9 border">
          <button tabindex="0">
            <div tabindex="0" class="collapse collapse-arrow">
              <div class="collapse-title min-h-max py-3">
                <p
                  class="flex justify-center items-center capitalize font-Fira text-xs text-black font-medium"
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

        <p class="capitalize font-Fira text-xs text-black font-medium">
          company
        </p>

        <div class="dropdown dropdown-bottom bg-white rounded-lg h-9 border">
          <button tabindex="0">
            <div tabindex="0" class="collapse collapse-arrow">
              <div class="collapse-title min-h-max py-3">
                <p
                  class="flex justify-center items-center capitalize font-Fira text-xs text-black font-medium"
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

        <div class="flex gap-4 items-center my-4 md:my-0">
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
            class="input input-bordered input-info w-full px-12"
          />
        </div>
      </form>

    </div>

    <TableApproval class="py-2 mx-4 overflow-x-auto" />

    <div class="flex flex-wrap justify-between items-center mx-4 py-2">
      <p class="font-Inter text-xs font-normal text-[#888888]">
        Showing 1 to 10 of 50 entries
      </p>
      <Pagination />
    </div>

    </div>
  </div>
</template>

<style scoped>

.input {
  height: 36px;
}

</style>