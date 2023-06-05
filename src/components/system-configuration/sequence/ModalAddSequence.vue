<script setup>
import { ref, onBeforeMount, watch } from "vue";

import { Modal } from "usemodal-vue3";
import Swal from "sweetalert2";
import Api from "@/utils/Api";

import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { useFormAddStore } from "@/stores/sysconfig/add-modal.js";
let formState = useFormAddStore();

let isVisible = ref(false);
let isAdding = ref(false);
let modalPaddingHeight = "10vh";
const emits = defineEmits("addSequence");

let menuSequenceName = ref("");
let company = ref("");
let nextValue = ref("");
let menu = ref("");
let sequenceSize = ref("");
let sequenceCode = ref("");
let prefix = ref("");
let recycleBy = ref("W");
let suffix = ref("");

let instanceArray = [];
let addMenuData = ref([]);
let addCompanyData = ref([]);

const fetchMenu = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("/menu/get");
  instanceArray = api.data.data;
  addMenuData.value = instanceArray;
  menu.value = addMenuData.value[0].id;
};

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  addCompanyData.value = res.data.data;
};

onBeforeMount(() => {
  fetchMenu();
  fetchCompany();
});

const submitSequence = () => {
  isVisible.value = !isVisible.value;
  formState.sequence.sequenceName = menuSequenceName.value;
  formState.sequence.sequenceSize = sequenceSize.value;
  formState.sequence.company = company.value;
  formState.sequence.recycle = recycleBy.value;
  formState.sequence.nextValue = nextValue.value;
  formState.sequence.prefix = prefix.value;
  formState.sequence.suffix = suffix.value;
  formState.sequence.menuId = menu.value;
  formState.sequence.sequenceCode = sequenceCode.value;

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });

  emits("addSequence");
};

const resetInput = () => {
  menuSequenceName.value = "";
  nextValue.value = "";
  menu.value = "";
  sequenceSize.value = "";
  prefix.value = "";
  suffix.value = "";
  recycleBy.value = "W";
  sequenceCode.value = "";
  company.value = "";
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }
});

const rowClass = "flex justify-between mx-4 items-center gap-3 my-3";
const columnClass = "flex flex-col flex-1";
const inputStylingClass =
  "py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base";

// const inputStylingClass = 'w-full md:w-52 lg:w-56 py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer'
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
      <modalHeader @closeVisibility="isVisible = false" title="New Sequence" />

      <form class="modal-box-inner-inner" @submit.prevent="submitSequence">
        <div :class="rowClass">
          <!-- Company -->
          <div :class="columnClass">
            <label
              for="company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Company<span class="text-red">*</span>
            </label>
            <select
              id="company"
              v-model="company"
              :class="inputStylingClass"
              required
            >
              <option
                v-for="data in addCompanyData"
                :key="data.id"
                :value="data.id"
              >
                {{ data.company_name }}
              </option>
            </select>
          </div>

          <!-- Next Value -->
          <div :class="columnClass">
            <label
              for="next_value"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Next Value<span class="text-red">*</span>
            </label>
            <input
              id="next_value"
              v-model="nextValue"
              type="text"
              placeholder="Next Value"
              :class="inputStylingClass"
              required
            />
          </div>
        </div>

        <div :class="rowClass">
          <!-- Nama -->
          <div :class="columnClass">
            <label
              for="sequence_name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Nama Sequence<span class="text-red">*</span>
            </label>

            <input
              id="sequence_name"
              v-model="menuSequenceName"
              type="text"
              placeholder="Nama Sequence"
              :class="inputStylingClass"
              required
            />
          </div>

          <!-- Sequence Size -->
          <div :class="columnClass">
            <label
              for="sequence_size"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Sequence Size<span class="text-red">*</span>
            </label>
            <input
              id="sequence_size"
              v-model="sequenceSize"
              type="text"
              placeholder="Sequence Size"
              :class="inputStylingClass"
              required
            />
          </div>
        </div>

        <div :class="rowClass">
          <!-- Menu -->
          <div :class="columnClass">
            <div class="w-full">
              <label
                for="menu"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Menu<span class="text-red">*</span>
              </label>
              <select
                id="menu"
                v-model="menu"
                :class="inputStylingClass"
                required
              >
                <option
                  v-for="data in addMenuData"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.menu }}
                </option>
              </select>
            </div>
          </div>

          <!-- Recycle By -->
          <div :class="columnClass">
            <div>
              <label
                for="recycle_by"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Recycle by<span class="text-red">*</span>
              </label>
              <select
                id="recycle_by"
                v-model="recycleBy"
                :class="inputStylingClass"
                required
              >
                <!-- <option value="W">Weekly</option> -->
                <option value="M">Month</option>
                <option value="Y">Year</option>
              </select>
            </div>
          </div>
        </div>

        <div :class="rowClass">
          <!-- Prefix -->
          <div :class="columnClass">
            <label
              for="prefix"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Prefix<span class="text-red">*</span>
            </label>
            <input
              id="prefix"
              :class="inputStylingClass"
              v-model="prefix"
              type="text"
              placeholder="Prefix"
              required
            />
          </div>

          <!-- Suffix -->
          <div :class="columnClass">
            <label
              for="suffix"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Suffix<span class="text-red">*</span>
            </label>
            <input
              id="suffix"
              v-model="suffix"
              type="text"
              placeholder="Suffix"
              :class="inputStylingClass"
              required
            />
          </div>
        </div>

        <div :class="rowClass">
          <div :class="columnClass">
            <label
              for="sequence_code"
              class="block mb-2 font-JakartaSans font-medium text-sm"
            >
              Sequence Code<span class="text-red">*</span>
            </label>
            <input
              id="sequence_code"
              v-model="sequenceCode"
              type="text"
              placeholder="Sequence Code"
              :class="inputStylingClass"
              required
            />
          </div>

          <div :class="columnClass"></div>
        </div>

        <modalFooter class="mt-6 pt-5 pb-8" @closeEdit="isVisible = false" />

        <div class="px-4 pb-4">
          <div class="flex flex-col gap-2">
            <h1 class="text-left font-semibold text-sm">
              Sequence Format Info (Prefix & Suffix)
            </h1>
            <hr class="border border-black" />
            <!-- place = justify + align -->
            <div class="grid grid-cols-2 gap-2 font-semibold text-xs">
              <div class="justify-self-start">
                <span>%(year)</span>
                <span>:</span>
                <span>Year including century</span>
              </div>
              <div class="justify-self-start">
                <span>%(year-only)</span>
                <span>:</span>
                <span>Year Only</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 font-semibold text-xs">
              <div class="place-self-start">
                <span>%(month)</span>
                <span>:</span>
                <span>Month including century</span>
              </div>
              <div class="place-self-start">
                <span>%(department)</span>
                <span>:</span>
                <span>Department Code</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 font-semibold text-xs">
              <div class="place-self-start">
                <span>%(company)</span>
                <span>:</span>
                <span>Company Code</span>
              </div>
              <div class="place-self-start">
                <span>%(menu)</span>
                <span>:</span>
                <span>Menu Code</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  </Modal>
</template>

<style scoped>
.btn:hover {
  background-color: white;
}

.modal-box-inner-inner {
  max-height: 500px !important;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

:deep(.modal-vue3-content) {
  max-height: 550px !important;
  overflow-y: auto !important;
}
</style>
