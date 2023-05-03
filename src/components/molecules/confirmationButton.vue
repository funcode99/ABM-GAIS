<script setup>

</script>

<template>

<div class="bg-white py-4 px-2 z-50 fixed left-0 right-0 bottom-3 scale">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
              <button
                  @click="$emit('cancelClick')"
                  class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</button
              >
              <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
              >
              Save
              </button>
          </div>
</div>

</template>