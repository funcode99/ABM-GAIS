<script setup>
import Layout from "@/components/layout/Layout.vue";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-JakartaSans font-semibold text-2xl">PT Tunas Inti Abadi</p>

      <form class="py-4">
        <div class="flex flex-wrap justify-between lg:mx-40 md:mx-0">
          <div class="mb-6">
            <label
              for="code"
              class="block mb-2 font-Poppins font-medium text-sm"
              >Code<span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="code"
              placeholder="Code"
              class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
            />
          </div>

          <div class="mb-6">
            <label
              for="parentcompany"
              class="block mb-2 font-Poppins font-medium text-sm"
              id="parentcompany"
              >Parent Company<span class="text-red-600">*</span></label
            >
            <select class="select select-accent w-40">
              <option disabled selected>Select Company</option>
              <option>Company A</option>
              <option>Company B</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap justify-between lg:mx-40 md:mx-0">
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 font-Poppins font-medium text-sm"
              >Name<span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="sn"
              placeholder="Name Company"
              class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
            />
          </div>
        </div>
      </form>

      <div class="flex justify-start pb-4 px-8 gap-4">
        <button
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[75px] h-[30px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
        >
          Cancel
        </button>
        <button
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[75px] h-[30px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
