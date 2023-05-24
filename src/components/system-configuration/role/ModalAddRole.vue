<script setup>
import { ref, watch } from 'vue'
import iconClose from "@/assets/navbar/icon_close.svg"

import { useFormAddStore } from '@/stores/add-modal.js'

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
      
        <div class="sticky top-0 z-50 bg-[#015289] text-white">
            <label for="add-role-modal" class="cursor-pointer absolute right-3 top-3">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold mx-4 py-2">New Role</p>
            <div className="divider m-0"></div>
        </div>

        <main>

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
  
          <div class="sticky bottom-0 bg-white px-4 py-8">
              <div className="divider m-0 pb-4 w-full"></div>
              <div class="flex justify-end gap-4">
                <label
                  for="add-role-modal"
                  class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
                  >
                  Cancel
                </label>
                <button @click="submitRole">
                  <button 
                  @click="$emit('addRole')"
                  class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                    Save
                  </button>
                </button>
              </div>
          </div>

        </main>


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
