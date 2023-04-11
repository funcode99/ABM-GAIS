<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
</script>

<template>
  <label
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="my-modal-3" class="cursor-pointer absolute right-5 top-5">
        <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
      </label>
      <p class="font-JakartaSans text-2xl font-semibold">New Karyawan</p>
      <div className="divider m-0"></div>
      <div class="flex justify-center py-4">
        <div class="avatar">
          <div class="w-[104px] h-[100px] rounded-full bg-[#D9D9D9]">
            <div class="flex justify-center items-center py-8">
              <button class="w-[37px] h-[37px]">
                <img :src="iconPlus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p
        class="font-JakartaSans font-medium text-sm flex justify-center items-center"
      >
        Foto
      </p>

      <form>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="Employee name"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label for="name" class="block mb-2 font-Poppins font-medium text-sm"
            >SN<span class="text-red">*</span></label
          >
          <input
            type="text"
            id="sn"
            placeholder="Employee SN"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="gender"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Gender<span class="text-red">*</span></label
          >
          <select class="select select-accent w-40" required>
            <option disabled selected>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Phone Number<span class="text-red">*</span></label
          >
          <input
            type="number"
            id="phone_number"
            placeholder="Phone Number"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Email<span class="text-red">*</span></label
          >
          <input
            type="email"
            id="email"
            placeholder="Email"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>
      </form>

      <div class="flex justify-end gap-4">
        <label
          for="my-modal-3"
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
          >Cancel</label
        >
        <button
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
