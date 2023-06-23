<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStoreGroupCompany } from "@/stores/reference/company/edit-modal-grupCompany.js";

const formEditStateGroupCompany = useFormEditStoreGroupCompany();

const emits = defineEmits(["unlockScrollbar", "changeGroupCompany"]);

let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

let iconfilename = ref(null);
let imageUrl = ref(null);

let selectedImage = ref(props.formContent[2] || null);

const file = ref({});

const props = defineProps({
  formContent: Array,
});

const currentGroupCompanyCode = ref(props.formContent[0]);
const originalGroupCompanyCode = ref(props.formContent[0]);
const currentGroupCompanyName = ref(props.formContent[1]);
const originalGroupCompanyName = ref(props.formContent[1]);
const currentGroupCompanyLogo = ref(props.formContent[2]);
const originalGroupCompanyLogo = ref(props.formContent[2]);

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditStateGroupCompany.groupCompany) {
    formEditStateGroupCompany.groupCompany = {};
  }

  formEditStateGroupCompany.groupCompany.companyGroupCompanyCode =
    currentGroupCompanyCode.value;
  formEditStateGroupCompany.groupCompany.companyGroupCompanyName =
    currentGroupCompanyName.value;
  formEditStateGroupCompany.groupCompany.companyGroupCompanyLogo = selectedImage.value;

  isVisible.value = false;
  emits("changeGroupCompany");
};

// for image logo
const onFileSelected = (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedImage.value = file;
    iconfilename.value = file.name;

    const reader = new FileReader();

    reader.onload = () => {
      imageUrl.value = reader.result;
    };

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
    currentGroupCompanyCode.value = props.formContent[0];
    currentGroupCompanyName.value = props.formContent[1];
    selectedImage.value = props.formContent[2];
  }
});

const resetForm = () => {
  currentGroupCompanyCode.value = originalGroupCompanyCode.value;
  currentGroupCompanyName.value = originalGroupCompanyName.value;
  imageUrl.value = originalGroupCompanyLogo.value;
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
        title="Edit Group Company"
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
            v-model="currentGroupCompanyCode"
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
            v-model="currentGroupCompanyName"
            type="text"
            id="name"
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
