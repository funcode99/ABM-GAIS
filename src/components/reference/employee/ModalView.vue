<script setup>
import iconview from "@/assets/view_icon.svg";

import modalHeader from "@/components/modal/modalHeader.vue";

import { ref, computed } from "vue";
import { Modal } from "usemodal-vue3";

let isVisible = ref(false);
let modalPaddingHeight = "25vh";

const props = defineProps({
  formContent: Array,
});

let selectedImage = ref(props.formContent[0] || null);
let employeeName = ref(props.formContent[1]);
let employeeEmail = ref(props.formContent[2]);
let employeeSN = ref(props.formContent[3]);
let employeeStartDate = ref(props.formContent[4]);
let employeeNik = ref(props.formContent[5]);
let employeeEndDate = ref(props.formContent[6]);
let employeeDob = ref(props.formContent[7]);
let employeeCompanyName = ref(props.formContent[8]);
let employeeJenKel = ref(props.formContent[9]);
let employeeSiteName = ref(props.formContent[10]);
let employeeDepartementName = ref(props.formContent[11]);
let employeeJobbandName = ref(props.formContent[12]);
let employeePhoneNumber = ref(props.formContent[13]);

const formattedStartDate = computed(() => {
  if (employeeStartDate.value) {
    const date = new Date(employeeStartDate.value);
    return date.toISOString().split("T")[0];
  }
  return "";
});

const formattedEndDate = computed(() => {
  if (employeeEndDate.value) {
    const date = new Date(employeeEndDate.value);
    return date.toISOString().split("T")[0];
  }
  return "";
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
      <modalHeader @closeVisibility="isVisible = false" title="View Employee" />

      <form class="modal-box-inner-employee">
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
          Foto
        </p>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              v-model="employeeName"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Email<span class="text-red">*</span></label
            >
            <input
              v-model="employeeEmail"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >SN<span class="text-red">*</span></label
            >
            <input
              v-model="employeeSN"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Begin Date<span class="text-red">*</span></label
            >
            <input
              v-model="formattedStartDate"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >NIK<span class="text-red">*</span></label
            >
            <input
              v-model="employeeNik"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >End Date<span class="text-red">*</span></label
            >
            <input
              v-model="formattedEndDate"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >DOB<span class="text-red">*</span></label
            >
            <input
              v-model="employeeDob"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company<span class="text-red">*</span></label
            >
            <input
              v-model="employeeCompanyName"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Gender<span class="text-red">*</span></label
            >
            <input
              v-model="employeeJenKel"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Location<span class="text-red">*</span></label
            >
            <input
              v-model="employeeSiteName"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Departement<span class="text-red">*</span></label
            >
            <input
              v-model="employeeDepartementName"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Jobband<span class="text-red">*</span></label
            >
            <input
              v-model="employeeJobbandName"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
          </div>
        </div>

        <div class="flex justify-start px-4 items-center">
          <div class="mb-6 w-56 text-start">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Phone Number<span class="text-red">*</span></label
            >
            <input
              v-model="employeePhoneNumber"
              type="text"
              :class="inputStylingClass"
              required
              disabled
              class="cursor-not-allowed"
            />
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

.modal-box-inner-employee {
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
