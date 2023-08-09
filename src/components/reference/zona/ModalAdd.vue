<script setup>
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import icondanger from "@/assets/icon-danger-circle.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import Multiselect from "@vueform/multiselect";

import { useReferenceFetchResult } from "@/stores/fetch/reference.js";
const referenceFetch = useReferenceFetchResult();

const emits = defineEmits(["unlockScrollbar", "zona-saved"]);

let zonaName = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);
let selectedZona = ref("Zona");
let Zona = ref("");

let companyData = ref(null);
let companyIdArray = ref(null);
let cityData = ref(null);
let cityIdArray = ref(null);
let addZonaId = ref([]);

const saveZona = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await Api.post(`/zona/store`, {
      id_zona: selectedZona.value,
      id_city: cityIdArray.value,
      id_company: companyIdArray.value,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("zona-saved");
  } catch (error) {
    console.log(error);

    let errorMessage = error.response.data;

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.error;
    }

    Swal.fire({
      position: "center",
      iconHtml: `<img src="${icondanger}" />`,
      closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
      title: "Error",
      text: errorMessage,
      showConfirmButton: false,
      showCloseButton: true,
    });
  }
};

const resetInput = () => {
  selectedZona.value = "Zona";
  cityIdArray.value = [];
  companyIdArray.value = [];
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }

  companyData.value = referenceFetch.fetchCompanyResult;
  companyData.value.map((item) => {
    item.value = item.id;
  });

  cityData.value = referenceFetch.fetchCityResult;
  cityData.value.map((item) => {
    item.value = item.id;
  });

  Zona.value = referenceFetch.fetchZonaIdResult;
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
      <modalHeader @closeVisibility="isVisible = false" title="New Zona" />

      <form class="pt-4 modal-box-inner-zona" @submit.prevent="saveZona">
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="companyIdArray"
            mode="tags"
            placeholder="Select Company"
            track-by="company_name"
            label="company_name"
            :close-on-select="false"
            :searchable="true"
            :options="companyData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.company_name }}
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
          
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Zona<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedZona"
          >
            <option disabled selected>Zona</option>
            <option v-for="zona in Zona" :value="zona.id_zona">
              {{ zona.zona_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >City<span class="text-red">*</span></label
          >
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>

          <Multiselect
            v-model="cityIdArray"
            mode="tags"
            placeholder="Select City"
            track-by="city_name"
            label="city_name"
            :close-on-select="false"
            :searchable="true"
            :options="cityData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.city_name }}
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
