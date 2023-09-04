<script setup>
import moment from "moment"
import Multiselect from "@vueform/multiselect"

import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "@/components/layout/Sidebar.vue"
import Footer from "@/components/layout/Footer.vue"
import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"

import ModalAddBookingRoom from "@/components/facility-services/booking-meeting-room/ModalAdd.vue"
import Api from "@/utils/Api"
import VueCal from "vue-cal"
import "vue-cal/dist/vuecal.css"
import { Modal } from "usemodal-vue3"

import { ref, onBeforeMount, reactive, computed } from "vue"
import { useSidebarStore } from "@/stores/sidebar.js"

import { fetchSiteByUseID } from "@/utils/Api/reference/site.js"
import storageHelper from "@/utils/storage.helper.js"

const sidebar = useSidebarStore()

const inputClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

let lengthCounter = 0
let lockScrollbar = ref(false)

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"))
}

const chartStatusColor = {
  Booked: "bg-primary",
  Done: "bg-green",
  Cancelled: "bg-red",
  "Waiting Approval": "bg-[#facc15]",
}

let dataArr = ref([])
let dataRoom = ref([])
let datas = ref([])
let listCompany = ref([])
let listSite = ref([])
const filter = reactive({
  id_company: "",
  date: "",
  search: "",
  room: [],
})
let selectSite = ref(true)
let id_company = ref("")
let id_site = ref("")
let header = ref([])
let tempHeader = ref([])
const id_role = JSON.parse(localStorage.getItem("id_role"))

let statusForm = ref("add")
let visibleModal = ref(false)
let idItem = ref(0)
let selectedEvent = ref("")

const showFilter = ref(true)
const formData = ref(null)
const dialogKey = ref(0)
const date = ref(null)
const userSites = ref([])

// FETCH DATA
const fetch = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get("book_meeting_room/dashboard")
  dataArr.value = api.data.data
  datas.value = []
  dataArr.value.forEach((dt) => {
    if (dt.status != "Cancelled") {
      let arr = {
        start: dt.start_date + " " + dt.start_time,
        end: dt.end_date + " " + dt.end_time,
        content:
          "<div class='my-2 font-bold'>" +
          dt.title +
          "</div>" +
          `<div class='badge bg-white text-black rounded-xl '> ${dt.name_created} </div>`,
        class: `${chartStatusColor[dt.status]} text-white`,
        split: dt.id_meeting_room,
        data: { ...dt },
        title: `<p class='badge mb-5 bg-white text-black'> ${dt.status} </p>`,
      }

      datas.value.push({ ...arr })
    }
  })
}

const fetchRoom = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get("master_meeting_room/get")
  const res = await api.data.data
  header.value = res
    .map((dt) => {
      return {
        id: dt.id,
        label: dt.name_meeting_room.split("_").join(" "),
        id_site: dt.id_site,
        active: true,
      }
    })
    .filter((room) => room.id_site == id_site.value)
}

const filterDataByType = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`

  let payload = {
    id_company: id_company.value,
    id_site: id_site.value,
    id_meeting_room: filter.room,
  }
  const api = await Api.get("book_meeting_room/dashboard", { params: payload })
  dataArr.value = api.data.data
  datas.value = []
  header.value = []

  api.data.data.forEach((dt) => {
    if (dt.status != "Cancelled") {
      let arr = {
        start: dt.start_date + " " + dt.start_time,
        end: dt.end_date + " " + dt.end_time,
        content: "<p class='my-2'>" + dt.title + "</p>" + dt.name_created,
        class: "card-color",
        split: dt.id_meeting_room,
        title: dt.status,
      }
      datas.value.push(arr)
    }
    let arrHeader = {
      id: dt.id,
      label: dt.name_meeting_room.split("_").join(" "),
      id_site: dt.id_site,
      active: true,
    }
    header.value.push({ ...arrHeader })
  })
}

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get("company/get")
  listCompany.value = api.data.data
}

const fetchCompanyID = async (id_comp) => {
  fetchSite(id_comp)
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/company/get/${id_comp}`)
  listCompany.value = res.data.data
  id_company.value = id_comp
}

const fetchSite = async (id_comp) => {
  let idComp = id_comp ? id_comp : id_company.value
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get(`site/get_by_company/${idComp}`)
  listSite.value = api.data.data
  selectSite.value = false
  for (let index = 0; index < api.data.data.length; index++) {
    const element = api.data.data[index]

    if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
      id_site.value = element.id
    }
  }
  if (id_role == "ADM") {
    listSite.value = listSite.value.filter(
      (e) => e.id == localStorage.getItem("id_site")
    )
  }
}

const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"))
  id_role === "ADMTR" ? fetchCompany() : fetchCompanyID(id_company)
}
// END

const resetData = () => {
  id_company.value = ""
  id_site.value = ""
  filter.room = []
  fetch()
  fetchCondition()
}

const openModal = async (event, e) => {
  visibleModal.value = true

  if (event.data?.id) {
    statusForm.value = "view"
    idItem.value = parseInt(event.data.id)

    formData.value = event.data
  } else {
    statusForm.value = "add"
    idItem.value = parseInt(0)

    const start = event.start
    const end = event.end

    const newForm = {
      start_date: moment(start).format("YYYY-MM-DD"),
      start_time: moment(start).format("hh:mm:ss"),
      end_date: moment(end).format("YYYY-MM-DD"),
      end_time: moment(end).format("hh:mm:ss"),
      id_meeting_room: event.split,
    }

    formData.value = newForm
  }

  setTimeout(() => {
    document.getElementById("booking_modal").click()
  }, 500)
}

const closeModal = () => {
  document.getElementById("booking_modal").click()

  visibleModal.value = false
  formData.value = null
  selectedEvent.value = {}

  fetch()

  if (selectedEvent.value) deleteEventFunction.value()
}

const deleteEventFunction = ref()
const onEventCreate = (event, deleteFunction) => {
  selectedEvent.value = event
  deleteEventFunction.value = deleteFunction

  return event
}

const scrollToCurrentTime = () => {
  const calendar = document.querySelector("#vuecal .vuecal__bg")
  const hours = 7
  calendar.scrollTo({ top: hours * 100, behavior: "smooth" })
}

const fetchSitesByUserId = async () => {
  const token = localStorage.getItem("token")
  const decodeToken = storageHelper.decodeToken(token)
  const userId = decodeToken?.users?.id

  const res = await fetchSiteByUseID(userId)

  userSites.value = res?.data || []
}

const filteredSites = computed(() => {
  const primarySite = JSON.parse(localStorage.getItem("id_site"))
  const userSitesIds = [
    ...userSites.value.map(({ id_site }) => id_site),
    primarySite,
  ]

  return listSite.value?.filter(({ id }) => userSitesIds.includes(id))
})

onBeforeMount(async () => {
  await getSessionForSidebar()
  await fetch()
  await fetchCondition()
  await fetchSitesByUserId()
  await fetchRoom()
})
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
          <div class="px-4 pb-2 flex">
            <vue-cal
              id="vuecal"
              locale="id"
              active-view="day"
              :time-from="0 * 60"
              :time-step="30"
              :time-cell-height="50"
              :disable-views="['years', 'year', 'month']"
              :editable-events="{ title: false, drag: false, create: true }"
              :events="datas"
              :split-days="header.filter(({ active }) => active)"
              :min-cell-width="200"
              :minSplitWidth="200"
              :on-event-create="onEventCreate"
              @event-drag-create="openModal"
              :watchRealTime="true"
              @ready="scrollToCurrentTime"
              style="width: 300px; height: 70vh"
              class="basis-8/12"
              :on-event-click="openModal"
              :sticky-split-labels="true"
            >
              <!-- <template
                #split-label="{ split }"
                style="position: sticky; top: 0"
              >
                <strong :style="`color: ${split.color}`">{{
                  split.label
                }}</strong>
              </template> -->
            </vue-cal>
            <ModalAddBookingRoom
              v-if="visibleModal"
              @close="closeModal"
              :status="statusForm"
              :id="idItem"
              :key="dialogKey"
              :data="formData"
              :readOnly="statusForm == 'view'"
            />

            <div
              class="basis-auto ease-in duration-300 bg-white"
              :class="
                showFilter
                  ? '-translate-x-0  w-[250px]'
                  : '-translate-x-full  w-0'
              "
            >
              <div class="absolute ml-[-50px] mt-[10px] z-auto">
                <button
                  class="rounded-l-xl btn-sm border bg-white shadow-md"
                  @click="showFilter = !showFilter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="black"
                    class="w-6 h-6"
                    :class="{ 'rotate-180': showFilter }"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
              <div class="px-5 bg-white" v-if="showFilter">
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
                  @input="fetchRoom()"
                >
                  <option disabled selected>Site</option>
                  <option
                    v-for="data in filteredSites"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.site_code }} - {{ data.site_name }}
                  </option>
                </select>

                <!-- <div class="my-3 grid grid-cols-2">
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
                </div> -->
                <!-- <div>
                  <Multiselect
                    v-model="filter.room"
                    mode="tags"
                    placeholder="Select Room Meeting"
                    track-by="label"
                    label="label"
                    :searchable="true"
                    :options="header"
                    :object="true"
                    value-prop="id"
                    :can-clear="false"
                    :remove="false"
                  >
                  </Multiselect>
                </div> -->

                <div class="form-control">
                  <div class="font-medium">Rooms:</div>
                  <label
                    class="cursor-pointer label justify-start gap-3"
                    v-for="item in header"
                  >
                    <input
                      type="checkbox"
                      checked="checked"
                      class="checkbox checkbox-success"
                      v-model="item.active"
                      :disabled="
                        header.filter(({ active }) => active).length == 1 &&
                        item.active
                      "
                    />
                    <span class="text-start text-sm">{{ item.label }}</span>
                  </label>
                </div>
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

/* .vuecal__header{
  overflow-x: scroll;
} */

/* .my-date {
  width: 260px !important;
} */
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
/* .vuecal:not(.vuecal--day-view) .vuecal__cell--selected { */
/* background-color: rgba(1, 82, 137, 0.1) !important; */
/* } */
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
.vuecal__cell-content {
  border-right: 1px solid rgba(1, 83, 137, 0.5);
}
.card-color {
  background-color: rgba(1, 83, 137, 0.912);
  color: #fff;
  font-size: small;
}

.vuecal__event {
  color: white;
  background-color: rgba(76, 172, 175, 0.35);
  padding-top: 30px;
}

.day-split-header {
  padding-left: 10px;
  padding-right: 10px;
  word-wrap: break-word !important;
  text-overflow: ellipsis !important;
  text-align: center;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}

.multiselect-tags {
  overflow-x: auto;
}

.vuecal__heading {
  height: auto !important;
}
</style>
