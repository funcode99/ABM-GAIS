<script setup>
  const emits = defineEmits(['closeEdit'])
</script>

<template>
  <div class="sticky bottom-0 bg-white">
    <div class="flex justify-end gap-4 mr-3">

          <div class="flex justify-end gap-4 mr-3">

            <!-- ngirim emit dengan cara enter, kampret emang, gaboleh type submit emang nih button -->
            <button
              type="button"
              @click="emits('closeEdit')"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >
              Cancel
            </button>

            <button
              type="submit"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green">
              Save
            </button>

          </div>
          
    </div>
  </div>
</template>
