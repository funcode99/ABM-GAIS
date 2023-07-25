<script setup>
import { vMaska } from "maska"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"
import SequencePreview from "./SequencePreview.vue"

import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"
import editIcon from "@/assets/navbar/edit_icon.svg"

import { useFormEditStore } from "@/stores/sysconfig/edit-modal.js"
import { useReferenceFetchResult } from "@/stores/fetch/reference.js"
import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig"
let formEditState = useFormEditStore()
const referenceFetch = useReferenceFetchResult()
const sysconfigFetch = useSysconfigFetchResult()

const props = defineProps({
  formContent: Array,
})

let isVisible = ref(false)
let modalPaddingHeight = "10vh"
const emits = defineEmits("changeSequence")
let isEditing = ref(false)

let menuSequenceName = ref(props.formContent[0])
let prefix = ref(props.formContent[1])
let suffix = ref(props.formContent[2])
let sequenceSize = ref(props.formContent[3])
let recycleBy = ref(props.formContent[4])
let nextValue = ref(props.formContent[5])
let menu = ref(props.formContent[6])
let company = ref(props.formContent[7])

let addMenuData = ref([])
let addCompanyData = ref([])

const submitEdit = () => {
  isEditing.value = true
  isVisible.value = false
  formEditState.sequence.sequenceName = menuSequenceName.value
  formEditState.sequence.prefix = prefix.value
  formEditState.sequence.suffix = suffix.value
  formEditState.sequence.sequenceSize = sequenceSize.value
  formEditState.sequence.recycle = recycleBy.value
  formEditState.sequence.nextValue = nextValue.value
  formEditState.sequence.company = company.value
  formEditState.sequence.menuId = menu.value
  emits("changeSequence")
}

const resetInput = () => {
  menuSequenceName.value = props.formContent[0]
  prefix.value = props.formContent[1]
  suffix.value = props.formContent[2]
  sequenceSize.value = props.formContent[3]
  recycleBy.value = props.formContent[4]
  nextValue.value = props.formContent[5]
  menu.value = props.formContent[6]
  company.value = props.formContent[7]
}

watch(isVisible, () => {
  if (isEditing.value == true) {
    isEditing.value = false
  } else {
    resetInput()
  }

  addCompanyData.value = referenceFetch.fetchCompanyResult
  addMenuData.value = sysconfigFetch.fetchMenuResult
})

const rowClass = "flex justify-between mx-4 items-center gap-3 my-3"
const columnClass = "flex flex-col flex-1"
const inputStylingClass =
  "py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base"
</script>

<template>
  <button @click="isVisible = !isVisible" class="cursor-pointer">
    <img :src="editIcon" class="w-6 h-6" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <modalHeader @closeVisibility="isVisible = false" title="Edit Sequence" />

    <main class="p-5 h-max-[80vh] overflow-y-auto">
      <form
        class="modal-box-inner-inner text-left pb-5 max-h-[50vh]"
        @submit.prevent="submitEdit"
      >
        <div :class="rowClass">
          <!-- Company -->
          <div :class="columnClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Company<span class="text-red">*</span>
            </label>
            <select v-model="company" :class="inputStylingClass" required>
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
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Next Value<span class="text-red">*</span>
            </label>
            <input
              v-maska
              data-maska-eager
              data-maska="AAAAA"
              data-maska-tokens="A:[0-9]"
              v-model="nextValue"
              type="text"
              id="name"
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
              class="block mb-2 font-JakartaSans font-medium text-sm"
              for="sequence_name"
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
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Sequence Size<span class="text-red">*</span></label
            >
            <input
              v-maska
              data-maska-eager
              data-maska="AAAAA"
              data-maska-tokens="A:[0-9]"
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
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                id="company"
              >
                Menu<span class="text-red">*</span>
              </label>
              <select v-model="menu" :class="inputStylingClass" required>
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
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Recycle by<span class="text-red">*</span>
              </label>
              <select
                id="company"
                v-model="recycleBy"
                :class="inputStylingClass"
                required
              >
                <option value="M">Month</option>
                <option value="Y">Year</option>
              </select>
            </div>
          </div>
        </div>

        <div :class="rowClass">
          <!-- Prefix -->
          <div :class="columnClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Prefix<span class="text-red">*</span>
            </label>
            <input
              :class="inputStylingClass"
              v-model="prefix"
              type="text"
              placeholder="Prefix"
              required
            />
          </div>

          <!-- Suffix -->
          <div :class="columnClass">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">
              Suffix<span class="text-red">*</span>
            </label>
            <input
              v-model="suffix"
              type="text"
              id="name"
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
              type="text"
              :class="[inputStylingClass, menu == data.id ? '' : 'hidden']"
              v-for="data in addMenuData"
              :key="data.id"
              :value="data.code_sequence"
              required
              disabled
            />

            <!-- <input 
                      type="text"
                      :class="[inputStylingClass, menu == '' ? '' : 'hidden']" disabled 
                    /> -->
          </div>

          <div :class="columnClass"></div>
        </div>

        <SequencePreview
          :form-data="{
            sequenceSize,
            company,
            prefix,
            suffix,
            menu,
            sequenceCode,
          }"
        ></SequencePreview>
      </form>

      <modalFooter @closeEdit="isVisible = false">
        <div class="my-5">
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
      </modalFooter>
    </main>
  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  /* max-height: 550px !important; */
  /* overflow-y: auto !important; */
}

.modal-box-inner-inner {
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  /* max-height: 500px; */
  /* transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); */
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
