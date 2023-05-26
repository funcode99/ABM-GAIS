<script setup>
import editicon from "@/assets/navbar/edit_icon.svg"

import modalHeaderEdit from "@/components/modal/edit/ModalHeaderEdit.vue"
import modalFooterEdit from "@/components/modal/edit/ModalFooterEdit.vue"

import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"

import { useFormEditStore } from "@/stores/reference/gl-account/edit-modal.js"
let formEditState = useFormEditStore()

let isVisible = ref(false)
let modalPaddingHeight = '25vh'

const emits = defineEmits(["unlockScrollbar", "changeGl"])

const props = defineProps({
  formContent: Array
})

const glAccountCode = ref(props.formContent[0])
const glAccountName = ref(props.formContent[1])

const submitEdit = () => {

  if (!formEditState.glAccount) {
    formEditState.glAccount = {} // Inisialisasi objek jika belum ada
  }

  formEditState.glAccount.glAccountCode = glAccountCode.value
  formEditState.glAccount.glAccountName = glAccountName.value

  isVisible.value = !isVisible.value;
  emits("changeGl") // Memanggil event 'changeGl'
}

const inputStylingClass =
"font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

watch(isVisible, () => {
  glAccountCode.value = props.formContent[0]
  glAccountName.value = props.formContent[1]
})

</script>

<template>

  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    
    <main>

      <modalHeaderEdit 
        @closeVisibility="isVisible = false"
        title="Edit GL Account"
      />

      <form class="pt-4">

        <div class="mb-6 text-start w-full px-4">
          <label
            for="gl_account"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Account<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="glAccountCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label
            for="gl_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >GL Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="glAccountName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooterEdit
          @closeEdit="isVisible = false"
          @submitEditForm="submitEdit()"
        />

      </form>

    </main>

  </Modal>

</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 300px !important;
  max-width: 510px !important;
}
</style>
