<script setup>
import Layout from "@/components/layout/Layout.vue";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-JakartaSans font-semibold text-2xl">Train</p>

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
        <div class="flex flex-wrap justify-between lg:mx-40 md:mx-0">
          <div class="mb-6">
            <label
              for="name"
              id="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="name"
              placeholder="Name"
              class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            />
          </div>

          <div class="mb-6">
            <label
              for="parentcompany"
              id="parentcompany"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40">
              <option disabled selected>Select Company</option>
              <option>Company A</option>
              <option>Company B</option>
            </select>
          </div>
        </div>

        <div class="flex justify-start lg:mx-40 md:mx-0">
          <div class="mb-6">
            <label
              for="parent_type"
              id="parent_type"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Parent Type<span class="text-red">*</span></label
            >
            <select class="select select-accent w-40">
              <option disabled selected>Parent</option>
              <option>Parent A</option>
              <option>Parent B</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
