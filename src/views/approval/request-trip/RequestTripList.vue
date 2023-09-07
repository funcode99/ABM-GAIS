<script setup>
import { ref, onBeforeMount, computed } from "vue"
import Api from "@/utils/Api"

import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "@/components/layout/Sidebar.vue"
import Footer from "@/components/layout/Footer.vue"

import moment from "moment"

import fetchDocumentCodeUtils from '@/utils/Fetch/Travel-Management/fetchDocumentCode.js'

import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"
import iconView from "@/assets/view-details.png"
import arrowicon from "@/assets/navbar/icon_arrow.svg"

import { useSidebarStore } from "@/stores/sidebar.js"
const sidebar = useSidebarStore()

//for sort & search
const date = ref(['', ''])
const search = ref("")
let sortedData = ref([])
const selectedType = ref("Purpose")
let sortedbyASC = true
let instanceArray = []
let lengthCounter = 0

//for paginations
let showingValue = ref(1)
let pageMultiplier = ref(10)
let pageMultiplierReactive = computed(() => pageMultiplier.value)
let paginateIndex = ref(0)

let from = ref(0)
let to = ref(0)
let totalData = ref(0)
let perPage = ref(1)
let lastPage = ref(0)
let searchTable = ref("")
let additionalData = ref()

let documentCodeData = ref([])

//for paginations
const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1
  showingValue.value = pageOfItem
  fetchRequestTrip()
}

//for filter & reset button
const resetData = () => {
  sortedData.value = instanceArray
  selectedType.value = "Purpose";
  date.value = ['', '']
  fetchRequestTrip()
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
  { Id: 2, title: "Created Date", jsonData: "created_at" },
  { Id: 3, title: "Request No", jsonData: " no_request_trip" },
  { Id: 4, title: "Requestor", jsonData: "employee_name" },
  { Id: 5, title: "Purpose Of Trip", jsonData: "document_name" },
  { Id: 6, title: "Status", jsonData: "status" },
  // { Id: 7, title: "Actions" },
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
}

const fetchRequestTrip = async () => {
  
  try {
    
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`

    if(date.value[0] !== '' & date.value[1] !== '' & selectedType.value === 'Purpose') {

      console.log('masuk ke 1')

      let firstDate = moment(date.value[0]).format("YYYY-MM-DD")
      let lastDate = moment(date.value[1]).format("YYYY-MM-DD")

      let api = await Api.get(`/approval_request_trip/get_data?start_date=${firstDate}&end_date=${lastDate}&search=${searchTable.value}&page=${paginateIndex.value + 1}&perPage=${pageMultiplier.value}`)

        instanceArray = api.data.data.data
        sortedData.value = api.data.data.data
      
        additionalData.value = api.data.data
        from.value = additionalData.value.from
        to.value = additionalData.value.to
        totalData.value = additionalData.value.total
        perPage.value = additionalData.value.per_page
        lastPage.value = additionalData.value.last_page

      console.log(api)

    }
    else if (date.value[0] !== '' & date.value[1] !== '' & selectedType.value !== 'Purpose') {

      console.log('masuk ke 2')

      let firstDate = moment(date.value[0]).format("YYYY-MM-DD")
      let lastDate = moment(date.value[1]).format("YYYY-MM-DD")

      let api = await Api.get(`/approval_request_trip/get_data?code_doc=${selectedType.value}&start_date=${firstDate}&end_date=${lastDate}&search=${searchTable.value}&page=${paginateIndex.value + 1}&perPage=${pageMultiplier.value}`)

        instanceArray = api.data.data.data
        sortedData.value = api.data.data.data
      
        additionalData.value = api.data.data
        from.value = additionalData.value.from
        to.value = additionalData.value.to
        totalData.value = additionalData.value.total
        perPage.value = additionalData.value.per_page
        lastPage.value = additionalData.value.last_page

      console.log(api)
    }
    else if (date.value[0] === '' & date.value[1] === '' & selectedType.value !== 'Purpose') {

      console.log('masuk ke 3')
      
      let api = await Api.get(`/approval_request_trip/get_data?code_doc=${selectedType.value}&search=${searchTable.value}&page=${paginateIndex.value + 1}&perPage=${pageMultiplier.value}`)

        instanceArray = api.data.data.data
        sortedData.value = api.data.data.data
      
        additionalData.value = api.data.data
        from.value = additionalData.value.from
        to.value = additionalData.value.to
        totalData.value = additionalData.value.total
        perPage.value = additionalData.value.per_page
        lastPage.value = additionalData.value.last_page

      console.log(api)

    }
    else if (date.value[0] === '' & date.value[1] === '' & selectedType.value === 'Purpose') {

      console.log('masuk ke 4')
      
      let api = await Api.get(`/approval_request_trip/get_data?&search=${searchTable.value}&page=${paginateIndex.value + 1}&perPage=${pageMultiplier.value}`)
          
        instanceArray = api.data.data.data
        sortedData.value = api.data.data.data
      
        additionalData.value = api.data.data
        from.value = additionalData.value.from
        to.value = additionalData.value.to
        totalData.value = additionalData.value.total
        perPage.value = additionalData.value.per_page
        lastPage.value = additionalData.value.last_page

        console.log(api)

    }

  } catch (error) {
    console.log(error)
    sortedData.value = []
  }

}

onBeforeMount(() => {
  getSessionForSidebar()
  fetchRequestTrip()
  fetchDocumentCodeUtils(documentCodeData)
})

//for searching
const filteredItems = () => {

  sortedData.value = instanceArray
  
  const filteredR = sortedData.value.filter((item) => {
    return (
      (item.created_at.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      (item.no_request_trip.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      (item.employee_name.toLowerCase().indexOf(search.value.toLowerCase()) > -1) |
      (item.document_name.toLowerCase().indexOf(search.value.toLowerCase()) > -1)
    )
  })

  sortedData.value = filteredR
  lengthCounter = sortedData.value.length
  onChangePage(1)

}

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
}

</script>

<template>

  <div class="flex flex-col basis-full grow-0 shrink-0 w-full this">
    
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
        <div class="bg-white rounded-t-xl custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-2xl capitalize text-[#0A0A0A] font-semibold"
            >
              Request Trip
            </p>
          </div>

          <!-- SORT, DATE & SEARCH -->

          <div
            class="grid grid-flow-col auto-cols-max justify-between items-center mx-4 py-2"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Purpose of trip
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedType"
                >
                  <option disabled selected>Purpose</option>
                  <option 
                    v-for="data in documentCodeData" 
                    :key="data.id" 
                    :value="data.code_document"
                  >
                    {{ data.document_name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-wrap gap-4 items-center">
                <div>
                  <p
                    class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                  >
                    Date
                  </p>

                  <VueDatePicker
                    v-model="date"
                    range
                    :enable-time-picker="false"
                    class="my-date lg:w-10"
                  />
                </div>
              </div>

              <div class="flex flex-wrap gap-1 items-center pt-6">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="fetchRequestTrip"
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
                  @keyup.enter="filteredItems"
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

                    <th class="h-full flex justify-center items-center overflow-x-hidden">
                        Actions
                    </th>

                  </tr>
                </thead>

                <tbody>
                  <tr
                    class="font-JakartaSans font-normal text-sm"
                    v-for="data in sortedData"
                  >
                    <td>
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ data.no }}</td>
                    <td>{{ data.created_at }}</td>
                    <td>{{ data.no_request_trip }}</td>
                    <td>{{ data.employee_name }}</td>
                    <td>{{ data.document_name }}</td>
                    <td>{{ data.status }}</td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <button
                        @click="
                          $router.push(
                            `/viewapprovalrequesttrip/${data.id_request_trip}/${data.id}`
                          )
                        "
                      >
                        <img :src="iconView" class="w-6 h-6" />
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
              Showing {{ from }} to {{ to }} of {{ totalData }}
            </p>


            <vue-awesome-paginate
              :total-items="totalData"
              :items-per-page="parseInt(perPage)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-ending-buttons="true"
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
  width: 200px !important;
}
</style>
