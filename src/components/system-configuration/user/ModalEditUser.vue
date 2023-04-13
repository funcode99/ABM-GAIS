<script setup>
    import editicon from "@/assets/navbar/edit_icon.svg";
    import iconClose from "@/assets/navbar/icon_close.svg";
</script>

<template>
    
    <label for="edit-user-modal" class="cursor-pointer">
        <img :src="editicon" class="w-6 h-6" />
    </label>

    <input type="checkbox" id="edit-user-modal" class="modal-toggle" />

    <div class="modal">
      
      <div class="modal-box relative">
        
        <nav class="sticky w-full top-0 z-50 bg-white py-4 flex justify-between">
            <p class="font-JakartaSans text-2xl font-semibold">Edit User</p>
            <label for="edit-user-modal" class="cursor-pointer">
                <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
            </label>
        </nav>
        <!-- <div className="divider m-0 pt-[-8px]"></div> -->

        <form class="px-3">
            <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                        >Name<span class="text-red">*</span></label
                    >
                    <input
                        type="text"
                        id="name"
                        placeholder="Employee Name"
                        class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
                        required
                    />
            </div>
            <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 font-JakartaSans font-medium text-sm text-left">
                        User Role
                        <span class="text-red">*</span>
                    </label>
                <div class="flex flex-wrap gap-2">
                        <div class="flex gap-1">
                            <input type="checkbox" name="Administrator" id="">
                            <label for="">Administrator</label>
                        </div>
                        <div class="flex gap-1">
                            <input type="checkbox" name="Super Admin" id="">
                            <label for="">Super Admin</label>
                        </div>
                        <div class="flex gap-1">
                            <input type="checkbox" name="Admin" id="">
                            <label for="">Admin</label>
                        </div>
                        <div class="flex gap-1">
                            <input type="checkbox" name="Receptionist" id="">
                            <label for="">Receptionist</label>
                        </div>
                        <div class="flex gap-1">
                            <input type="checkbox" name="Employee" id="">
                            <label for="">Employee</label>
                        </div>
                </div>
            </div>
            <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 font-JakartaSans font-medium text-sm text-left"
                        >Approval Authorities<span class="text-red">*</span></label
                    >
                    <div class="flex justify-between">
                        <div class="flex items-center gap-2">
                            <input type="checkbox" name="PM" id="">
                            <label for="">PM</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" name="GA" id="">
                            <label for="">GA</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" name="HR" id="">
                            <label for="">HR</label>
                        </div>
                        <div class="flex items-center gap-2">                
                            <input type="checkbox" name="Finance / Accounting" id="">
                            <label class="" for="">Finance / Accounting</label>
                        </div>
                    </div>
            </div>
        </form>

        <div class="bg-white py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <label
              for="edit-user-modal"
              class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
              >Cancel</label
            >
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
            >
              Save
            </button>
          </div>
        </div>

      </div>

    </div>

</template>