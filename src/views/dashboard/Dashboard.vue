<script setup>
import { onMounted, reactive, ref } from "vue";

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
import stockInVsOut from "./StockInVsOut.vue";
import BookingRoom from "./BookingRoomMeeting.vue";

import Multiselect from "@vueform/multiselect";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";

import { getDashboardData } from "@/utils/Api/dashboard/dashboard.js";

import fetchCompany from "@/utils/Fetch/Reference/fetchCompany.js";
import fetchDepartment from "@/utils/Fetch/Reference/fetchDepartment.js";
import fetchSite from "@/utils/Fetch/Reference/fetchSite.js";

const companyId = localStorage.getItem("id_company");

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
  month: null,
  year: null,
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
  const params = {
    company: filter.company.value,
    site: filter.site.value,
    cost_center: filter.costCenter.value,
    department: filter.department.value,
    month: filter.month,
    year: filter.year,
  };
  const res = await getDashboardData(params);

  if (res.success) {
    data.value = res.data;
  }
};

onMounted(async () => {
  filter.company.items = await fetchCompany();
  filter.site.items = await fetchSite();
  filter.department.items = await fetchDepartment();

  filter.company.items = filter.company.items.filter(
    ({ id }) => id == companyId
  );
  filter.company.value = companyId;

  await getData();
});
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
              label="company_name"
              track-by="company_name"
              :options="filter.company.items"
              valueProp="id"
              class="w-[150px] text-sm"
              disabled
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="">
            <Multiselect
              v-model="filter.site.value"
              mode="single"
              placeholder="Site"
              label="site_name"
              track-by="site_name"
              :options="filter.site.items"
              valueProp="id"
              class="w-[150px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="">
            <Multiselect
              v-model="filter.department.value"
              mode="single"
              placeholder="Dept."
              label="departement_name"
              track-by="departement_name"
              :options="filter.department.items"
              valueProp="id"
              class="w-[150px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <div class="">
            <Multiselect
              v-model="filter.costCenter.value"
              mode="single"
              placeholder="Cost Center"
              label="status"
              track-by="status"
              :options="filter.costCenter.items"
              valueProp="code"
              class="w-[150px] text-sm"
              clear
              searchable
            >
            </Multiselect>
          </div>

          <!-- <div class="w-[275px]">
            <VueDatePicker
              range
              v-model="filter.date"
              :enable-time-picker="false"
              format="yyyy-mm-dd"
            />
          </div> -->

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

        <div class="w-full my-5 align-start gap-5 grid grid-cols-3">
          <div class="basis-full 2xl:basis-8/12 col-span-3 2xl:col-span-2">
            <div class="grid grid-cols-2 gap-5">
              <TripStatus
                v-show="dashboardData.tripStatus.value"
                class="basis-full col-span-2"
                :data="data.status_trip"
              ></TripStatus>

              <TopRouteTravel
                v-show="dashboardData.topTravelRoutes.value"
                class="h-max-[250px] basis-5/12"
                :data="data.top_route"
              ></TopRouteTravel>

              <TotalTrip
                v-show="dashboardData.totalTrip.value"
                class="h-max-[250px] basis-5/12"
                :data="data.total_trip"
              ></TotalTrip>

              <CashAdvance
                v-show="dashboardData.totalCashAdvance.value"
                class="h-max-[250px] basis-5/12"
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

          <div class="2xl:basis-3/12 basis-full col-span-3 2xl:col-span-1">
            <div
              class="grid 2xl:grid-rows-2 2xl:grid-cols-1 grid-cols-2 gap-5 gap-y-20"
            >
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

        <div class="w-full grid grid-cols-4 gap-5">
          <stockInVsOut
            v-show="dashboardData.stockInVsOut.value"
            :data="data.stock_in_out"
            class="col-span-2 2xl:col-span-1 content-center"
          ></stockInVsOut>

          <BookingRoom
            v-show="dashboardData.meetingRoom.value"
            :data="data.meeting_room"
            class="col-span-2 2xl:col-span-3"
          >
          </BookingRoom>
        </div>
      </div>
    </tableTop>
  </tableContainer>
</template>

<style scoped>
.multiselect-placeholder {
}
</style>
