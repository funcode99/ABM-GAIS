<script setup>
import iconview from "@/assets/view_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";

import Api from "@/utils/Api";

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

const props = defineProps({
  formContent: Array,
});

const currentsiteName = ref(props.formContent[0]);
const originalsiteName = ref(props.formContent[0]);
const currentsiteIdCompany = ref(props.formContent[1]);
const originalsiteIdCompany = ref(props.formContent[1]);
const currentsiteCode = ref(props.formContent[2]);
const originalsiteCode = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.brand) {
    formEditState.brand = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.site.siteName = currentsiteName.value;
  formEditState.site.siteIdCompany = selectedCompanyId.value;
  formEditState.site.siteCode = currentsiteCode.value;

  isVisible.value = false;
  emits("viewSite"); // Memanggil event 'changeSite'
};

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

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    currentsiteName.value = props.formContent[0];
    currentsiteIdCompany.value = props.formContent[1];
    currentsiteCode.value = props.formContent[2];
  }
});

const resetForm = () => {
  currentsiteName.value = originalsiteName.value;
  selectedCompanyId.value = originalsiteIdCompany.value;
  currentsiteCode.value = originalsiteCode.value;
};
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="iconview" alt="view icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="
          isVisible = false;
          resetForm();
        "
        title="View Site"
      />

      <form class="modal-box-inner-site" @submit.prevent="submitEdit">
        <div class="mb-6 text-start w-full px-4">
          <label
            for="company"
            class="block mb-2 font-JakartaSans font-medium text-sm"
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
          <label
            for="sitecode"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site Code<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="currentsiteCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label
            for="site"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="currentsiteName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 300px !important;
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
