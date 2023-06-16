<script setup>
import iconview from "@/assets/view_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";

import Api from "@/utils/Api";

// import Multiselect from "@vueform/multiselect";

import { ref, onMounted } from "vue";
import { Modal } from "usemodal-vue3";

let isVisible = ref(false);
let modalPaddingHeight = "25vh";

let vendorAirlines = ref("");
let selectedVendorId = ref(props.formContent[4] || null);
let selectedImage = ref(props.formContent[5] || null);
let selectedCodeErpId = ref(props.formContent[6] || null);

// let siteData = ref(null);
// let siteIdArray = ref(null);

const props = defineProps({
  formContent: Array,
});

const currentcompanyName = ref(props.formContent[0]);
const currentcompanyCode = ref(props.formContent[1]);
const currentcompanyShortName = ref(props.formContent[2]);
const currentcompanyGroup = ref(props.formContent[3]);

//for get vendor in select
const fetchVendors = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/flight_trip/get_vendor");
  vendorAirlines.value = res.data.data;
  // console.log("ini data vendor" + JSON.stringify(res.data.data));
};

//for get site in multiselect
// const fetchSite = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   const res = await Api.get("/site/get_data");
//   siteData = res.data.data;
//   // console.log("ini data city" + JSON.stringify(res.data.data));
//   siteData.map((item) => {
//     item.value = item.id;
//   });
//   // console.log("Data company setelah perubahan:", siteData);
// };

onMounted(() => {
  fetchVendors();
  // fetchSite();
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="iconview" alt="view icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader @closeVisibility="isVisible = false" title="View Company" />

      <form class="modal-box-inner-company">
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
                        :src="selectedImage"
                        class="w-[100px] h-[100px] object-cover object-center"
                      />
                    </div>
                  </div>
                </label>

                <input
                  disabled
                  type="file"
                  id="file-input"
                  class="hidden cursor-not-allowed"
                  required
                  accept="image/*"
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
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Code<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyCode"
            type="text"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyName"
            type="text"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Short Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyShortName"
            type="text"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start px-4 w-full cursor">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Group Company<span class="text-red">*</span></label
          >
          <input
            v-model="currentcompanyGroup"
            type="text"
            :class="inputStylingClass"
            required
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 text-start px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Vendor Airlines<span class="text-red">*</span></label
          >
          <select
            class="cursor-not-allowed font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedVendorId"
            disabled
          >
            <option disabled selected>Vendor</option>
            <option v-for="vendor in vendorAirlines" :value="vendor.id">
              {{ vendor.vendor }}
            </option>
          </select>
        </div>

        <div class="mb-6 px-4 w-full text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >ERP<span class="text-red">*</span></label
          >
          <select
            class="cursor-not-allowed font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCodeErpId"
            disabled
          >
            <option disabled selected>ERP</option>
            <option>SAP</option>
            <option>RAMCO</option>
          </select>
        </div>

        <!-- <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site<span class="text-red">*</span></label
          >
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="siteIdArray"
            mode="tags"
            placeholder="Select Site"
            track-by="site_name"
            label="site_name"
            :close-on-select="false"
            :searchable="true"
            :options="siteData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.site_name }}
                <span
                  v-if="!disabled"
                  class="multiselect-tag-remove"
                  @click="handleTagRemove(option, $event)"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
          </Multiselect>
        </div> -->
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
