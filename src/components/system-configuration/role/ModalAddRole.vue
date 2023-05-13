<script setup>
import { ref } from 'vue'
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

</script>

<template>
  
    <label for="add-role-modal" class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
        + Add New
    </label>

  <input type="checkbox" id="add-role-modal" class="modal-toggle" v-model="isOpenModal" />
  <div class="modal">
    <div class="modal-box relative">
      
        <div class="sticky top-0 z-50 bg-white py-4">
            <label for="add-role-modal" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
            <p class="font-JakartaSans text-2xl font-semibold">New Role</p>
            <div className="divider m-0"></div>
        </div>

      <div class="mb-3">
        
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

      <div class="sticky bottom-0 bg-white py-8">
          <div className="divider m-0 pb-4 w-full"></div>
          <div class="flex justify-end gap-4">
            <label
              for="add-role-modal"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >
              Cancel
            </label>
            <!-- dia harus label ternyata -->
            <!-- for="add-role-modal" -->
            <button @click="submitRole">
              <button 
              @click="$emit('addRole')"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]">
                Save
              </button>
            </button>
          </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-box {
  max-height: calc(100vh - 5em);
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 91.666667%;
  max-width: 32rem /* 512px */;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-top-left-radius: var(--rounded-box, 1rem);
  border-top-right-radius: var(--rounded-box, 1rem);
  border-bottom-left-radius: var(--rounded-box, 1rem);
  border-bottom-right-radius: var(--rounded-box, 1rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
}

</style>
