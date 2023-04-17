<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Pagination from "@/components/reference/uom/Pagination.vue";
import ModalAdd from "@/components/reference/uom/ModalAdd.vue";
import ModalEdit from "@/components/reference/uom/ModalEdit.vue";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import uomdata from "@/utils/Api/reference/uomdata";

//for check & uncheck all
const selectAll = (checkValue) => {
  const checkList = checkValue;
  if (checkList == true) {
    let check = document.getElementsByName("checks");
    for (let i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") check[i].checked = true;
    }
  } else {
    let check = document.getElementsByName("checks");
    for (let i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") check[i].checked = false;
    }
  }
};

//for tablehead
const tableHead = [
  { Id: 1, title: "No" },
  { Id: 2, title: "Unit of Measure Category" },
  { Id: 3, title: "UOM" },
  { Id: 4, title: "Company" },
  { Id: 5, title: "Actions" },
];
</script>

<template>
  <div class="flex flex-col basis-full grow-0 shrink-0 w-full this">
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />
      <div
        class="bg-slate-300 py-5 pl-5 pr-5 lg:pr-10 sm:ml-[100px] md:ml-[280px] w-screen h-full"
        :class="[uomdata.length < 10 ? 'h-screen' : 'h-full']"
      >
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Unit of Measure Categories
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

          <!-- SORT & SEARCH -->
          <div class="flex flex-wrap justify-between items-center mx-4 py-2">
            <div class="flex flex-wrap items-center gap-4">
              <p
                class="capitalize font-JakartaSans text-xs text-black font-medium"
              >
                Company
              </p>

              <div
                class="dropdown dropdown-bottom bg-white rounded-lg h-9 border"
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

              <div class="flex gap-4 items-center">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                >
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                >
                  <span>
                    <img :src="icon_reset" class="w-5 h-5" />
                  </span>
                  Reset
                </button>
              </div>
            </div>

            <form class="py-2 flex md:mx-0">
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

          <!-- SHOWING -->
          <div class="flex items-center gap-1 pt-2 pb-4 px-4 h-4">
            <h1 class="text-xs font-JakartaSans">Showing</h1>
            <select class="border-2 border-black rounded-lg w-15" name="" id="">
              <option value="">10</option>
              <option value="">25</option>
              <option value="">50</option>
              <option value="">75</option>
              <option value="">100</option>
            </select>
          </div>

          <!-- TABLE -->
          <div
            class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden"
          >
            <div class="block overflow-x-auto">
              <table
                class="table table-zebra table-compact border w-full rounded-lg"
              >
                <thead class="text-center font-JakartaSans text-sm font-bold">
                  <tr>
                    <th class="relative">
                      <div class="flex justify-center">
                        <input
                          type="checkbox"
                          @click="selectAll((checkList = !checkList))"
                        />
                      </div>
                    </th>
                    <th
                      v-for="data in tableHead"
                      :key="data.Id"
                      class="relative"
                    >
                      <span class="flex justify-center">{{ data.title }}</span>
                      <button class="absolute right-2 top-0 bottom-0">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-[#F5F5F5]">
                  <tr
                    class="font-JakartaSans font-normal text-sm"
                    v-for="(data, index) in uomdata"
                    :key="index"
                  >
                    <td class="relative">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.uom_category }}</td>
                    <td>{{ data.uom }}</td>
                    <td>{{ data.company }}</td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <ModalEdit />
                      <button>
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PAGINATION -->
          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
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
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}

th {
  padding: 2px;
  text-align: left;
  position: relative;
}

tr td {
  text-align: center;
  white-space: nowrap;
}

tr th {
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}

.table-zebra tbody tr:hover td {
  background-color: rgb(193, 192, 192);
  cursor: pointer;
}

.this {
  overflow-x: hidden;
}
</style>
