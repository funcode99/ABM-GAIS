<script setup>
import editIcon from "@/assets/navbar/edit_icon.svg";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from '@/stores/sysconfig/edit-modal.js'

  import modalHeader from "@/components/modal/modalHeader.vue"
  import modalFooter from "@/components/modal/modalFooter.vue"

let formEditState = useFormEditStore()

let isVisible = ref(false)
let isAdding = ref(false)
let modalPaddingHeight = '10vh'
const emits = defineEmits('changeRole')

const props = defineProps({
  formContent: Array,
})

const currentRoleName = ref(props.formContent[0]);

const submitEdit = () => {
  isAdding.value = true
  formEditState.role.roleName = currentRoleName.value
  emits('changeRole')
  isVisible.value = false
}

const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

const resetInput = () => {
  currentRoleName.value = props.formContent[0]
}

watch(isVisible, () => {
    if(isAdding.value == true) {
      isAdding.value = false
    } else {
      resetInput()
    }
  })

</script>

<template class="font-JakartaSans">

  <button @click="isVisible = !isVisible">
    <img :src="editIcon" alt="" />
  </button>

  <Modal
    v-model:visible="isVisible"
    v-model:offsetTop="modalPaddingHeight"
  >

    <main>

        <modalHeader
          @closeVisibility="isVisible = false"
          title="Edit Role"
        />

        <form class="modal-box-inner-inner" @submit.prevent="submitEdit">

          <div class="pt-4">
  
            <div class="mb-6 text-start px-4 w-full">
  
              <span class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                Role <span class="text-red">*</span>
              </span>
  
              <!-- gak perlu pakai ini lagi -->
              <!-- @keydown.enter="submitEdit" -->
                <input
                  v-model="currentRoleName"
                  type="text"
                  placeholder="Role"
                  :class="inputStylingClass"
                  required
                />
  
            </div>
          </div>

              <modalFooter
                class="mt-6 pt-5 pb-2"
                @closeEdit="isVisible = false"
              />
          
        </form>
      
    </main>
    
  </Modal>
  
</template>

<style scoped>
.content {
  flex: 1 1 auto !important;
}

:deep(.modal-vue3-content) {
  /* max-height: 210px !important; */
}

</style>
