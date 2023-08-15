<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import iconView from "@/assets/view-details.png";

import moment from "moment";

import Api from "@/utils/Api";

import { ref, onBeforeMount, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const router = useRouter();
const tabs = ref(["Approval", "Approval History"]);
const activeTab = ref(0);

let showingValue = ref(1);
let showingValueFrom = ref(0);
let showingValueTo = ref(0);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let totalPage = ref(0);
let totalData = ref(0);

let sortedData = ref([]);
let sortedbyASC = true;
let instanceArray = [];
let paginationArray = [];
let lengthCounter = 0;
let filter = reactive({
  status: "",
  date: "",
  search: "",
});

const changeTab = (index) => {
  activeTab.value = index;
};

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
  fetch(pageOfItem);
};

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_date" },
  { Id: 3, title: "CA No", jsonData: "no_ca" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "Item", jsonData: "item_count" },
  { Id: 6, title: "Currency", jsonData: "currency_name" },
  { Id: 7, title: "Total", jsonData: "grand_total" },
  { Id: 8, title: "Status", jsonData: "status" },
];

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

const fetch = async (id) => {
  let payload = {
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };

  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("approval_cash_advance/get_data", {
    params: payload,
  });

  paginationArray = api.data.data;
  instanceArray = paginationArray.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  totalPage.value = paginationArray.last_page;
  totalData.value = paginationArray.total;
  showingValueFrom.value = paginationArray.from ? paginationArray.from : 0;
  showingValueTo.value = paginationArray.to;
};

const filterDataByType = async (id) => {
  let payload = {
    search: filter.search,
    status: filter.status,
    start_date: filter.date ? filter.date[0] : "",
    end_date: filter.date ? filter.date[1] : "",
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };

  const api = await Api.get("approval_cash_advance/get_data", {
    params: payload,
  });

  paginationArray = api.data.data;
  instanceArray = paginationArray.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  totalPage.value = paginationArray.last_page;
  totalData.value = paginationArray.total;
  showingValueFrom.value = paginationArray.from ? paginationArray.from : 0;
  showingValueTo.value = paginationArray.to;
  showingValue.value = paginationArray.current_page;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetch();
  fetchHistory();
});

const resetData = () => {
  filter.search = "";
  filter.status = "";
  filter.date = "";
  fetch();
};

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const format_price = (value) => {
  if (!value) {
    return "0.00";
  }
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

//for approval history
let showingValueHistory = ref(1);
let showingValueFromHistory = ref(0);
let showingValueToHistory = ref(0);
let pageMultiplierHistory = ref(10);
let pageMultiplierReactiveHistory = computed(() => pageMultiplierHistory.value);
let paginateIndexHistory = ref(0);
let totalPageHistory = ref(0);
let totalDataHistory = ref(0);

let sortedDataHistory = ref([]);
let sortedbyASCHistory = true;
let instanceArrayHistory = [];
let paginationArrayHistory = [];
let lengthCounterHistory = 0;
let filterHistory = reactive({
  status: "",
  date: "",
  search: "",
});

const onChangePageHistory = (pageOfItem) => {
  paginateIndexHistory.value = pageOfItem - 1;
  showingValueHistory.value = pageOfItem;
  fetchHistory(pageOfItem);
};

const tableHeadHistory = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "CA No", jsonData: "no_ca" },
  { Id: 4, title: "Requestor", jsonData: "requestor" },
  { Id: 5, title: "Item", jsonData: "item_count" },
  { Id: 6, title: "Currency", jsonData: "currency_name" },
  { Id: 7, title: "Total", jsonData: "grand_total" },
  { Id: 8, title: "Status", jsonData: "status_approval" },
];

const selectAllHistory = (checkValue) => {
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

const sortListHistory = (sortBy) => {
  if (sortedbyASCHistory) {
    sortedDataHistory.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
    sortedbyASCHistory = false;
  } else {
    sortedDataHistory.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
    sortedbyASCHistory = true;
  }
};

const fetchHistory = async (id) => {
  let payload = {
    perPage: pageMultiplierHistory.value,
    page: id ? id : 1,
  };

  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("approval_cash_advance/history", {
    params: payload,
  });

  paginationArrayHistory = api.data.data;
  instanceArrayHistory = paginationArrayHistory.data;
  sortedDataHistory.value = instanceArrayHistory;
  lengthCounterHistory = sortedDataHistory.value.length;
  totalPageHistory.value = paginationArrayHistory.last_page;
  totalDataHistory.value = paginationArrayHistory.total;
  showingValueFromHistory.value = paginationArrayHistory.from
    ? paginationArrayHistory.from
    : 0;
  showingValueToHistory.value = paginationArrayHistory.to;
};

const filterDataByTypeHistory = async (id) => {
  let payload = {
    search: filterHistory.search,
    status: filterHistory.status,
    start_date: filterHistory.date ? filterHistory.date[0] : "",
    end_date: filterHistory.date ? filterHistory.date[1] : "",
    perPage: pageMultiplierHistory.value,
    page: id ? id : 1,
  };

  const api = await Api.get("approval_cash_advance/history", {
    params: payload,
  });

  paginationArrayHistory = api.data.data;
  instanceArrayHistory = paginationArrayHistory.data;
  sortedDataHistory.value = instanceArrayHistory;
  lengthCounterHistory = sortedDataHistory.value.length;
  sortedDataHistory.value = instanceArrayHistory;
  lengthCounterHistory = sortedDataHistory.value.length;
  totalPageHistory.value = paginationArrayHistory.last_page;
  totalDataHistory.value = paginationArrayHistory.total;
  showingValueFromHistory.value = paginationArrayHistory.from
    ? paginationArrayHistory.from
    : 0;
  showingValueToHistory.value = paginationArrayHistory.to;
  showingValueHistory.value = paginationArrayHistory.current_page;
};

const resetDataHistory = () => {
  filterHistory.search = "";
  filterHistory.status = "";
  filterHistory.date = "";
  fetchHistory();
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <tableContainer>
        <tableTop>
          <div class="tabs">
            <a
              v-for="(tab, index) in tabs"
              :key="index"
              :class="[
                'tab',
                'tab-bordered',
                'tab-lifted',
                'font-JakartaSans font-normal text-md',
                { 'tab-active': activeTab === index },
              ]"
              @click="changeTab(index)"
            >
              {{ tab }}
            </a>
          </div>

          <!-- tab approval -->
          <main v-if="activeTab === 0">
            <div
              class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-3"
            >
              <p
                class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
              >
                Cash Advance Travel
              </p>
            </div>

            <div
              class="grid grid-flow-col auto-cols-max gap-2 px-4 pb-2 justify-between"
            >
              <div class="flex flex-wrap items-center gap-4">
                <div>
                  <p
                    class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                  >
                    Date
                  </p>

                  <VueDatePicker
                    v-model="filter.date"
                    range
                    :enable-time-picker="false"
                    class="my-date"
                  />
                </div>

                <div class="flex gap-4 items-center pt-6">
                  <button
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                    @click="filterDataByType()"
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

              <div class="pt-6 flex md:mx-0">
                <label class="relative block">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
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
                    v-model="filter.search"
                    @keyup="filterDataByType()"
                  />
                </label>
              </div>
            </div>

            <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
              <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
              <select
                class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                v-model="pageMultiplier"
                @change="fetch()"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>

            <tableData v-if="sortedData.length > 0">
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
                  <th>
                    <div class="text-center">Actions</div>
                  </th>
                </tr>
              </thead>

              <tbody v-if="sortedData.length > 0">
                <tr
                  class="font-JakartaSans font-normal text-sm"
                  v-for="data in sortedData"
                  :key="data.id"
                >
                  <td>
                    <input type="checkbox" name="checks" />
                  </td>
                  <td>{{ data.no }}</td>
                  <td>{{ format_date(data.created_at) }}</td>
                  <td>{{ data.no_ca }}</td>
                  <td>{{ data.employee_name }}</td>
                  <td>{{ data.item_count }}</td>
                  <td>{{ data.currency_name }}</td>
                  <td>{{ format_price(data.grand_total) }}</td>
                  <td>{{ data.status }}</td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <button
                      @click="$router.push(`/viewapprovalcatravel/${data.id}`)"
                    >
                      <img :src="iconView" class="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </tableData>

            <div v-else>
              <tableData>
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

                    <th
                      v-for="data in tableHead"
                      :key="data.Id"
                      class="overflow-x-hidden cursor-pointer"
                      @click="sortList(`${data.jsonData}`)"
                    >
                      <div class="flex justify-center items-center">
                        <p class="font-JakartaSans font-bold text-sm">
                          {{ data.title }}
                        </p>
                        <button v-if="data.jsonData" class="ml-2">
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colspan="9"
                      class="text-center font-JakartaSans text-base font-medium"
                    >
                      Data not Found
                    </td>
                  </tr>
                </tbody>
              </tableData>
            </div>

            <div
              class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
            >
              <p
                class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
              >
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
          </main>

          <!-- tab approval history-->
          <main v-else>
            <div
              class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-3"
            >
              <p
                class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
              >
                Cash Advance Travel
              </p>
            </div>

            <div class="flex flex-wrap gap-2 px-4 justify-between">
              <div class="flex gap-4">
                <div class="flex flex-col pt-[3px]">
                  <p
                    class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                  >
                    Status
                  </p>
                  <select
                    class="font-JakartaSans bg-white w-36 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                    v-model="filterHistory.status"
                  >
                    <option disabled selected>Status</option>
                    <option value="2">Revision</option>
                    <option value="9">Rejected</option>
                    <option value="10">Completed</option>
                  </select>
                </div>

                <div class="flex flex-col pt-[2px]">
                  <p
                    class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                  >
                    Date
                  </p>
                  <VueDatePicker
                    v-model="filterHistory.date"
                    range
                    :enable-time-picker="false"
                    class="my-date"
                  />
                </div>

                <div class="flex gap-4 items-center pt-7">
                  <button
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                    @click="filterDataByTypeHistory()"
                  >
                    <span>
                      <img :src="icon_filter" class="w-5 h-5" />
                    </span>
                    Filter
                  </button>
                  <button
                    class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                    @click="resetDataHistory"
                  >
                    <span>
                      <img :src="icon_reset" class="w-5 h-5" />
                    </span>
                    Reset
                  </button>
                </div>
              </div>

              <div class="pt-8 flex md:mx-0">
                <label class="relative block">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
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
                    v-model="filterHistory.search"
                    @keyup="filterDataByTypeHistory()"
                  />
                </label>
              </div>
            </div>

            <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
              <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
              <select
                class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                v-model="pageMultiplierHistory"
                @change="fetchHistory()"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>

            <tableData v-if="sortedDataHistory.length > 0">
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <input
                        type="checkbox"
                        name="checked"
                        @click="selectAllHistory((checkList = !checkList))"
                      />
                    </div>
                  </th>

                  <th
                    v-for="data in tableHeadHistory"
                    :key="data.Id"
                    class="overflow-x-hidden cursor-pointer"
                    @click="sortListHistory(`${data.jsonData}`)"
                  >
                    <span class="flex justify-center items-center gap-1">
                      {{ data.title }}
                      <button>
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>
                  <th>
                    <div class="text-center">Actions</div>
                  </th>
                </tr>
              </thead>

              <tbody v-if="sortedDataHistory.length > 0">
                <tr
                  class="font-JakartaSans font-normal text-sm"
                  v-for="data in sortedDataHistory"
                  :key="data.id"
                >
                  <td>
                    <input type="checkbox" name="checks" />
                  </td>
                  <td>{{ data.no }}</td>
                  <td>{{ format_date(data.created_at) }}</td>
                  <td>{{ data.no_ca }}</td>
                  <td>{{ data.requestor }}</td>
                  <td>{{ data.item_count }}</td>
                  <td>{{ data.currency_name }}</td>
                  <td>{{ format_price(data.grand_total) }}</td>
                  <td>{{ data.status_approval }}</td>
                  <td class="flex flex-wrap gap-4 justify-center">
                    <button
                      @click="$router.push(`/viewapprovalcatravel/${data.id}`)"
                    >
                      <img :src="iconView" class="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </tableData>

            <div v-else>
              <tableData>
                <thead
                  class="text-center font-JakartaSans text-sm font-bold h-10"
                >
                  <tr>
                    <th>
                      <div class="flex justify-center">
                        <input
                          type="checkbox"
                          name="checked"
                          @click="selectAllHistory((checkList = !checkList))"
                        />
                      </div>
                    </th>

                    <th
                      v-for="data in tableHeadHistory"
                      :key="data.Id"
                      class="overflow-x-hidden cursor-pointer"
                      @click="sortListHistory(`${data.jsonData}`)"
                    >
                      <div class="flex justify-center items-center">
                        <p class="font-JakartaSans font-bold text-sm">
                          {{ data.title }}
                        </p>
                        <button v-if="data.jsonData" class="ml-2">
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colspan="9"
                      class="text-center font-JakartaSans text-base font-medium"
                    >
                      Data not Found
                    </td>
                  </tr>
                </tbody>
              </tableData>
            </div>

            <div
              class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
            >
              <p
                class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
              >
                Showing {{ showingValueFromHistory }} to
                {{ showingValueToHistory }}
                of {{ totalDataHistory }} entries
              </p>
              <vue-awesome-paginate
                :total-items="totalDataHistory"
                :items-per-page="parseInt(pageMultiplierReactiveHistory)"
                :on-click="onChangePageHistory"
                v-model="showingValueHistory"
                :max-pages-shown="4"
                :show-breakpoint-buttons="false"
                :show-ending-buttons="true"
              />
            </div>
          </main>
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
  width: 260px !important;
}
</style>
