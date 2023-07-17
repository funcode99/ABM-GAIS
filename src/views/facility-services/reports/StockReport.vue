<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";
// import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue";

import icon_receive from "@/assets/icon-receive.svg";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import expandArrow from "@/assets/ExpandArrow.png";
import iconUp from "@/assets/icon-up.png";

// import Api from "@/utils/Api";

// import { Workbook } from "exceljs";
import { ref, onBeforeMount, computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();

const selectedCompany = ref("");
const selectedSite = ref("");
const selectedWarehouse = ref("");

const search = ref("");
const month = ref();
const monthFormat = "MM";
const monthValueFormat = "MM";
const year = ref();

// let sortedData = ref([]);
// let sortedbyASC = true;
// let instanceArray = [];

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Item Name", jsonData: "created_at" },
  { Id: 3, title: "Date", jsonData: "no_settlement" },
  { Id: 4, title: "Doc No", jsonData: "employee_name" },
  { Id: 5, title: "Qty", jsonData: "nomor_ca" },
  { Id: 6, title: "UOM", jsonData: "total_real" },
];

const sortList = (sortBy) => {
  // if (sortedbyASC) {
  //   sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
  //   sortedbyASC = false;
  // } else {
  //   sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
  //   sortedbyASC = true;
  // }
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

onBeforeMount(() => {
  getSessionForSidebar();
});

const showClearButton = computed(() => {
  // return search.value !== "";
});

const showMenu1 = ref(false);
const showMenu2 = ref(false);
const showMenuItem1 = ref(false);
const showMenuItem2 = ref(false);
const showMenuItemStockOut = ref(false);
const icon1 = ref(expandArrow);
const icon2 = ref(expandArrow);

const toggleMenu = (menu) => {
  if (menu === "menu1") {
    showMenu1.value = !showMenu1.value;
    icon1.value = showMenu1.value ? iconUp : expandArrow;
  } else if (menu === "menu2") {
    showMenu2.value = !showMenu2.value;
    icon2.value = showMenu2.value ? iconUp : expandArrow;
  } else if (menu === "menuItem1") {
    showMenuItem1.value = !showMenuItem1.value;
    icon2.value = showMenuItem1.value ? iconUp : expandArrow;
  } else if (menu === "menuItem2") {
    showMenuItem2.value = !showMenuItem2.value;
    icon2.value = showMenuItem2.value ? iconUp : expandArrow;
  } else if (menu === "menuItemStockOut") {
    showMenuItemStockOut.value = !showMenuItemStockOut.value;
    icon2.value = showMenuItemStockOut.value ? iconUp : expandArrow;
  }
};

const getIcon = (menu) => {
  return menu === "menu1" ? icon1.value : icon2.value;
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <tableContainer>
        <tableTop>
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Stock In Vs Stock Out
            </p>
          </div>

          <!-- SORT, DATE & SEARCH -->
          <div class="flex items-center mx-4">
            <input
              class="nosubmit placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              type="text"
              placeholder="Search..."
              v-model="search"
            />

            <button
              v-if="showClearButton"
              @click="clearSearch"
              type="button"
              class="cursor-pointer absolute right-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              @click="fetchSettlementReport()"
              type="submit"
              class="w-36 p-2.5 ml-2 text-sm rounded-lg font-medium text-white font-JakartaSans capitalize border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
            >
              Search
            </button>
          </div>

          <div class="flex flex-wrap gap-2 px-4 py-4 justify-between">
            <div class="flex gap-2">
              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Company
                </p>
                <select
                  class="font-JakartaSans bg-white w-36 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedCompany"
                >
                  <option disabled selected>Type</option>
                  <option value="1">Company A</option>
                  <option value="2">Company B</option>
                </select>
              </div>

              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Site
                </p>
                <select
                  class="font-JakartaSans bg-white w-36 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedSite"
                >
                  <option disabled selected>Type</option>
                  <option value="1">Site A</option>
                  <option value="2">Site B</option>
                </select>
              </div>

              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Warehouse
                </p>
                <select
                  class="font-JakartaSans bg-white w-36 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedWarehouse"
                >
                  <option disabled selected>Type</option>
                  <option value="1">Warehouse A</option>
                  <option value="2">Warehouse B</option>
                </select>
              </div>

              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Month
                </p>
                <VueDatePicker
                  v-model="month"
                  month-picker
                  class="my-date"
                  :format="monthFormat"
                  :value-format="monthValueFormat"
                />
              </div>

              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Year
                </p>
                <VueDatePicker v-model="year" year-picker class="my-date" />
              </div>

              <div class="flex gap-4 items-center pt-7">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="fetchSettlementReport()"
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

            <div class="flex items-center pt-4">
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                @click="exportToExcel"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- TABLE -->
          <tableData>
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
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

            <tbody class="font-JakartaSans font-normal text-sm">
              <tr>
                <td
                  class="flex justify-center items-center gap-2"
                  @click="toggleMenu('menu1')"
                >
                  <p>Stock In</p>
                  <img :src="getIcon('menu1')" class="mt-1 w-[12px] h-[8px]" />
                </td>
                <td colspan="5"></td>
              </tr>

              <tr v-if="showMenu1">
                <td>1</td>
                <td
                  class="flex justify-center items-center gap-2"
                  @click="toggleMenu('menuItem1')"
                >
                  <p>Pen</p>
                  <img
                    :src="getIcon('menuItem1')"
                    class="mt-1 w-[12px] h-[8px]"
                  />
                </td>
                <td></td>
                <td></td>
                <td>100</td>
                <td>Pc</td>
              </tr>
              <tr v-if="showMenuItem1">
                <td>1</td>
                <td></td>
                <td>13/04/23</td>
                <td>IN-ABM/1132/13.04</td>
                <td>80</td>
                <td>Pc</td>
              </tr>
              <tr v-if="showMenuItem1">
                <td>2</td>
                <td></td>
                <td>30/04/23</td>
                <td>IN-ABM/1320/30.04</td>
                <td>20</td>
                <td>Pc</td>
              </tr>

              <tr v-if="showMenu1">
                <td>2</td>
                <td
                  class="flex justify-center items-center gap-2"
                  @click="toggleMenu('menuItem2')"
                >
                  <p>Paper Clip</p>
                  <img
                    :src="getIcon('menuItem2')"
                    class="mt-1 w-[12px] h-[8px]"
                  />
                </td>
                <td></td>
                <td></td>
                <td>320</td>
                <td>Box</td>
              </tr>
              <tr v-if="showMenuItem2">
                <td>1</td>
                <td></td>
                <td>21/04/23</td>
                <td>IN-ABM/2322/21.04</td>
                <td>150</td>
                <td>Box</td>
              </tr>
              <tr v-if="showMenuItem2">
                <td>2</td>
                <td></td>
                <td>08/04/23</td>
                <td>IN-ABM/1320/08.04</td>
                <td>170</td>
                <td>Box</td>
              </tr>

              <tr>
                <td
                  class="flex justify-center items-center gap-2"
                  @click="toggleMenu('menu2')"
                >
                  <p>Stock Out</p>
                  <img :src="getIcon('menu2')" class="mt-1 w-[12px] h-[8px]" />
                </td>
                <td colspan="5"></td>
              </tr>

              <tr v-if="showMenu2">
                <td>1</td>
                <td
                  class="flex justify-center items-center gap-2"
                  @click="toggleMenu('menuItemStockOut')"
                >
                  <p>Pen</p>
                  <img
                    :src="getIcon('menuItemStockOut')"
                    class="mt-1 w-[12px] h-[8px]"
                  />
                </td>
                <td></td>
                <td></td>
                <td>62</td>
                <td>Pc</td>
              </tr>
              <tr v-if="showMenuItemStockOut">
                <td>1</td>
                <td></td>
                <td>10/04/23</td>
                <td>OUT-ABM/1132/10.04</td>
                <td>32</td>
                <td>Pc</td>
              </tr>
              <tr v-if="showMenuItemStockOut">
                <td>2</td>
                <td></td>
                <td>22/04/23</td>
                <td>OUT-ABM/1320/22.04</td>
                <td>30</td>
                <td>Pc</td>
              </tr>
            </tbody>
          </tableData>
        </tableTop>
      </tableContainer>

      <Footer />
    </div>
  </div>
</template>

<style scoped>
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
  width: 110px !important;
}

input.nosubmit {
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}
</style>
