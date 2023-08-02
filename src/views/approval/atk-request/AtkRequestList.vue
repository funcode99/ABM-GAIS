<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

// import ModalRejectShortcutAtk from "@/components/approval/atk-request/ModalRejectShortcutAtk.vue";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import icon_ceklis from "@/assets/icon_ceklis.svg";
import iconClose from "@/assets/navbar/icon_close.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icon_receive from "@/assets/icon-receive.svg";
import viewicon from "@/assets/eye.png";

// import atkrequestdata from "../../../utils/Api/approval/atk-request/atkrequestdata.js";

import { ref, onBeforeMount, computed } from "vue";
import Api from "@/utils/Api";
import { useSidebarStore } from "@/stores/sidebar.js";
import Swal from "sweetalert2";
import moment from "moment";
const sidebar = useSidebarStore();

//for sort & search
const start_date = ref("");
const end_date = ref("");
const search = ref("");
const searchFilter = ref("");
let sortedData = ref([]);
const selectedType =
  JSON.parse(localStorage.getItem("id_role")) === "ADMTR"
    ? ref("")
    : ref(JSON.parse(localStorage.getItem("id_company")));
let sortedbyASC = true;
let itemdata = ref("");
let instanceArray = [];
let lengthCounter = 0;
let Company = ref("");
const status = ref("");
//for paginations
let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let lenghtPagination = ref(0);

//for paginations
const onChangePage = (pageOfItem) => {
  fetchData(
    pageOfItem,
    selectedType.value,
    status.value,
    start_date.value,
    end_date.value,
    searchFilter.value,
    pageMultiplier.value
  );
};

//for filter & reset button
const filterDataByType = () => {
  const start = moment(String(start_date.value[0])).format("YYYY-MM-DD");
  const end = moment(String(start_date.value[1])).format("YYYY-MM-DD");
  // console.log(test)
  if (start_date.value[0] == undefined) {
    fetchData(
      1,
      selectedType.value,
      status.value,
      "",
      "",
      searchFilter.value,
      pageMultiplier.value
    );
  } else {
    fetchData(
      1,
      selectedType.value,
      status.value,
      start,
      end,
      searchFilter.value,
      pageMultiplier.value
    );
  }
};

//for filter & reset button
const resetData = () => {
  selectedType.value =
    JSON.parse(localStorage.getItem("id_role")) === "ADMTR"
      ? ""
      : JSON.parse(localStorage.getItem("id_company"));
  status.value = "";
  start_date.value = "";
  end_date.value = "";
  fetchData(
    showingValue.value,
    selectedType.value,
    "",
    "",
    "",
    searchFilter.value,
    pageMultiplier.value
  );
};

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
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_date" },
  { Id: 3, title: "Request No", jsonData: "no_atk_request" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "Item Count", jsonData: "item_count" },
  { Id: 6, title: "Status", jsonData: "status" },
  { Id: 7, title: "Actions" },
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
const perPage = async () => {
  // console.log(pageMultiplier.value)
  fetchData(
    showingValue.value,
    selectedType.value,
    status.value,
    start_date.value,
    end_date.value,
    searchFilter.value,
    pageMultiplier.value
  );
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchData = async (
  page,
  selectedType,
  status,
  start_date,
  end_date,
  search,
  perpage
) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  Api.get(
    `/approval_request_atk/get_data?page=${page}&id_company=${selectedType}&start_date=${start_date}&end_date=${end_date}&search=${search}&perPage=${perpage}`
  )
    .then((res) => {
      // console.log(res.data.data)
      itemdata.value = res.data.data.data;
      instanceArray = itemdata.value;
      // console.log(instanceArray)
      sortedData.value = instanceArray;
      lengthCounter = sortedData.value.length;
      lenghtPagination = res.data.data.total;
      paginateIndex.value = res.data.data.current_page - 1;
      showingValue.value = res.data.data.current_page;
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(error.response.data.message)
    });
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
onBeforeMount(() => {
  getSessionForSidebar();
  fetchData(
    showingValue.value,
    selectedType.value,
    status.value,
    start_date.value,
    end_date.value,
    searchFilter.value,
    pageMultiplier.value
  );
});

//for searching
const filteredItems = (search) => {
  fetchData(
    1,
    selectedType.value,
    status.value,
    start_date.value,
    end_date.value,
    search,
    pageMultiplier.value
  );
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD-MM-YYYY");
  }
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none fixed" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div class="flex flex-wrap items-center justify-between mx-4 py-2">
            <p class="font-JakartaSans text-[#0A0A0A] font-semibold">
              Approval ATK Request
            </p>

            <button
              class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
            >
              <img :src="icon_receive" class="w-6 h-6" />
            </button>
          </div>

          <!-- SORT, DATE & SEARCH -->

          <div
            class="grid grid-flow-col auto-cols-max justify-between items-center mx-4 py-2"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex flex-wrap gap-4 items-center">
                <div>
                  <p
                    class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                  >
                    Date
                  </p>

                  <VueDatePicker
                    v-model="start_date"
                    range
                    :enable-time-picker="false"
                    class="my-date lg:w-10"
                    format="dd-MM-yyyy"
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

            <div class="pt-6 w-full">
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
              @change="perPage"
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
                class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
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
                    v-for="(data, index) in sortedData"
                    :key="data.id"
                  >
                    <td class="p-0">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ (showingValue - 1) * pageMultiplier + 1 + index }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ format_date(data.created_at) }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.no_atk_request }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.employee_name }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.item_count }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      <span
                        :class="
                          data.status == 'Waiting Approval'
                            ? 'status-default'
                            : data.status == 'Cancelled'
                            ? 'status-revision'
                            : data.status == 'Completed'
                            ? 'status-done'
                            : data.status == 'Partial Completed'
                            ? 'status-partial'
                            : 'font-bold'
                        "
                        >{{ data.status }}</span
                      >
                    </td>
                    <td class="flex flex-nowrap gap-1 justify-center">
                      <router-link :to="`/viewapprovalatkrrequest/${data.id}`" >
                        <button>
                          <img :src="icon_ceklis" class="w-6 h-6" v-if="data.status == 'Waiting Approval'"/>
                          <img :src="viewicon" class="w-6 h-6" v-else/>
                        </button>
                      </router-link>
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
              {{ Math.min(showingValue * pageMultiplier, lenghtPagination) }}
              of {{ lenghtPagination }} entries
            </p>
            <vue-awesome-paginate
              :total-items="lenghtPagination"
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
  width: 300px !important;
}

.status-partial {
  color: #ef9d22;
  font-weight: 800;
}

.status-default {
  color: #2970ff;
  font-weight: 800;
}

.status-done {
  color: #00c851;
  font-weight: 800;
}

.status-revision {
  color: #ef3022;
  font-weight: 800;
}
</style>
