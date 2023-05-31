<script setup>
import iconUpload from "@/assets/icon_upload.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import Api from "@/utils/Api";

import { ref, watch, onMounted } from "vue";
import { Modal } from "usemodal-vue3";
import { useFormEditStore } from "@/stores/reference/company/edit-modal.js";

const emits = defineEmits(["unlockScrollbar", "changeCompany"]);

let formEditState = useFormEditStore();
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

// const selectedImage = ref(null);
let selectedCompany = ref("Company");
let selectedVendor = ref("Vendor");
let selectedErpCode = ref("ERP");
let companyName = ref("");
let companyCode = ref("");
let companyGroup = ref("");
let companyShortName = ref("");
let companyIdVendor = ref("");
let companyLogo = ref("");
let companyCodeErp = ref("");
let parentCompany = ref("");
let logoCompany = ref("");
let vendorAirlines = ref("");
let iconfilename = ref(null);

let selectedVendorId = ref(props.formContent[4] || null);
let selectedImage = ref(props.formContent[5] || null);
let selectedCodeErpId = ref(props.formContent[6] || null);

const file = ref({});

const props = defineProps({
  formContent: Array,
});

const currentcompanyName = ref(props.formContent[0]);
const originalcompanyName = ref(props.formContent[0]);
const currentcompanyCode = ref(props.formContent[1]);
const originalcompanyCode = ref(props.formContent[1]);
const currentcompanyGroup = ref(props.formContent[2]);
const originalcompanyGroup = ref(props.formContent[2]);
const currentcompanyShortName = ref(props.formContent[3]);
const originalcompanyShortName = ref(props.formContent[3]);
const currentcompanyIdVendor = ref(props.formContent[4]);
const originalcompanyIdVendor = ref(props.formContent[4]);
const currentcompanyLogo = ref(props.formContent[5]);
const originalcompanyLogo = ref(props.formContent[5]);
const currentcompanyCodeErp = ref(props.formContent[6]);
const originalcompanyCodeErp = ref(props.formContent[6]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.company) {
    formEditState.company = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.company.companyName = currentcompanyName.value;
  formEditState.company.companyCode = currentcompanyCode.value;
  formEditState.company.companyGroup = currentcompanyGroup.value;
  formEditState.company.companyShortName = currentcompanyShortName.value;

  formEditState.company.companyIdVendor = selectedVendorId.value;
  formEditState.company.companyLogo = selectedImage.value;
  formEditState.company.companyCodeErp = currentcompanyCodeErp.value;

  isVisible.value = false;
  emits("changeCompany"); // Memanggil event 'changeCompany'
};

//for get vendor in select
const fetchVendors = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/flight_trip/get_vendor");
  vendorAirlines.value = res.data.data;
  // console.log("ini data vendor" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchVendors();
});

//for image logo
const onFileSelected = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  iconfilename = file.name;
  // console.log("selectedImage:", selectedImage.value);
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    currentcompanyName.value = props.formContent[0];
    currentcompanyCode.value = props.formContent[1];
    currentcompanyGroup.value = props.formContent[2];
    currentcompanyShortName.value = props.formContent[3];
    selectedVendorId.value = props.formContent[4];
    selectedImage.value = props.formContent[5];
    currentcompanyCodeErp.value = props.formContent[6];
  }
});

const resetForm = () => {
  currentcompanyName.value = originalcompanyName.value;
  currentcompanyCode.value = originalcompanyCode.value;
  currentcompanyGroup.value = originalcompanyGroup.value;
  currentcompanyShortName.value = originalcompanyShortName.value;
  selectedVendorId.value = originalcompanyIdVendor.value;
  selectedImage.value = originalcompanyLogo.value;
  currentcompanyCodeErp.value = originalcompanyCodeErp.value;
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
        title="Edit Company"
      />

      <form class="modal-box-inner-company" @submit.prevent="submitEdit">
        <div class="mb-6 text-start px-4 w-full">
          <label
            for="code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Code<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="shortname"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Short Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyShortName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="grupcompany"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Group Company<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyGroup"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <div
            for="logo_company"
            class="block mb-2 font-JakartaSans font-medium text-sm cursor-default"
          >
            Logo Company
            <span class="text-red">*</span>
          </div>
          <div class="relative border border-slate-300 rounded-lg py-2">
            <input
              type="file"
              name="logo"
              id="logo_company"
              class="hidden border"
              accept="image/*"
              @change="onFileSelected"
            />
            <label class="py-2" for="logo_company">
              <div
                v-if="iconfilename != null"
                class="px-5 py-2 font-JakartaSans font-medium text-sm"
              >
                {{ iconfilename }}
              </div>
              <div v-else class="px-5 font-JakartaSans font-medium text-sm">
                {{ selectedImage || "Logo Company" }}
              </div>
              <img
                :src="iconUpload"
                class="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="vendor"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Vendor Airlines<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedVendorId"
          >
            <option disabled selected>Vendor</option>
            <option v-for="vendor in vendorAirlines" :value="vendor.id">
              {{ vendor.vendor }}
            </option>
          </select>
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label
            for="erp"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >ERP<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCodeErpId"
          >
            <option disabled selected>ERP</option>
            <option>SAP</option>
            <option>RAMCO</option>
          </select>
        </div>

        <modalFooter
          @closeEdit="
            isVisible = false;
            resetForm();
          "
          class="pb-2"
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

.modal-box-inner-company {
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
