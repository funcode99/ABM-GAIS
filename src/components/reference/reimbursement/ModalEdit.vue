<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";


import Multiselect from "@vueform/multiselect";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from "@/stores/reference/reimbursement/edit-modal.js";
import { useReferenceFetchResult } from "@/stores/fetch/reference";

const emits = defineEmits(["unlockScrollbar", "changeReimbursement"]);

const formEditState = useFormEditStore()
const referenceFetch = useReferenceFetchResult()

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let jobBandData = ref(null);
let jobBandIdArray = ref([]);

let jobBandIdObject = ref(props.formContent[2]);
let jobBandIdObjectKeys = ref(Object.values(jobBandIdObject.value));

let currentReimbursementType = ref(props.formContent[0]);
let currentReimbursementParentType = ref(props.formContent[1]);

jobBandIdObjectKeys.value.map((item) => {
  let number = Number(item);

  if (Number.isInteger(number)) {
    jobBandIdArray.value.push(item);
  }
});

const props = defineProps({
  formContent: Array,
});

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.reimbursement) {
    formEditState.reimbursement = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.reimbursement.reimbursementType =
    currentReimbursementType.value;
  formEditState.reimbursement.reimbursementParent =
    currentReimbursementParentType.value;
  formEditState.reimbursement.reimbursementIdJobBand = jobBandIdArray.value;

  isVisible.value = false;
  emits("changeReimbursement"); // Memanggil event 'changeZona'
}

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const resetInput = () => {
  currentReimbursementType.value = props.formContent[0];
  currentReimbursementParentType.value = props.formContent[1];
  jobBandIdArray.value = [...props.formContent[2]];
};

watch(isVisible, (newValue) => {
  if (newValue) {
    resetInput();
  }
})

watch(referenceFetch, () => {
  jobBandData.value = referenceFetch.fetchJobBandResult
    jobBandData.map((item) => {
    item.value = item.id;
  })
})

</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit Reimbursement Type"
      />

      <form
        class="pt-4 modal-box-inner-reimbursement"
        @submit.prevent="submitEdit"
      >
        <div class="mb-6 mr-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Reimbursement Type<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Reimbursement Type"
            required
            :class="inputStylingClass"
            v-model="currentReimbursementType"
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Parent Type<span class="text-red">*</span></label
          >
          <input
            type="text"
            placeholder="Reimbursement Type"
            required
            :class="inputStylingClass"
            v-model="currentReimbursementParentType"
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Job Band<span class="text-red">*</span></label
          >
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          ></div>
          <Multiselect
            v-model="jobBandIdArray"
            mode="tags"
            placeholder="Select Job Band"
            track-by="band_job_name"
            label="band_job_name"
            :close-on-select="false"
            :searchable="true"
            :options="jobBandData"
          >
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
              <div
                class="multiselect-tag is-user"
                :class="{
                  'is-disabled': disabled,
                }"
              >
                {{ option.band_job_name }}
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

.modal-box-inner-reimbursement {
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
