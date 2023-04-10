<script setup>
import Layout from "../../components/layout/Layout.vue";
import iconUser from "../../assets/navbar/icon_user.svg";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-JakartaSans font-semibold text-2xl">John Mane</p>

      <div class="flex justify-center py-4">
        <div class="avatar">
          <div class="w-[104px] h-[100px] rounded-full bg-[#D9D9D9]">
            <div class="flex justify-center items-center py-1">
              <button>
                <img :src="iconUser" class="w-[138px] h-[124px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
            placeholder="Employee Name"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="sn"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >SN<span class="text-red">*</span></label
          >
          <input
            type="text"
            id="sn"
            placeholder="Employee SN"
            class="input input-bordered input-accent w-full font-JakartaSans font-semibold text-base"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="gender"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Gender<span class="text-red">*</span></label
          >
          <select class="select select-accent w-40">
            <option disabled selected>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="phone_number"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Phone Number<span class="text-red">*</span></label
          >
          <input
            type="number"
            id="phone_number"
            placeholder="Phone Number"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
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
