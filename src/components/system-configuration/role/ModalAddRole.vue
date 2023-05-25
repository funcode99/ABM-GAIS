<script setup>
import { ref, watch } from 'vue'

import { useFormAddStore } from '@/stores/add-modal.js'

import modalHeader from "@/components/modal/ModalHeader.vue"
import modalBody from "@/components/modal/ModalBody.vue"
import modalFooter from '@/components/modal/ModalFooter.vue'

const formState = useFormAddStore()

let newRole = ref('')
let isOpenModal = ref(false)

const submitRole = () => {
    formState.role.roleName = newRole.value
    isOpenModal.value = !isOpenModal.value
}

  const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer w-full font-JakartaSans font-semibold text-base'

  watch(isOpenModal, () => {
    newRole.value = ''
  })

</script>

<template>
  
    <label for="add-role-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add New
    </label>

  <input type="checkbox" id="add-role-modal" class="modal-toggle" v-model="isOpenModal" />

  <div class="modal">

    <div class="modal-box relative">
      
        <modalHeader title="New Role" forLabel="add-role-modal" />

        <modalBody>

          <div class="py-3 px-8 ">
            
            <div class="mb-3">
              <label
                for="name"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Role<span class="text-red">*</span></label>
              <input
                v-model="newRole"
                type="text"
                id="name"
                placeholder="Role"
                :class="inputStylingClass"
                required
              />
            </div>
  
            <!-- <div class="mb-3">
              <label
                for="name"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Allowed Site<span class="text-red">*</span></label>
              <input
                type="text"
                id="name"
                placeholder="Site"
                class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                required
              />
            </div> -->
  
          </div>
  
          <modalFooter forLabel="add-role-modal" @add-something="$emit('addRole')" @do-something="submitRole" />
        
        </modalBody>

    </div>
    
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

</style>
