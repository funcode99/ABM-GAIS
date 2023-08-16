<script setup>
import { onBeforeMount, ref } from 'vue'

import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "@/components/layout/Sidebar.vue"
import Footer from "@/components/layout/Footer.vue"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import tableData from "@/components/table/tableData.vue"
import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue"

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import icon_receive from "@/assets/icon-receive.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import deleteicon from "@/assets/navbar/delete_icon.svg"
import editicon from "@/assets/navbar/edit_icon.svg"

import Api from "@/utils/Api";

let showingValue = ref(1)
let showingValueFrom = ref(0)
let showingValueTo = ref(0)
let pageMultiplier = ref(10)
let paginateIndex = ref(0)
let totalPage = ref(0)
let totalData = ref(0)
let sortedData = ref([])

let id = ref(0)

let actualizationTripStatus = ref('All')

const tableHead = [
    { title: "No" },
    { title: "Actualization No" },
    { title: "Request Trip No" },
    { title: "Date" },
    { title: "Requestor" },
    { title: "Days of Trip" },
    { title: "Status" },
]

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1
  showingValue.value = pageOfItem
//   fetchEmployee(pageOfItem)
}

    const fetchActualizationTrip = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await Api.get(`/actual_trip/get_data/`)
        console.log(res)
        sortedData.value = res.data.data
    }

    onBeforeMount(() => {
        fetchActualizationTrip()
        //   getSessionForSidebar()
        //   fetchEmployee()
        //   fetchGrupCompany()
    })

</script>

<template>
    <div class="flex flex-col w-full this h-[100vh]">
        
        <Navbar />

        <div class="flex w-screen content mt-[115px]">
            
            <Sidebar class="flex-none" />

            <tableContainer>
                <tableTop>

                    <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
                    <div
                        class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
                    >
                        <p
                        class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
                        >
                        Actualization Trip
                        </p>
                        <div class="flex gap-4">
                        <button
                            class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                            @click="exportToExcel"
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
                            Status
                            </p>
                            <select
                            class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                            v-model="actualizationTripStatus"
                            @change="fetchParentCompany()"
                            >
                                <option>
                                    All
                                </option>
                                <option>
                                    Draft
                                </option>
                                <option>
                                    Waiting Approval
                                </option>
                                <option>
                                    Revision
                                </option>
                                <option>
                                    Reject
                                </option>
                                <option>
                                    Done
                                </option>
                            </select>
                        </div>

                        <div>

                            <p class="capitalize font-JakartaSans text-xs text-black font-medium pb-2">
                            Date
                            </p>
                            
                            <VueDatePicker 
                                v-model="date"
                                range
                                :enable-time-picker="false"
                            />

                        </div>

                        <div class="flex flex-wrap gap-4 items-center pt-6">
                            <button
                            class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                            @click="
                                () => {
                                onChangePage(1);
                                }
                            "
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
                        <input
                            class="nosubmit placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            type="text"
                            placeholder="Search..."
                            v-model="search"
                            @keyup="fetchEmployee(onChangePage(1))"
                        />
                        </div>
                    </div>

                    <!-- SHOWING -->
                    <div class="flex justify-between">
                        <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
                        <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
                        <select
                            class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                            v-model="pageMultiplier"
                            @change="fetchEmployee()"
                        >
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>75</option>
                            <option>100</option>
                        </select>
                        </div>


                    </div>

                    <tableData v-if="sortedData.length > 0">

                        <thead class="text-center font-JakartaSans text-sm font-bold h-10">
                            <tr>
                                <th
                                    v-for="data in tableHead"
                                    :key="data.Id"
                                    class="overflow-x-hidden cursor-pointer"
                                    @click="sortList(`${data.jsonData}`)"
                                >
                                    <div class="flex justify-center items-center">
                                        <p class="font-JakartaSans font-bold text-sm">
                                            {{ data.title }}
                                        </p>
                                    </div>
                                </th>
                                <th>
                                    <div class="flex justify-center items-center">
                                        <p class="font-JakartaSans font-bold text-sm">
                                            Actions
                                        </p>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(data, index) in sortedData"
                            >
                                <td>
                                    {{ index+1 }}
                                </td>    
                                <td>
                                    {{ data.no_act }}
                                </td>
                                <td>
                                    {{ data.no_request_trip }}
                                </td>
                                <td>
                                    {{ data.created_at }}
                                </td>
                                <td>
                                    {{ data.employee_name }}
                                </td>
                                <td>
                                    {{ data.days_of_trip }}
                                </td>
                                <td>
                                    {{ data.status }}
                                </td>

                                <td class="flex flex-wrap gap-4 justify-center items-center">
                                    <router-link to="/request-view" @click="assignRequestTripId(data.id)">
                                        <button>
                                        <img :src="editicon" class="w-6 h-6" />
                                        </button>
                                    </router-link>
                                    <button @click="deleteData(data.id)">
                                        <img :src="deleteicon" class="w-6 h-6" />
                                    </button>
                                </td>

                            </tr>
                        </tbody>

                    </tableData>

                    <tableData v-else-if="sortedData.length == 0">
                        <thead class="text-center font-JakartaSans text-sm font-bold h-10">
                            <tr>
                                <th
                                    v-for="data in tableHead"
                                    :key="data.Id"
                                    class="overflow-x-hidden cursor-pointer"
                                    @click="sortList(`${data.jsonData}`)"
                                >
                                    <div class="flex justify-center items-center">
                                        <p class="font-JakartaSans font-bold text-sm">
                                            {{ data.title }}
                                        </p>
                                        <button v-if="data.jsonData" class="ml-2">
                                            <img :src="arrowicon" class="w-[9px] h-3" />
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </tableData>
                    
                    <div class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2">
                        <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
                        Showing {{ showingValueFrom }} to
                        {{ showingValueTo }}
                        of {{ totalData }} entries
                        </p>
                        <vue-awesome-paginate
                        :total-items="totalData"
                        :items-per-page="parseInt(pageMultiplier)"
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

.readmore-text {
  display: inline-block;
  max-width: 200px;
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

input.nosubmit {
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}
</style>
