<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";

import icon_receive from "@/assets/icon-receive.svg";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import Api from "@/utils/Api";

import { ref, onBeforeMount, computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();

const selectedStatus = ref("");
const selectedCatype = ref("");
const date = ref();
const search = ref("");
let sortedData = ref([]);
let sortedbyASC = true;
let instanceArray = [];
let lengthCounter = 0;

//for paginations & showing
let showingValue = ref(1);
let showingValueFrom = ref(0);
let showingValueTo = ref(0);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let totalPage = ref(0);
let totalData = ref(0);

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
  fetchSettlementReport(pageOfItem);
};

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

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "Settlement No", jsonData: "no_settlement" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "CA No", jsonData: "no_ca" },
  { Id: 6, title: "Nominal Real", jsonData: "total_real" },
  { Id: 7, title: "Status", jsonData: "status" },
];

const sortList = (sortBy) => {
  if (sortedbyASC) {
    sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
    sortedbyASC = false;
  } else {
    sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
    sortedbyASC = true;
  }
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const fetchSettlementReport = async (id) => {
  const params = {
    ca_type: null,
    start_date: null,
    end_date: null,
    status: null,
    search: search.value,
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/settlement/get_data", { params });
  // console.log(res.data.data);
  instanceArray = res.data.data;
  sortedData.value = instanceArray.data;
  console.log(instanceArray);
  console.log(sortedData.value.length);
  totalPage.value = instanceArray.last_page;
  totalData.value = instanceArray.total;
  showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
  showingValueTo.value = instanceArray.to;
};

onBeforeMount(() => {
  fetchSettlementReport();
  getSessionForSidebar();
});
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
              Settlement Reports
            </p>
          </div>

          <!-- SORT, DATE & SEARCH -->
          <div class="flex items-center mx-4">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search..."
                name="search"
                v-model="search"
              />
            </div>
            <button
              @click="fetchSettlementReport()"
              type="submit"
              class="w-36 p-2.5 ml-2 text-sm rounded-lg font-medium text-white font-JakartaSans capitalize border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
            >
              Search
            </button>
          </div>

          <div class="flex flex-wrap gap-2 px-4 py-4 justify-between">
            <div class="flex gap-6">
              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  CA Type
                </p>
                <select
                  class="font-JakartaSans bg-white w-36 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedCatype"
                >
                  <option disabled selected>Type</option>
                  <!-- <option v-for="data in sortedData" :value="data.id">
                    {{ data.id_ca_type }}
                  </option> -->
                </select>
              </div>

              <div class="flex flex-col">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Date
                </p>
                <VueDatePicker
                  v-model="date"
                  range
                  :enable-time-picker="false"
                  class="my-date"
                />
              </div>

              <div class="flex flex-col pt-[3px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Status
                </p>
                <select
                  class="font-JakartaSans bg-white w-36 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedStatus"
                >
                  <option disabled selected>Status</option>
                  <!-- <option v-for="data in sortedData" :value="data.id">
                    {{ data.status }}
                  </option> -->
                </select>
              </div>

              <div class="flex gap-4 items-center pt-7">
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

            <div class="flex items-center pt-4">
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SHOWING -->
          <div class="flex items-center gap-1 py-4 px-4 h-4">
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
          <tableData>
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
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

            <tbody>
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="data in sortedData"
                :key="data.id"
              >
                <td>
                  <input type="checkbox" name="checks" />
                </td>
                <td>{{ data.no }}</td>
                <td>{{ data.created_at }}</td>
                <td>{{ data.no_settlement }}</td>
                <td>{{ data.employee_name }}</td>
                <td>{{ data.no_ca }}</td>
                <td>{{ data.total_real }}</td>
                <td>{{ data.status }}</td>
              </tr>
            </tbody>
          </tableData>

          <!-- PAGINATION -->
          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
          >
            <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
              Showing {{ showingValueFrom }} to
              {{ showingValueTo }}
              of {{ totalData }} entries
            </p>
            <vue-awesome-paginate
              :total-items="totalData"
              :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-ending-buttons="true"
            />
          </div>
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

.readmore-text {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: max-width 0.3s ease-in-out;
}

.readmore-text:hover {
  max-width: 400px;
  white-space: nowrap;
  word-break: break-word;
}

.my-date {
  width: 280px !important;
}
</style>
