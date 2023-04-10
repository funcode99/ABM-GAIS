<script setup>
import Layout from "../../components/layout/Layout.vue";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-JakartaSans font-semibold text-2xl">Economy</p>

      <form>
        <div class="flex flex-wrap justify-between lg:mx-40 md:mx-0">
          <div class="mb-6">
            <label
              for="max_hotel"
              id="max_hotel"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Max Hotel Fare<span class="text-red">*</span></label
            >
            <input
              type="text"
              id="max_hotel"
              placeholder="Max Hotel Fare"
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
      </form>
    </div>

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
</template>
