<script setup>
    import iconClose from "@/assets/navbar/icon_close.svg";
    import deleteicon from "@/assets/navbar/delete_icon.svg";
    import alertImage from '@/assets/Danger.png'
</script>

<template>

<label for="delete-user-modal" class="cursor-pointer">
        <img :src="deleteicon" class="w-6 h-6" />
    </label>

    <input type="checkbox" id="delete-user-modal" class="modal-toggle" />

    <div class="modal overflow-x-hidden">
      
      <!-- disini scrollbar nya -->
      <div class="modal-box relative overflow-x-hidden">
        
        <nav class="sticky top-0 z-50 bg-white py-4 flex justify-between">
        <div></div>
          <label for="delete-user-modal" class="cursor-pointer">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <!-- <div className="divider m-0"></div> -->
        </nav>

        <div class="flex justify-center">
            <div class="flex items-center justify-center w-[100px] h-[100px]">
                <img :src=alertImage class="py-10" alt="alert-image">
            </div>
        </div>
        <div class="flex flex-col gap-3 pt-3 text-left whitespace-normal">
            <h1>Are you sure want to delete this?</h1>
            <h3>This will delete this data permanently, You cannot undo this action.</h3>
        </div>

        <div class="sticky bottom-0 bg-white py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4 sm:gap-4">
            <label
              for="delete-user-modal"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[70px] sm:w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</label
            >
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[70px] sm:w-[141px] bg-[#F04438]"
            >
              Save
            </button>
          </div>
        </div>

      </div>

    </div>

</template>