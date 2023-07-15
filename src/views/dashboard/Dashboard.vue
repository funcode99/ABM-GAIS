<script setup>
import { reactive, ref } from "vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import PageTitle from "@/components/atomics/PageTitle.vue";

import TripStatus from "./TripStatusCard.vue";
import TopCostPerVendor from "./TotalCostPerVendor.vue";
import TotalTrip from "./TotalTrip.vue";
import TopRouteTravel from "./TopRoutesTravel.vue";
import TripPurpose from "./RequestTripPurpose.vue";
import CashAdvance from "./TotalCashAdvance.vue";
import Airlines from "./AirlinesChart.vue";

import Multiselect from "@vueform/multiselect";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";

import { getDashboardData } from "@/utils/Api/dashboard/dashboard.js";

const filter = reactive({
  company: {
    items: [],
    value: null,
  },
  site: {
    items: [],
    value: null,
  },
  department: {
    items: [],
    value: null,
  },
  costCenter: {
    items: [],
    value: null,
  },
  dateRange: {
    value: null,
  },
});

const dashboardData = reactive({
  tripStatus: { title: "Trip Status", value: true, components: TripStatus },
  tripRequest: { title: "Trip Request", value: true },
  totalTrip: { title: "Total Trips", value: true },
  totalCostPerVendor: { title: "Total Cost per Vendor", value: true },
  topTravelRoutes: { title: "Top 5 Routes Travel", value: true },
  totalCashAdvance: { title: "Total Cash Advance", value: true },
  airlines: { title: "Airlines", value: true },
  requestPerTripPurpose: { title: "Request per Trip Purpose", value: true },
  stockInVsOut: { title: "Stock In vs Stock Out", value: true },
  meetingRoom: { title: "Meeting Room Booking", value: true },
});

const data = ref({});

const getData = async () => {
  const res = await getDashboardData();

  if (res.success) {
    data.value = res.data;
  }
};

getData();
</script>

<template>
  <tableContainer>
    <tableTop class="p-5">
      <div class="w-[100%] flex flex-wrap">
        <PageTitle
          class="flex flex-row w-full flex-wrap align-middle items-center py-4 gap-2 mb-5"
        >
          <div class="grow font-semibold">Dashboards</div>
        </PageTitle>

        <div
          class="flex flex-row w-full flex-wrap align-middle items-center gap-4 mb-5"
        >
          <div class="">
            <Multiselect
              v-model="filter.company.value"
              mode="single"
              placeholder="Company"
              label="status"
              track-by="status"
              :options="[]"
              valueProp="code"
              class="w-[120px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="">
            <Multiselect
              v-model="filter.company.value"
              mode="single"
              placeholder="Site"
              label="status"
              track-by="status"
              :options="[]"
              valueProp="code"
              class="w-[120px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="">
            <Multiselect
              v-model="filter.company.value"
              mode="single"
              placeholder="Dept."
              label="status"
              track-by="status"
              :options="[]"
              valueProp="code"
              class="w-[120px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="">
            <Multiselect
              v-model="filter.company.value"
              mode="single"
              placeholder="Cost Center"
              label="status"
              track-by="status"
              :options="[]"
              valueProp="code"
              class="w-[120px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="w-[275px]">
            <VueDatePicker
              range
              v-model="filter.date"
              :enable-time-picker="false"
              format="yyyy-mm-dd"
            />
          </div>

          <div class="flex gap-4 flex-wrap">
            <button
              @click="tableRef.getData()"
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

        <div class="text-capitalize flex flex-wrap gap-2">
          <button
            v-for="item in dashboardData"
            :key="item.title"
            type="checkbox"
            aria-label="Trip Status"
            class="btn rounded-full btn-sm bg-primary hover:bg-primary btn-outline outline-primary capitalize"
            :class="{
              'bg-white text-gray-400': !item.value,
              'text-white': item.value,
            }"
            @click="item.value = !item.value"
          >
            {{ item.title }}
          </button>
        </div>

        <div class="w-full flex flex-wrap my-5 align-start">
          <div class="basis-full 2xl:basis-8/12">
            <div class="flex flex-wrap">
              <TripStatus
                v-show="dashboardData.tripStatus.value"
                class="basis-full"
                :data="data.status_trip"
              ></TripStatus>

              <TopRouteTravel
                v-show="dashboardData.topTravelRoutes.value"
                class="h-max-[250px] basis-1/2"
                :data="data.top_route"
              ></TopRouteTravel>

              <TotalTrip
                v-show="dashboardData.totalTrip.value"
                class="h-max-[250px] basis-1/2"
                :data="data.total_trip"
              ></TotalTrip>

              <CashAdvance
                v-show="dashboardData.totalCashAdvance.value"
                class="h-max-[250px] basis-1/2"
                :data="data.cash_advance"
              >
              </CashAdvance>

              <Airlines
                v-show="dashboardData.airlines.value"
                class="h-max-[250px] basis-1/2"
                :data="data.top_airlines"
              >
              </Airlines>
            </div>
          </div>

          <div class="2xl:basis-4/12 basis-full">
            <div class="flex flex-wrap">
              <TopCostPerVendor
                v-show="dashboardData.totalCostPerVendor.value"
                class="2xl:basis-full basis-5/12 grow"
                :data="data.vendor"
              >
              </TopCostPerVendor>
              <TripPurpose
                v-show="dashboardData.requestPerTripPurpose.value"
                class="2xl:basis-full basis-5/12 grow"
                :data="data.trip_purpose"
              >
              </TripPurpose>
            </div>
          </div>
        </div>
      </div>
    </tableTop>
  </tableContainer>
</template>

<style scoped>
.multiselect-placeholder {
}
</style>
