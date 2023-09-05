<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_jurnal from "@/assets/icon_jurnal.svg";
// import editicon from "@/assets/navbar/edit_icon.svg";

import Api from "@/utils/Api";
import Swal from "sweetalert2";
import moment from "moment";
import Multiselect from "@vueform/multiselect";

import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";

const emits = defineEmits(["unlockScrollbar"]);
const route = useRoute();

let dataCaNonTravel = ref([]);
let dataSapDoc = ref([]);
let companyData = ref([]);
let costCenterData = ref([]);
let pkData = ref([]);
let GLData = ref([]);
let typeDoc = ref("");
let companyCode = ref("");
let IdPostJurnal = ref("");
let currentStatus = ref("");
let postingDate = ref("");
let isVisibleTableHeaders = ref(false);
let isEditing = ref(false);
let isHideButtonSave = ref(false);
let alreadySave = ref(false);
let isNoEdit = ref(false);
let idEdit = ref(null);

let id = route.params.id;

const role = JSON.parse(localStorage.getItem("id_role"));

const props = defineProps({
  dataJurnal: Object,
});

const tableHead = [
  { Id: 1, title: "Item", jsonData: "item_number" },
  { Id: 2, title: "PK", jsonData: "posting_key" },
  { Id: 3, title: "Doc Date", jsonData: "doc_date" },
  { Id: 4, title: "G/L Account", jsonData: "gl_reccon_acc" },
  { Id: 5, title: "Account Short Text", jsonData: "short_text" },
  { Id: 6, title: "Amount", jsonData: "amount" },
  { Id: 7, title: "Text", jsonData: "item_text" },
  { Id: 8, title: "Cost Center", jsonData: "cost_center" },
  { Id: 9, title: "Profit Center", jsonData: "profit_center" },
  { Id: 10, title: "Wbs", jsonData: "wbs" },
  { Id: 11, title: "Due Date", jsonData: "due_date" },
  { Id: 12, title: "Posting Date", jsonData: "posting_date" },
];

const tableHeadActive = [
  { id: 1, title: "Item", jsonData: "item_number" },
  { id: 2, title: "PK", jsonData: "posting_key" },
  { id: 3, title: "Doc Date", jsonData: "doc_date" },
  { id: 4, title: "G/L Account", jsonData: "gl_reccon_acc" },
  { id: 5, title: "Account Short Text", jsonData: "short_text" },
  { id: 6, title: "Amount", jsonData: "amount" },
  { id: 7, title: "Text", jsonData: "item_text" },
  { id: 8, title: "Cost Center", jsonData: "cost_center" },
  { id: 9, title: "Profit Center", jsonData: "profit_center" },
  { id: 10, title: "Wbs", jsonData: "wbs" },
  { id: 11, title: "Due Date", jsonData: "due_date" },
  { id: 12, title: "Posting Date", jsonData: "posting_date" },
  { id: 13, title: "Actions", jsonData: "actions" },
];

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get/");
  companyData.value = res.data.data;
  companyData.value.map((item) => {
    if (item.id === props.dataJurnal.id_company) {
      companyCode.value = item.company_code;
    }
  });

  fetchGLAccount(props.dataJurnal.id_company);
};

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  try {
    const res = await Api.get(`/approval_non_travel/get_data/${id}`);
    dataCaNonTravel.value = res.data.data[0];
    // console.log("dataCaNonTravel", dataCaNonTravel.value);
    typeDoc.value = props.dataJurnal.code_document;
    fetchSapByIdDoc(dataCaNonTravel.value.id_document);
    // postingJurnal(dataCaNonTravel.value.id_document);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchSapByIdDoc = async (id) => {
  // console.log("ini iD", id);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  try {
    const res = await Api.get(
      `/jurnal/get_sap_by_id_document/${id}?Type=${typeDoc.value}`
    );
    const dataArray = res.data.data.detail.map(
      ({ document_date, item_number, posting_key, ...rest }) => {
        return {
          ...rest,
          doc_date: document_date,
          item: item_number,
          pk: posting_key,
        };
      }
    );
    dataSapDoc.value = dataArray;
    IdPostJurnal = res.data.data.id;
    postingDate = res.data.data.posting_date;
    // console.log(postingDate);

    if (res.data.data.is_csv_created) {
      currentStatus = "POSTED";
    } else {
      currentStatus = "PARKING";
    }

    // console.log(IdPostJurnal);
    // console.log("ini data array", dataArray);
    // console.log("ini data sapDoc datasapdoc", res.data.data.detail);
    // console.log("ini data id", res.data.data.id);
    // console.log("ini status csv", res.data.data.is_csv_created);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchCostCenter = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get_cost_center");
  costCenterData.value = res.data.data;
  costCenterData.value.map((item) => {
    item.value = item.id;
    item.format = `${item.cost_center_code} - ${item.cost_center_name}`;
    // console.log(item.format);
  });
};

const fetchPK = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/jurnal/get_pk");
  pkData.value = res.data.data;
};

const fetchGLAccount = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/jurnal/get_gl_account/${id}`);
  GLData.value = res.data.data;
  // console.log(res.data.data);
  GLData.value.map((item) => {
    item.value = item.id;
    item.format = `${item.gl_account}`;
  });
};

watch(
  dataSapDoc,
  (newDataSapDoc) => {
    newDataSapDoc.forEach((item) => {
      if (item.gl_reccon_acc) {
        const selectedGL = GLData.value.find(
          (gl) => gl.id === item.gl_reccon_acc
        );
        if (selectedGL) {
          item.short_text = selectedGL.gl_name;
        }
      }
    });
  },
  { deep: true }
);

onBeforeMount(() => {
  fetchCompany();
  fetchDataById(id);
  fetchCostCenter();
  fetchPK();
});

const editTableHeader = () => {
  isVisibleTableHeaders.value = true;
  isEditing.value = !isEditing.value;
  // isNoEdit.value = true;
};

const cancelTableHeader = () => {
  isVisibleTableHeaders.value = false;
  isEditing.value = false;
  // isNoEdit.value = false;
  // idEdit.value = null;
};

const saveJurnal = async (data) => {
  const dataArray = data.map(({ doc_date, item, pk, template, ...rest }) => {
    return {
      ...rest,
      item_number: item,
      posting_key: pk,
    };
  });

  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  try {
    let payload = {
      id_document: props.dataJurnal.id_document,
      doc_number_sap: null,
      company_code: companyCode.value,
      document_date: props.dataJurnal.doc_created_at,
      posting_date: null,
      reference_doc: props.dataJurnal.no_ca,
      fis_year: format_year(props.dataJurnal.doc_created_at),
      currency: props.dataJurnal.currency_code,
      fis_period: format_month(props.dataJurnal.doc_created_at),
      order: null,
      claim_cat: props.dataJurnal.code_document,
      array_data: dataArray,
      gl_reccon_acc: data.gl_reccon_acc,
      short_text: data.short_text,
      item_text: data.item_text,
      cost_center: data.cost_center,
      profit_center: data.profit_center,
      wbs: data.wbs,
      due_date: data.due_date,
    };
    const res = await Api.post("/jurnal/save_sap", payload);
    // console.log("ini payload", payload);
    Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    // isNoEdit.value = true;
    // alreadySave.value = true;
    fetchSapByIdDoc(dataCaNonTravel.value.id_document);
    isVisibleTableHeaders.value = false;
    isEditing.value = false;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const postingJurnal = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const res = await Api.get(`/export/sap/journal/${IdPostJurnal}`);
    // console.log(res.message);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Posting Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    // console.log("berhasil posting");
    fetchSapByIdDoc(dataCaNonTravel.value.id_document);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// const editTableDetails = (id) => {
//   idEdit.value = id;
// };

// const cancelTableDetails = () => {
//   idEdit.value = null;
//   isEditing.value = false;
// };

// const saveTableDetails = () => {
//   idEdit.value = null;
//   isEditing.value = false;
// };

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const format_year = (value) => {
  if (value) {
    return moment(String(value)).format("YYYY");
  }
};

const format_month = (value) => {
  if (value) {
    return moment(String(value)).format("M");
  }
};

const formatPriceForInput = (value) => {
  if (!value) {
    return "0.00";
  }

  const numericValue = parseFloat(value.replace(/[^0-9-]/g, ""));
  const hasMinusSign = value.endsWith("-");
  const formattedValue = numericValue.toLocaleString("id-ID");

  if (hasMinusSign) {
    return formattedValue + "-";
  } else {
    return formattedValue;
  }
};

const updateAmount = (rowData, newValue) => {
  rowData.amount = formatPriceForInput(newValue);
};

let classStyle =
  "font-JakartaSans font-semibold text-base capitalize block bg-#e0e0e0 w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed";

const inputClass =
  "cursor-pointer font-JakartaSans block bg-#e0e0e0 w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    type="button"
    class="btn btn-sm mx-4 text-white text-base font-JakartaSans font-bold capitalize bg-blue border-blue hover:bg-blue hover:border-blue hover:text-white"
  >
    <span> <img :src="icon_jurnal" class="w-5 h-5 mr-2" /> </span>Jurnal
  </label>

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative w-11/12 max-w-6xl">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Jurnal
        </p>
      </nav>

      <main class="modal-box-inner">
        <div class="sticky top-0 bg-white" v-if="role === 'ADM'">
          <div
            class="flex flex-wrap justify-start gap-2 items-center px-8 py-3"
          >
            <button
              v-if="!isVisibleTableHeaders"
              class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-blue border-blue hover:bg-white hover:border-blue hover:text-blue"
              @click="editTableHeader"
            >
              Edit
            </button>

            <div class="flex justify-end gap-2" v-if="isVisibleTableHeaders">
              <button
                class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-red border-red hover:bg-white hover:border-red hover:text-red"
                @click="cancelTableHeader"
              >
                Cancel
              </button>

              <button
                class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="
                  saveJurnal(dataSapDoc);
                  isHideButtonSave = true;
                "
                v-if="!isHideButtonSave"
              >
                Save
              </button>
            </div>

            <button
              class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-green border-green hover:bg-white hover:border-green hover:text-green"
              v-if="!isVisibleTableHeaders"
              @click="postingJurnal()"
            >
              Posting
            </button>

            <button
              class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-[#FF9900] border-[#FF9900] hover:bg-white hover:border-[#FF9900] hover:text-[#FF9900]"
              v-if="!isVisibleTableHeaders"
            >
              Reverse
            </button>

            <div class="absolute right-8 top-3 items-center">
              <div
                class="alert h-10"
                :class="{
                  'alert-warning': currentStatus === 'PARKING',
                  'alert-success': currentStatus === 'POSTED',
                }"
                v-if="currentStatus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    v-if="currentStatus === 'PARKING'"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    v-if="currentStatus === 'POSTED'"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  v-if="currentStatus === 'PARKING'"
                  class="text-white font-JakartaSans font-bold text-lg"
                  >PARKING</span
                >
                <span
                  v-if="currentStatus === 'POSTED'"
                  class="text-white font-JakartaSans font-bold text-lg"
                  >POSTED</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap justify-around items-center pt-4">
          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Number</label
            >
            <input type="text" name="doc_number" :class="classStyle" disabled />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company Code</label
            >
            <input
              type="text"
              name="company_code"
              :class="classStyle"
              disabled
              v-model="companyCode"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Date</label
            >
            <input
              type="text"
              name="doc_date"
              :class="classStyle"
              disabled
              :value="format_date(props.dataJurnal.doc_created_at)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Posting Date</label
            >
            <input
              type="text"
              name="post_date"
              :class="classStyle"
              disabled
              :value="format_date(postingDate)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Ref Doc</label
            >
            <input
              type="text"
              name="ref_doc"
              :class="classStyle"
              disabled
              :value="props.dataJurnal.no_ca"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Fiscal Year</label
            >
            <input
              type="text"
              name="fiscal_year"
              :class="classStyle"
              disabled
              :value="format_year(props.dataJurnal.doc_created_at)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Currency</label
            >
            <input
              type="text"
              name="currency"
              :class="classStyle"
              disabled
              :value="props.dataJurnal.currency_code"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Period</label
            >
            <input
              type="text"
              name="period"
              :class="classStyle"
              disabled
              :value="format_month(props.dataJurnal.doc_created_at)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Order</label
            >
            <input type="text" name="order" :class="classStyle" disabled />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Claim Category</label
            >
            <input
              type="text"
              name="claim_category"
              :class="classStyle"
              disabled
              :value="props.dataJurnal.code_document"
            />
          </div>
        </div>

        <!-- TABLE -->
        <div class="pb-4">
          <div class="table-wrapper">
            <table>
              <thead class="text-center font-JakartaSans text-sm font-bold">
                <th
                  v-if="
                    (isNoEdit && !alreadySave) ||
                    (!isNoEdit && !alreadySave) ||
                    (!isNoEdit && alreadySave)
                  "
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
                  </span>
                </th>

                <th
                  v-if="isNoEdit && alreadySave"
                  v-for="data in tableHeadActive"
                  :key="data.id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
                  </span>
                </th>
              </thead>
              <tbody>
                <tr
                  class="font-JakartaSans font-normal text-sm text-center"
                  v-for="data in dataSapDoc"
                  :key="data.item"
                >
                  <td>
                    <input
                      v-model="data.item"
                      disabled
                      class="cursor-pointer font-JakartaSans block bg-#e0e0e0 w-[60px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                  </td>

                  <td>
                    <select
                      v-model="data.pk"
                      :class="inputClass"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                    >
                      <option
                        v-for="pkDataItem in pkData"
                        :key="pkDataItem.no_pk"
                      >
                        {{ pkDataItem.no_pk }}
                      </option>
                    </select>
                  </td>

                  <td>
                    <input
                      :value="format_date(props.dataJurnal.doc_created_at)"
                      :class="inputClass"
                      disabled
                    />
                  </td>

                  <td>
                    <Multiselect
                      v-model="data.gl_reccon_acc"
                      mode="single"
                      track-by="gl_account"
                      label="gl_account"
                      :close-on-select="false"
                      :searchable="true"
                      :options="GLData"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                      class="w-[250px]"
                    >
                      <template
                        v-slot:tag="{ option, handleTagRemove, disabled }"
                      >
                        <div
                          class="multiselect-tag is-user"
                          :class="{
                            'is-disabled': disabled,
                          }"
                        >
                          {{ GLData.gl_account }}
                          <span
                            v-if="!disabled"
                            class="multiselect-tag-remove"
                            @click="handleTagRemove(option, $event)"
                          >
                            <span class="multiselect-tag-remove-icon"></span>
                          </span>
                        </div>
                      </template>
                    </Multiselect>
                  </td>

                  <td>
                    <input
                      :class="inputClass"
                      disabled
                      v-model="data.short_text"
                    />
                  </td>

                  <td>
                    <input
                      :value="formatPriceForInput(data.amount)"
                      :class="inputClass"
                      @input="updateAmount(data, $event.target.value)"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                    />
                  </td>

                  <td>
                    <input
                      v-model="data.item_text"
                      :class="inputClass"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                    />
                  </td>

                  <td>
                    <Multiselect
                      v-model="data.cost_center"
                      mode="single"
                      track-by="cost_center_name"
                      label="format"
                      :close-on-select="false"
                      :searchable="true"
                      :options="costCenterData"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                      class="w-[500px]"
                    >
                      <template
                        v-slot:tag="{ option, handleTagRemove, disabled }"
                      >
                        <div
                          class="multiselect-tag is-user"
                          :class="{
                            'is-disabled': disabled,
                          }"
                        >
                          {{ costCenterData.item.format }}
                          <span
                            v-if="!disabled"
                            class="multiselect-tag-remove"
                            @click="handleTagRemove(option, $event)"
                          >
                            <span class="multiselect-tag-remove-icon"></span>
                          </span>
                        </div>
                      </template>
                    </Multiselect>
                  </td>

                  <td>
                    <input
                      v-model="data.profit_center"
                      :class="inputClass"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                    />
                  </td>

                  <td>
                    <input
                      v-model="data.wbs"
                      :class="inputClass"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                    />
                  </td>

                  <td>
                    <input
                      v-model="data.due_date"
                      :class="inputClass"
                      :disabled="
                        idEdit == null && isEditing && !alreadySave
                          ? false
                          : data.item == idEdit
                          ? false
                          : true
                      "
                    />
                  </td>

                  <td>
                    <input
                      :class="inputClass"
                      :value="format_date(postingDate)"
                      disabled
                    />
                  </td>

                  <!-- <td v-if="isNoEdit && alreadySave">
                    <button
                      :key="data.item"
                      @click="editTableDetails(data.item)"
                      :class="`${data.item == idEdit ? 'hidden' : null}`"
                    >
                      <img :src="editicon" class="w-8 h-8" />
                    </button>
                    <button
                      :key="data.item"
                      @click="cancelTableDetails"
                      :class="`mx-2 btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-red border-red hover:bg-white hover:border-red hover:text-red ${
                        data.item == idEdit ? null : 'hidden'
                      }`"
                    >
                      Cancel
                    </button>

                    <button
                      :key="data.item"
                      @click="saveTableDetails"
                      :class="`btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize border-green bg-green hover:bg-white hover:text-green hover:border-green ${
                        data.item == idEdit ? null : 'hidden'
                      }`"
                    >
                      Save
                    </button>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
  width: 100%;
}

.modal-box-inner {
  height: 500px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.table-wrapper {
  overflow-y: scroll;
  overflow-x: scroll;
  height: fit-content;
  max-height: 66.4vh;
  margin-top: 22px;
  margin: 25px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid rgb(229, 228, 228);
}

table {
  min-width: max-content;
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
}

table th {
  position: sticky;
  top: 0px;
  font-weight: normal;
  padding: 8px;
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}

table th {
  padding: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}

table td {
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
