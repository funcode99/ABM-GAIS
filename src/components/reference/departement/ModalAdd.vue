<script setup>
import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"

import Swal from "sweetalert2"
import Api from "@/utils/Api"

import Multiselect from "@vueform/multiselect"

import { useReferenceFetchResult } from '@/stores/fetch/reference.js'
const referenceFetch = useReferenceFetchResult()

const emits = defineEmits(["unlockScrollbar", "departementSaved"])

let departemenCode = ref("")
let departementName = ref("")
let costCenter = ref("")
let profitCenter = ref("")
let selectedGlAccount = ref("Account")
let GlAccount = ref("")
let status = ref("Status")
let Division = ref([])
let divisionArray = ref(null)
let selectedDepartementHead = ref("Name")
let Employee = ref("")

let isVisible = ref(false)
let modalPaddingHeight = "25vh"
let isAdding = ref(false)

let companyData = ref(null)
let companyIdArray = ref([])

const saveDepartement = async () => {
  isAdding.value = true
  isVisible.value = !isVisible.value
  setTimeout(callAddApi, 500)
}

const callAddApi = async () => {
  try {
    
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    
    await Api.post(`/department/store`, {
      id_company: companyIdArray.value,
      departement_code: departemenCode.value,
      departement_name: departementName.value,
      profit_center: profitCenter.value,
      id_gl_account: selectedGlAccount.value,
      is_active: status.value,
      id_division: Division.value.join(","),
      departement_head: selectedDepartementHead.value,
    })

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("departementSaved")

  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  companyIdArray.value = []
  departemenCode.value = ""
  departementName.value = ""
  profitCenter.value = ""
  selectedGlAccount.value = "Account"
  status.value = "Status"
  Division.value = []
  selectedDepartementHead.value = "Name"
}

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
  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader
        @closeVisibility="isVisible = false"
        title="New Departement"
      />

      <form class="pt-4 modal-box-inner-zona" @submit.prevent="saveDepartement">
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
            >Departement Code<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Departement Code"
            required
            v-model="departemenCode"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Departement Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Departement Name"
            required
            v-model="departementName"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Profit Center<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Profit Center"
            required
            v-model="profitCenter"
          />
        </div>

        <div class="flex justify-between px-4 items-center">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >GL Account<span class="text-red">*</span></label
            >
            <select
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              required
              v-model="selectedGlAccount"
            >
              <option disabled selected>Account</option>
              <option v-for="account in GlAccount" :value="account.id">
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
              v-model="status"
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
                v-model="Division"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="divisionArray"
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
              <option v-for="name in Employee" :value="name.id">
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
