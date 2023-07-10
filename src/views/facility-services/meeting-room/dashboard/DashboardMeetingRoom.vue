<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import Api from "@/utils/Api";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

import { ref, onBeforeMount, reactive } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();
const rowClass = "flex justify-between px-6 items-center gap-2";
const colClass = "mb-6 w-full";
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
  room: "",
});
let selectSite = ref(true);
let id_site = ref("")

const fetch = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("book_meeting_room/get");
  dataArr.value = api.data.data.data;
  dataArr.value.forEach((dt) => {
    let arr = {
      start: dt.start_date + " " + dt.start_time,
      end: dt.end_date + " " + dt.end_time,
      title: dt.name_meeting_room,
      content: dt.title,
      class: "card-color",
    };
    datas.value.push(arr);
  });
};

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("company/get");
  listCompany.value = api.data.data;
};

const fetchSite = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get(`site/get_by_company/${filter.id_company}`);
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

onBeforeMount(() => {
  getSessionForSidebar();
  fetch();
  fetchCompany();
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
          </div>
          <div class="px-4 pb-2 grid grid-cols-4">
            <div class="col-span-3">
              <vue-cal
                locale="id"
                :time-from="8 * 60"
                :time-to="19 * 60"
                :time-step="30"
                :events="datas"
              >
              </vue-cal>
            </div>
            <div class="px-5 pb-2">
              <p class="mb-3 font-bold capitalize">Filter:</p>
              <select
                v-model="filter.id_company"
                id="id_company"
                :class="inputClass"
                class="mb-4"
                @change="fetchSite()"
              >
                <option selected value="">Company</option>
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
              >
                <option selected value="">Site</option>
                <option
                  v-for="data in listSite"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.site_code }} - {{ data.site_name }}
                </option>
              </select>
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
.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(1, 82, 137, 0.7) !important;
}
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
