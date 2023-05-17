<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import ModalAdd from "@/components/reference/warehouse/ModalAdd.vue";
import ModalEdit from "@/components/reference/warehouse/ModalEdit.vue";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import icon_receive from "@/assets/icon-receive.svg";

import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import Swal from "sweetalert2";

import Api from "@/utils/Api";

import { useFormEditStore } from "@/stores/reference/warehouse/edit-modal.js";
import { ref, onBeforeMount, onMounted, computed } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();
const formEditState = useFormEditStore();

let warehouseName = ref("");
let warehouseIdCompany = ref("");
let warehouseIdSite = ref();

let editWarehouseDataId = ref();

//for edit
const editWarehouse = async (data) => {
  editWarehouseDataId.value = data;
  setTimeout(callEditApi, 500);
  // console.log("ini data id:" + data);
};

//for edit
const callEditApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  await Api.post(`/warehouse/update_data/${editWarehouseDataId.value}`, {
    warehouse_name: formEditState.warehouse.warehouseName,
    id_company: formEditState.warehouse.warehouseIdCompany,
    id_site: formEditState.warehouse.warehouseIdSite,
  });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  fetchWarehouse();
};

//for sort & search
const search = ref("");
let sortedData = ref([]);
let sortedbyASC = true;
let instanceArray = [];
let lengthCounter = 0;
let lockScrollbar = ref(false);

let selectedCompany = ref("Company");
let Company = ref("");

//for paginations
let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);

//for paginations
const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
};

//for filter & reset button
const filterDataByCompany = () => {
  if (selectedCompany.value === "Company") {
    sortedData.value = instanceArray;
  } else {
    sortedData.value = instanceArray.filter(
      (item) => item.id_company === selectedCompany.value
    );
  }
};

//for filter & reset button
const resetData = () => {
  sortedData.value = instanceArray;
  selectedCompany.value = "Company";
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
  { Id: 2, title: "Warehouse Name", jsonData: "warehouse_name" },
  { Id: 3, title: "Company", jsonData: "company" },
  { Id: 4, title: "Site", jsonData: "site" },
  { Id: 4, title: "Actions" },
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

onBeforeMount(() => {
  getSessionForSidebar();
  fetchWarehouse();
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
});

//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.warehouse_name.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.company_name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.warehouse_name.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.company_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  lengthCounter = sortedData.value.length;
  onChangePage(1);
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
});

//get all warehouse
const fetchWarehouse = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/warehouse/");
  // console.log(res.data.data);
  instanceArray = res.data.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
};

//delete brand
const deleteWarehouse = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Api.delete(`/warehouse/delete_data/${id}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Warehouse has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
        fetchWarehouse();
      });
    } else {
      return;
    }
  });
};
</script>

<template>
  <div
    class="flex flex-col w-full this h-[100vh]"
    :class="lockScrollbar === true ? 'fixed' : ''"
  >
    <Navbar />
    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Warehouse
            </p>

            <div class="flex gap-4">
              <ModalAdd
                @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                @warehouse-saved="fetchWarehouse"
              />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT & SEARCH -->
          <div
            class="grid grid-flow-col auto-cols-max justify-between items-center mx-4"
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
                  v-model="selectedCompany"
                >
                  <option disabled selected>Company</option>
                  <option v-for="company in Company" :value="company.id">
                    {{ company.company_name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-wrap gap-4 items-center pt-6">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="filterDataByCompany"
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
                    v-for="(data, index) in sortedData.slice(
                      paginateIndex * pageMultiplierReactive,
                      (paginateIndex + 1) * pageMultiplierReactive
                    )"
                    :key="data.no"
                  >
                    <td>
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.warehouse_name }}</td>
                    <td>{{ data.company_name }}</td>
                    <td>{{ data.site_name }}</td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <ModalEdit
                        @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                        @change-warehouse="editWarehouse(data.id)"
                        :formContent="[
                          data.warehouseName,
                          data.warehouseIdCompany,
                          data.warehouseIdSite,
                        ]"
                      />
                      <button @click="deleteWarehouse(data.id)">
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
</style>
