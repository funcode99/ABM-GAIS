<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";

import ModalAddBookingRoom from "@/components/facility-services/booking-meeting-room/ModalAdd.vue";
import Api from "@/utils/Api";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { Modal } from "usemodal-vue3";

import { ref, onBeforeMount, reactive } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();
const inputClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

let lengthCounter = 0;
let lockScrollbar = ref(false);

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

let dataArr = ref([]);
let datas = ref([]);
let listCompany = ref([]);
let listSite = ref([]);
let filter = reactive({
  id_company: "",
  date: "",
  search: "",
  room: [],
});
let selectSite = ref(true);
let id_company = ref("");
let id_site = ref("");
let header = ref([]);
let tempHeader = ref([]);
const id_role = JSON.parse(localStorage.getItem("id_role"));

let statusForm = ref("add");
let visibleModal = ref(false);
let idItem = ref(0);
let selectedEvent = ref("");

// FETCH DATA
const fetch = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("book_meeting_room/get");
  dataArr.value = api.data.data.data;
  dataArr.value.forEach((dt) => {
    let arr = {
      start: dt.start_date + " " + dt.start_time,
      end: dt.end_date + " " + dt.end_time,
      content: "<p class='my-2'>" + dt.title + "</p>" + dt.name_created,
      class: "card-color",
      split: dt.id_meeting_room,
    };
    datas.value.push(arr);
    let arrHeader = {
      id: dt.id_meeting_room,
      label: dt.name_meeting_room,
    };
    tempHeader.value.push(arrHeader);
    filter.room.push(dt.id_meeting_room);
  });
  header.value = tempHeader.value.filter(
    (obj, index) =>
      tempHeader.value.findIndex(
        (item) => item.id === obj.id && item.label === obj.label
      ) === index
  );
  filter.room = [...new Set(filter.room)];
};

const filterDataByType = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  let payload = {
    id_company: id_company.value,
    id_site: id_site.value,
    id_meeting_room: filter.room,
  };
  const api = await Api.get("book_meeting_room/get", { params: payload });
  dataArr.value = api.data.data.data;
  datas.value = [];
  api.data.data.data.forEach((dt) => {
    let arr = {
      start: dt.start_date + " " + dt.start_time,
      end: dt.end_date + " " + dt.end_time,
      content: "<p class='my-2'>" + dt.title + "</p>" + dt.name_created,
      class: "card-color",
      split: dt.id_meeting_room,
    };
    datas.value.push(arr);
    let arrHeader = {
      id: dt.id_meeting_room,
      label: dt.name_meeting_room,
    };
    tempHeader.value.push(arrHeader);
    filter.room.push(dt.id_meeting_room);
  });
  header.value = tempHeader.value.filter(
    (obj, index) =>
      tempHeader.value.findIndex(
        (item) => item.id === obj.id && item.label === obj.label
      ) === index
  );
  filter.room = [...new Set(filter.room)];
};

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("company/get");
  listCompany.value = api.data.data;
};

const fetchCompanyID = async (id_comp) => {
  fetchSite(id_comp);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_comp}`);
  listCompany.value = res.data.data;
  id_company.value = id_comp;
};

const fetchSite = async (id_comp) => {
  let idComp = id_comp ? id_comp : id_company.value;
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get(`site/get_by_company/${idComp}`);
  listSite.value = api.data.data;
  selectSite.value = false;
  for (let index = 0; index < api.data.data.length; index++) {
    const element = api.data.data[index];

    if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
      id_site.value = element.id;
    }
  }
  if (id_role == "ADM") {
    listSite.value = listSite.value.filter(
      (e) => e.id == localStorage.getItem("id_site")
    );
  }
};

const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  id_role === "ADMTR" ? fetchCompany() : fetchCompanyID(id_company);
};
// END

const resetData = () => {
  id_company.value = "";
  id_site.value = "";
  filter.room = [];
  fetch();
  fetchCondition()
};

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

const onEventCreate = (event, deleteEventFunction) => {
  selectedEvent.value = event;
  //   openModal("add", 0);

  return event;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetch();
  fetchCondition();
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
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-4"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Dashboard Meeting Room
            </p>
            <!-- <label
              class="font-JakartaSans text-base text-[#0A0A0A] font-semibold"
              >Drag at time to create your events</label
            > -->
          </div>
          <div class="px-4 pb-2 grid grid-cols-4">
            <div class="col-span-3">
              <vue-cal
                locale="id"
                active-view="day"
                :time-from="8 * 60"
                :time-step="30"
                :disable-views="['years', 'year', 'month']"
                :editable-events="{ title: true, drag: false, create: false }"
                :events="datas"
                :split-days="header"
                :min-cell-width="500"
                :min-split-width="400"
                :on-event-create="onEventCreate"
                @event-drag-create="visibleModal"
                sticky-split-labels
                class="h-[70vh]"
              >
                <template #split-label="{ split }">
                  <strong :style="`color: ${split.color}`">{{
                    split.label
                  }}</strong>
                </template>
              </vue-cal>
              <!-- <ModalAddBookingRoom
                v-if="visibleModal"
                @close="closeModal"
                :status="statusForm"
                :id="idItem"
              /> -->
            </div>
            <div class="px-5 pb-2">
              <p class="mb-3 font-bold capitalize">Filter:</p>
              <select
                v-model="id_company"
                id="id_company"
                :class="inputClass"
                class="mb-3"
                @change="fetchSite()"
              >
                <option disabled selected>Company</option>
                <option
                  v-for="data in listCompany"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.company_code }} - {{ data.company_name }}
                </option>
              </select>
              <select
                v-model="id_site"
                id="id_site"
                :class="inputClass"
                :disabled="selectSite"
                class="mb-3"
              >
                <option disabled selected>Site</option>
                <option
                  v-for="data in listSite"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.site_code }} - {{ data.site_name }}
                </option>
              </select>
              <p
                class="cursor-pointer mb-2"
                v-for="data in header"
                :key="data.id"
              >
                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox checkbox-sm mr-2"
                  :value="data.id"
                  v-model="filter.room"
                />
                <span>{{ data.label }}</span>
              </p>
              <div class="my-3 grid grid-cols-2">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[full] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250] mr-2"
                  @click="filterDataByType()"
                >
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[full] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                  @click="resetData"
                >
                  <span>
                    <img :src="icon_reset" class="w-5 h-5" />
                  </span>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer class="fixed bottom-0 left-0 right-0" />
    </div>
  </div>
</template>

<style>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}

.this {
  overflow-x: hidden;
}

.my-date {
  width: 260px !important;
}
/* Green-theme. */
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: rgba(1, 82, 137, 1) !important;
  color: #fff;
}
.vuecal__title-bar {
  background-color: rgba(1, 82, 137, 0.2) !important;
}
/* .vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(1, 82, 137, 0.15) !important;
} */
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(1, 82, 137, 0.1) !important;
}
.vuecal__cell--selected:before {
  background-color: rgba(1, 82, 137, 0.1) !important;
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(1, 82, 137, 0.1) !important;
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(1, 82, 137, 0.1) !important;
}

.card-color {
  background-color: rgba(1, 82, 137, 0.7);
  color: #fff;
  font-size: small;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}
</style>
