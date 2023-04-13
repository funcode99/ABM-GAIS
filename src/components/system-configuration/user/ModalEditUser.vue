<script setup>
    import editicon from "@/assets/navbar/edit_icon.svg";
</script>

<template>
    
    <label for="my-modal-2" class="cursor-pointer">
        <img :src="editicon" class="w-6 h-6" />
    </label>

    <input type="checkbox" id="my-modal-2" class="modal-toggle" />

    <div class="modal">
      
      <div class="modal-box relative">
        
        <nav class="sticky top-0 z-50 bg-white py-4">
          <label for="my-modal-2" class="cursor-pointer absolute right-0">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
          </label>
          <p class="font-JakartaSans text-2xl font-semibold">Edit User</p>
          <div className="divider m-0"></div>
        </nav>

        <form class="px-3">
            <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 font-JakartaSans font-medium text-sm"
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
                        class="block mb-2 font-JakartaSans font-medium text-sm"
                        >User Role<span class="text-red">*</span></label
                    >
                    <div class="flex gap-2">
                        <input type="checkbox" name="Administrator" id="">
                        <label for="">Administrator</label>
                        <input type="checkbox" name="Super Admin" id="">
                        <label for="">Super Admin</label>
                        <input type="checkbox" name="Admin" id="">
                        <label for="">Admin</label>
                        <input type="checkbox" name="Receptionist" id="">
                        <label for="">Receptionist</label>
                        <input type="checkbox" name="Employee" id="">
                        <label for="">Employee</label>
                    </div>
            </div>
            <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2 font-JakartaSans font-medium text-sm"
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

        <div class=" bg-white py-4">
          <div className="divider m-0 pb-4"></div>
          <div class="flex justify-end gap-4">
            <label
              for="my-modal-2"
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