<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import Api from "@/utils/Api";

import { ref, onMounted, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/warehouse/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeWarehouse"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let selectedCompany = ref("Company");
let Company = ref("");
let Site = ref("");
let warehouseName = ref("");
let warehouseIdCompany = ref("");
let warehouseIdSite = ref();
let responseCompanyArray = ref([]);
let responseSiteArray = ref([]);
// let selectedCompanyId = ref(props.formContent[1] || null);
// let selectedSiteId = ref(props.formContent[2] || null);
let company = ref(props.formContent[1]);
let location = ref([props.formContent[1], props.formContent[2]]);

const props = defineProps({
  formContent: Array,
});

const currentwarehouseName = ref(props.formContent[0]);
const originalwarehouseName = ref(props.formContent[0]);
// const currentwarehouseIdCompany = ref(props.formContent[1]);
// const originalwarehouseIdCompany = ref(props.formContent[1]);
// const currentwarehouseIdSite = ref(props.formContent[2]);
// const originalwarehouseIdSite = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.warehouse) {
    formEditState.warehouse = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.warehouse.warehouseName = currentwarehouseName.value;
  formEditState.warehouse.warehouseIdCompany = location.value[1];
  formEditState.warehouse.warehouseIdSite = location.value[0];

  isVisible.value = false;
  emits("changeWarehouse"); // Memanggil event 'changeWarehouse'
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  responseCompanyArray.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get site in select
const fetchGetSite = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/site/get_data");
  responseSiteArray.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
  fetchGetSite();
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    // currentwarehouseName.value = props.formContent[0];
    // currentwarehouseIdCompany.value = props.formContent[1];
    // currentwarehouseIdSite.value = props.formContent[2];
    resetForm();
  }
});

const resetForm = () => {
  currentwarehouseName.value = originalwarehouseName.value;
  location.value = [props.formContent[1], props.formContent[2]];
  // selectedSiteId.value = originalwarehouseIdSite.value;
};
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit Warehouse"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="location"
          >
            <option disabled selected>Company</option>
            <option
              v-for="data in responseSiteArray"
              :key="data.id"
              :value="[data.id, data.id_company]"
              :selected="data.id == company ? true : false"
            >
              {{ data.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="location"
            disabled
          >
            <option disabled selected>Site</option>
            <option
              v-for="data in responseSiteArray"
              :key="data.id"
              :value="[data.id, data.id_company]"
            >
              {{ data.site_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Warehouse Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentwarehouseName"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-2" />
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}
</style>
