<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useReferenceFetchResult } from "@/stores/fetch/reference";
import { useFormEditStore } from "@/stores/reference/company/edit-modal.js";

const formEditState = useFormEditStore();
const referenceFetch = useReferenceFetchResult();

const emits = defineEmits(["unlockScrollbar", "changeCompany"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let grupCompany = ref("");
let vendorAirlines = ref("");
let iconfilename = ref(null);
let imageUrl = ref(null);

let selectedGrupCompanyId = ref(props.formContent[3] || null);
let selectedVendorId = ref(props.formContent[4] || null);
let selectedImage = ref(props.formContent[5] || null);
let selectedCodeErpId = ref(props.formContent[6]);

const file = ref({});

const props = defineProps({
  formContent: Array,
});

const currentcompanyName = ref(props.formContent[0]);
const originalcompanyName = ref(props.formContent[0]);
const currentcompanyCode = ref(props.formContent[1]);
const originalcompanyCode = ref(props.formContent[1]);
const currentcompanyShortName = ref(props.formContent[2]);
const originalcompanyShortName = ref(props.formContent[2]);
const currentCompanyGrupCompanyId = ref(props.formContent[3]);
const originalCompanyGrupCompanyId = ref(props.formContent[3]);
const currentcompanyIdVendor = ref(props.formContent[4]);
const originalcompanyIdVendor = ref(props.formContent[4]);
const currentcompanyLogo = ref(null);
const originalcompanyLogo = ref(props.formContent[5]);
const currentcompanyCodeErp = ref(props.formContent[6]);
const originalcompanyCodeErp = ref(props.formContent[6]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.company) {
    formEditState.company = {};
  }

  formEditState.company.companyName = currentcompanyName.value;
  formEditState.company.companyCode = currentcompanyCode.value;
  formEditState.company.companyGroup = selectedGrupCompanyId.value;
  formEditState.company.companyShortName = currentcompanyShortName.value;

  formEditState.company.companyIdVendor = selectedVendorId.value;
  formEditState.company.companyLogo = currentcompanyLogo.value;
  formEditState.company.companyCodeErp = selectedCodeErpId.value;

  isVisible.value = false;
  emits("changeCompany");
};

// for image logo
const onFileSelected = (event) => {
  const file = event.target.files[0];

  if (file) {
    currentcompanyLogo.value = file;
    selectedImage.value = file;
    iconfilename.value = file.name;

    const reader = new FileReader();

    reader.onload = () => {
      imageUrl.value = reader.result;
    };

    reader.readAsDataURL(file);
  } else {
    selectedImage.value = null;
    iconfilename.value = null;
    imageUrl.value = null;
  }
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    currentcompanyName.value = props.formContent[0];
    currentcompanyCode.value = props.formContent[1];
    currentcompanyShortName.value = props.formContent[2];
    selectedGrupCompanyId.value = props.formContent[3];
    selectedVendorId.value = props.formContent[4];
    selectedImage.value = props.formContent[5];
    currentcompanyCodeErp.value = props.formContent[6];
  }
  vendorAirlines.value = referenceFetch.fetchVendorAirlinesResult;
  grupCompany.value = referenceFetch.fetchGrupCompanyResult;
});

const resetForm = () => {
  currentcompanyName.value = originalcompanyName.value;
  currentcompanyCode.value = originalcompanyCode.value;
  selectedGrupCompanyId.value = originalCompanyGrupCompanyId.value;
  currentcompanyShortName.value = originalcompanyShortName.value;
  selectedVendorId.value = originalcompanyIdVendor.value;
  imageUrl.value = originalcompanyLogo.value;
  currentcompanyCodeErp.value = originalcompanyCodeErp.value;
};
</script>

<template>
  <button
    @click="isVisible = !isVisible"
    :style="[isVisible ? 'margin-right:8px;' : '']"
  >
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
        <div class="flex justify-center items-center">
          <div class="avatar">
            <div
              class="flex justify-center items-center w-[100px] h-[100px] rounded-full bg-[#D9D9D9]"
            >
              <div class="flex justify-center items-center">
                <label
                  for="file-input"
                  class="cursor-not-allowed flex items-center justify-center"
                >
                  <div
                    class="w-[100px] h-[100px] rounded-full bg-[#D9D9D9] flex items-center justify-center"
                  >
                    <div class="flex relative">
                      <img
                        v-if="!imageUrl"
                        :src="selectedImage"
                        class="w-[100px] h-[100px] object-cover object-center"
                      />
                      <img
                        v-else
                        :src="imageUrl"
                        class="w-[100px] h-[100px] object-cover object-center"
                      />
                    </div>
                  </div>
                </label>

                <input
                  type="file"
                  id="file-input"
                  class="hidden cursor-not-allowed"
                  accept="image/*"
                  @change="onFileSelected"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <p
          class="font-JakartaSans font-medium text-sm flex justify-center items-center pt-4 mb-6"
        >
          Logo
        </p>

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
            disabled
            class="cursor-not-allowed"
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
            disabled
            class="cursor-not-allowed"
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
            maxlength="5"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="grupcompany"
            class="block mb-2 font-JakartaSans font-medium text-sm"
          >
            Group Company<span class="text-red">*</span>
          </label>
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedGrupCompanyId"
          >
            <option disabled selected>Grup Company</option>
            <option v-for="data in grupCompany" :value="data.id">
              {{ data.group_company_name }}
            </option>
          </select>
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
            <option value="SAP">SAP</option>
            <option value="RAMCO">RAMCO</option>
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
