<script setup>
    
</script>

<template>

    <Modal type="clean" v-model:visible="isVisible" v-model:title='type' v-model:offsetTop="modalPaddingHeight">

    <!-- sticky top-0 -->
    <nav class="z-50 bg-white py-4 px-2 flex justify-between scale">
        <p class="font-JakartaSans text-2xl font-semibold">Edit User</p>
        <button @click="isVisible = false" class="cursor-pointer">
            <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </button>
    </nav>

    <!-- pb-28 -->
    <div class="px-3 text-left modal-box-inner">

    <div class="mb-6">
    <span>Employee?<span class="text-red-star">*</span></span>
    <div class="flex gap-2 pt-2">
        <div class="flex gap-1">
        <!-- fill the same name value for individual select -->
        <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]">
        <label for="">Yes</label>
        </div>
        <div class="flex gap-1">
        <input type="radio" name="employee" id="" class="border border-black w-[26px] h-[26px]">
        <label for="">No</label>
        </div>
    </div>
    </div>

    <div class="mb-6">
        <label class="block mb-2 font-JakartaSans font-medium text-sm">
                Username<span class="text-red">*</span>
        </label>
        <input
            type="text"
            placeholder="Username"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
        />
    </div>

    <div class="mb-6">
    <label
        class="block mb-2 font-JakartaSans font-medium text-sm"
        >Passwords<span class="text-red">*</span></label
    >
    <input
        type="password"
        placeholder="Passwords"
        class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
        required
    />
    </div>

    <div class="mb-6 flex flex-col text-left justify-start">
    <span
        for="company"
        class="block mb-2 font-JakartaSans font-medium text-sm"
        id="company"
        >User Role<span class="text-red">*</span></span
    >
    <select class="select select-accent w-full" required>
        <option disabled selected hidden>Role</option>
        <option>Administrator</option>
        <option>Super Admin</option>
        <option>Admin</option>
        <option>Receptionist</option>
        <option>Employee</option>
        <option>Driver</option>
    </select>
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

    <div class="mb-6">
    <label
        class="block mb-2 font-JakartaSans font-medium text-sm"
        >Email<span class="text-red">*</span></label
    >
    <input
        type="text"
        placeholder="Email"
        class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
        required
    />
    </div>

    </div>

    <!-- fixed bottom-0 left-6 right-6 -->
    <nav class="bg-white py-4 px-2 z-50 fixed left-0 right-0 bottom-3 scale">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
            <button
                @click="isVisible = false"
                class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
            >Cancel</button
            >
            <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
            >
            Save
            </button>
        </div>
    </nav>

    </Modal>

</template>