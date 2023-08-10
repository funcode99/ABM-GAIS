<script setup>
import Swal from "sweetalert2"

import { computed, onMounted, ref } from "vue"

import { useRoute } from "vue-router"

import { toFilterDate, numberFilter } from "@/utils/filters"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import PageTitle from "@/components/atomics/PageTitle.vue"
import DriverFormDialog from "./DriverFormDialog.vue"
import DataTable from "@/components/table/DataTable.vue"
import ChangedCarDIalog from "./CarChanged.vue"

import left_chevron_icon from "@/assets/request-trip-view-arrow.png"

import {
  fetchPoolCarRequestById,
  fetchDriverCarCheckupByRequesId,
  setPoolRequestStatus,
  fetchPoolRequestHistory,
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
    sortable: false,
  },
]

const route = useRoute()

const tabs = ref(["Details", "History"])
const tabActive = ref("Details")
const formDialog = ref(false)
const checkupList = ref([])
const dataExisting = ref([])
const isEditable = ref(true)
const changeCarDialog = ref(false)

const isDriver = computed(() => {
  const userRole = localStorage.getItem("id_role")

  return userRole == `"DRVR"`
})

const isSuperAdmin = computed(() => {
  const userRole = localStorage.getItem("id_role")

  return userRole == `"SUPADM"`
})

const p2hStatus = ref(1)

const dataFormDialog = ref({
  is_usable: 0,
  notes: "",
  odometer: 0,
})

const items = ref([])
const historyItems = ref([])
const isShowP2hAkhir = ref(false)
const p2hAkhirRef = ref()

const form = ref({
  name: "",
  car: "",
  driver: "",
  fromDate: "",
  toDate: "",
  odometer: 0,
})

const fetchPoolHistory = async () => {
  try {
    const requestId = route.params.id
    const res = await fetchPoolRequestHistory(requestId)
    if (res?.success) {
      historyItems.value = res.data.map((item) => {
        return {
          ...item,
          isUnusable: true,
          is_history: true,
        }
      })
    } else {
      historyItems.value = []
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchPoolRequest = async () => {
  const requestId = route.params.id
  const res = await fetchPoolCarRequestById(requestId)
  items.value = [res.data[0]]
  form.value = res.data[0]
}

onMounted(async () => {
  await fetchPoolHistory()
  await fetchPoolRequest()
})
</script>

<template>
  <tableContainer>
    <tableTop>
      <!-- Top -->
      <div
        class="flex w-[500px] flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between align-middle mx-4 py-2"
      >
        <PageTitle class="flex align-middle items-center gap-2 py-4 mx-4">
          <router-link
            :to="{ name: 'PoolCarRequest' }"
            class="flex align-middle content-center"
          >
            <img :src="left_chevron_icon" class="w-3 h-4 mr-3 self-center" />

            <h1 class="text-blue font-semibold text-xl">
              {{ route.meta.title }}
            </h1>
          </router-link>

          <h1>
            <span class="text-[#0a0a0a] font-semibold text-xl">
              / {{ route.params.requestNumber }}
            </span>
          </h1>
        </PageTitle>

        <div
          :class="{
            'bg-green text-white border-none': form.status == 'Done',
          }"
          class="card flex w-[114px] text-sm capitalize text-center font-bold item-center border border-[#292D32] rounded-lg rounded-bl-3xl p-2 m-5"
        >
          {{ form.status }}
        </div>
      </div>

      <div class="px-10 py-5 flex justify-between">
        <button
          v-if="form.status == 'Ready' && isDriver && !isShowP2hAkhir"
          class="btn px-10 h-[5px] btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-base hover:bg-white hover:text-green hover:border-green"
          @click="
            () => {
              formDialog = true
              isEditable = isDriver && form.status == 'Ready'
              p2hStatus = 2
              dataFormDialog = { ...items[0] }
            }
          "
        >
          Done
        </button>
      </div>
      <!-- Data -->
      <div class="flex gap-y-3 px-10">
        <div class="basis-10/12 grid grid-cols-2 gap-y-3">
          <div class="flex flex-col gap-2">
            <span class="font-medium text-sm">Created Date</span>
            <input
              :value="form.created_at"
              type="text"
              disabled
              class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
            />
          </div>

          <div class="flex flex-col gap-2">
            <span class="font-medium text-sm">Reference</span>
            <input
              :value="form.no_request_trip"
              type="text"
              disabled
              class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[100%] font-semibold text-base"
            />
          </div>

          <div class="flex flex-col gap-2">
            <span class="font-medium text-sm">Created By</span>
            <input
              :value="form.created_by_name"
              type="text"
              disabled
              class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
            />
          </div>
        </div>
        <div class="mt-7 flex-grow text-end"></div>
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
          <DataTable
            :headers="headers"
            :data="tabActive == 'Details' ? items : historyItems"
            :pagination="false"
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

            <template #item-odometer="{ item }">
              {{ numberFilter(item.odometer) }}
            </template>

            <template #item-actions="{ item }" v-if="dataFormDialog">
              <div class="grid grid-rows-2 gap-3">
                <!-- <button
                  v-if="form.status == 'Driver Check' && isDriver"
                  @click="
                    () => {
                      formDialog = true
                      isEditable = true
                    }
                  "
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
                </button> -->

                <div>
                  <button
                    v-if="form.status != 'Waiting Car & Driver'"
                    class="btn bg-primary"
                    @click="
                      () => {
                        formDialog = true
                        isEditable =
                          !item.isUnusable &&
                          isDriver &&
                          form.status == 'Driver Check'
                        p2hStatus = 1
                        dataFormDialog = item
                      }
                    "
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
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>

                    P2H Awal
                  </button>
                </div>

                <button
                  ref="p2hAkhirRef"
                  v-show="form.status == 'Done'"
                  class="btn bg-primary"
                  @click="
                    () => {
                      formDialog = true
                      isEditable = isDriver && form.status == 'Ready'
                      p2hStatus = 2
                      dataFormDialog = item
                    }
                  "
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
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>

                  P2H Akhir
                </button>

                <div
                  v-if="
                    !item.is_history && item.status == 'Ready' && isSuperAdmin
                  "
                >
                  <button
                    @click="
                      () => {
                        changeCarDialog = true
                      }
                    "
                    class="btn text-sm text-center border border-primary text-white rounded-lg bg-primary align-center inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="white"
                      class="w-7 h-7"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    <div>Change Car</div>
                  </button>
                </div>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </tableTop>
  </tableContainer>
  <DriverFormDialog
    v-if="formDialog"
    :status="p2hStatus"
    :model-value="formDialog"
    :data="dataFormDialog"
    @update:model-value="formDialog = $event"
    @success="fetchPoolRequest()"
    :isEditable="isEditable"
  />

  <ChangedCarDIalog
    v-if="changeCarDialog"
    :model-value="changeCarDialog"
    :data="dataFormDialog"
    @update:model-value="changeCarDialog = $event"
    @success="
      () => {
        fetchPoolHistory()
        fetchPoolRequest()
      }
    "
  />
</template>

<style scoped>
tr,
td,
th {
  border: 1px #b9b9b9 solid;
}
</style>
