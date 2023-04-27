<script setup>
  import iconClose from "@/assets/navbar/icon_close.svg"
  import editIcon from "@/assets/navbar/edit_icon.svg"

  import { ref } from 'vue'
  import { Modal } from 'usemodal-vue3'

  let isVisible = ref(false)
  let type = '' 
  let modalPaddingHeight = 50

</script>

<template class="font-JakartaSans">
      
  <button @click="isVisible = !isVisible">
    <img :src=editIcon alt="">
  </button>

  <Modal v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">


        <nav class="sticky top-0 z-50 bg-white py-4">
            <button @click="isVisible = false" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </button>
            <p class="font-JakartaSans text-2xl font-semibold">Edit Role</p>
            <div className="divider m-0"></div>
        </nav>

      <form class="mb-3">
        
        <div class="mb-3">
          <span
            
            class="block mb-2 font-JakartaSans font-medium text-sm text-left"
            >
            Role
            <span class="text-red">*</span>
          </span>
          <input
            type="text"
            id="name"
            placeholder="Nama Matrix"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>

      </form>

      <div class="sticky bottom-0 bg-white py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <button
            @click="isVisible = false"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</button
          >
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          >
            Save
          </button>
        </div>
      </div>

  </Modal>

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
