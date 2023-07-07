<script setup>
import { computed, ref } from "vue"
import { Modal } from "usemodal-vue3"

import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: false,
})

const form = ref({})

const dialog = computed(() => {})

const setForm = () => {}

const saveForm = () => {}
</script>

<template>
  <Modal
    :visible="modelValue"
    @onUnVisible="emits('update:modelValue', $event)"
    @update:visible="emits('update:modelValue', $event)"
  >
    <modalHeader
      @closeVisibility="modelValue = false"
      title="Formulir Pemeriksaan Kendaraan Harian"
    />
    <main class="overflow-y-scroll">
      <form @submit.prevent="saveForm"></form>
    </main>
  </Modal>
</template>
