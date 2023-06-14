<script setup>
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

let vendorAirlines = ref("");
let iconfilename = ref(null);
let imageUrl = ref(null);

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
const currentcompanyGroup = ref(props.formContent[3]);
const originalcompanyGroup = ref(props.formContent[3]);
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
  formEditState.company.companyCodeErp = selectedCodeErpId.value;

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

// for image logo
const onFileSelected = (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedImage.value = file;
    iconfilename.value = file.name;

    // Create a FileReader instance
    const reader = new FileReader();

    // Define the callback function when FileReader has finished reading the file
    reader.onload = () => {
      imageUrl.value = reader.result;
    };

    // Read the selected file as a data URL
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
    currentcompanyGroup.value = props.formContent[3];
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
  imageUrl.value = originalcompanyLogo.value;
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
                  class="hidden"
                  required
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

        <div class="mb-6 text-start px-4 w-full">
          <label
            for="code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Code<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
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
            @keydown.enter="submitEdit"
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
            @keydown.enter="submitEdit"
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
            @keydown.enter="submitEdit"
            v-model="currentcompanyGroup"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
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
