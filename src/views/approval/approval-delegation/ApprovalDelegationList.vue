<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import ModalAdd from "@/components/approval/approval-delegation/ModalAdd.vue";
// import ModalAdd from "@/components/reference/gl-account/ModalAdd.vue";
// import ModalEdit from "@/components/reference/gl-account/ModalEdit.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";
import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue";

import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";
import Api from "@/utils/Api";
import moment from "moment";

import { ref, onBeforeMount, computed } from "vue";

// import { useFormEditStore } from "@/stores/reference/gl-account/edit-modal.js";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
// const formEditState = useFormEditStore();

// let editglAccountDataId = ref();

// const editGlAccount = async (data) => {
//   editglAccountDataId.value = data;
//   setTimeout(callEditApi, 500);
// };

// const callEditApi = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   await Api.post(`/gl_account/update_data/${editglAccountDataId.value}`, {
//     gl_account: formEditState.glAccount.glAccountCode,
//     gl_name: formEditState.glAccount.glAccountName,
//   });
//   Swal.fire({
//     position: "center",
//     icon: "success",
//     title: "Your work has been saved",
//     showConfirmButton: false,
//     timer: 1500,
//   });
//   fetchGLAccount();
// };

const search = ref("");
const date = ref();
const dateStart = ref();
const dateEnd = ref();

let sortedData = ref([]);
let sortedbyASC = true;
let instanceArray = [];

let showingValue = ref(1);
let showingValueFrom = ref(0);
let showingValueTo = ref(0);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let totalPage = ref(0);
let totalData = ref(0);

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
  //   fetchSettlementReport(pageOfItem);
};

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Delegator", jsonData: "delegator" },
  { Id: 3, title: "Delegate To", jsonData: "delegate_to" },
  { Id: 4, title: "Active From", jsonData: "start_date" },
  { Id: 5, title: "Active To", jsonData: "end_date" },
  { Id: 6, title: "Actions" },
];

const sortList = (sortBy) => {
  if (sortedbyASC) {
    sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
    sortedbyASC = false;
  } else {
    sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
    sortedbyASC = true;
  }
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const fetchApprovalDelegation = async (id) => {
  //   if (date.value != undefined) {
  //     if (date.value[0] != null) {
  //       dateStart.value = date.value[0].toISOString().split("T")[0];
  //     }
  //     if (date.value[1] != null) {
  //       dateEnd.value = date.value[1].toISOString().split("T")[0];
  //     }
  //     if (date.value[1] == null) {
  //       dateEnd.value = dateStart.value;
  //     }
  //   }

  const params = {
    search: null,
    start_date: null,
    end_date: null,
    perPage: pageMultiplier.value,
    page: id ? id : 1,
  };
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/approval_delegation/get_data", { params });
  instanceArray = res.data.data;
  console.log(instanceArray);
  sortedData.value = instanceArray.data;
  totalPage.value = instanceArray.last_page;
  totalData.value = instanceArray.total;
  showingValueFrom.value = instanceArray.from ? instanceArray.from : 0;
  showingValueTo.value = instanceArray.to;
};

onBeforeMount(() => {
  fetchApprovalDelegation();
  getSessionForSidebar();
});

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const resetData = () => {
  //   selectedCatype.value = "";
  //   selectedStatus.value = "";
  //   dateStart.value = "";
  //   dateEnd.value = "";
  //   date.value = null;
  //   fetchSettlementReport();
};

const deleteApprovalDelegation = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  Swal.fire({
    title:
      "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
    html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
    iconHtml: `<img src="${icondanger}" />`,
    showCloseButton: true,
    closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
    showCancelButton: true,
    buttonsStyling: false,
    cancelButtonText: "Cancel",
    customClass: {
      cancelButton: "swal-cancel-button",
      confirmButton: "swal-confirm-button",
    },
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Api.delete(`/approval_delegation/delete_data/${id}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Approval Delegation has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchApprovalDelegation();
      });
    } else {
      return;
    }
  });
};
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
              Approval Delegation
            </p>
            <div class="flex gap-4">
              <ModalAdd @approvaldelegation-saved="fetchApprovalDelegation" />
            </div>
          </div>

          <!-- SEARCH & SHOWING -->
          <div class="flex flex-wrap justify-between items-center mx-4">
            <div class="flex items-center gap-1 pt-6 pb-4 h-4">
              <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
              <select
                class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                v-model="pageMultiplier"
                @change=""
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>

            <div class="flex md:mx-0">
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
                  v-model="search"
                  @keyup="fetchSettlementReport()"
                />
              </label>
            </div>
          </div>

          <!-- TABLE -->
          <tableData v-if="sortedData.length > 0">
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                  @click="sortList(`${data.jsonData}`)"
                >
                  <span class="flex justify-center items-center gap-1">
                    <p class="font-JakartaSans font-bold text-sm">
                      {{ data.title }}
                    </p>
                    <button v-if="data.jsonData" class="ml-2">
                      <img :src="arrowicon" class="w-[9px] h-3" />
                    </button>
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
                <td>{{ data.no }}</td>
                <td>{{ data.delegator }}</td>
                <td>{{ data.delegate_to }}</td>
                <td>{{ format_date(data.start_date) }}</td>
                <td>{{ format_date(data.end_date) }}</td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <!-- <ModalEdit
                    @change-gl="editGlAccount(data.id)"
                    :formContent="[data.gl_account, data.gl_name]"
                  /> -->
                  <button @click="deleteApprovalDelegation(data.id)">
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button>
                </td>
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
                  @click="sortList(`${data.jsonData}`)"
                >
                  <span class="flex justify-center items-center gap-1">
                    <p class="font-JakartaSans font-bold text-sm">
                      {{ data.title }}
                    </p>
                    <button v-if="data.jsonData" class="ml-2">
                      <img :src="arrowicon" class="w-[9px] h-3" />
                    </button>
                  </span>
                </th>
              </tr>
            </thead>

            <SkeletonLoadingTable :column="6" :row="5" />
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
                    @click="sortList(`${data.jsonData}`)"
                  >
                    <span class="flex justify-center items-center gap-1">
                      <p class="font-JakartaSans font-bold text-sm">
                        {{ data.title }}
                      </p>
                      <button v-if="data.jsonData" class="ml-2">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colspan="6"
                    class="text-center font-JakartaSans text-base font-medium"
                  >
                    Data not Found
                  </td>
                </tr>
              </tbody>
            </tableData>
          </div>

          <!-- PAGINATION -->
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
</style>
