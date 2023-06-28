<script setup>
import iconplus from "@/assets/navbar/icon_plus.svg";
import iconDangerCircle from "@/assets/icon-danger-circle.png";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, watch } from "vue";

import { useReferenceFetchResult } from "@/stores/fetch/reference.js";
import fetchGrupCompanyUtils from "@/utils/Fetch/Reference/fetchGrupCompany";

const referenceFetch = useReferenceFetchResult();

const emits = defineEmits(["unlockScrollbar", "company-saved"]);

const selectedImage = ref(null);
let selectedVendor = ref("Vendor");
let selectedCodeErp = ref("ERP");
let selectedGrupCompany = ref("Company");
let companyCode = ref("");
let companyName = ref("");
let grupCompany = ref("");
let vendorAirlines = ref("");
let shortName = ref("");
const file = ref({});
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);
let iconfilename = ref(null);
let imageUrl = ref(null);
let instanceArray = [];
let sortedData = ref([]);

let addGrupCompanyData = ref([]);

const onFileSelected = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  iconfilename = file.name;

  const reader = new FileReader();

  reader.onload = () => {
    imageUrl.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    imageUrl.value = null;
  }
};

const saveCompany = async () => {
  if (!selectedImage.value) {
    Swal.fire({
      iconHtml: `<img src="${iconDangerCircle}" />`,
      title: "Image not selected",
      text: "Please select an image before saving.",
    });
    return;
  }

  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await Api.post(`/company/store`, {
      company_code: companyCode.value,
      company_name: companyName.value,
      short_name: shortName.value,
      id_group_company: selectedGrupCompany.value,
      logo: selectedImage.value,
      id_vendor: selectedVendor.value,
      code_erp: selectedCodeErp.value,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("company-saved");
  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  companyCode.value = "";
  companyName.value = "";
  shortName.value = "";
  selectedGrupCompany.value = "Company";
  selectedVendor.value = "Vendor";
  selectedCodeErp.value = "ERP";
  imageUrl.value = null;
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }

  if (isVisible.value == true) {
    fetchGrupCompanyUtils(addGrupCompanyData);
  }

  vendorAirlines.value = referenceFetch.fetchVendorAirlinesResult;
});

watch(addGrupCompanyData, () => {
  referenceFetch.fetchGrupCompanyResult = addGrupCompanyData.value;
  grupCompany.value = referenceFetch.fetchGrupCompanyResult;
});
</script>

<template>
  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader @closeVisibility="isVisible = false" title="New Company" />

      <form class="pt-4 modal-box-inner-company" @submit.prevent="saveCompany">
        <div class="flex justify-center items-center">
          <div class="avatar">
            <div
              class="flex justify-center items-center w-[100px] h-[100px] rounded-full bg-[#D9D9D9]"
            >
              <div class="flex justify-center items-center">
                <label
                  for="file-input"
                  class="cursor-pointer flex items-center justify-center"
                >
                  <div
                    class="w-[100px] h-[100px] rounded-full bg-[#D9D9D9] flex items-center justify-center"
                  >
                    <div class="flex relative">
                      <img
                        v-if="!imageUrl"
                        :src="iconplus"
                        class="w-[37px] h-[37px]"
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
                  class="hidden"
                  accept="image/*"
                  @change="onFileSelected"
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

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Code"
            required
            v-model="companyCode"
          />
        </div>
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Name Company"
            required
            v-model="companyName"
          />
        </div>
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Short Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Name Company"
            required
            v-model="shortName"
            maxlength="5"
          />
        </div>
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Group Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedGrupCompany"
          >
            <option value="" disabled selected>Grup Company</option>
            <option v-for="data in grupCompany" :value="data.id">
              {{ data.group_company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Vendor Airlines<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedVendor"
          >
            <option disabled selected>Vendor</option>
            <option v-for="vendor in vendorAirlines" :value="vendor.id">
              {{ vendor.vendor }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >ERP<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCodeErp"
          >
            <option disabled selected>ERP</option>
            <option value="SAP">SAP</option>
            <option value="RAMCO">RAMCO</option>
          </select>
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-4" />
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
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
