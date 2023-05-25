<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconUpload from "@/assets/icon_upload.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import Api from "@/utils/Api";

import { ref, onMounted } from "vue";

import { useFormEditStore } from "@/stores/reference/company/edit-modal.js";
let formEditState = useFormEditStore();

let isVisible = ref(false);

const selectedImage = ref(null);
let selectedCompany = ref("Company");
let selectedVendor = ref("Vendor");
let parentCompany = ref("");
let logoCompany = ref("");
let vendorAirlines = ref("");
const file = ref({});

const emits = defineEmits(["unlockScrollbar", "change-company"]);

const props = defineProps({
  formContent: Array,
});

const currentcompanyCode = ref(props.formContent[0]);
const currentcompanyName = ref(props.formContent[1]);
const currentcompanyParentCompany = ref(props.formContent[2]);
const currentcompanyLogo = ref(props.selectedImage);
const currentcompanyVendor = ref(props.formContent[4]);

const submitEdit = () => {
  formEditState.company.companyCode = currentcompanyCode.value;
  formEditState.company.companyName = currentcompanyName.value;
  formEditState.company.companyParentCompany =
    currentcompanyParentCompany.value;
  formEditState.company.companyLogo = currentcompanyLogo.value;
  formEditState.company.companyVendor = currentcompanyVendor.value;

  isVisible.value = !isVisible.value;
};

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

onMounted(() => {
  fetchParentCompany();
  fetchVendors();
});

//for image logo
const onFileSelectedUpdate = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file.name : null;
  console.log("selectedImage:", selectedImage.value);
};
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="modal-edit-company"
    class="cursor-pointer"
    ><img :src="editicon" class="w-6 h-6"
  /></label>

  <input
    type="checkbox"
    id="modal-edit-company"
    class="modal-toggle"
    v-model="isVisible"
  />
  <div class="modal">
    <div class="modal-box relative">

      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="modal-edit-company"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start">
          Edit Company
        </p>
      </nav>

      <main class="modal-box-inner-company">
        <div>
          
          <div class="mb-6 text-start px-4 w-full">
            <label
              for="code"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Code<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="code"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Code"
              required
              v-model="currentcompanyCode"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changecompanyCode')"
            />
          </div>
          
          <div class="mb-6 text-start px-4 w-full">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name Company"
              required
              v-model="currentcompanyName"
              @keydown.enter="submitEdit"
              @keyup.enter="$emit('changecompanyName')"
            />
          </div>
          
          <div class="mb-6 text-start px-4 w-full">
            <label
              for="parent_company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Parent Company<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
              v-model="selectedCompany"
            >
              <option disabled selected>Company</option>
              <option v-for="company in parentCompany" :value="company.id">
                {{ company.parent_company }}
              </option>
            </select>
          </div>

          <div class="mb-6 text-start px-4 w-full">
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
                name="logo_company"
                id="logo_company"
                class="hidden border"
                accept="image/*"
                @change="onFileSelectedUpdate"
              />
              <label for="logo_company">
                <span
                  class="font-JakartaSans font-medium text-sm cursor-pointer mx-4"
                  >{{
                    selectedImage && selectedImage.name
                      ? selectedImage.name
                      : "Logo Company"
                  }}</span
                >
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
              v-model="selectedVendor"
            >
              <option disabled selected>Vendor</option>
              <option v-for="vendor in vendorAirlines" :value="vendor.id">
                {{ vendor.vendor }}
              </option>
            </select>
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
                for="modal-edit-company"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button @click="submitEdit">
                <button
                  @click="$emit('change-company')"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                >
                  Save
                </button>
              </button>
            </div>
          </div>

        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
  max-height: calc(83vh - 5em);
}

.modal-box-inner-company {
  height: 400px;
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
