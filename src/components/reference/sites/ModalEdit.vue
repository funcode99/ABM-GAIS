<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useReferenceFetchResult } from "@/stores/fetch/reference";
import { useFormEditStore } from "@/stores/reference/sites/edit-modal.js";
const referenceFetch = useReferenceFetchResult()
const formEditState = useFormEditStore();

const emits = defineEmits(["unlockScrollbar", "changeSite"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let siteName = ref("");
let selectedCompany = ref("Company");
let Company = ref("");
let siteIdCompany = ref("");
let siteCode = ref();
let selectedCompanyId = ref(props.formContent[1] || null);

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

  if (!formEditState.site) {
    formEditState.site = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.site.siteName = currentsiteName.value;
  formEditState.site.siteIdCompany = selectedCompanyId.value;
  formEditState.site.siteCode = currentsiteCode.value;

  isVisible.value = false;
  emits("changeSite"); // Memanggil event 'changeSite'
} 

watch(referenceFetch, () => {
  Company.value = referenceFetch.fetchCompanyResult
})

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
}

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
        title="Edit Site"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedCompanyId"
          >
            <option disabled selected>Company</option>
            <option v-for="company in Company" :value="company.id">
              {{ company.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site Code<span class="text-red">*</span></label
          >
          <input
            v-model="currentsiteCode"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentsiteName"
            type="text"
            :class="inputStylingClass"
            required
          />
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
</style>
