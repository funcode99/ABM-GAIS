<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useSidebarStore } from "@/stores/sidebar.js"
import { toFilterDate } from "@/utils/filters"

const sidebar = useSidebarStore()

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import DataTable from "@/components/table/DataTable.vue"
import Multiselect from "@vueform/multiselect"

import PageTitle from "@/components/atomics/PageTitle.vue"

import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"
import icon_edit from "@/assets/navbar/edit_icon.svg"
import icon_delete from "@/assets/navbar/delete_icon.svg"

import {
  fetchPoolCarRequest,
  fetchPoolCarStatus,
} from "@/utils/Api/travel-management/poolCar"

const headers = [
  {
    text: "Request No",
    key: "no_request_trip",
    value: "no_request_trip",
  },
  {
    text: "Created Date",
    key: "created_at",
    value: "created_at",
  },

  {
    text: "From Date",
    key: "from_date",
    value: "from_date",
  },
  {
    text: "To Date",
    key: "to_date",
    value: "to_date",
  },
  {
    text: "Car",
    key: "plate",
    value: "plate",
  },
  {
    text: "Status",
    key: "status",
    value: "status",
  },
  // {
  //   text: "Actions",
  //   key: "actions",
  //   value: "actions",
  //   sortable: false,
  // },
]

const filter = ref({
  status: {
    items: [],
    value: "",
  },
  date: null,
  search: "",
})

const selectedItems = ref([])
const size = ref(0)

const resetFilter = () => {
  filter.value.status.value = null
  filter.value.date = null
  filter.value.search = ""
}

const setContainerSize = (screenSize) => {
  const padding = 50
  const sidebarSize = sidebar.isWide ? 260 : 100
  size.value = screenSize - sidebarSize - padding
}

const filterQuery = computed(() => {
  return {
    start_date: (filter.value.date || [])[0] || null,
    end_date: (filter.value.date || [])[1] || null,
    search: filter.value.search,
    status: filter.value.status.value,
  }
})

watch(sidebar, () => {
  setContainerSize(window.innerWidth)
})

onMounted(() => {
  setContainerSize(window.innerWidth)

  window.addEventListener("resize", () => {
    setContainerSize(window.innerWidth)
  })
})

onMounted(async () => {
  filter.value.status.items = await fetchPoolCarStatus()

  setContainerSize(window.innerWidth)

  window.addEventListener("resize", () => {
    setContainerSize(window.innerWidth)
  })
})
</script>

<template>
  <tableContainer>
    <tableTop class="block" :style="{ maxWidth: `${size}px` }">
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

            <Multiselect
              v-model="filter.status.value"
              mode="single"
              placeholder="Select Status"
              label="status"
              track-by="status"
              :options="filter.status.items"
              valueProp="code"
              clear
              searchable
              class="w-[300px]"
            >
            </Multiselect>
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
              class="text-base"
            />
          </div>

          <!-- FILTER -->
          <div class="flex gap-4 flex-wrap flex-1">
            <button
              @click="getData"
              class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[45px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
            >
              <span>
                <img :src="icon_filter" class="w-5 h-5" />
              </span>
              Filter
            </button>

            <button
              @click="resetFilter"
              class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[45px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
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
              class="placeholder:text-slate-400 capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              placeholder="Search..."
              type="text"
              name="search"
              v-model="filter.search"
            />
          </label>
        </div>
      </div>
      <div class="px-5">
        <DataTable
          v-model:selectedItems="selectedItems"
          @update:selectedItems="selectedItems = $event"
          :headers="headers"
          :api-method="fetchPoolCarRequest"
          :api-params="filterQuery"
          show-select
        >
          <template #item-created_at="{ item }">
            {{ toFilterDate(item.create_at, "DD/MM/YYYY") }}
          </template>

          <template #item-from_date="{ item }">
            {{ toFilterDate(item.from_date, "DD/MM/YYYY") }}
          </template>

          <template #item-to_date="{ item }">
            {{ toFilterDate(item.to_date, "DD/MM/YYYY") }}
          </template>

          <template #[`item-no_request_trip`]="{ item }">
            <router-link
              :to="{
                name: 'PoolCarRequestDetail',
                params: {
                  requestNumber: item.no_request_trip,
                  id: item.id,
                },
              }"
            >
              <span class="font-bold text-primary">
                {{ item.no_request_trip }}</span
              >
            </router-link>
          </template>

          <!-- <template #item-actions>
            <div class="flex justify-center items-center gap-2">
             
              <button @click="">
                <img :src="icon_delete" class="w-6 h-6" />
              </button>
            </div>
          </template> -->
        </DataTable>
      </div>
    </tableTop>
  </tableContainer>
</template>
