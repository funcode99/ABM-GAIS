<script setup>
import Layout from "../../components/layout/Layout.vue";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-Poppins font-semibold text-2xl">IT</p>

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
        <div class="flex flex-wrap justify-between lg:px-[220px] md:px-0">
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 font-Poppins font-medium text-sm"
              >Name<span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="name"
              placeholder="Name"
              class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="company"
              class="block mb-2 font-Poppins font-medium text-sm"
              >Company<span class="text-red-600">*</span></label
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
              class="block mb-2 font-Poppins font-medium text-sm"
              >Cost Center<span class="text-red-600">*</span></label
            >
            <input
              type="text"
              id="cost_center"
              placeholder="Cost Center"
              class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
              required
            />
          </div>
          <div class="mb-6">
            <label for="sex" class="block mb-2 font-Poppins font-medium text-sm"
              >Division<span class="text-red-600">*</span></label
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
              class="block mb-2 font-Poppins font-medium text-sm"
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
              for="dep_head"
              class="block mb-2 font-Poppins font-medium text-sm"
              >Departement Head<span class="text-red-600">*</span></label
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
              class="block mb-2 font-Poppins font-medium text-sm"
              >Status<span class="text-red-600">*</span></label
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
