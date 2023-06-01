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
let selectedCompanyId = ref(props.formContent[1] || null);
let selectedSiteId = ref(props.formContent[2] || null);

const props = defineProps({
  formContent: Array,
});

const currentwarehouseName = ref(props.formContent[0]);
const originalwarehouseName = ref(props.formContent[0]);
const currentwarehouseIdCompany = ref(props.formContent[1]);
const originalwarehouseIdCompany = ref(props.formContent[1]);
const currentwarehouseIdSite = ref(props.formContent[2]);
const originalwarehouseIdSite = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.warehouse) {
    formEditState.warehouse = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.warehouse.warehouseName = currentwarehouseName.value;
  formEditState.warehouse.warehouseIdCompany = selectedCompanyId.value;
  formEditState.warehouse.warehouseIdSite = selectedSiteId.value;

  isVisible.value = false;
  emits("changeWarehouse"); // Memanggil event 'changeWarehouse'
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get site in select
const fetchGetSite = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/site/get_data");
  Site.value = res.data.data;
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
    currentwarehouseName.value = props.formContent[0];
    currentwarehouseIdCompany.value = props.formContent[1];
    currentwarehouseIdSite.value = props.formContent[2];
  }
});

const resetForm = () => {
  currentwarehouseName.value = originalwarehouseName.value;
  selectedCompanyId.value = originalwarehouseIdCompany.value;
  selectedSiteId.value = originalwarehouseIdSite.value;
};
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="
          isVisible = false;
          resetForm();
        "
        title="Edit Warehouse"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start w-full px-4">
          <label
            for="company"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCompanyId"
          >
            <option disabled selected>Company</option>
            <option v-for="company in Company" :value="company.id">
              {{ company.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label
            for="site"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedSiteId"
          >
            <option disabled selected>Site</option>
            <option v-for="site in Site" :value="site.id">
              {{ site.site_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label
            for="warehouse"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Warehouse Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentwarehouseName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooter
          @closeEdit="
            isVisible = false;
            resetForm();
          "
        />
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
