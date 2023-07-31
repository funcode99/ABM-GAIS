<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";
import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue";

import iconGoto from "@/assets/icon_Goto.png";
import iconCircle from "@/assets/circle_icon.png";

import Api from "@/utils/Api";
import moment from "moment";

import { ref, onBeforeMount, computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const tabs = ref(["Notification", "Approval"]);
const activeTab = ref(0);
const role = localStorage.getItem("id_role").replace(/"/g, "");

let sortedData = ref([]);
let instanceArray = [];

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

let sortedDataApproval = ref([]);
let instanceArrayApproval = [];

let showingValueApproval = ref(1);
let showingValueFromApproval = ref(0);
let showingValueToApproval = ref(0);
let pageMultiplierApproval = ref(10);
let pageMultiplierReactiveApproval = computed(() => pageMultiplier.value);
let paginateIndexApproval = ref(0);
let totalPageApproval = ref(0);
let totalDataApproval = ref(0);

const changeTab = (index) => {
  activeTab.value = index;
};

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
  fetchNotifNonApproval(pageOfItem);
};

const onChangePageApproval = (pageOfItem) => {
  paginateIndexApproval.value = pageOfItem - 1;
  showingValueApproval.value = pageOfItem;
  fetchNotifApproval(pageOfItem);
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
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/notification/get_notif", { params });
  instanceArray = res.data.data;
  sortedData.value = instanceArray.data;
  totalPage.value = instanceArray.last_page;
  totalData.value = instanceArray.total;
  showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
  showingValueTo.value = instanceArray.to;
};

const fetchNotifApproval = async (id) => {
  const params = {
    perPage: pageMultiplierApproval.value,
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/notification/get_approval", { params });
  instanceArrayApproval = res.data.data;
  sortedDataApproval.value = instanceArrayApproval.data;
  totalPageApproval.value = instanceArrayApproval.last_page;
  totalDataApproval.value = instanceArrayApproval.total;
  showingValueFromApproval.value = instanceArrayApproval.from
    ? instanceArrayApproval.from
    : 0;
  showingValueToApproval.value = instanceArrayApproval.to;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchNotifNonApproval();
  fetchNotifApproval();
});

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY, h:mm:ss");
  }
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />
      <tableContainer style="overflow: auto">
        <tableTop>
          <div class="tabs">
            <a
              v-for="(tab, index) in tabs"
              :key="index"
              :class="[
                'tab',
                'tab-bordered',
                'tab-lifted',
                'font-JakartaSans font-normal text-md',
                { 'tab-active': activeTab === index },
              ]"
              @click="changeTab(index)"
              v-show="
                tab == 'Approval' &&
                (role == 'ADMTR' || role == 'ADM' || role == 'SUPADM')
                  ? true
                  : tab == 'Notification'
                  ? true
                  : false
              "
            >
              {{ tab }}
            </a>
          </div>

          <!-- tab notifcation -->
          <main v-if="activeTab === 0">
            <tableData v-if="sortedData.length > 0">
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
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
                  <td style="width: 20%">
                    <span
                      class="flex flex-wrap justify-start items-center gap-4"
                    >
                      <img :src="iconCircle" class="w-2 h-2" />
                      {{ format_date(data.date) }}
                    </span>
                  </td>
                  <td style="width: 20%">{{ data.name }}</td>
                  <td style="width: 45%; white-space: pre-wrap">
                    {{ data.text }}
                  </td>

                  <td style="width: 10%">
                    <router-link
                      :to="`/viewcashadvancenontravel/${data.id_document}`"
                    >
                      <button>
                        <img :src="iconGoto" class="w-6 h-6" />
                      </button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </tableData>

            <tableData
              v-else-if="sortedData.length == 0 && instanceArray.length == 0"
            >
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

              <SkeletonLoadingTable :column="4" :row="5" />
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
              <p
                class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
              >
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
          </main>

          <!-- tab approval -->
          <main v-else>
            <tableData v-if="sortedDataApproval.length > 0">
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
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
                  v-for="data in sortedDataApproval"
                  :key="data.id"
                >
                  <td style="width: 20%">
                    <span
                      class="flex flex-wrap justify-start items-center gap-4"
                    >
                      <img :src="iconCircle" class="w-2 h-2" />
                      {{ format_date(data.date) }}
                    </span>
                  </td>
                  <td style="width: 20%">{{ data.name }}</td>
                  <td style="width: 55%; white-space: pre-wrap">
                    {{ data.text }}
                  </td>
                  <td style="width: 10%">
                    <router-link
                      :to="`/viewapprovalcanontravel/${data.id_document}`"
                    >
                      <button>
                        <img :src="iconGoto" class="w-6 h-6" />
                      </button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
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
              <p
                class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
              >
                Showing {{ showingValueFromApproval }} to
                {{ showingValueToApproval }}
                of {{ totalDataApproval }} entries
              </p>
              <vue-awesome-paginate
                :total-items="totalDataApproval"
                :items-per-page="parseInt(pageMultiplierReactiveApproval)"
                :on-click="onChangePageApproval"
                v-model="showingValueApproval"
                :max-pages-shown="4"
                :show-breakpoint-buttons="false"
                :show-ending-buttons="true"
              />
            </div>
          </main>
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
</style>
