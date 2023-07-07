<script setup>
import { computed, onMounted, ref } from "vue"

import { useRoute } from "vue-router"

import { toFilterDate, numberFilter } from "@/utils/filters"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import PageTitle from "@/components/atomics/PageTitle.vue"
import DriverFormDialog from "./DriverFormDialog.vue"
import DataTable from "@/components/table/DataTable.vue"

import left_chevron_icon from "@/assets/request-trip-view-arrow.png"

import {
  fetchPoolCarRequestById,
  fetchDriverCarCheckupByRequesId,
} from "@/utils/Api/travel-management/poolCar"

const headers = [
  {
    text: "Name",
    key: "requestor_name",
    value: "requestor_name",
  },
  {
    text: "Car",
    key: "plate",
    value: "plate",
  },
  {
    text: "Driver",
    key: "driver_name",
    value: "driver_name",
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
    text: "Odometer",
    key: "odometer",
    value: "odometer",
  },
  {
    text: "Actions",
    key: "actions",
    value: "actions",
  },
]

const route = useRoute()

const tabs = ref(["Details"])
const tabActive = ref("Details")
const formDialog = ref(false)
const userRole = localStorage.getItem("id_role")
const checkupList = ref([])
const dataExisting = ref([])

const isDriver = computed(() => {
  return userRole == "DRVR"
})

const dataFormDialog = ref({
  is_usable: 0,
  notes: "",
  odometer: 0,
})

const items = ref([
  {
    name: "",
    car: "",
    driver: "",
    fromDate: "",
    toDate: "",
    odometer: 0,
  },
])

const fetchPoolRequest = async () => {
  const requestId = route.params.id
  const res = await fetchPoolCarRequestById(requestId)
  items.value = res.data
  dataFormDialog.value = res.data[0]
}

onMounted(async () => {
  await fetchPoolRequest()
})
</script>

<template>
  <tableContainer>
    <tableTop>
      <!-- Top -->
      <div
        class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between align-middle mx-4 py-2"
      >
        <PageTitle class="flex align-middle items-center gap-2 py-4 mx-4">
          <router-link
            :to="{ name: 'PoolCarRequest' }"
            class="flex align-middle content-center"
          >
            <img :src="left_chevron_icon" class="w-3 h-4 mr-3 self-center" />

            <h1 class="text-blue font-semibold text-2xl">
              {{ route.meta.title }}
            </h1>
          </router-link>

          <h1>
            <span class="text-[#0a0a0a] font-semibold text-2xl">
              / {{ route.params.requestNumber }}
            </span>
          </h1>
        </PageTitle>

        <div
          class="card flex w-[114px] text-sm capitalize text-center font-bold item-center border border-[#292D32] rounded-lg rounded-bl-3xl p-2 m-5"
        >
          {{ items[0].status }}
        </div>
      </div>

      <!-- Data -->
      <div class="grid grid-cols-2 gap-y-3 px-10">
        <div class="flex flex-col gap-2">
          <span class="font-medium text-sm">Created Date</span>
          <input
            :value="items[0].created_at"
            type="text"
            disabled
            class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-medium text-sm">Reference</span>
          <input
            :value="items[0].no_pool_car"
            type="text"
            disabled
            class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-medium text-sm">Created By</span>
          <input
            :value="items[0].created_by"
            type="text"
            disabled
            class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
          />
        </div>
      </div>

      <div class="p-10">
        <!-- Tab Table -->
        <div class="tabs bg-primary rounded-t-lg pt-3 py-0">
          <tab
            v-for="tab in tabs"
            :key="tab"
            class="tab flex gap-4 h-10 rounded-none bg-white text-black font-bold min-w-[120px] border-r"
            style="border-radius: 0.5rem 0.5rem 0px 0px"
            @click="tabActive = tab"
          >
            <div
              class="absolute left-0 w-3 h-full rounded-tl-lg"
              :class="{
                'border-black border-l-8': tabActive == tab,
              }"
            ></div>
            <span>
              {{ tab }}
            </span>
          </tab>
        </div>

        <div class="">
          <DataTable :headers="headers" :data="items" :pagination="false">
            <template #item-created_at="{ item }">
              {{ toFilterDate(item.create_at, "DD/MM/YYYY") }}
            </template>

            <template #item-from_date="{ item }">
              {{ toFilterDate(item.from_date, "DD/MM/YYYY") }}
            </template>

            <template #item-to_date="{ item }">
              {{ toFilterDate(item.to_date, "DD/MM/YYYY") }}
            </template>

            <template #item-odometer="{ item }">
              {{ numberFilter(item.odometer) }}
            </template>

            <template #item-actions="{ item }" v-if="dataFormDialog">
              <button
                @click="formDialog = true"
                class="text-lg text-center border border-primary text-primary rounded-lg align-center inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <DriverFormDialog
                v-if="formDialog"
                :model-value="formDialog"
                :data="dataFormDialog"
                @update:model-value="formDialog = $event"
              />
            </template>
          </DataTable>
        </div>
      </div>
    </tableTop>
  </tableContainer>
</template>

<style scoped>
tr,
td,
th {
  border: 1px #b9b9b9 solid;
}
</style>
