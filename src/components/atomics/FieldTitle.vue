<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <label class="block mb-2 font-JakartaSans font-medium text-sm">
    {{ label }}
    <span class="text-red" v-if="mandatory">*</span>
  </label>
</template>
