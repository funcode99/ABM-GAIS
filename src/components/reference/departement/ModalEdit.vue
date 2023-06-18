<script setup>
import editicon from "@/assets/navbar/edit_icon.svg"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import Multiselect from "@vueform/multiselect"

import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"

import { useFormEditStore } from "@/stores/reference/departement/edit-modal.js"
import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
let formEditState = useFormEditStore()
const referenceFetch = useReferenceFetchResult()

const emits = defineEmits(["unlockScrollbar", "changeDepartement"])

let selectedGlAccount = ref("Account")
let GlAccount = ref("")
let status = ref("Status")
let Division = ref([])
let divisionArray = ref(null)
let departementHead = ref("Name")
let Employee = ref("")

let isVisible = ref(false)
let modalPaddingHeight = "25vh"
let isAdding = ref(false)

let companyData = ref(null)
let companyIdArray = ref(`[${props.formContent[0]}]`)
companyIdArray.value = JSON.parse(companyIdArray.value)

let divisionData = ref(null)

let currentDepartementCode = ref(props.formContent[1])
let currentDepartementName = ref(props.formContent[2])
let currentDepartementProfitCenter = ref(props.formContent[3])
let selectedDepartementGlAccount = ref(props.formContent[4])
let selectedStatusTypeId = ref(props.formContent[5])
let divisionIdArray = ref([props.formContent[6]])
let selectedDepartementHead = ref(props.formContent[7])

const props = defineProps({
  formContent: Array,
})

const submitEdit = () => {
  isAdding.value = true;

  if (!formEditState.departement) {
    formEditState.departement = {}; // Inisialisasi objek jika belum ada
  }

  formEditState.departement.departementIdCompany = companyIdArray.value;
  formEditState.departement.departementCode = currentDepartementCode.value;
  formEditState.departement.departementName = currentDepartementName.value;
  formEditState.departement.departementProfitCenter =
    currentDepartementProfitCenter.value;
  formEditState.departement.departementGlAccount =
    selectedDepartementGlAccount.value;
  formEditState.departement.departementStatus = selectedStatusTypeId.value;
  formEditState.departement.departementDivision = divisionIdArray.value;
  formEditState.departement.departementHead = selectedDepartementHead.value;

  isVisible.value = false

  emits("changeDepartement") // Memanggil event 'changeZona'
};

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

const resetInput = () => {
  const originalFormContent = props.formContent

  companyIdArray.value = `[${originalFormContent[0]}]`
  companyIdArray.value = JSON.parse(companyIdArray.value)
  
  currentDepartementCode.value = originalFormContent[1]
  currentDepartementName.value = originalFormContent[2]
  currentDepartementProfitCenter.value = originalFormContent[3]
  selectedDepartementGlAccount.value = originalFormContent[4]
  selectedStatusTypeId.value = originalFormContent[5]
  divisionIdArray.value = [props.formContent[6]]
  selectedDepartementHead.value = originalFormContent[7]
};

watch(isVisible, (newValue) => {

  if (newValue) {
    resetInput()
  }

  companyData.value = referenceFetch.fetchCompanyResult
  companyData.value.map((item) => {
    item.value = item.id
  })

  Employee.value = referenceFetch.fetchEmployeeResult
  GlAccount.value = referenceFetch.fetchGLAccountResult

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
        title="Edit Departement"
      />

      <form class="pt-4 modal-box-inner-zona" @submit.prevent="submitEdit">
        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm">
            Company<span class="text-red">*</span> {{ companyIdArray }}
          </label>
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
            >Departement Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            :class="inputStylingClass"
            placeholder="Departement Code"
            required
            v-model="currentDepartementCode"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Departement Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            :class="inputStylingClass"
            placeholder="Departement Name"
            required
            v-model="currentDepartementName"
          />
        </div>

        <div class="mb-6 w-full px-4 text-start">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Profit Center<span class="text-red">*</span></label
          >
          <input
            type="text"
            :class="inputStylingClass"
            placeholder="Profit Center"
            required
            v-model="currentDepartementProfitCenter"
          />
        </div>

        <div class="flex justify-between px-4 items-center text-start">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >GL Account<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              required
              v-model="selectedDepartementGlAccount"
            >
              <option disabled selected>Account</option>
              <option
                v-for="account in GlAccount"
                :value="account.id"
                :key="account.id"
              >
                {{ account.gl_account }}
              </option>
            </select>
          </div>

          <div class="mb-6 w-full ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Status<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              required
              v-model="selectedStatusTypeId"
            >
              <option disabled selected>Status</option>
              <option value="1">Active</option>
              <option value="0">Non Active</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-start px-4">
          <div class="mb-6 w-full text-start">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Division<span class="text-red">*</span></label
            >
            <div
              class="block bg-white w-full lg:w-[220px] md:w-52 border border-slate-300 rounded-md shadow-sm"
            >
              <Multiselect
                v-model="divisionIdArray"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="divisionData"
                placeholder="Division"
              />
            </div>
          </div>

          <div class="mb-6 w-full text-start ml-2 overflow-x-hidden">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Departemen Head<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              required
              v-model="selectedDepartementHead"
            >
              <option disabled selected>Name</option>
              <option v-for="name in Employee" :key="name.id" :value="name.id">
                {{ name.employee_name }}
              </option>
            </select>
          </div>
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
