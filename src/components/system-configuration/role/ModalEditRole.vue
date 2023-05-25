<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editIcon from "@/assets/navbar/edit_icon.svg";

import { ref, watch } from "vue";
import { Modal } from "usemodal-vue3";

import { useFormEditStore } from '@/stores/edit-modal.js'

let formEditState = useFormEditStore()

let isVisible = ref(false);
let modalPaddingHeight = '25%';

const props = defineProps({
  formContent: Array,
});

const currentRoleName = ref(props.formContent[0]);

const submitEdit = () => {
  formEditState.role.roleName = currentRoleName.value
  isVisible.value = !isVisible.value
}

const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

watch(isVisible, () => {
  currentRoleName.value = props.formContent[0]
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

        <div class="sticky top-0 z-50 bg-[#015289]">
          <button
            @click="isVisible = false"
            class="cursor-pointer absolute right-3 top-0 lg:top-3"
          >
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </button>
          <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start">
            Edit Role
          </p>
        </div>

        <main class="modal-box-inner-inner">
          <div class="pt-4">
  
            <div class="mb-6 text-start px-4 w-full">
  
              <span class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                Role <span class="text-red">*</span>
              </span>
  
                <input
                  @keydown.enter="submitEdit"
                  @keyup.enter="$emit('changeRole')"
                  v-model="currentRoleName"
                  type="text"
                  id="name"
                  placeholder="Role"
                  :class="inputStylingClass"
                  required
                  />
  
            </div>
          </div>
    
          <div class="sticky bottom-0 bg-white">
              <div class="flex justify-end gap-4 mr-4">
                
                <label
                  @click="isVisible = !isVisible"
                  for="add-user-modal"
                  class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]">
                  Cancel
                </label>
  
                <button @click="submitEdit">
                  <button
                  @click="$emit('changeRole')"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
                >
                  Save
                </button>
                </button>
  
            </div>
          </div>
        </main>
      
    </main>
    
  </Modal>
</template>

<style scoped>
.content {
  flex: 1 1 auto !important;
}

:deep(.modal-vue3-content) {
  max-height: 210px !important;
}

</style>
