<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Pagination from "@/components/reference/company/Pagination.vue";
import ModalAdd from "@/components/reference/company/ModalAdd.vue";
import ModalEdit from "@/components/reference/company/ModalEdit.vue";
import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import dataCompany from "@/utils/Api/reference/companydata";

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
  { Id: 2, title: "Car" },
  { Id: 3, title: "Company" },
  { Id: 4, title: "Site" },
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
        :class="[dataCompany.length < 10 ? 'h-screen' : 'h-full']"
      >
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
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

          <!-- SEARCH -->
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

          <!-- SHOWING -->
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
                    v-for="(data, index) in dataCompany"
                    :key="index"
                  >
                    <td class="relative">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.code }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.parent }}</td>
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
