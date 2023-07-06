<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";
import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue";

import icon_receive from "@/assets/icon-receive.svg";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import Api from "@/utils/Api";
import moment from "moment";

import { Workbook } from "exceljs";
import { ref, onBeforeMount, computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();

const selectedStatus = ref("");
const selectedCatype = ref("");
const search = ref("");
const date = ref();
const dateStart = ref();
const dateEnd = ref();

let sortedData = ref([]);
let sortedbyASC = true;
let instanceArray = [];

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

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "Settlement No", jsonData: "no_settlement" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "CA No", jsonData: "nomor_ca" },
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
  if (date.value != undefined) {
    if (date.value[0] != null) {
      dateStart.value = date.value[0].toISOString().split("T")[0];
    }
    if (date.value[1] != null) {
      dateEnd.value = date.value[1].toISOString().split("T")[0];
    }
    if (date.value[1] == null) {
      dateEnd.value = dateStart.value;
    }
  }

  const params = {
    ca_type: selectedCatype.value,
    start_date: dateStart.value,
    end_date: dateEnd.value,
    status: selectedStatus.value,
    search: search.value,
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/settlement/report", { params });
  instanceArray = res.data.data;
  sortedData.value = instanceArray.data;
  totalPage.value = instanceArray.last_page;
  totalData.value = instanceArray.total;
  showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
  showingValueTo.value = instanceArray.to;
};

onBeforeMount(() => {
  fetchSettlementReport();
  getSessionForSidebar();
});

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

const resetData = () => {
  selectedCatype.value = "";
  selectedStatus.value = "";
  dateStart.value = "";
  dateEnd.value = "";
  date.value = null;
  fetchSettlementReport();
};

const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Settlement Reports");

  const tableHead = [
    { title: "Nomor" },
    { title: "Created Date" },
    { title: "Settlement No" },
    { title: "Requestor" },
    { title: "CA No" },
    { title: "Nominal Real" },
    { title: "Status" },
  ];

  tableHead.forEach((column, index) => {
    worksheet.getCell(1, index + 1).value = column.title;
  });

  sortedData.value.forEach((data, rowIndex) => {
    worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1;
    worksheet.getCell(rowIndex + 2, 2).value = data.created_at;
    worksheet.getCell(rowIndex + 2, 3).value = data.no_settlement;
    worksheet.getCell(rowIndex + 2, 4).value = data.employee_name;
    worksheet.getCell(rowIndex + 2, 5).value = data.nomor_ca;
    worksheet.getCell(rowIndex + 2, 6).value = data.total_real;
    worksheet.getCell(rowIndex + 2, 7).value = data.status;
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "settlement_report_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  });
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
                @keyup="fetchSettlementReport()"
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
                  <option value="1">Travel</option>
                  <option value="2">Non Travel</option>
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
                  @input="handleDateRangeChange(date)"
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
                  <option value="0">Draft</option>
                  <option value="1">Waiting Approval</option>
                  <option value="2">Revision</option>
                  <option value="9">Rejected</option>
                  <option value="10">Completed</option>
                </select>
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

          <!-- SHOWING -->
          <div class="flex items-center gap-1 py-4 px-4 h-4">
            <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
            <select
              class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              v-model="pageMultiplier"
              @change="fetchSettlementReport()"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </div>

          <!-- TABLE -->
          <tableData v-if="sortedData.length > 0">
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

            <tbody>
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="data in sortedData"
                :key="data.id"
              >
                <td>{{ data.no }}</td>
                <td>{{ format_date(data.created_at) }}</td>
                <td>{{ data.no_settlement }}</td>
                <td>{{ data.employee_name }}</td>
                <td>{{ data.no_ca }}</td>
                <td>{{ format_price(data.total_real) }}</td>
                <td>{{ data.status }}</td>
              </tr>
            </tbody>
          </tableData>

          <tableData
            v-else-if="sortedData.length == 0 && instanceArray.length == 0"
          >
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
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

            <SkeletonLoadingTable :column="7" :row="5" />
          </tableData>

          <div v-else>
            <tableData>
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
                <tr>
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
                    colspan="7"
                    class="text-center font-JakartaSans text-base font-medium"
                  >
                    Data not Found
                  </td>
                </tr>
              </tbody>
            </tableData>
          </div>

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
