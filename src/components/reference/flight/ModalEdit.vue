<script setup>
import editIcon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";
import { useFormEditStore } from "@/stores/reference/flight/edit-modal.js";

let formEditState = useFormEditStore();
const emits = defineEmits(["unlockScrollbar", "changeFlight"]);
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const props = defineProps({
  formContent: Array,
});

const flightClassName = ref(props.formContent[0]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.flight) {
    formEditState.flight = {};
  }

  formEditState.flight.flightClassName = flightClassName.value;

  isVisible.value = false;
  emits("changeFlight");
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    flightClassName.value = props.formContent[0];
  }
});
</script>

<template>
  <button @click="isVisible = !isVisible">
    <img :src="editIcon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="Edit Class Transportation"
      />

      <form class="pt-4" @submit.prevent="submitEdit">
        <div class="mb-6 text-start px-4 w-full">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Class Transportation<span class="text-red">*</span>
          </label>

          <input
            v-model="flightClassName"
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
  max-height: 250px !important;
  max-width: 510px !important;
}
</style>
