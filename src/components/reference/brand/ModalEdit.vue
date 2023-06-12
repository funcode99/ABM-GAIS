<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import Api from "@/utils/Api";

import { ref, onMounted, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/brand/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeBrand"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let selectedCompany = ref("Company");
let Company = ref("");
let Site = ref("");
let brandName = ref("");
let brandIdCompany = ref("");
let brandIdSite = ref();

let responseCompanyArray = ref([]);
let responseSiteArray = ref([]);

// let selectedCompanyId = ref(props.formContent[1] || null);
// let selectedSiteId = ref(props.formContent[2] || null);

// let company = ref(props.formContent[1]);
let location = ref([props.formContent[2], props.formContent[1]]);

const props = defineProps({
  formContent: Array,
});

const currentbrandName = ref(props.formContent[0]);
const originalbrandName = ref(props.formContent[0]);
// const currentbrandIdCompany = ref(props.formContent[1]);
// const originalbrandIdCompany = ref(props.formContent[1]);
// const currentbrandIdSite = ref(props.formContent[2]);
// const originalbrandIdSite = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.brand) {
    formEditState.brand = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.brand.brandName = currentbrandName.value;
  formEditState.brand.brandIdCompany = location.value[1];
  formEditState.brand.brandIdSite = location.value[0];

  isVisible.value = false;
  emits("changeBrand"); // Memanggil event 'changeBrand'
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
    resetForm();
  }
});

const resetForm = () => {
  currentbrandName.value = originalbrandName.value;
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
      <modalHeader @closeVisibility="isVisible = false" title="Edit Brand" />

      <form @submit.prevent="submitEdit" class="pt-4">
        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Company
          </label>
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
              :selected="data.id == props.formContent[1] ? true : false"
            >
              {{ data.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Site<span class="text-red">*</span>
          </label>

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

        <div class="mb-6 w-full px-4">
          <label
            class="block mb-2 font-JakartaSans font-medium text-sm text-start"
            >Brand Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentbrandName"
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
