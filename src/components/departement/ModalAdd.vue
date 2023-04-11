<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
</script>

<template>
  <label
    for="my-modal-3"
    class="btn btn-success bg-[#87C556] border-none hover:bg-none capitalize text-white font-Poppins text-xs"
    >+ Add New</label
  >

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="my-modal-3" class="cursor-pointer absolute right-5 top-5">
        <img :src="iconClose" class="w-[34px] h-[34px]" />
      </label>
      <p class="font-Poppins text-2xl font-semibold">New Departement</p>
      <div className="divider m-0"></div>
      <form class="py-4">
        <div class="mb-6">
          <label for="code" class="block mb-2 font-Poppins font-medium text-sm"
            >Name<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="Name Departement"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label for="name" class="block mb-2 font-Poppins font-medium text-sm"
            >Cost Center<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="cost"
            placeholder="Cost Center"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label for="name" class="block mb-2 font-Poppins font-medium text-sm"
            >GL Account<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="gl_account"
            placeholder="GL Account"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="status"
            class="block mb-2 font-Poppins font-medium text-sm"
            >Status<span class="text-red-600">*</span></label
          >
          <select class="select select-accent w-40" required>
            <option disabled selected>Status</option>
            <option>Active</option>
            <option>Non Active</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="company"
            class="block mb-2 font-Poppins font-medium text-sm"
            >Company<span class="text-red-600">*</span></label
          >
          <select class="select select-accent w-40" required>
            <option disabled selected>Company</option>
            <option>Company A</option>
            <option>Company B</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="division"
            class="block mb-2 font-Poppins font-medium text-sm"
            >Division<span class="text-red-600">*</span></label
          >
          <select class="select select-accent w-40" required>
            <option disabled selected>Division</option>
            <option>Division A</option>
            <option>Division B</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="departement_head"
            class="block mb-2 font-Poppins font-medium text-sm"
            >Departemen Head<span class="text-red-600">*</span></label
          >
          <select class="select select-accent w-40" required>
            <option disabled selected>Name</option>
            <option>Name A</option>
            <option>Name B</option>
          </select>
        </div>
      </form>

      <div class="flex justify-end gap-4">
        <label
          for="my-modal-3"
          class="cursor-pointer btn text-[#1F7793] text-base font-Poppins font-bold capitalize w-[141px] border-[#1F7793] bg-white hover:bg-[#1F7793] hover:border-[#1F7793] hover:text-white"
          >Cancel</label
        >
        <button
          class="btn text-white text-base font-Poppins font-bold capitalize w-[141px] border-[#1F7793] bg-[#1F7793] hover:bg-white hover:text-[#1F7793] hover:border-[#1F7793]"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
