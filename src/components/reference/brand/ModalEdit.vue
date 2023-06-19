<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import Api from "@/utils/Api";

import { ref, watch, onMounted } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/brand/edit-modal.js";
let formEditState = useFormEditStore();

const emits = defineEmits(["unlockScrollbar", "changeBrand"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let Company = ref("");
let Site = ref("");
let brandName = ref("");
let brandIdCompany = ref("");
let brandIdSite = ref();

let selectedCompany = ref(props.formContent[1]);
let selectedSite = ref(props.formContent[2]);

const props = defineProps({
  formContent: Array,
});

const currentbrandName = ref(props.formContent[0]);
const originalbrandName = ref(props.formContent[0]);
const currentCompany = ref(props.formContent[1]);
const originalcurrentCompany = ref(props.formContent[1]);
const currentSite = ref(props.formContent[2]);
const originalcurrentSite = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.brand) {
    formEditState.brand = {};
  }

  formEditState.brand.brandName = currentbrandName.value;
  formEditState.brand.brandIdCompany = selectedCompany.value;
  formEditState.brand.brandIdSite = selectedSite.value;

  isVisible.value = false;
  emits("changeBrand");
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
};

const changeCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  Site.value = res.data.data;
  selectedSite.value = originalcurrentSite.value;
};

//for get site in select
const fetchGetSite = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/site/get_data");
  Site.value = res.data.data;
};

onMounted(() => {
  fetchGetCompany();
  fetchGetSite();
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const resetForm = () => {
  currentbrandName.value = originalbrandName.value;
  selectedCompany.value = originalcurrentCompany.value;
  selectedSite.value = originalcurrentSite.value;
};

const fetchGetSiteId = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/site/get_data");
  Site.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id == element.id) {
      selectedSite.value = element.id;
    }
  }
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetForm();
  }
});
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
            v-model="selectedCompany"
            @change="changeCompany(selectedCompany)"
          >
            <option disabled selected>Company</option>
            <option
              v-for="(company, i) in Company"
              :key="i"
              :value="company.id"
            >
              {{ company.company_name }}
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
            v-model="selectedSite"
          >
            <option disabled selected>Site</option>
            <option v-for="(site, i) in Site" :key="i" :value="site.id">
              {{ site.site_name }}
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
