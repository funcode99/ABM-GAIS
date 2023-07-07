<script setup>
import { onMounted, ref } from "vue"

import { useRoute } from "vue-router"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import PageTitle from "@/components/atomics/PageTitle.vue"
import DriverFormDialog from "./DriverFormDialog.vue"

import left_chevron_icon from "@/assets/request-trip-view-arrow.png"

const headers = [
  {
    text: "Name",
    key: "name",
  },
  {
    text: "Car",
    key: "car",
  },
  {
    text: "Driver",
    key: "driver",
  },
  {
    text: "From Date",
    key: "fromDate",
  },
  {
    text: "To Date",
    key: "toDate",
  },
  {
    text: "Odometer",
    key: "odometer",
  },
]

const route = useRoute()

const tabs = ref(["Details"])
const tabActive = ref("Details")
const formDialog = ref(false)

const items = ref([
  {
    name: "lol",
    car: "Ertiga",
    driver: "Anton",
    fromDate: "24-06-2023",
    toDate: "26-06-2023",
    odometer: 250,
  },
])

onMounted(() => {})
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
          waiting car & driver
        </div>
      </div>

      <!-- Data -->
      <div class="grid grid-cols-2 gap-y-3 px-10">
        <div class="flex flex-col gap-2">
          <span class="font-medium text-sm">Created Date</span>
          <input
            type="text"
            disabled
            class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-medium text-sm">Reference</span>
          <input
            type="text"
            disabled
            class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-semibold text-base"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class="font-medium text-sm">Created By</span>
          <input
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

        <div>
          <table width="100%">
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  class="bg-primary text-white p-3 text-sm"
                >
                  {{ header.text }}
                </th>
                <th class="bg-primary text-white p-3 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items">
                <td class="p-2" v-for="header in headers">
                  {{ item[header.key] }}
                </td>
                <td align="center">
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
                    :model-value="formDialog"
                    @update:model-value="formDialog = $event"
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
