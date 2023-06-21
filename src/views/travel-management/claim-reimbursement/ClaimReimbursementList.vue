<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import DataNotFound from "@/components/element/dataNotFound.vue";

import ModalAdd from "@/components/tms-claim-reimbursement/ModalAdd.vue";
import selectAllCheckbox from "@/utils/selectAllCheckbox";

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

import { ref, onBeforeMount, computed, reactive } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();
const listStatus = [
  { id: 0, title: "Draft" },
  { id: 1, title: "Waiting Approval" },
  { id: 2, title: "Revision" },
  { id: 9, title: "Rejected" },
  { id: 10, title: "Completed" },
];

// format date & price
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
//for sort, search, & filter
let sortedData = ref([]);
let listReimbursementType = ref([]);
let listType = ref([]);

let deleteArray = ref([]);
let sortedbyASC = true;
let instanceArray = [];
let paginationArray = [];
let lengthCounter = 0;
let visibleModal = ref(false);
let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));

let filter = reactive({
  status: "",
  date: "",
  search: "",
  type: "",
});

//for paginations
let showingValue = ref(1);
let showingValueFrom = ref(0);
let showingValueTo = ref(0);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let totalPage = ref(0);
let totalData = ref(0);

//for paginations
const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
  fetch(pageOfItem);
};

//for check & uncheck all
const selectAll = (checkValue) => {
  selectAllCheckbox(checkValue, deleteArray, sortedData);
};

//for tablehead
const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "Claim No", jsonData: "no_claim" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "Total", jsonData: "total_tlk" },
  { Id: 6, title: "Status", jsonData: "status" },
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
  fetch();
  fetchTypeReimbursement();
  fetchType();
});

//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.claim_no.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.requestor.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.claim_no.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.requestor.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  lengthCounter = sortedData.value.length;
  onChangePage(1);
};

// get data
const fetch = async (id) => {
  let payload = {
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("claim_reimbursement/get_data", {
    params: payload,
  });
  paginationArray = api.data.data;
  instanceArray = paginationArray.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  totalPage.value = paginationArray.last_page;
  totalData.value = paginationArray.total;
  showingValueFrom.value = paginationArray.from;
  showingValueTo.value = paginationArray.to;
};

const fetchTypeReimbursement = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("reimbursement");
  instanceArray = api.data.data.data;
  listReimbursementType.value = instanceArray;
};

const fetchType = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  let payload = {
    id_employee: selectedEmployee,
  };
  const api = await Api.get("claim_reimbursement/get_travel", {
    params: payload,
  });
  instanceArray = api.data.data;
  listType.value = instanceArray;
};

const resetData = () => {
  filter.search = "";
  filter.status = "";
  filter.date = "";
  filter.type = "";
  deleteArray.value = [];
  fetch();
  fetchTypeReimbursement();
  fetchType();
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
  const api = await Api.get("claim_reimbursement/get_data", {
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
  showingValueFrom.value = paginationArray.from;
  showingValueTo.value = paginationArray.to;
  showingValue.value = paginationArray.current_page;
};

// delete data
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
      Api.delete(`claim_reimbursement/delete_data/${event}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Data has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });

        fetch();
      });
    } else {
      return;
    }
  });
};
const deleteCheckedArray = () => {
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
      let payload = {
        id: deleteArray.value,
      };
      Api.delete(`claim_reimbursement/delete_data/`, { params: payload }).then(
        (res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });

          if (sortedData.value.length == 1) {
            router.go();
          } else {
            fetch();
          }
        }
      );
    } else {
      return;
    }
  });
};
// end

const closeModal = () => {
  visibleModal.value = false;
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />
    <div class="flex w-screen h-full mt-[115px]">
      <Sidebar class="flex-none fixed" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Claim Reimbursement
            </p>
            <div class="flex gap-4">
              <div
                v-if="deleteArray.length > 0"
                class="flex gap-2 items-center"
              >
                <h1 class="font-semibold">{{ deleteArray.length }} Selected</h1>
                <button
                  @click="deleteCheckedArray"
                  class="bg-[#f4446c] py-3 px-4 text-xs rounded-lg text-white"
                >
                  Delete Selected
                </button>
              </div>
              <label
                @click="visibleModal = true"
                for="my-modal-claim"
                class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
                >+ Add New</label
              >

              <ModalAdd
                v-if="visibleModal"
                @close="closeModal"
                :list-reimbursement-type="listReimbursementType"
                :list-type="listType"
                :visible="visibleModal"
              />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT & DATE -->
          <div
            class="grid grid-flow-col auto-cols-max justify-between gap-2 px-4 pb-4"
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
                  <option disabled selected>status</option>
                  <option
                    v-for="data in listStatus"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.title }}
                  </option>
                </select>
              </div>

              <!-- <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Type
                </p>
                <select
                  class="font-JakartaSans bg-white w-24 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="filter.type"
                >
                  <option disabled selected>Type</option>
                  <option v-for="data in listReimbursementType" :key="data.id">
                    {{ data.reimbursement_type }}
                  </option>
                </select>
              </div> -->

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
                  format="yyyy-mm-dd"
                />
              </div>

              <div class="flex gap-4 items-center pt-6">
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
                  @keyup="filterDataByType"
                />
              </label>
            </div>
          </div>

          <!-- SHOWING -->
          <div class="flex items-center gap-1 pt-2 pb-4 px-4 h-4">
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
                    <th>
                      <div class="text-center">Actions</div>
                    </th>
                  </tr>
                </thead>

                <tbody v-if="sortedData.length > 0">
                  <tr
                    class="font-JakartaSans font-normal text-sm"
                    v-for="(data, index) in sortedData"
                    :key="data.no"
                  >
                    <td>
                      <input
                        type="checkbox"
                        name="checks"
                        :value="data.id"
                        v-model="deleteArray"
                      />
                    </td>
                    <td>{{ (showingValue - 1) * 10 + index + 1 }}</td>
                    <td>{{ format_date(data.created_at) }}</td>
                    <td>{{ data.no_claim }}</td>
                    <td>{{ data.employee_name }}</td>
                    <td>{{ format_price(data.grand_total) }}</td>
                    <td>{{ data.status }}</td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <button @click="$router.push(`/viewclaimreimbursement/${data.id}`)">
                        <img :src="editicon" class="w-6 h-6" />
                      </button>
                      <button @click="deleteData(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <DataNotFound :cnt-col="8" />
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
              Showing {{ showingValueFrom }} to
              {{ showingValueTo }}
              of {{ totalData }} entries
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
  width: 260px !important;
}
</style>
