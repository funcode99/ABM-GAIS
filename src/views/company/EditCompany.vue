<script setup>
import Layout from "../../components/layout/Layout.vue";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-Poppins font-semibold text-2xl">PT Tunas Inti Abadi</p>

      <div class="card-actions justify-start py-4 gap-4">
        <button
          class="btn text-[#1F7793] text-base font-Poppins font-bold capitalize w-[75px] h-[30px] bg-white border-[#1F7793] hover:bg-[#1F7793] hover:border-white hover:text-white"
        >
          Edit
        </button>
        <button
          class="btn text-white text-base font-Poppins font-bold capitalize w-[75px] h-[30px] border-[#87C556] bg-[#87C556] hover:bg-white hover:text-[#87C556] hover:border-[#87C556]"
        >
          Save
        </button>
      </div>

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
    </div>
  </div>
</template>
