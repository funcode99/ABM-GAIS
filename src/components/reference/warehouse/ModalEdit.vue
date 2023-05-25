<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import Api from "@/utils/Api";

import { ref, onMounted } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/warehouse/edit-modal.js";
let formEditState = useFormEditStore();

let isVisible = ref(false);
let modalPaddingHeight = 118;

let selectedCompany = ref("Company");
let Company = ref("");
let Site = ref("");
let warehouseName = ref("");
let warehouseIdCompany = ref("");
let warehouseIdSite = ref();
let selectedCompanyId = ref(null);
let selectedSiteId = ref(null);

const emits = defineEmits(["unlockScrollbar", "changeWarehouse"]);

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
  if (!formEditState.warehouse) {
    formEditState.warehouse = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.warehouse.warehouseName = currentwarehouseName.value;
  formEditState.warehouse.warehouseIdCompany = selectedCompanyId.value;
  formEditState.warehouse.warehouseIdSite = selectedSiteId.value;

  // Update original saat penyimpanan
  originalwarehouseName.value = currentwarehouseName.value;
  originalwarehouseIdCompany.value = selectedCompanyId.value;
  originalwarehouseIdSite.value = selectedSiteId.value;

  isVisible.value = !isVisible.value;
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
  const res = await Api.get("/site/");
  Site.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
  fetchGetSite();
});

const resetForm = () => {
  currentwarehouseName.value = originalwarehouseName.value;
  selectedCompanyId.value = originalwarehouseIdCompany.value;
  selectedSiteId.value = originalwarehouseIdSite.value;
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <button
    @click="
      resetForm();
      isVisible = !isVisible;
    "
  >
    <img :src="editicon" alt="" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <div class="sticky top-0 z-50 bg-[#015289]">
        <button
          @click="isVisible = false"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
        <p
          class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start"
        >
          Edit Warehouse
        </p>
      </div>

      <div class="pt-4">
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
            @keydown.enter="submitEdit"
            v-model="currentwarehouseName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="sticky bottom-0 bg-white">
          <div class="flex justify-end gap-4 mr-6">
            <label
              @click="
                resetForm();
                isVisible = !isVisible;
              "
              for="modal-edit-warehouse"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >Cancel</label
            >
            <button
              @click="
                submitEdit();
                $emit('changeWarehouse');
              "
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}
</style>
