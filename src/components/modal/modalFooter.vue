<script setup>
const emits = defineEmits(["closeEdit"])
</script>

<template>
  <div class="sticky bottom-0 bg-white">
    <div class="flex justify-end gap-4 mr-3">
      <div class="flex justify-end gap-4 mr-3">
        <!-- ngirim emit dengan cara enter, kampret emang, gaboleh type submit emang nih button -->
        <button
          type="button"
          @click="emits('closeEdit')"
          class="btn text-primary text-base font-JakartaSans font-bold capitalize w-[141px] border-secondary bg-white hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-secondary border-secondary"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
