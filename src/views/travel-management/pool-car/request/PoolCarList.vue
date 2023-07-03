<script setup>
import { onMounted, ref } from "vue"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import DataTable from "@/components/table/DataTable.vue"

import PageTitle from "@/components/atomics/PageTitle.vue"

import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"
import icon_edit from "@/assets/navbar/edit_icon.svg"
import icon_delete from "@/assets/navbar/delete_icon.svg"

import fetchStatusRef from "@/utils/Fetch/Reference/fetchPoolCarRequestStatus"
import { fetchPoolCarRequest } from "@/utils/Api/travel-management/poolCar"

const headers = [
  {
    text: "Created Date",
    key: "created_date",
    value: "created_date",
  },
  {
    text: "Request No",
    key: "request_no",
    value: "request_no",
  },
  {
    text: "From Date",
    key: "from_date",
    value: "from_date",
  },
  {
    text: "To Date",
    key: "from_date",
    value: "from_date",
  },
  {
    text: "Car",
    key: "from_date",
    value: "from_date",
  },
  {
    text: "Status",
    key: "from_date",
    value: "from_date",
  },
  {
    text: "Actions",
    key: "actions",
    value: "actions",
    sortable: false,
  },
]

const filter = ref({
  status: {
    items: ["Waiting Car & Driver", "Driver Check", "Ready", "Done"],
    value: "",
  },
  date: null,
  keyword: "",
})

const selectedItems = ref([])

const resetFilter = () => {
  filter.value.status.value = null
  filter.value.date = null
  filter.value.keyword = ""
}

const getStatusRef = async () => {
  const res = await fetchStatusRef()

  filter.value.status.items = res.data.data ?? []
}

onMounted(() => {
  getStatusRef()
})
</script>

<template>
  <tableContainer>
    <tableTop>
      <div
        class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2"
      >
        <PageTitle></PageTitle>
      </div>

      <div class="flex flex-wrap items-end px-4 py-2 gap-y-2">
        <div class="flex items-end flex-wrap gap-4">
          <div class="flex flex-col gap-1">
            <p
              class="capitalize font-JakartaSans text-xs text-black font-medium"
            >
              Status
            </p>

            <select
              v-model="filter.status.value"
              class="font-JakartaSans capitalize block bg-white w-[200px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            >
              <option
                v-for="data in filter.status.items"
                :key="data"
                :value="data.code"
              >
                {{ data.status }}
              </option>
            </select>
          </div>

          <!-- DATE -->
          <div>
            <p class="capitalize font-Fira text-xs text-black font-medium">
              Date
            </p>

            <VueDatePicker
              range
              v-model="filter.date"
              :enable-time-picker="false"
              format="yyyy-mm-dd"
            />
          </div>

          <!-- FILTER -->
          <div class="flex gap-4 flex-wrap flex-1">
            <button
              @click="getData"
              class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
            >
              <span>
                <img :src="icon_filter" class="w-5 h-5" />
              </span>
              Filter
            </button>

            <button
              @click="resetFilter"
              class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
            >
              <span>
                <img :src="icon_reset" class="w-5 h-5" />
              </span>
              Reset
            </button>
          </div>
        </div>

        <div class="sm:flex-1"></div>

        <!-- SEARCH -->
        <div class="pt-2 flex md:mx-0">
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
              v-model="filter.keyword"
            />
          </label>
        </div>
      </div>

      <DataTable
        v-model:selectedItems="selectedItems"
        @update:selectedItems="selectedItems = $event"
        :headers="headers"
        :api-method="fetchPoolCarRequest"
        show-select
      >
        <template #item-actions>
          <div class="flex justify-center items-center gap-2">
            <button>
              <img :src="icon_edit" class="w-6 h-6" />
            </button>
            <button @click="">
              <img :src="icon_delete" class="w-6 h-6" />
            </button>
          </div>
        </template>
      </DataTable>
    </tableTop>
  </tableContainer>
</template>
