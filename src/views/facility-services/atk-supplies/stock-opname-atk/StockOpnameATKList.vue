<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import gearicon from "@/assets/system-configuration-not-selected.png";

import ModalAddATKOpname from "@/components/facility-services/atk-supplies/stock-opname-atk/ModalAddOpname.vue";

import stockindata from "@/utils/Api/facility-service-system/stock-in-atk/stockindata.js";


import { ref, onBeforeMount, computed } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();

//for sort & search
const date = ref();
const search = ref("");
let instanceArray = [];
let sortedData = ref([])
const selectedType = ref("Company");
const selectedTypeWarehouse = ref("Warehouse");

let sortedbyASC = true;

let lockScrollbar = ref(false);

//for paginations
let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);

const fetch = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get("/request_atk/get")
  instanceArray = res.data.data.data
  sortedData.value = instanceArray
}

//for paginations
const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
};

//for filter & reset button
const filterDataByType = () => {
  // if (selectedType.value === "") {
  //   sortedData.value = instanceArray;
  // } else {
  //   sortedData.value = instanceArray.filter(
  //     (item) => item.type === selectedType.value
  //   );
  // }
};

//for filter & reset button
// const resetData = () => {
//   sortedData.value = instanceArray;
//   selectedType.value = "Type";
// };

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
  { Id: 1, title: "Created Date", jsonData: "no" },
  { Id: 2, title: "Document No", jsonData: "document_no" },
  { Id: 3, title: "Created By", jsonData: "date" },
  { Id: 4, title: "Warehouse", jsonData: "warehouse" },
  { Id: 5, title: "Item Count", jsonData: "item_count" },
  { Id: 6, title: "Actions" },
];

//for sort
const sortList = (sortBy) => {
  if (sortedbyASC) {
    sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
    sortedbyASC = false;
  } else {
    sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
    sortedbyASC = true;
  }
};



//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.document_no.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.warehouse.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.document_no.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.warehouse.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  onChangePage(1);
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

onBeforeMount(() => {
  getSessionForSidebar()
  fetch()
})

</script>

<template>
  <div
    class="flex flex-col w-full this"
    :class="lockScrollbar === true ? 'fixed' : ''"
  >
    <Navbar />

    <div class="flex w-screen mt-[115px] h-[100vh]">
        
      <Sidebar class="flex-none fixed" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div class="flex flex-wrap items-center justify-between mx-4 py-2">
            <p class="font-JakartaSans text-4xl text-[#0A0A0A] font-semibold">
              Stock Opname ATK
            </p>

            <div class="flex justify-between gap-4 items-center">
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="gearicon" class="w-6 h-6" />
              </button>

              <ModalAddATKOpname @unlock-scrollbar="lockScrollbar = !lockScrollbar" />

              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT, DATE & SEARCH -->

          <div
            class="grid grid-flow-col auto-cols-max justify-between items-center mx-4 py-2"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Company
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedType"
                >
                  <option disabled selected>Company</option>
                  <!-- <option v-for="data in sortedData" :key="data.id">
                    {{ data.company }}
                  </option> -->
                </select>
              </div>

              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Warehouse
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedTypeWarehouse"
                >
                  <option disabled selected>Warehouse</option>
                  <!-- <option v-for="data in sortedData" :key="data.id">
                    {{ data.warehouse }}
                  </option> -->
                </select>
              </div>

              <div class="flex flex-wrap gap-4 items-center">
                <div>
                  <p
                    class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                  >
                    Choose a Date
                  </p>

                  <VueDatePicker
                    v-model="date"
                    range
                    :enable-time-picker="false"
                    class="my-date lg:w-10"
                  />
                </div>
              </div>

              <div class="flex flex-wrap gap-4 items-center pt-6">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="filterDataByType"
                >
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                  @click="resetData"
                >
                  <span>
                    <img :src="icon_reset" class="w-5 h-5" />
                  </span>
                  Reset
                </button>
              </div>
            </div>

            <div class="pt-6 w-full ml-2">
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
                  class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search..."
                  type="text"
                  name="search"
                  v-model="search"
                  @keyup="filteredItems(search)"
                />
              </label>
            </div>
          </div>

          <!-- SHOWING -->
          <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
            <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
            <select
              class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              v-model="pageMultiplier"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </div>

          <!-- TABLE -->
          <div
            class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden"
          >
            <div class="block overflow-x-auto">
              <table
                class="w-full table-zebra table-compact border sm:w-full h-full rounded-lg"
              >
                <thead
                  class="text-center font-JakartaSans text-sm font-bold h-10"
                >
                  <tr>
                    <th>
                      <div class="flex justify-center">
                        <input
                          type="checkbox"
                          name="checked"
                          @click="selectAll((checkList = !checkList))"
                        />
                      </div>
                    </th>
                    <th>
                      <div class="flex justify-center">
                        No
                      </div>
                    </th>

                    <th
                      v-for="data in tableHead"
                      :key="data.Id"
                      class="overflow-x-hidden cursor-pointer font-JakartaSans font-normal text-sm"
                      @click="sortList(`${data.jsonData}`)"
                    >
                      <span class="flex justify-center items-center gap-1">
                        {{ data.title }}
                        <button>
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    class="font-JakartaSans font-normal text-sm"
                    v-for="(data, index) in sortedData.slice(
                      paginateIndex * pageMultiplierReactive,
                      (paginateIndex + 1) * pageMultiplierReactive
                    )"
                    :key="data.no"
                  >
                    <td class="p-0">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>
                      {{ index+1 }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.created_at.slice(0,10) }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.document_no }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.created_by }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.warehouse_name }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.item_count }}
                    </td>
                    <td class="flex flex-nowrap gap-1 justify-center">
                      <router-link to="/viewstockinatk">
                        <button>
                          <img :src="editicon" class="w-6 h-6" />
                        </button>
                      </router-link>
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
              Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
              {{ Math.min(showingValue * pageMultiplier, sortedData.length) }}
              of {{ sortedData.length }} entries
            </p>
            <vue-awesome-paginate
              :total-items="sortedData.length"
              :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-jump-buttons="true"
            />
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

.my-date {
  width: 200px !important;
}
</style>
