<script setup>
    import iconClose from "@/assets/navbar/icon_close.svg";
    import deleteicon from "@/assets/navbar/delete_icon.svg";
    import alertImage from '@/assets/Danger.png'

    import { ref } from 'vue'
    import { Modal } from 'usemodal-vue3'

    let isVisible = ref(false)
    let type = ''

</script>

<template class="font-JakartaSans">

  <button @click="isVisible = !isVisible">
    <img :src=deleteicon alt="">
  </button>

  <!-- harus ada div biar keliatan isi modalnya -->
  <Modal v-model:visible="isVisible" v-model:title='type'>

    <div class="px-5 py-5 flex flex-col justify-evenly">

      <div class="flex justify-end cursor-pointer">
        <img :src="iconClose" alt="" @click="isVisible = false">
      </div>
  
      <div class="content">
        <div class="flex justify-center my-10">
                <img :src="alertImage" class="max-w-[104px]" alt="">
        </div>
    
        <div class="flex flex-col items-center gap-6 font-medium text-left whitespace-normal">
                <h1 class="text-3xl">Are you sure want to delete this?</h1>
                <h1>This will delete this data permanently, You cannot undo this action.</h1>
        </div>
      </div>

      <div class="flex flex-wrap-reverse sm:flex-row items-center justify-center sm:justify-end gap-x-4 gap-y-2 px-4 fixed bottom-8 right-5 whitespace-normal">
            <button @click="isVisible = false" class="border border-blue text-blue rounded-lg px-4 py-3 w-[141px] h-[44px]">
              Cancel
            </button>
            <button @click="isVisible = false">
              <button @click="$emit('confirmDelete')" class="bg-red text-white rounded-lg px-4 py-3 w-[141px] h-[44px]">
                Yes
              </button>
            </button>
      </div>
      
    </div>

  </Modal>

</template>

<style scoped>

</style>
