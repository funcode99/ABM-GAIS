<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import ModalJurnal from "@/components/approval/ModalJurnal.vue";
import ModalApprove from "@/components/approval/ModalApprove.vue";
import ModalReject from "@/components/approval/ModalReject.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";

import DataNotFound from "@/components/element/dataNotFound.vue";
import HistoryApproval from "@/components/approval/HistoryApproval.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import icon_done from "@/assets/icon_done.svg";
import iconClose from "@/assets/navbar/icon_close.svg";

import Api from "@/utils/Api";
import moment from "moment";
import Swal from "sweetalert2";

import { ref, onBeforeMount } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
import { useRoute, useRouter } from "vue-router";

const sidebar = useSidebarStore();
const route = useRoute();
const router = useRouter();

let dataArr = ref([]);
let dataItem = ref([]);
let dataApproval = ref([]);
let listEmployee = ref([]);
let alert = ref([]);

let visibleModal = ref(false);
let visibleModalReject = ref(false);
let id = route.params.id;
let tabId = ref(1);

const code_role = JSON.parse(localStorage.getItem("id_role"));

const listStatus = [
  {
    id: 0,
    status: "Draft",
    value: "alert bg-[#8d8e8f]",
    isHide: "",
    isJurnal: "hidden",
  },
  {
    id: 1,
    status: "Waiting Approval",
    value: "alert alert-warning",
    isHide: "",
    isJurnal: "",
  },
  {
    id: 2,
    status: "Revision",
    value: "alert alert-error",
    isHide: "hidden",
    isJurnal: "hidden",
  },
  {
    id: 3,
    status: "Fully Rejected",
    value: "alert alert-error",
    isHide: "hidden",
    isJurnal: "hidden",
  },
  {
    id: 10,
    status: "Completed",
    value: "alert alert-success",
    isHide: "hidden",
    isJurnal: "",
  },
];

const tableHeadDetailsItem = [
  { id: 1, title: "Item" },
  { id: 2, title: "Frequency" },
  { id: 3, title: "Currency" },
  { id: 4, title: "Nominal" },
  { id: 5, title: "Total" },
  { id: 6, title: "Total Pemakaian Real" },
  { id: 7, title: "Attachment" },
];

const tableHeadDetailsItemNon = [
  { id: 1, title: "Item" },
  { id: 3, title: "Cost Centre" },
  { id: 4, title: "Nominal" },
  { id: 5, title: "Nominal Pemakaian Real" },
  { id: 6, title: "Attachment" },
];

const approveData = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.post(`/approval_settlement/approve/${id}`, payload);

  if (res.data.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    closeModal();
    router.push({ path: `/approvalsettlement` });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: res.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const rejectData = async (payload) => {
  if (payload.is_revision == true && !payload.notes) {
    Swal.fire({
      html: "<b>Please fill notes!</b>",
      timer: 2000,
      timerProgressBar: true,
      position: "top-end",
      background: "#EA5455",
      color: "#ffffff",
      showCancelButton: false,
      showConfirmButton: false,
      width: "300px",
    });
  } else {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.post(`/approval_settlement/reject/${id}`, payload);

    if (res.data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      closeModalReject();
      router.push({ path: `/approvalsettlement` });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/approval_settlement/get_data/${id}`);
  dataArr.value = res.data.data[0];
  alert = listStatus.find((item) => item.status === dataArr.value.status);
  fetchDataItem(dataArr.value.id_document);
  fetchHistoryApproval(dataArr.value.id_document);
  fetchDataEmployee(dataArr.value);
};

const fetchDataItem = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/settlement/get_detail_by_id_settlement/${id}`);
  dataItem.value = res.data.data;
};

const fetchDataEmployee = async (dt) => {
  
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  
  let payload = {
    id_employee: dt.id_employee,
    id_company: dt.id_company,
    id_site: dt.id_site,
    id_approval_auth: dt.id_approval_auth,
  };

  const res = await Api.get("/employee/approval_behalf", {
    params: payload,
  });

  console.log(res.data.data)
  listEmployee.value = res.data.data;

};

const fetchHistoryApproval = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/settlement/approval_history/${id}`);
  dataApproval.value = res.data.data;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(id);
});

const closeModal = () => {
  visibleModal.value = false;
};

const closeModalReject = () => {
  visibleModalReject.value = false;
};

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const format_price = (value) => {
  if (!value) {
    return "0.00";
  }
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />
    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <tableContainer>
        <tableTop>

          <div class="flex justify-between">
            <router-link
              to="/approvalsettlement"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h1 class="text-blue font-semibold font-JakartaSans text-2xl">
                Settlement<span
                  class="text-[#0a0a0a] font-semibold font-JakartaSans text-2xl"
                >
                  / {{ dataArr.no_settlement }}
                </span>
              </h1>
            </router-link>

            <div class="py-4 mx-4">
              <span
                :class="`capitalize ${alert.value} text-white text-sm font-JakartaSans font-bold`"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {{ dataArr.status }}
              </span>
            </div>
          </div>

          <div :class="`float-right ${alert.isJurnal}`">
            <ModalJurnal :dataJurnal="dataArr" />
          </div>

          <div class="flex flex-wrap justify-start gap-4 px-[70px]">
            <label
              @click="visibleModal = true"
              for="my-modal-approve"
              :class="`btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-[#099250] hover:text-white hover:border-[#099250] ${alert.isHide}`"
            >
              <span>
                <img :src="icon_done" class="w-5 h-5" />
              </span>
              Approve
            </label>

            <label
              @click="visibleModalReject = true"
              for="my-modal-reject"
              :class="`btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-[#D92D20] hover:border-[#D92D20] hover:text-white ${alert.isHide}`"
            >
              <span>
                <img :src="iconClose" class="w-5 h-5" />
              </span>
              Reject
            </label>

            <ModalApprove
              v-if="visibleModal"
              :role-code="code_role"
              :list-employee="listEmployee"
              @close="closeModal"
              @approve="(data) => approveData(data)"
            />

            <ModalReject
              v-if="visibleModalReject"
              :id="id"
              @close="closeModalReject"
              @reject="(data) => rejectData(data)"
            />
          </div>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                :value="format_date(dataArr.created_at)"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created By</span
              >
              <input
                type="text"
                disabled
                :value="dataArr.employee_name"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Total Before Settlement</span
              >
              <input
                type="text"
                disabled
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">CA No</span>
              <input
                type="text"
                disabled
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Total After Settlement</span
              >
              <input
                type="text"
                disabled
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Event</span>
              <input
                type="text"
                disabled
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Type</span>
              <input
                type="text"
                disabled
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE -->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]">
            <div class="flex items-center">
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 1"
              >
                <div
                  :class="
                    tabId == 1
                      ? 'absolute bg-black h-full w-2 left-0 top-0 rounded-tl-lg'
                      : 'absolute h-full w-2 left-0 top-0 rounded-tl-lg'
                  "
                ></div>
                <p
                  :class="
                    tabId == 1
                      ? 'font-JakartaSans text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Details
                </p>
              </div>
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 2"
              >
                <div
                  :class="
                    tabId == 2
                      ? 'absolute bg-black h-full w-2 left-0 top-0 rounded-tl-lg'
                      : 'absolute h-full w-2 left-0 top-0 rounded-tl-lg'
                  "
                ></div>
                <p
                  :class="
                    tabId == 2
                      ? 'font-JakartaSans text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Approval
                </p>
              </div>
            </div>
            <div class="overflow-x-auto bg-white">
              <table class="table table-compact w-full" v-if="tabId == 1">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      v-for="data in dataArr.type_ca == '1'
                        ? tableHeadDetailsItem
                        : tableHeadDetailsItemNon"
                      :key="data.id"
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      {{ data.title }}
                    </th>
                  </tr>
                </thead>

                <tbody
                  class="font-JakartaSans font-normal text-xs"
                  v-if="dataItem.length > 0 && dataArr.type_ca == '1'"
                >
                  <tr v-for="data in dataItem" :key="data.id">
                    <td>
                      {{ data.nama_item }}
                    </td>
                    <td>
                      {{ data.frequency }}
                    </td>
                    <td>
                      {{ data.currency_name }}
                    </td>
                    <td>
                      <input
                        type="number"
                        name="remarks"
                        :class="inputClass"
                        required
                        v-model="data.nominal_real"
                        class="hidden"
                      />
                      {{ format_price(data.nominal_ca) }}
                    </td>
                    <td>
                      {{ format_price(data.nominal_ca * data.frequency) }}
                    </td>
                    <td>
                      <div v-if="data.id != idEdit">
                        {{ format_price(data.nominal_real) }}
                      </div>
                      <input
                        v-else
                        type="number"
                        :class="inputClass"
                        required
                        v-model="data.nominal_real"
                        :disabled="data.id == idEdit ? false : true"
                      />
                    </td>
                    <td>
                      <div class="py-2 font-JakartaSans font-medium text-sm">
                        <a
                          :href="data.attachment_path"
                          target="_blank"
                          class="text-blue"
                        >
                          {{ data.attachment }}
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>

                <tbody
                  v-else-if="dataItem.length > 0 && dataArr.id_ca_type == '2'"
                >
                  <tr v-for="data in dataItem" :key="data.id">
                    <td>
                      {{ data.nama_item }}
                    </td>
                    <td>
                      {{ data.cost_center_name }}
                    </td>
                    <td>
                      <input
                        type="number"
                        name="remarks"
                        :class="inputClass"
                        required
                        v-model="data.nominal_real"
                        class="hidden"
                      />
                      {{ format_price(data.nominal_ca) }}
                    </td>
                    <td>
                      <div v-if="data.id != idEdit">
                        {{ format_price(data.nominal_real) }}
                      </div>
                      <input
                        v-else
                        type="number"
                        :class="inputClass"
                        required
                        v-model="data.nominal_real"
                        :disabled="data.id == idEdit ? false : true"
                      />
                    </td>
                    <td>
                      <div class="py-2 font-JakartaSans font-medium text-sm">
                        <a
                          :href="data.attachment_path"
                          target="_blank"
                          class="text-blue"
                        >
                          {{ data.attachment }}
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>

                <tbody v-else-if="dataItem.length == 0">
                  <tr>
                    <DataNotFound :cnt-col="4" />
                  </tr>
                </tbody>
              </table>

              <div v-if="tabId == 2">
                <HistoryApproval
                  :data-approval="dataApproval"
                  :current-level="dataArr.current_level"
                />
              </div>
            </div>
          </div>

        </tableTop>
      </tableContainer>

      <Footer />
    </div>
  </div>
</template>

<style scoped>
.this {
  overflow-x: hidden;
}
</style>
