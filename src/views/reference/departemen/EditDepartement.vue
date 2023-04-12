<script setup>
import Layout from "@/components/layout/Layout.vue";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-Poppins font-semibold text-2xl">IT</p>

      <div class="flex justify-start pb-4 gap-4">
        <button
          class="btn text-blue text-base font-JakartaSans font-bold capitalize w-[75px] h-[30px] bg-white border-blue hover:bg-blue hover:border-blue hover:text-white"
        >
          Edit
        </button>
        <button
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[75px] h-[30px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
        >
          Save
        </button>
      </div>

      <form>
        <div class="flex flex-wrap justify-between lg:px-[220px] md:px-0">
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="name"
              placeholder="Name"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              id="company"
              >Company<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40" required>
              <option disabled selected>Select Company</option>
              <option>Company A</option>
              <option>Company B</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap justify-between lg:px-[220px] md:px-0">
          <div class="mb-6">
            <label
              for="cost_center"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Cost Center<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="cost_center"
              placeholder="Cost Center"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="division"
              id="division"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Division<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40" required>
              <option disabled selected>Select Division</option>
              <option>Division A</option>
              <option>Division B</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap justify-between lg:px-[220px] md:px-0">
          <div class="mb-6">
            <label
              for="gl_account"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >GL Account<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="gl_account"
              placeholder="GL Account"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="dep_head"
              id="dep_head"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Departement Head<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40" required>
              <option disabled selected>Select</option>
              <option>Departement Head A</option>
              <option>Departement Head B</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap justify-start lg:px-[220px] md:px-0">
          <div class="mb-6">
            <label
              for="status"
              id="status"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Status<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40" required>
              <option disabled selected>Status</option>
              <option>Active</option>
              <option>Non Active</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
