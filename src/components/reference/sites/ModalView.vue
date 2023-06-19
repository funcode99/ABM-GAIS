<script setup>
import iconview from "@/assets/view_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";

import Api from "@/utils/Api";

import Multiselect from "@vueform/multiselect";

import { ref, onMounted, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/sites/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "viewSite"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let selectedCompany = ref("Company");
let Company = ref("");
let siteName = ref("");
let siteIdCompany = ref("");
let siteCode = ref();
let selectedCompanyId = ref(props.formContent[1] || null);
let Warehouse = ref("");
let selectedWarehouse = ref("Warehouse");

let warehouseDataArray = ref(props.formContent[3]);
let warehouseData = ref([]);

if (warehouseDataArray.value && Array.isArray(warehouseDataArray.value)) {
  warehouseData.value = warehouseDataArray.value.map((item) => {
    return {
      id_warehouse: item.id_warehouse,
      id_site: item.id_site,
      warehouse_name: item.warehouse_name,
      readonly: true,
    };
  });
  // console.log(warehouseData.value);
}

const props = defineProps({
  formContent: Array,
});

const currentsiteName = ref(props.formContent[0]);
const originalsiteName = ref(props.formContent[0]);
const currentsiteIdCompany = ref(props.formContent[1]);
const originalsiteIdCompany = ref(props.formContent[1]);
const currentsiteCode = ref(props.formContent[2]);
const originalsiteCode = ref(props.formContent[2]);

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="iconview" alt="view icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader @closeVisibility="isVisible = false" title="View Site" />

      <form class="modal-box-inner-site">
        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-not-allowed font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCompanyId"
            disabled
          >
            <option disabled selected>Company</option>
            <option v-for="company in Company" :value="company.id">
              {{ company.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site Code<span class="text-red">*</span></label
          >
          <input
            v-model="currentsiteCode"
            type="text"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentsiteName"
            type="text"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Warehouse<span class="text-red">*</span></label
          >
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="warehouseDataArray"
            mode="tags"
            placeholder="No Data"
            :close-on-select="false"
            :searchable="false"
            :object="true"
            :resolve-on-load="false"
            :delay="0"
            :min-chars="1"
            :options="
              async (query) => {
                return await warehouseData(query);
              }
            "
            disabled
            class="cursor-not-allowed"
          >
            <template v-slot:tag="{ option }">
              <div
                class="multiselect-tag is-user cursor-not-allowed"
                :class="{
                  'is-disabled': option.readonly,
                }"
              >
                {{ option.warehouse_name }}
                <span
                  v-if="!option.readonly"
                  class="multiselect-tag-remove cursor-not-allowed"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
          </Multiselect>
        </div>
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}

.modal-box-inner-site {
  height: 360px;
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
