<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";
import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue";

import iconGoto from "@/assets/icon_Goto.png";

import Api from "@/utils/Api";

import { ref, onBeforeMount, computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const tabs = ref(["Notification", "Approval"]);
const activeTab = ref(0);

let sortedData = ref([]);
let instanceArray = [];
let role = ref();
let showSelectADM = ref(false);
let showSelectAll = ref(false);

let showingValue = ref(1);
let showingValueFrom = ref(0);
let showingValueTo = ref(0);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let totalPage = ref(0);
let totalData = ref(0);

const changeTab = (index) => {
  activeTab.value = index;
};

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
};

const tableHead = [
  { Id: 1, title: "Date", jsonData: "date" },
  { Id: 2, title: "From", jsonData: "name" },
  { Id: 3, title: "Content", jsonData: "text" },
  { Id: 4, title: "Actions" },
];

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const fetchNotifNonApproval = async (id) => {
  const params = {
    perPage: pageMultiplier.value,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/notification/get_notif", { params });
  console.log(res);
  instanceArray = res.data.data;
  sortedData.value = instanceArray.data;
  totalPage.value = instanceArray.last_page;
  totalData.value = instanceArray.total;
  showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
  showingValueTo.value = instanceArray.to;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchNotifNonApproval();
});
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />
      <tableContainer>
        <tableTop v-if="activeTab === 0">
          <tableData v-if="sortedData.length > 0">
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="data in sortedData"
                :key="data.id"
              >
                <td>{{ data.date }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.text }}</td>
                <!-- <td class="flex flex-wrap gap-2 justify-center">

                </td> -->
              </tr>
            </tbody>
          </tableData>

          <tableData
            v-else-if="sortedData.length == 0 && instanceArray.length == 0"
          >
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <div class="flex justify-center items-center">
                    <p class="font-JakartaSans font-bold text-sm">
                      {{ data.title }}
                    </p>
                  </div>
                </th>
              </tr>
            </thead>

            <SkeletonLoadingTable :column="10" :row="5" />
          </tableData>

          <div v-else>
            <tableData>
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
                <tr>
                  <th
                    v-for="data in tableHead"
                    :key="data.Id"
                    class="overflow-x-hidden cursor-pointer"
                  >
                    <div class="flex justify-center items-center">
                      <p class="font-JakartaSans font-bold text-sm">
                        {{ data.title }}
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colspan="10"
                    class="text-center font-JakartaSans text-base font-medium"
                  >
                    Data not Found
                  </td>
                </tr>
              </tbody>
            </tableData>
          </div>

          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
          >
            <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
              Showing {{ showingValueFrom }} to
              {{ showingValueTo }}
              of {{ totalData }} entries
            </p>
            <vue-awesome-paginate
              :total-items="totalData"
              :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-ending-buttons="true"
            />
          </div>
        </tableTop>
      </tableContainer>
    </div>
  </div>
</template>

<style scoped></style>
