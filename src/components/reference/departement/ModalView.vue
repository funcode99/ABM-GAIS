<script setup>
import iconview from "@/assets/view_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";

import Multiselect from "@vueform/multiselect";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useReferenceFetchResult } from "@/stores/fetch/reference.js";

const referenceFetch = useReferenceFetchResult();

const emits = defineEmits(["unlockScrollbar"]);

let selectedGlAccount = ref("Account");
let GlAccount = ref("");
let status = ref("Status");
let departementHead = ref("Name");
let Employee = ref("");

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let companyData = ref(null);
let companyIdArray = ref(`[${props.formContent[0]}]`);
companyIdArray.value = JSON.parse(companyIdArray.value);

let currentDepartementCode = ref(props.formContent[1]);
let currentDepartementName = ref(props.formContent[2]);
let currentDepartementProfitCenter = ref(props.formContent[3]);
let selectedDepartementGlAccount = ref(props.formContent[4]);
let selectedStatusTypeId = ref(props.formContent[5]);
let selectedDepartementHead = ref(props.formContent[6]);

const props = defineProps({
  formContent: Array,
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  companyData.value = referenceFetch.fetchCompanyResult;
  companyData.value.map((item) => {
    item.value = item.id;
  });

  Employee.value = referenceFetch.fetchEmployeeResult;
  GlAccount.value = referenceFetch.fetchGLAccountResult;
});
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="iconview" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="View Departement"
      />

      <form class="pt-4 modal-box-inner-zona">
        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Company<span class="text-red">*</span>
          </label>
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="companyIdArray"
            mode="tags"
            placeholder="No Data"
            track-by="company_name"
            label="company_name"
            :close-on-select="false"
            :searchable="false"
            :options="companyData"
            disabled
            class="cursor-not-allowed"
          >
            <template v-slot:tag="{ option }">
              <div
                class="multiselect-tag is-user cursor-not-allowed"
                :class="{
                  'is-disabled': option.readonly,
                }"
              >
                {{ option.company_name }}
                <span
                  v-if="!option.readonly"
                  class="multiselect-tag-remove cursor-not-allowed"
                >
                  <span class="multiselect-tag-remove-icon"></span>
                </span>
              </div>
            </template>
          </Multiselect>
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Departement Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            :class="inputStylingClass"
            placeholder="Departement Code"
            v-model="currentDepartementCode"
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Departement Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            :class="inputStylingClass"
            placeholder="Departement Name"
            v-model="currentDepartementName"
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Profit Center<span class="text-red">*</span></label
          >
          <input
            type="text"
            :class="inputStylingClass"
            placeholder="Profit Center"
            v-model="currentDepartementProfitCenter"
            disabled
            class="cursor-not-allowed"
          />
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >GL Account<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-not-allowed"
              required
              v-model="selectedDepartementGlAccount"
              disabled
            >
              <option disabled selected>Account</option>
              <option
                v-for="account in GlAccount"
                :value="account.id"
                :key="account.id"
              >
                {{ account.gl_account }}
              </option>
            </select>
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Status<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-not-allowed"
              required
              v-model="selectedStatusTypeId"
              disabled
            >
              <option disabled selected>Status</option>
              <option value="1">Active</option>
              <option value="0">Non Active</option>
            </select>
          </div>
        </div>

        <div class="flex justify-start items-start px-2">
          <div class="mb-6 w-full text-start ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Departemen Head<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-not-allowed"
              required
              v-model="selectedDepartementHead"
              disabled
            >
              <option disabled selected>Name</option>
              <option v-for="name in Employee" :key="name.id" :value="name.id">
                {{ name.employee_name }}
              </option>
            </select>
          </div>
        </div>
      </form>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}

.modal-box-inner-zona {
  max-height: 340px !important;
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
