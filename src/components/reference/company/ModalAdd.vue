<script setup>
import iconUpload from "@/assets/icon_upload.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "company-saved"]);

let sortedData = ref([]);
const selectedImage = ref(null);
let selectedCompany = ref("Company");
let selectedVendor = ref("Vendor");
let selectedCodeErp = ref("ERP");
let companyCode = ref("");
let companyName = ref("");
let parentCompany = ref("");
let grupCompany = ref("");
let logoCompany = ref("");
let vendorAirlines = ref("");
let shortName = ref("");
let codeErp = ref("");
let isOpenModal = ref(false);
const file = ref({});
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);
let iconfilename = ref(null);

//for get parent company in select
const fetchParentCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get_parent");
  parentCompany.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get vendor in select
const fetchVendors = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/flight_trip/get_vendor");
  vendorAirlines.value = res.data.data;
  // console.log("ini data vendor" + JSON.stringify(res.data.data));
};

// onMounted(fetch);
onMounted(() => {
  fetchParentCompany();
  fetchVendors();
});

// for image logo
const onFileSelected = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  iconfilename = file.name;
  // console.log(selectedImage)
};

const saveCompany = async () => {
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
      group_company: grupCompany.value,
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
  grupCompany.value = "";
  selectedImage.value = "Logo";
  selectedVendor.value = "Vendor";
  selectedCodeErp.value = "ERP";
  iconfilename = "Logo";
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }
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
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Group Company"
            required
            v-model="grupCompany"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <div
            class="block mb-2 font-JakartaSans font-medium text-sm cursor-default"
          >
            Logo Company
            <span class="text-red">*</span>
          </div>
          <div class="relative border border-slate-300 rounded-lg">
            <input
              type="file"
              id="logo_company"
              class="hidden border"
              accept="image/*"
              @change="onFileSelected"
            />
            <label class="py-2" for="logo_company">
              <span
                class="font-JakartaSans hidden font-medium text-sm cursor-pointer"
                >{{ selectedImage || "Logo Company" }}</span
              >
              <img
                :src="iconUpload"
                class="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </label>
            <div
              v-if="iconfilename != null"
              class="px-5 py-2 font-JakartaSans font-medium text-sm"
            >
              {{ iconfilename }}
            </div>
            <div v-else class="px-4 py-2 font-JakartaSans font-medium text-sm">
              Logo
            </div>
          </div>
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
