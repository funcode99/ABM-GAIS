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
import expandArrow from "@/assets/ExpandArrow.png";
import iconUp from "@/assets/icon-up.png";

import Api from "@/utils/Api";
import moment from "moment";

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

let sortedData = ref([]);
let instanceArray = [];
let Company = ref([]);
let IDCompany = ref(null);
let CompanyName = ref();
let Site = ref([]);
let IDSite = ref(null);
let SiteName = ref();
let Warehouse = ref([]);
let IDWarehouse = ref(null);
let WarehouseName = ref();
let role = ref();
let showSelectADM = ref(false);
let showSelectAll = ref(false);

let showingValue = ref(1);
let showingValueFrom = ref(0);
let showingValueTo = ref(0);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let totalPage = ref(0);
let totalData = ref(0);

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Item Name", jsonData: "created_at" },
  { Id: 3, title: "Date", jsonData: "no_settlement" },
  { Id: 4, title: "Doc No", jsonData: "employee_name" },
  { Id: 5, title: "Qty", jsonData: "nomor_ca" },
  { Id: 6, title: "UOM", jsonData: "total_real" },
];

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const fetchStockReport = async (id) => {
  // if (date.value != undefined) {
  //   if (date.value[0] != null) {
  //     dateStart.value = date.value[0].toISOString().split("T")[0];
  //   }
  //   if (date.value[1] != null) {
  //     dateEnd.value = date.value[1].toISOString().split("T")[0];
  //   }
  //   if (date.value[1] == null) {
  //     dateEnd.value = dateStart.value;
  //   }
  // }

  const params = {
    id_company: IDCompany.value === null ? selectedCompany.value : IDCompany,
    id_site: IDSite.value === null ? selectedSite.value : IDSite,
    id_warehouse: selectedWarehouse.value,
    start_date: null,
    end_date: null,
    search: search.value,
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/stock_in_out/get/", { params });
  instanceArray = res.data.data;
  sortedData.value = instanceArray;
  console.log(sortedData);
  totalPage.value = instanceArray.last_page;
  totalData.value = instanceArray.total;
  showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
  showingValueTo.value = instanceArray.to;
};

const fetchCompany = async () => {
  const companyID = localStorage.getItem("id_company");
  const idSite = localStorage.getItem("id_site");

  role = localStorage.getItem("id_role").replace(/"/g, "");
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (role == "ADMTR") {
    const res = await Api.get("/company/get");
    Company.value = res.data.data;
    showSelectADM = true;
  } else {
    const res = await Api.get(`/company/get/${companyID}`);
    Company.value = res.data.data;
    IDCompany = Company.value[0].id;
    CompanyName = Company.value[0].company_name;
    showSelectAll = true;
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const result = await Api.get(`/company/get_site/${companyID}`);
    Site.value = result.data.data.filter((item) => item.id == idSite);
    IDSite = Site.value[0].id;
    SiteName = Site.value[0].site_name;
  }
};

const fetchSite = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get_site/${id_company}`);
  Site.value = res.data.data;
};

const fetchWarehouseName = async () => {
  const companyID = localStorage.getItem("id_company");
  const idSite = localStorage.getItem("id_site");
  const token = JSON.parse(localStorage.getItem("token"));
  role = localStorage.getItem("id_role").replace(/"/g, "");
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (role == "ADMTR") {
    const res = await Api.get("/warehouse/");
    Warehouse = res.data.data;
  } else {
    const params = {
      id_company: companyID,
      id_site: idSite,
    };
    const res = await Api.get(`/warehouse/`, { params });
    Warehouse = res.data.data;
  }
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchStockReport();
  fetchCompany();
  fetchWarehouseName();
});

const showClearButton = computed(() => {
  return search.value !== "";
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
  }
};

const getIcon = (menu) => {
  return menu === "menu1" ? icon1.value : icon2.value;
};

const showDetails = ref({});
const toggleDetails = (item) => {
  showDetails.value[item.no_urut] = !showDetails.value[item.no_urut];
  return showDetails.value[item.no_urut] === showDetails.value[item.no_urut]
    ? icon1.value
    : icon2.value;
};

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const resetData = () => {
  (selectedCompany.value = ""),
    (selectedSite.value = ""),
    (selectedWarehouse.value = "");
  fetchStockReport();
};

const clearSearch = () => {
  search.value = "";
  fetchStockReport();
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
              @click="fetchStockReport()"
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
                  v-show="showSelectADM"
                  @change="fetchSite(selectedCompany)"
                >
                  <option disabled selected>Company</option>
                  <option v-for="data in Company" :value="data.id">
                    {{ data.company_name }}
                  </option>
                </select>
                <select
                  v-show="showSelectAll"
                  class="font-JakartaSans bg-white w-28 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                >
                  <option>
                    {{ CompanyName }}
                  </option>
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
                  v-show="showSelectADM"
                >
                  <option disabled selected>Site</option>
                  <option v-for="data in Site" :value="data.id">
                    {{ data.site_name }}
                  </option>
                </select>
                <select
                  v-show="showSelectAll"
                  class="font-JakartaSans bg-white w-28 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                >
                  <option>
                    {{ SiteName }}
                  </option>
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
                  <option v-for="data in Warehouse" :value="data.id">
                    {{ data.warehouse_name }}
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

              <div class="flex gap-4 items-center pt-7">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="fetchStockReport()"
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
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
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
              <template
                v-if="showMenu1"
                v-for="item in sortedData.stock_in"
                :key="item.no_urut"
              >
                <tr @click="toggleDetails(item)">
                  <td>{{ item.no_urut }}</td>
                  <td>
                    <div class="flex items-center justify-center">
                      <p>{{ item.item_name }}</p>
                      <img
                        v-if="showDetails[item.no_urut]"
                        :src="iconUp"
                        class="mt-1 ml-3 w-[12px] h-[8px]"
                      />
                      <img
                        v-if="!showDetails[item.no_urut]"
                        :src="expandArrow"
                        class="mt-1 ml-3 w-[12px] h-[8px]"
                      />
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.uom_name }}</td>
                </tr>

                <template
                  v-if="showDetails[item.no_urut]"
                  v-for="detailItem in item.detail"
                  :key="detailItem.no"
                >
                  <tr>
                    <td>{{ detailItem.no }}</td>
                    <td></td>
                    <td>{{ format_date(detailItem.created_at) }}</td>
                    <td>{{ detailItem.no_dokumen }}</td>
                    <td>{{ detailItem.qty }}</td>
                    <td>{{ detailItem.uom_name }}</td>
                  </tr>
                </template>
              </template>

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
              <template
                v-if="showMenu2"
                v-for="item in sortedData.stock_out"
                :key="item.no_dokumen"
              >
                <tr @click="toggleDetails(item)">
                  <td>{{ item.no_urut }}</td>
                  <td>
                    <div class="flex items-center justify-center">
                      <p>{{ item.item_name }}</p>
                      <img
                        v-if="showDetails[item.no_urut]"
                        :src="iconUp"
                        class="mt-1 ml-3 w-[12px] h-[8px]"
                      />
                      <img
                        v-if="!showDetails[item.no_urut]"
                        :src="expandArrow"
                        class="mt-1 ml-3 w-[12px] h-[8px]"
                      />
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.uom_name }}</td>
                </tr>

                <template
                  v-if="showDetails[item.no_urut]"
                  v-for="detailItem in item.detail"
                  :key="detailItem.no"
                >
                  <tr>
                    <td>{{ detailItem.no }}</td>
                    <td></td>
                    <td>{{ format_date(detailItem.created_at) }}</td>
                    <td>{{ detailItem.no_dokumen }}</td>
                    <td>{{ detailItem.qty }}</td>
                    <td>{{ detailItem.uom_name }}</td>
                  </tr>
                </template>
              </template>
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
