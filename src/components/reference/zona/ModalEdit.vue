<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import Multiselect from "@vueform/multiselect";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/zona/edit-modal.js"
import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
let formEditState = useFormEditStore()
const referenceFetch = useReferenceFetchResult()

const emits = defineEmits(["unlockScrollbar", "changeZona"])
let isVisible = ref(false)
let modalPaddingHeight = "25vh"
let isAdding = ref(false)
let Zona = ref("")

let companyData = ref(null);
let companyIdArray = ref(null);
let cityData = ref(null);
let cityIdArray = ref(null);

let companyIdObject = ref(props.formContent[0]);
let companyIdObjectKeys = ref(Object.values(companyIdObject.value));

let selectedZonaId = ref(props.formContent[1] || null);

let CityIdObject = ref(props.formContent[2]);
let cityIdObjectKeys = ref(Object.values(CityIdObject.value));


  companyIdObjectKeys.value.map((item, index) => {
  
  if (item == "{") {
    companyIdObjectKeys.value[index] = "["
  } else if (item == "}") {
    companyIdObjectKeys.value[index] = "]"
  }

  })

  cityIdObjectKeys.value.map((item, index) => {
    if (item == "{") {
      cityIdObjectKeys.value[index] = "["
    } else if (item == "}") {
      cityIdObjectKeys.value[index] = "]"
    }
  })

  companyIdArray.value = JSON.parse(companyIdObjectKeys.value.join(""))
  cityIdArray.value = JSON.parse(cityIdObjectKeys.value.join(""))

  const props = defineProps({
    formContent: Array,
  })

  const submitEdit = () => {
    isAdding.value = true;

    if (!formEditState.zona) {
      formEditState.zona = {};
    }

    formEditState.zona.zonaIdCompany = companyIdArray.value;
    formEditState.zona.zonaName = selectedZonaId.value;
    formEditState.zona.zonaIdCity = cityIdArray.value;

    isVisible.value = false;
    emits("changeZona");
  }

  const resetInput = () => {
    selectedZonaId.value = props.formContent[1]
    companyIdArray.value = [...props.formContent[0]]
    cityIdArray.value = [...props.formContent[2]]
  }

  watch(isVisible, (newValue) => {
    if (newValue) {
      resetInput();
    }

    companyData.value = referenceFetch.fetchCompanyResult
    companyData.value.map((item) => {
      item.value = item.id
    })

    cityData.value = referenceFetch.fetchCityResult
    cityData.value.map((item) => {
      item.value = item.id
    })

    Zona.value = referenceFetch.fetchZonaIdResult


  })

  const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader @closeVisibility="isVisible = false" title="Edit Zona" />

      <form class="pt-4 modal-box-inner-zona" @submit.prevent="submitEdit">
        <div class="mb-6 w-full px-4 text-start">
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

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Zona<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="selectedZonaId"
            disabled
          >
            <option disabled selected>Zona</option>
            <option v-for="zona in Zona" :value="zona.id_zona">
              {{ zona.zona_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4 text-start">
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
  overscroll-behavior-y: contain;
}
</style>
