<script setup>
import { reactive, watch } from "vue"

const emits = defineEmits(["update"])
const props = defineProps({
  value: {
    type: Array,
    default: [],
  },
})

const days = reactive([
  {
    value: 7,
    label: "S",
  },
  {
    value: 1,
    label: "M",
  },
  {
    value: 2,
    label: "T",
  },
  {
    value: 3,
    label: "W",
  },
  {
    value: 4,
    label: "T",
  },
  {
    value: 5,
    label: "F",
  },
  {
    value: 6,
    label: "S",
  },
])

watch(props.value, () => {
  days.forEach((item) => {
    const isSelected = props.value.includes(item.value)
    item.selected = isSelected ? true : false
  })
})
</script>

<template>
  <div class="flex gap-3 p-3">
    <div v-for="day in days" :key="day.value">
      <button
        class="badge h-6 w-6 p-3 text-black"
        :class="day.selected ? 'bg-primary text-white' : 'bg-slate-300'"
        @click="
          () => {
            day.selected = day.selected ? false : true
            emits('update', days)
          }
        "
      >
        {{ day.label }}
      </button>
    </div>
  </div>
</template>
