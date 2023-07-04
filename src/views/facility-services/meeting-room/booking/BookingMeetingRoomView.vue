<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import ModalAddBookingRoom from "@/components/facility-services/booking-meeting-room/ModalAdd.vue";
import Swal from "sweetalert2";

import arrow from "@/assets/request-trip-view-arrow.png";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import Api from "@/utils/Api";
import moment from "moment";

import { ref, onBeforeMount } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
import { useRoute, useRouter } from "vue-router";

const sidebar = useSidebarStore();
const route = useRoute();
const router = useRouter();

let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));

let dataArr = ref([]);

let lengthCounter = 0;
let idBook = route.params.id;
let visibleHeader = ref(false);
let addItem = ref(false);
let tabId = ref(1);

// for modal
let statusForm = ref("add");
let visibleModal = ref(false);
let idItem = ref(0);

const tableHead = [
  { Id: 1, title: "Title", jsonData: "no" },
  { Id: 2, title: "Meeting Room ID", jsonData: "created_at" },
  { Id: 3, title: "Meeting Room Name", jsonData: "no_ca" },
  { Id: 4, title: "Floor", jsonData: "employee_name" },
  { Id: 5, title: "Date", jsonData: "date" },
  { Id: 6, title: "Time", jsonData: "event" },
  { Id: 7, title: "Capacity", jsonData: "grand_total" },
  { Id: 8, title: "Remarks", jsonData: "status" },
];

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`book_meeting_room/get/${id}`);
  dataArr.value = res.data.data[0];
};

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   Api.post(`cash_advance/submit/${idBook}`)
//     .then((res) => {
//       let status = res.data.success == true ? "success" : "error";
//       Swal.fire({
//         position: "center",
//         icon: status,
//         title: res.data.message,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       fetchDataById(idBook);
//       router.push({ path: `/viewcashadvancenontravel/${idBook}` });
//     })
//     .catch((e) => {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: e.response.data.error,
//         showConfirmButton: false,
//         timer: 2000,
//         timerProgressBar: true,
//         background: "#EA5455",
//         color: "#ffffff",
//       });
//     });
};

const openModal = (type, id) => {
  visibleModal.value = true;
  statusForm.value = type;
  if (id) {
    idItem.value = id;
  }
};

const closeModal = () => {
  visibleModal.value = false;
  fetchDataById(idBook);
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(idBook);
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const rowClass = "flex justify-between px-6 items-center gap-2";
const colClass = "mb-6 w-full";
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- HEADER -->
          <div class="flex justify-between">
            <router-link
              to="/booking-meeting-room"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h1 class="text-blue font-semibold font-JakartaSans text-2xl">
                Booking Meeting Room<span
                  class="text-[#0a0a0a] font-semibold font-JakartaSans text-2xl"
                >
                  / {{ dataArr.no_booking_meeting }}
                </span>
              </h1>
            </router-link>
            <div class="py-4">
              <button
                type="button"
                :class="
                  dataArr.status == 'Revision' ||
                  dataArr.status == 'Rejected' ||
                  dataArr.status == 'Fully Rejected'
                    ? ' btn btn-sm border-none mx-4 capitalize status-revision'
                    : 'btn btn-sm border-none mx-4 capitalize  '
                "
              >
                {{ dataArr.status }}
              </button>
            </div>
          </div>
          <div class="flex justify-start gap-4 mx-10">
            <label
              v-if="
                (dataArr.status == 'Draft' ||
                  dataArr.status == 'Revision' ||
                  dataArr.status == 'Fully Rejected') &&
                !visibleHeader
              "
              @click="openModal('edit', '')"
              for="my-modal-3"
              class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
            >
              Edit
            </label>
            <ModalAddBookingRoom
                v-if="visibleModal"
                @close="closeModal"
                :status="statusForm"
                :id="idBook"
                :data="dataArr"
              />
            <button
              v-if="
                (dataArr.status == 'Draft' ||
                  dataArr.status == 'Revision' ||
                  dataArr.status == 'Fully Rejected') &&
                !visibleHeader
              "
              class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              @click="submit"
            >
              Book
            </button>
          </div>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                :value="format_date(dataArr.created_at)"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created By</span
              >
              <input
                type="text"
                disabled
                v-model="dataArr.employee_name"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE-->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]" v-if="!addItem">
            <div class="grid grid-cols-10">
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 1"
              >
                <div
                  :class="
                    tabId == 1
                      ? 'absolute bg-black h-full w-2 left-0 top-0 rounded-tl-lg'
                      : 'absolute h-full w-2 left-0 top-0 rounded-tl-lg'
                  "
                ></div>
                <p
                  :class="
                    tabId == 1
                      ? 'font-JakartaSans font-normal text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Details
                </p>
              </div>
            </div>
            <div class="overflow-x-auto bg-white">
              <table class="table table-compact w-full" v-if="tabId == 1">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      v-for="data in tableHead"
                      :key="data.Id"
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
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
                <tbody class="font-JakartaSans font-normal text-xs">
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.title }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.code_meeting_room }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.name_meeting_room }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.floor }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ format_date(dataArr.start_date) }} -
                      {{ format_date(dataArr.end_date) }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.start_time }} - {{ dataArr.end_time }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.capacity }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ dataArr.remarks }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
.status-revision {
  background: #ef3022;
}

.status-default {
  background: #2970ff;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}
.this {
  overflow-x: hidden;
}
</style>
