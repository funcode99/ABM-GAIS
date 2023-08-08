<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

import { ref } from "vue";

const props = defineProps({
  roleCode: String,
  listEmployee: Array,
});

let dataEmployee = ref(props.listEmployee);
let code_role = ref(props.roleCode);
let notes = ref(null);
let id_employee = ref(null);

const selectedFile = ref(null);
const fileUrl = ref(null);
const filename = ref(null);
const isApprovalOnBehalf = ref(false);
const emits = defineEmits(["close", "approve"]);

const onFileSelected = (event) => {
  selectedFile.value = event.target.files[0];
  filename.value = selectedFile.value.name;

  const reader = new FileReader();

  reader.onload = () => {
    fileUrl.value = reader.result;
  };

  if (selectedFile.value) {
    reader.readAsDataURL(selectedFile.value);
  } else {
    fileUrl.value = null;
  }
};

const approve = () => {
  const data = {
    id_employee: id_employee.value,
    notes: notes.value,
    file: selectedFile.value,
  };

  emits("approve", data);
};
</script>

<template>
  <input type="checkbox" id="my-modal-approve" class="modal-toggle" />

  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <button
          for="my-modal-approve"
          class="cursor-pointer absolute right-3 top-3"
          @click="emits('close')"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>

        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Approval Confirmation
        </p>
      </nav>

      <main class="modal-box-inner-approval">
        <p class="font-JakartaSans font-medium text-sm py-2">
          Are you sure want to approve this document?
        </p>

        <div class="pt-4">
          <div
            v-if="code_role == 'SUPADM'"
            class="flex flex-wrap justify-start gap-2"
          >
            <div class="form-control">
              <label class="label cursor-pointer gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-blue"
                  :checked="isApprovalOnBehalf"
                  @click="isApprovalOnBehalf = true"
                />
                <span class="font-JakartaSans font-medium text-xs"
                  >Approval On Behalf</span
                >
              </label>
            </div>

            <select
              v-if="isApprovalOnBehalf"
              class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              v-model="id_employee"
              required
            >
              <option v-for="data in dataEmployee" :key="data.id">
                {{ data.employee_name }}
              </option>
            </select>
          </div>

          <div class="flex flex-wrap justify-start">
            <div class="form-control">
              <label class="label cursor-pointer gap-4">
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-green"
                  :checked="!isApprovalOnBehalf"
                  @click="isApprovalOnBehalf = false"
                />
                <span class="font-JakartaSans font-medium text-xs"
                  >Fully Approve</span
                >
              </label>
            </div>
          </div>

          <div v-if="isApprovalOnBehalf">
            <p class="font-JakartaSans font-medium text-sm py-2">Attachment</p>
            <input
              type="file"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
              @change="onFileSelected"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>

          <p class="font-JakartaSans font-medium text-sm py-2">Notes</p>
          <input
            type="text"
            name="notes"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Notes"
            required
            v-model="notes"
          />
        </div>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <button
            for="my-modal-approve"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            @click="emits('close')"
          >
            Cancel
          </button>
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            @click="approve"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-approval {
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
