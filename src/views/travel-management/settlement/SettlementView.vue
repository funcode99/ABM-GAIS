<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import DataNotFound from "@/components/element/dataNotFound.vue";
import Swal from "sweetalert2";
import HistoryApproval from "@/components/approval/HistoryApproval.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import Api from "@/utils/Api";
import moment from "moment";

import { ref, onBeforeMount } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
import { useRoute, useRouter } from "vue-router";

const sidebar = useSidebarStore();
const route = useRoute();
const router = useRouter();

let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));

let lockScrollbar = ref(false);
let dataArr = ref([]);
let dataItem = ref([]);
let dataApproval = ref([]);
let tabId = ref(1);
let lengthCounter = 0;
let tempTotal = 0;
let idSettlement = route.params.id;
let statusForm = "";
let idEdit = ref("");
let visibleHeader = ref(false);
let editItem = ref(false);
let addItem = ref(false);
let type = ref("");

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
const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/settlement/get_data/${id}`);
  dataArr.value = res.data.data[0];
  generateType(dataArr.value.total_real, dataArr.value.total_ca);
  fetchDataItem(id);
  fetchHistoryApproval(id);
};

const fetchDataItem = async (id) => {
  const res = await Api.get(`/settlement/get_detail_by_id_settlement/${id}`);
  dataItem.value = res.data.data;
};

const edit = () => {
  visibleHeader.value = true;
  statusForm = "edit-header";
  dataItem.value.forEach((dt) => {
    tempTotal += Number(dt.nominal);
  });
  dataArr.value.grand_total = tempTotal;
};

const cancelHeader = () => {
  visibleHeader.value = false;
  editItem.value = false;
  idEdit.value = "";
};

const editItems = (id) => {
  idEdit.value = id;
  editItem.value = true;
};

const saveItems = async (type, id = null, item = null) => {
  const payload = {
    attachment: selectedImage.value,
    nominal_ca: item.nominal_ca,
    nominal_real: item.nominal_real,
    id_settlement: idSettlement,
  };
  if (type == "edit") {
    const api = await Api.post(`settlement/update_detail/${id}`, payload);
    Swal.fire({
      position: "center",
      icon: "success",
      title: api.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    fetchDataById(idSettlement);
    router.push({ path: `/settlement/${idSettlement}` });
  }
  editItem.value = false;
  addItem.value = false;
  idEdit.value = "";
  fetchDataItem(idSettlement);
};

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  Api.post(`settlement/submit/${idSettlement}`)
    .then((res) => {
      let status = res.data.success == true ? "success" : "error";
      Swal.fire({
        position: "center",
        icon: status,
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchDataById(idSettlement);
    })
    .catch((e) => {
      console.log(e);
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.error,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#EA5455",
        color: "#ffffff",
      });
    });
};

const generateType = (after, before) => {
  if (parseInt(after) > parseInt(before)) {
    type.value = "Claim";
  } else if (parseInt(after) < parseInt(before)) {
    type.value = "Refund";
  } else {
    type.value = "Equal";
  }
};

// image
const selectedImage = ref(null);
let filename = ref(null);

const onFileSelected = (event, id, nominal) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  filename.value = file.name;
};
// end

const fetchHistoryApproval = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/settlement/approval_history/${id}`);
  dataApproval.value = res.data.data;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(idSettlement);
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <div
    :class="lockScrollbar === true ? 'fixed' : ''"
    class="flex flex-col basis-full grow-0 shrink-0 w-full h-full overflow-y-hidden"
  >
    <Navbar />
    <div class="flex w-screen mt-[115px]">
      <Sidebar class="flex-none fixed" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- HEADER -->
          <div class="flex justify-between">
            <router-link
              to="/settlement"
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
            <div class="py-4">
              <button
                type="button"
                :class="
                  dataArr.status == 'Revision' || dataArr.status == 'Rejected'
                    ? ' btn btn-sm border-none mx-4 capitalize status-revision'
                    : 'btn btn-sm border-none mx-4 capitalize status-default'
                "
              >
                {{ dataArr.status }}
              </button>
            </div>
          </div>
          <div class="flex justify-start gap-4 mx-10">
            <label
              v-if="
                (dataArr.status == 'Draft' || dataArr.status == 'Revision') &&
                !visibleHeader
              "
              @click="edit()"
              class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
            >
              Edit
            </label>
            <div class="flex justify-end gap-4 mr-6" v-if="visibleHeader">
              <label
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[121px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                @click="cancelHeader"
                >Cancel</label
              >
              <button
                v-if="!editItem"
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[121px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="cancelHeader"
              >
                Save
              </button>
            </div>
            <button
              v-if="
                (dataArr.status == 'Draft' || dataArr.status == 'Revision') &&
                !visibleHeader
              "
              class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              @click="submit"
            >
              Submit
            </button>
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
            <div
              class="flex flex-col gap-2"
              v-if="dataArr.status == 'Completed'"
            >
              <span class="font-JakartaSans font-medium text-sm"
                >Transfer Date</span
              >
              <input
                type="text"
                disabled
                :value="format_date(dataArr.transfer_date)"
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
                v-model="dataArr.employee_name"
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
                :value="format_price(dataArr.total_ca)"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">CA No</span>
              <input
                type="text"
                disabled
                :value="dataArr.no_ca"
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
                :value="format_price(dataArr.total_real)"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2" v-if="dataArr.id_ca_type == '1'">
              <span class="font-JakartaSans font-medium text-sm"
                >Reference</span
              >
              <input
                type="text"
                disabled
                :value="dataArr.no_request_trip"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2" v-else>
              <span class="font-JakartaSans font-medium text-sm">Event</span>
              <input
                type="text"
                disabled
                :value="dataArr.event"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Type</span>
              <input
                type="text"
                disabled
                :value="type"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE-->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]" v-if="!addItem">
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
                      ? 'font-JakartaSans font-normal text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Details
                </p>
              </div>
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 2"
                v-if="dataArr.status != 'Draft'"
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
                      ? 'font-JakartaSans font-normal text-sm text-center font-semibold text-blue'
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
                      v-for="data in dataArr.id_ca_type == '1'
                        ? tableHeadDetailsItem
                        : tableHeadDetailsItemNon"
                      :key="data.id"
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      {{ data.title }}
                    </th>
                    <th
                      v-if="visibleHeader"
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="font-JakartaSans font-normal text-xs"
                  v-if="dataItem.length > 0 && dataArr.id_ca_type == '1'"
                >
                  <tr v-for="(data, index) in dataItem" :key="data.id">
                    <td>
                      {{ data.item_name }}
                    </td>
                    <td>
                      {{ data.frequency }}
                    </td>
                    <td>
                      {{ dataArr.currency_name }}
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
                      <div
                        v-if="
                          !visibleHeader || (visibleHeader && data.id != idEdit)
                        "
                        class="py-2 font-JakartaSans font-medium text-sm"
                      >
                        <a
                          :href="data.attachment_path"
                          target="_blank"
                          class="text-blue"
                        >
                          {{ data.attachment }}
                        </a>
                      </div>
                      <input
                        v-else
                        type="file"
                        id="logo_company"
                        class="px-4 py-1 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
                        accept="image/*"
                        @change="onFileSelected($event, index, data.nominal)"
                        :disabled="data.id == idEdit ? false : true"
                      />
                    </td>
                    <td class="border border-[#B9B9B9]" v-if="visibleHeader">
                      <div
                        class="flex justify-center items-center"
                        v-if="
                          (dataArr.status == 'Draft' ||
                            dataArr.status == 'Revision') &&
                          !editItem
                        "
                      >
                        <button>
                          <img
                            :src="editicon"
                            class="w-6 h-6"
                            @click="editItems(data.id)"
                          />
                        </button>
                      </div>
                      <div v-else>
                        <button
                          v-if="data.id == idEdit"
                          class="btn btn-sm text-white capitalize border-green bg-green hover:bg-white hover:text-green hover:border-green"
                          @click="saveItems('edit', data.id, data)"
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody
                  v-else-if="dataItem.length > 0 && dataArr.id_ca_type == '2'"
                >
                  <tr v-for="(data, index) in dataItem" :key="data.id">
                    <td>
                      {{ data.item_name }}
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
                      <div
                        v-if="
                          !visibleHeader || (visibleHeader && data.id != idEdit)
                        "
                        class="py-2 font-JakartaSans font-medium text-sm"
                      >
                        <a
                          :href="data.attachment_path"
                          target="_blank"
                          class="text-blue"
                        >
                          {{ data.attachment }}
                        </a>
                      </div>
                      <input
                        v-else
                        type="file"
                        id="logo_company"
                        class="px-4 py-1 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
                        accept="image/*"
                        @change="onFileSelected($event, index, data.nominal)"
                        :disabled="data.id == idEdit ? false : true"
                      />
                    </td>
                    <td class="border border-[#B9B9B9]" v-if="visibleHeader">
                      <div
                        class="flex justify-center items-center"
                        v-if="
                          (dataArr.status == 'Draft' ||
                            dataArr.status == 'Revision') &&
                          !editItem
                        "
                      >
                        <button>
                          <img
                            :src="editicon"
                            class="w-6 h-6"
                            @click="editItems(data.id)"
                          />
                        </button>
                      </div>
                      <div v-else>
                        <button
                          v-if="data.id == idEdit"
                          class="btn btn-sm text-white capitalize border-green bg-green hover:bg-white hover:text-green hover:border-green"
                          @click="saveItems('edit', data.id, data)"
                        >
                          Save
                        </button>
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
        </div>
      </div>
      <Footer class="fixed bottom-0 left-0 right-0" />
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}
.status-revision {
  background: #ef3022;
}

.status-default {
  background: #2970ff;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}
</style>
