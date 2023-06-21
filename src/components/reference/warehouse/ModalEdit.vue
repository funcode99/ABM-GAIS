<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/warehouse/edit-modal.js";
import { useReferenceFetchResult } from "@/stores/fetch/reference.js";
import { useMenuAccessStore } from "@/stores/savemenuaccess";

let formEditState = useFormEditStore();
const referenceFetch = useReferenceFetchResult();
const menuAccessStore = useMenuAccessStore();

const emits = defineEmits([
  "unlockScrollbar",
  "changeWarehouse",
  "fetchSiteByCompanyId",
]);

let modalPaddingHeight = "25vh";
let isVisible = ref(false);
let isAdding = ref(false);
let isLoading = ref(false);

let company = ref();
let location = ref();
let responseCompanyArray = ref([]);
let responseSiteByCompanyIdArray = ref([]);

const props = defineProps({
  formContent: Array,
});

const currentwarehouseName = ref(props.formContent[0]);
const originalwarehouseName = ref(props.formContent[0]);

const submitEdit = () => {
  if (!formEditState.warehouse) {
    formEditState.warehouse = {};
  }

  formEditState.warehouse.warehouseName = currentwarehouseName.value;
  formEditState.warehouse.warehouseIdCompany = company.value;
  formEditState.warehouse.warehouseIdSite = location.value;

  isVisible.value = false;
  emits("changeWarehouse");
};

const resetForm = () => {
  currentwarehouseName.value = originalwarehouseName.value;
};

watch(isVisible, () => {
  
  if (isVisible.value === true) {
    company.value = props.formContent[1];
    location.value = props.formContent[2];
  } else {
    company.value = 0;
    location.value = 0;
  }

  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetForm();
  }

  responseCompanyArray.value = referenceFetch.fetchCompanyResult;

});

watch(company, () => {
  isLoading.value = true;
  menuAccessStore.companyId = company.value;
  if (company.value !== 0) {
    emits("fetchSiteByCompanyId");
  }
});

watch(menuAccessStore, () => {
  responseSiteByCompanyIdArray.value = menuAccessStore.fetchSiteByCompanyResult;
});

watch(responseSiteByCompanyIdArray, () => {
  isLoading.value = false;
});

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit Warehouse"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="company"
          >
            <option disabled selected>Company</option>
            <option
              v-for="data in responseCompanyArray"
              :key="data.id"
              :value="data.id"
              :selected="data.id == props.formContent[1] ? true : false"
            >
              {{ data.company_name }}
            </option>
          </select>
        </div>

        <div v-if="!isLoading" class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Site<span class="text-red">*</span>
          </label>
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="location"
          >
            <option disabled selected>Site</option>
            <option
              v-for="data in responseSiteByCompanyIdArray"
              :key="data.id"
              :value="data.id"
            >
              {{ data.site_name }}
            </option>
          </select>
        </div>

        <div v-else class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Site<span class="text-red">*</span>
          </label>

          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          >
            <option>Retrieving site data...</option>
          </select>
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Warehouse Name<span class="text-red">*</span></label
          >
          <input
            v-model="currentwarehouseName"
            type="text"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-2" />
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
