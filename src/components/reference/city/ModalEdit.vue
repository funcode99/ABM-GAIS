<script setup>
import editicon from "@/assets/navbar/edit_icon.svg"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"
import { useFormEditStore } from "@/stores/reference/city/edit-modal.js"

let formEditState = useFormEditStore()
const emits = defineEmits(["unlockScrollbar", "changeCity"])
let isVisible = ref(false)
let modalPaddingHeight = "25vh"
let isAdding = ref(false)

const props = defineProps({
  formContent: Array
})

const cityCode = ref(props.formContent[0])
const cityName = ref(props.formContent[1])

const submitEdit = () => {

  isAdding.value = true

  if (!formEditState.city) {
    formEditState.city = {}; // Inisialisasi objek flight jika belum ada
  }

  formEditState.city.cityCode = cityCode.value
  formEditState.city.cityName = cityName.value

  isVisible.value = false
  emits("changeCity") // Memanggil event 'changeCity'

}

watch(isVisible, () => {
  if(isAdding.value == true) {
    isAdding.value = false
  } else {
    cityCode.value = props.formContent[0]
    cityName.value = props.formContent[1]
  }
})

const inputStylingClass =
  "font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

</script>

<template>

  <button @click="isVisible = !isVisible">
    <img :src="editicon" alt="edit icon" />
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

    <main>

      <modalHeader @closeVisibility="isVisible = false" title="Edit City" />

      <form @submit.prevent="submitEdit" class="pt-4">
        
        <div class="mb-6 text-start w-full px-4">
          <label
            for="city_code"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Code<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="cityCode"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <div class="mb-6 text-start w-full px-4">
          <label
            for="city_name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City Name<span class="text-red">*</span></label
          >
          <input
            @keydown.enter="submitEdit"
            v-model="cityName"
            type="text"
            id="name"
            :class="inputStylingClass"
            required
          />
        </div>

        <modalFooter
          @closeEdit="isVisible = false"
        />

      </form>

    </main>

  </Modal>

</template>

<style scoped>
  :deep(.modal-vue3-content) {
  max-height: 310px !important;
  max-width: 510px !important;
  }
</style>
