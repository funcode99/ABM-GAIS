<script setup>
import { useRoute } from "vue-router"

const route = useRoute()

defineProps({
  title: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <div>
    <slot>
      <p
        class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
      >
        {{ title || route.meta.title }}
      </p>
    </slot>
  </div>
</template>
