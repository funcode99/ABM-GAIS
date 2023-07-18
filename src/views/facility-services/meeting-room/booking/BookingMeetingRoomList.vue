<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import DataNotFound from "@/components/element/dataNotFound.vue";

import ModalAddBookingRoom from "@/components/facility-services/booking-meeting-room/ModalAdd.vue";
import selectAllCheckbox from "@/utils/selectAllCheckbox";

import icon_receive from "@/assets/icon-receive.svg";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";
import viewicon from "@/assets/eye.png";

import Api from "@/utils/Api";
import moment from "moment";
import Swal from "sweetalert2";

import { ref, onBeforeMount, computed, onMounted, reactive } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();
const listStatus = [
  { id: 1, title: "Booked" },
  { id: 10, title: "Done" },
  { id: 9, title: "Cancelled" },
];
let statusForm = ref("add");
let visibleModal = ref(false);
let idItem = ref(0);
//for sort & search
let sortedData = ref([]);
let deleteArray = ref([]);
let listRoom = ref([]);

let sortedbyASC = true;
let instanceArray = [];
let paginationArray = [];
let lengthCounter = 0;
let lockScrollbar = ref(false);
let sortedDataReactive = computed(() => sortedData.value);
let sortAscending = true;
const showFullText = ref({});
let checkList = false;
let filter = reactive({
  status: "",
  date: "",
  search: "",
  room: "",
});
const id_site = JSON.parse(localStorage.getItem("id_site"));
const id_role = JSON.parse(localStorage.getItem("id_role"));
const roles = ["ADMTR"];
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
  { Id: 2, title: "Booking No", jsonData: "no_booking_meeting" },
  { Id: 3, title: "Requestor", jsonData: "employee_name" },
  { Id: 4, title: "Title", jsonData: "title" },
  { Id: 5, title: "Meeting Room", jsonData: "available_status" },
  { Id: 6, title: "Date", jsonData: "start_date" },
  { Id: 7, title: "Time", jsonData: "status" },
  { Id: 8, title: "Site", jsonData: "site_name" },
  { Id: 9, title: "Status", jsonData: "status" },
];

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

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

//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.ca_no.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.event.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.ca_no.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.event.toLowerCase().indexOf(search.toLowerCase()) > -1)
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
  const api = await Api.get("book_meeting_room/get", { params: payload });
  paginationArray = api.data.data;
  instanceArray = paginationArray.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  totalPage.value = paginationArray.last_page;
  totalData.value = paginationArray.total;
  showingValueFrom.value = paginationArray.from ? paginationArray.from : 0;
  showingValueTo.value = paginationArray.to;
};

const fetchListRoom = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (id_role == "ADMTR") {
    const api = await Api.get(`master_meeting_room/get`);
    listRoom.value = api.data.data;
  } else {
    const api = await Api.get(`master_meeting_room/get_by_site/${id_site}`);
    listRoom.value = api.data.data;
  }
};

const resetData = () => {
  filter.search = "";
  filter.status = "";
  filter.date = "";
  filter.room = "";
  deleteArray.value = [];
  fetch();
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const filterDataByType = async (id) => {
  let payload = {
    search: filter.search,
    code_status_doc: filter.status,
    start_date: filter.date ? filter.date[0] : "",
    end_date: filter.date ? filter.date[1] : "",
    id_meeting_room: [filter.room],
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };
  const api = await Api.get("book_meeting_room/get", { params: payload });
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
      Api.delete(`/book_meeting_room/delete_data/${event}`).then((res) => {
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
      Api.delete(`/book_meeting_room/delete_data/`, {
        params: payload,
      }).then((res) => {
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
      });
    } else {
      return;
    }
  });
};
// end

const openModal = (type, id) => {
  visibleModal.value = true;
  statusForm.value = type;
  if (id) {
    idItem.value = parseInt(id);
  }
};

const closeModal = () => {
  visibleModal.value = false;
  fetch();
};

const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

onBeforeMount(() => {
  getSessionForSidebar();
  fetch();
  fetchListRoom();
});
</script>

<template>
  <div
    class="flex flex-col w-full this h-[100vh]"
    :class="lockScrollbar === true ? 'fixed' : ''"
  >
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
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Booking Meeting Room
            </p>
            <div class="flex gap-4">
              <div
                v-if="deleteArray.length > 0 && id_role != 'ADMTR'"
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
                v-if="id_role != 'ADMTR'"
                @click="openModal('add', 0)"
                for="my-modal-3"
                class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
              >
                + Add New
              </label>
              <ModalAddBookingRoom
                v-if="visibleModal"
                @close="closeModal"
                :status="statusForm"
                :id="idItem"
              />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT, DATE & SEARCH -->
          <div
            class="grid grid-flow-col auto-cols-max gap-2 px-4 pb-2 justify-between"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Room
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="filter.room"
                >
                  <option disabled selected>Room</option>
                  <option
                    v-for="data in listRoom"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.name_meeting_room }}
                  </option>
                </select>
              </div>
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
              <div>
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Date</label
                >
                <VueDatePicker
                  v-model="filter.date"
                  range
                  :enable-time-picker="false"
                  placeholder="Select Date"
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
                    <th v-if="id_role != 'ADMTR'">
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
                    <td>{{ data.no_booking_meeting }}</td>
                    <td>{{ data.employee_name }}</td>
                    <td>
                      <span class="truncate ...">{{
                        data.title
                      }}</span>
                    </td>
                    <td>{{ data.name_meeting_room }}</td>
                    <td>
                      {{ format_date(data.start_date) }} -
                      {{ format_date(data.end_date) }}
                    </td>
                    <td>{{ data.start_time }} - {{ data.end_time }}</td>
                    <td>{{ data.site_name }}</td>
                    <td>
                      <span
                        :class="
                          data.status == 'Done'
                            ? 'status-done'
                            : data.status == 'Booked'
                            ? 'status-default'
                            : 'status-revision'
                        "
                        >{{ data.status }}</span
                      >
                    </td>
                    <td v-if="id_role != 'ADMTR'">
                      <div class="flex justify-center items-center gap-2">
                        <router-link :to="`/booking-meeting-room/${data.id}`">
                          <button>
                            <img
                              :src="viewicon"
                              class="w-6 h-6"
                              v-if="['Done', 'Cancelled'].includes(data.status)"
                            />
                            <img :src="editicon" class="w-6 h-6" v-else />
                          </button>
                        </router-link>
                        <!-- <button @click="deleteData(data.id)" v-if="data.status == 'Draft'">
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button> -->
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <DataNotFound :cnt-col="10" />
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
              :total-items="totalData"
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

.status-revision {
  color: #ef3022;
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

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
