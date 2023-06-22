<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import DataNotFound from "@/components/element/dataNotFound.vue";
import Swal from "sweetalert2";

import arrow from "@/assets/request-trip-view-arrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import iconUpload from "@/assets/icon_upload.svg";
import showicon from "@/assets/eye.png";

import Api from "@/utils/Api";
import moment from "moment";

import { ref, onBeforeMount } from "vue";
import { useSidebarStore } from "@/stores/sidebar.js";
import { useRoute } from "vue-router";

const sidebar = useSidebarStore();
const route = useRoute();
let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));

let lockScrollbar = ref(false);
let dataArr = ref([]);
let dataItem = ref([]);
let lengthCounter = 0;
let tempTotal = 0;
let idClaim = route.params.id;
let statusForm = "";
let listType = ref([]);
let idEdit = ref("");
let visibleHeader = ref(false);
let editItem = ref(false);
let addItem = ref(false);
let itemsNominal = ref("");
let itemsType = ref("");
let itemsRemarks = ref("");
const selectedImage = ref(null);
let filename = ref(null);

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

const onFileSelected = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  filename.value = file.name;
};

// FETCH
const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/claim_reimbursement/get_data/${id}`);
  dataArr.value = res.data.data[0];
  selectedImage.value = dataArr.value.attachment;
  fetchDataItem(id);
};

const fetchDataItem = async (id) => {
  const res = await Api.get(`/claim_reimbursement/get_by_id_claim/${id}`);
  dataItem.value = res.data.data;
};

const fetchType = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("reimbursement");
  listType.value = api.data.data.data;
};
// END

// HEADER
const edit = () => {
  visibleHeader.value = true;
  statusForm = "edit-header";
  dataItem.value.forEach((dt) => {
    tempTotal += Number(dt.nominal);
  });
  dataArr.value.grand_total = tempTotal;
};

const saveFormHeader = async () => {
  const payload = {
    id_employee: selectedEmployee,
    nominal: dataArr.value.grand_total,
    attachment: selectedImage.value,
  };

  Api.post(`claim_reimbursement/update_data/${idClaim}`, payload)
    .then((res) => {
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        visibleHeader.value = false;
        fetchDataById(idClaim);
      } else {
        Swal.fire({
          text: res.data.error,
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
          background: "#EA5455",
          color: "#ffffff",
          showCancelButton: false,
          showConfirmButton: false,
          width: "300px",
        });
      }
    })
    .catch((e) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.response.data.message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#EA5455",
        color: "#ffffff",
      });
    });
};

const cancelHeader = () => {
  visibleHeader.value = false;
  editItem.value = false;
  idEdit.value = "";
  filename.value = "";
  selectedImage.value = dataArr.value.attachment;
};
// END

// ITEMS
const removeItems = async (id) => {
  const api = await Api.delete(`claim_reimbursement/delete_data_detail/${id}`);
  Swal.fire({
    position: "center",
    icon: "success",
    title: api.data.message,
    showConfirmButton: false,
    timer: 1500,
  });
  fetchDataItem(idClaim);
};

const editItems = (id) => {
  idEdit.value = id;
  editItem.value = true;
};

const saveItems = async (type, id = null, item = null) => {
  if (type == "edit") {
    if (item.nominal) {
      const api = await Api.post(
        `claim_reimbursement/update_data_detail/${id}`,
        item
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: api.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      editItem.value = false;
      addItem.value = false;
      fetchDataItem(idClaim);
    } else {
      Swal.fire({
        html: "<b>Please fill in the form!</b>",
        timer: 2000,
        timerProgressBar: true,
        position: "top-end",
        background: "#EA5455",
        color: "#ffffff",
        showCancelButton: false,
        showConfirmButton: false,
        width: "300px",
      });
    }
  } else if (type == "create") {
    if (itemsNominal.value) {
      let payload = {
        id_claim_reimbursement: idClaim,
        nominal: itemsNominal.value,
        id_reimbursement_type: itemsType.value,
        remarks: itemsRemarks.value,
      };
      const api = await Api.post(`claim_reimbursement/store_detail`, payload);
      Swal.fire({
        position: "center",
        icon: "success",
        title: api.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      editItem.value = false;
      addItem.value = false;
      fetchDataItem(idClaim);
      idEdit.value = "";
      resetItems();
    } else {
      Swal.fire({
        html: "<b>Please fill in the form!</b>",
        timer: 2000,
        timerProgressBar: true,
        position: "top-end",
        background: "#EA5455",
        color: "#ffffff",
        showCancelButton: false,
        showConfirmButton: false,
        width: "300px",
      });
    }
  }
};

const addItems = () => {
  addItem.value = true;
};

const cancelItems = () => {
  addItem.value = false;
};

const resetItems = () => {
  itemsNominal.value = "";
  itemsRemarks.value = "";
  itemsType.value = "";
};
// END

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  Api.post(`claim_reimbursement/submit/${idClaim}`)
    .then((res) => {
      let status = res.data.success == true ? "success" : "error";
      Swal.fire({
        position: "center",
        icon: status,
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      route.push({ path: `/viewclaimreimbursement/${idClaim}` });
    })
    .catch((e) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: e.response.data.error,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#EA5455",
        color: "#ffffff",
      });
    });
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(idClaim);
  fetchType();
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const rowClass = "grid grid-cols-2 gap-y-3 mb-7 pt-7";
const colClass = "flex flex-col gap-2 mx-5";
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
              to="/claimreimbursement"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h1 class="text-blue font-semibold font-JakartaSans text-2xl">
                Claim Reimbursement<span
                  class="text-[#0a0a0a] font-semibold font-JakartaSans text-2xl"
                >
                  / {{ dataArr.no_claim }}
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
                @click="saveFormHeader"
              >
                Save
              </button>
            </div>
            <!-- <ModalAddCaNonTravelVue
              v-if="lockScrollbar"
              :formData="dataArr"
              :formDataItem="dataItem"
              :status="statusForm"
            />-->
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
                >Transfered Date</span
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
                >Attachment</span
              >
              <input
                type="file"
                id="file-input"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base hidden"
                accept="application/pdf"
                @change="onFileSelected"
                :v-model="selectedImage"
                :disabled="!visibleHeader"
              />
              <label
                id="file-input-label"
                for="file-input"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              >
                <span v-if="selectedImage != null && !visibleHeader"
                  ><a
                    :href="dataArr.attachment_path"
                    target="_blank"
                    class="text-blue"
                  >
                    {{ selectedImage }}
                  </a></span
                >
                <span v-else-if="visibleHeader && !filename">
                  <div class="flex flex-wrap gap-4">
                    <img :src="iconUpload" />
                    Select a File
                  </div></span
                >
                <span v-else-if="filename">{{ filename }}</span>
              </label>
              <!-- <div
                v-if="filename != null && !visibleHeader"
                class="py-2 font-JakartaSans font-medium text-sm"
              >
                <a
                  :href="dataArr.attachment_path"
                  target="_blank"
                  class="text-blue"
                >
                  {{ filename }}
                </a>
              </div> -->
            </div>
            <div class="flex flex-col gap-2">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Travel</label
              >
              <input
                type="text"
                disabled
                v-model="dataArr.no_request_trip"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Total</span>
              <input
                type="text"
                disabled
                :value="format_price(dataArr.grand_total)"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <!-- TAB & TABLE-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
              v-if="
                (dataArr.status == 'Draft' || dataArr.status == 'Revision') &&
                !addItem &&
                !editItem &&
                visibleHeader
              "
              @click="addItems"
            >
              Add Item
            </button>
          </div>
          <div v-if="addItem && !editItem" class="mx-[70px]">
            <div class="mx-3">
              <p class="font-JakartaSans font-medium text-sm pb-2">
                Details Item
              </p>
              <hr class="h-px bg-[#8B8B8B] border-0 mb-4" />
            </div>

            <div :class="rowClass">
              <div :class="colClass">
                <input type="hidden" name="idItem" v-model="itemsId" />
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Reimbursement Type</label
                >
                <select
                  v-model="itemsType"
                  class="bg-white max-w-[100%] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                >
                  <option disabled selected>Type</option>
                  <option
                    v-for="data in listType"
                    :key="data.id"
                    :value="data.id"
                  >
                    {{ data.reimbursement_type }}
                  </option>
                </select>
              </div>
              <div :class="colClass">
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Nominal<span class="text-red">*</span></label
                >
                <input
                  v-model="itemsNominal"
                  type="number"
                  name="nominal"
                  :class="inputClass"
                  placeholder="Nominal"
                  required
                />
              </div>

              <div :class="colClass">
                <label class="block mb-2 font-JakartaSans font-medium text-sm"
                  >Remarks</label
                >
                <input
                  v-model="itemsRemarks"
                  type="text"
                  name="remarks"
                  :class="inputClass"
                  placeholder="Remarks"
                  required
                />
              </div>
            </div>

            <div class="sticky bottom-0 bg-white py-2">
              <div class="flex justify-center gap-4 mr-6">
                <label
                  @click="cancelItems"
                  class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  >Cancel</label
                >
                <button
                  class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                  @click="saveItems('create')"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div class="bg-blue rounded-lg pt-2 mx-[70px]" v-if="!addItem">
            <div
              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
            >
              <div
                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
              ></div>
              <p class="font-JakartaSans font-normal text-sm mx-8">Details</p>
            </div>
            <div class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Type
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Nominal
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Remarks
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      v-if="visibleHeader"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="font-JakartaSans font-normal text-xs"
                  v-if="dataItem.length > 0"
                >
                  <tr class="h-16" v-for="item in dataItem" :key="item.id">
                    <td class="border border-[#B9B9B9]">
                      <span v-if="!editItem">
                        {{ item.reimbursement_type }}
                      </span>
                      <select
                        v-else
                        v-model="item.id_reimbursement_type"
                        required
                        :disabled="item.id == idEdit ? false : true"
                      >
                        <option
                          v-for="data in listType"
                          :key="data.id"
                          :value="data.id"
                        >
                          {{ data.reimbursement_type }}
                        </option>
                      </select>
                    </td>
                    <td class="border border-[#B9B9B9]">
                      <span v-if="!editItem">
                        {{ format_price(item.nominal) }}
                      </span>
                      <input
                        v-else
                        v-model="item.nominal"
                        type="number"
                        name="nominal"
                        :class="inputClass"
                        placeholder="Nominal"
                        required
                        :disabled="item.id == idEdit ? false : true"
                      />
                    </td>
                    <td class="border border-[#B9B9B9]">
                      <input
                        v-model="item.remarks"
                        type="text"
                        name="remarks"
                        :class="inputClass"
                        placeholder="Remarks"
                        required
                        :disabled="item.id == idEdit ? false : true"
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
                            @click="editItems(item.id)"
                          />
                        </button>
                        <button>
                          <img
                            :src="deleteicon"
                            class="w-6 h-6"
                            @click="removeItems(item.id)"
                          />
                        </button>
                      </div>
                      <div v-else>
                        <button
                          v-if="item.id == idEdit"
                          class="btn btn-sm text-white capitalize border-green bg-green hover:bg-white hover:text-green hover:border-green"
                          @click="saveItems('edit', item.id, item)"
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <DataNotFound :cnt-col="4" />
                  </tr>
                </tbody>
              </table>
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
