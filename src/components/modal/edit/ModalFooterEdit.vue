<script setup>

</script>

<template>
    <div class="sticky bottom-0 bg-white">

          <div class="flex justify-end gap-4 mr-6">

            <label
              @click="$emit('closeEdit')"
              for="modal-edit-pagu"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
              >
              Cancel
            </label>

            <button
              type="submit"
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green">
              Save
            </button>

          </div>
          
    </div>
</template>