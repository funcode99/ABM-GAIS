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

const selectedCompany = ref("");
const selectedDepartement = ref("");
const selectedStatus = ref("");
const selectedCartype = ref("");
const search = ref("");
const date = ref();
const dateStart = ref();
const dateEnd = ref();

const month = ref();
const monthFormat = "MM";
const monthValueFormat = "MM";
const year = ref();

let Company = ref([]);
let Car = ref([]);
let Departement = ref([]);
let Status = ref([]);

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
  fetchPoolCarReport(pageOfItem);
};

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "Doc No", jsonData: "plate" },
  { Id: 4, title: "Requestor", jsonData: "from_date" },
  { Id: 5, title: "Item Name", jsonData: "to_date" },
  { Id: 6, title: "Qty", jsonData: "odometer" },
  { Id: 7, title: "Uom", jsonData: "odometer" },
  { Id: 8, title: "Status", jsonData: "status" },
];

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

// const fetchPoolCarReport = async (id) => {
//   if (date.value != undefined) {
//     if (date.value[0] != null) {
//       dateStart.value = date.value[0].toISOString().split("T")[0];
//     }
//     if (date.value[1] != null) {
//       dateEnd.value = date.value[1].toISOString().split("T")[0];
//     }
//     if (date.value[1] == null) {
//       dateEnd.value = dateStart.value;
//     }
//   }

//   const params = {
//     start_date: dateStart.value,
//     end_date: dateEnd.value,
//     status: selectedStatus.value,
//     search: search.value,
//     perPage: pageMultiplier.value,
//     page: id ? id : 1,
//     id_company: selectedCompany.value,
//     id_departement: selectedDepartement.value,
//     type_car: selectedCartype.value,
//   };
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   const res = await Api.get("/pool_car/report", { params });
//   instanceArray = res.data.data;
//   sortedData.value = instanceArray.data;
//   totalPage.value = instanceArray.last_page;
//   totalData.value = instanceArray.total;
//   showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
//   showingValueTo.value = instanceArray.to;
// };

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
};

const fetchDepartement = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get_departement/${id_company}`);
  Departement.value = res.data.data;
};

onBeforeMount(() => {
  getSessionForSidebar();
  //   fetchPoolCarReport();
  fetchCompany();
});

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const resetData = () => {
  (selectedCompany.value = ""),
    (selectedDepartement.value = ""),
    (selectedCartype.value = "");
  selectedStatus.value = "";
  dateStart.value = "";
  dateEnd.value = "";
  date.value = null;
  fetchPoolCarReport();
};

const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Pool Car Usage Reports");

  const tableHead = [
    { title: "Nomor" },
    { title: "Created Date" },
    { title: "Plate" },
    { title: "From Date" },
    { title: "To Date" },
    { title: "KM Travelled" },
    { title: "Status" },
  ];

  tableHead.forEach((column, index) => {
    worksheet.getCell(1, index + 1).value = column.title;
  });

  sortedData.value.forEach((data, rowIndex) => {
    worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1;
    worksheet.getCell(rowIndex + 2, 2).value = data.created_at;
    worksheet.getCell(rowIndex + 2, 3).value = data.plate;
    worksheet.getCell(rowIndex + 2, 4).value = data.from_date;
    worksheet.getCell(rowIndex + 2, 5).value = data.to_date;
    worksheet.getCell(rowIndex + 2, 6).value = data.odometer;
    worksheet.getCell(rowIndex + 2, 7).value = data.status;
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pool_car_usage_report_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  });
};

const clearSearch = () => {
  search.value = "";
  fetchPoolCarReport();
};

const showClearButton = computed(() => {
  return search.value !== "";
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
              ATK Request Reports
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
              @click="fetchPoolCarReport()"
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
                  Item
                </p>
                <select
                  class="font-JakartaSans bg-white w-28 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedStatus"
                >
                  <option disabled selected>Item</option>
                  <!-- <option v-for="data in Status" :value="data.code">
                    {{ data.status }}
                  </option> -->
                  <option>Item A</option>
                  <option>Item B</option>
                </select>
              </div>

              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Company
                </p>
                <select
                  class="font-JakartaSans bg-white w-28 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedCompany"
                  @change="fetchDepartement(selectedCompany)"
                >
                  <option disabled selected>Company</option>
                  <option v-for="data in Company" :value="data.id">
                    {{ data.company_name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col pt-[2px]">
                <p
                  class="capitalize font-JakartaSans text-sm text-black font-medium pb-2"
                >
                  Departement
                </p>
                <select
                  class="font-JakartaSans bg-white w-28 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedDepartement"
                >
                  <option disabled selected>Departement</option>
                  <option v-for="data in Departement" :value="data.id">
                    {{ data.departement_name }}
                  </option>
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

              <div class="flex gap-2 items-center pt-7">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="fetchPoolCarReport()"
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
              @change="fetchPoolCarReport()"
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
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr class="font-JakartaSans font-normal text-sm">
                <!-- <td>{{ data.no }}</td>
                <td>{{ format_date(data.created_at) }}</td>
                <td>{{ data.plate }}</td>
                <td>{{ format_date(data.from_date) }}</td>
                <td>{{ format_date(data.to_date) }}</td>
                <td>{{ data.odometer }}</td>
                <td>{{ data.status }}</td> -->
                <td>1</td>
                <td>23/04/23</td>
                <td>OUT-ABM/1232/23.04</td>
                <td>Kia B</td>
                <td>Pen</td>
                <td>12</td>
                <td>Pc</td>
                <td>Completed</td>
              </tr>
              <tr class="font-JakartaSans font-normal text-sm">
                <td>2</td>
                <td>23/04/23</td>
                <td>OUT-ABM/1232/23.04</td>
                <td>Jack K</td>
                <td>Pencil</td>
                <td>2</td>
                <td>Pc</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </tableData>

          <!-- <tableData
            v-else-if="sortedData.length == 0 && instanceArray.length == 0"
          >
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <div class="flex justify-center items-center">
                    <p class="font-JakartaSans font-bold text-sm">
                      {{ data.title }}
                    </p>
                  </div>
                </th>
              </tr>
            </thead>

            <SkeletonLoadingTable :column="7" :row="5" />
          </tableData> -->

          <!-- <div v-else>
            <tableData>
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
                <tr>
                  <th
                    v-for="data in tableHead"
                    :key="data.Id"
                    class="overflow-x-hidden cursor-pointer"
                  >
                    <div class="flex justify-center items-center">
                      <p class="font-JakartaSans font-bold text-sm">
                        {{ data.title }}
                      </p>
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
          </div> -->

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
  width: 160px !important;
}

input.nosubmit {
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}
</style>
