<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";

import ModalAddCaNonTravelVue from "@/components/cash-advance/ModalAddCaNonTravel.vue";

import icon_receive from "@/assets/icon-receive.svg";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import Api from "@/utils/Api";
import moment from "moment";
import Swal from "sweetalert2";

import { Workbook } from "exceljs";
import { ref, onBeforeMount, computed, reactive } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const showFullText = ref({});

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
  fetch(pageOfItem);
};

const listStatus = [
  { id: 2, title: "Draft" },
  { id: 3, title: "Waiting Approval" },
  { id: 4, title: "Revision" },
  { id: 9, title: "Fully Rejected" },
  { id: 10, title: "Completed" },
];

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "CA No", jsonData: "no_ca" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "Event Date", jsonData: "date" },
  { Id: 6, title: "Event", jsonData: "event" },
  { Id: 7, title: "Total", jsonData: "grand_total" },
  { Id: 8, title: "Status", jsonData: "status" },
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

const selectAll = (checkValue) => {
  const check = document.getElementsByName("checks");
  const btnDelete = document.getElementById("btnDelete");

  if (checkValue === true) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = true;
      }
    }
    btnDelete.style.display = "block";
  } else {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = false;
      }
    }
    btnDelete.style.display = "none";
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
  const api = await Api.get("cash_advance/non_travel/", { params: payload });

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

  const api = await Api.get("cash_advance/non_travel", { params: payload });

  paginationArray = api.data.data;
  instanceArray = paginationArray.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  totalPage.value = paginationArray.last_page;
  totalData.value = paginationArray.total;
  showingValueFrom.value = paginationArray.from;
  showingValueTo.value = paginationArray.to;
  showingValue.value = paginationArray.current_page;
};

const deleteData = async (event) => {
  Swal.fire({
    title:
      "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
    html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
    iconHtml: `<img src="${icondanger}" />`,
    showCloseButton: true,
    closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
    showCancelButton: true,
    buttonsStyling: false,
    cancelButtonText: "Cancel",
    customClass: {
      cancelButton: "swal-cancel-button",
      confirmButton: "swal-confirm-button",
    },
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Api.delete(`/cash_advance/delete_data/${event}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Data has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });

        if (sortedData.value.length == 1) {
          router.go();
        } else {
          fetch();
        }
      });
    } else {
      return;
    }
  });
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetch();
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

const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Cash Advance Non Travel Reports");

  const tableHead = [
    { title: "Nomor" },
    { title: "Created Date" },
    { title: "CA No" },
    { title: "Requestor" },
    { title: "Event Date" },
    { title: "Event" },
    { title: "Total" },
    { title: "Status" },
  ];

  tableHead.forEach((column, index) => {
    worksheet.getCell(1, index + 1).value = column.title;
  });

  sortedData.value.forEach((data, rowIndex) => {
    worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1;
    worksheet.getCell(rowIndex + 2, 2).value = data.created_at;
    worksheet.getCell(rowIndex + 2, 3).value = data.no_ca;
    worksheet.getCell(rowIndex + 2, 4).value = data.employee_name;
    worksheet.getCell(rowIndex + 2, 5).value = data.date;
    worksheet.getCell(rowIndex + 2, 6).value = data.event;
    worksheet.getCell(rowIndex + 2, 7).value = data.grand_total;
    worksheet.getCell(rowIndex + 2, 8).value = data.status;
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cash_advance_non_travel_report_data.xlsx";
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

      <tableContainer style="overflow: auto">
        <tableTop>
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Cash Advance Non Travel
            </p>
            <div class="flex gap-4">
              <button
                class="btn text-white font-JakartaSans text-xs font-bold capitalize bg-red border-red hover:bg-white hover:border-red hover:text-red"
                id="btnDelete"
                style="display: none"
              >
                Delete
              </button>
              <ModalAddCaNonTravelVue />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                @click="exportToExcel"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <div
            class="grid grid-flow-col auto-cols-max gap-2 px-4 pb-2 justify-between"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Status
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="filter.status"
                >
                  <option disabled selected>Status</option>
                  <option
                    v-for="data in listStatus"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.title }}
                  </option>
                </select>
              </div>
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
                <th>
                  <div class="text-center">Actions</div>
                </th>
              </tr>
            </thead>

            <tbody v-if="sortedData.length > 0">
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="data in sortedData"
                :key="data.no"
              >
                <td>
                  <input type="checkbox" name="checks" />
                </td>
                <td>{{ data.no }}</td>
                <td>{{ format_date(data.created_at) }}</td>
                <td>{{ data.no_ca }}</td>
                <td>{{ data.employee_name }}</td>
                <td>{{ format_date(data.date) }}</td>
                <td>
                  <span
                    :class="[
                      'readmore-text',
                      showFullText[data.id] ? 'show-full' : '',
                    ]"
                  >
                    {{ data.event }}
                  </span>
                </td>
                <td>{{ format_price(data.grand_total) }}</td>
                <td>{{ data.status }}</td>
                <td>
                  <div class="items-center">
                    <router-link :to="`/viewcashadvancenontravel/${data.id}`">
                      <button>
                        <img :src="editicon" class="w-6 h-6" />
                      </button>
                    </router-link>
                    <button @click="deleteData(data.id)">
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
                  </div>
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

.my-date {
  width: 260px !important;
}

.readmore-text {
  display: inline-block;
  max-width: 300px;
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
</style>
