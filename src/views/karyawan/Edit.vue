<script setup>
import Layout from "../../components/layout/Layout.vue";
import iconUser from "../../assets/navbar/icon_user.svg";
</script>

<template>
  <Layout />
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <p class="font-Poppins font-semibold text-2xl">John Mane</p>

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
          <label for="name" class="block mb-2 font-Poppins font-medium text-sm"
            >Nama<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="Nama Karyawan"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
          />
        </div>
        <div class="mb-6">
          <label for="name" class="block mb-2 font-Poppins font-medium text-sm"
            >SN<span class="text-red-600">*</span></label
          >
          <input
            type="text"
            id="sn"
            placeholder="SN Karyawan"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
          />
        </div>
        <div class="mb-6">
          <label for="sex" class="block mb-2 font-Poppins font-medium text-sm"
            >Sex<span class="text-red-600">*</span></label
          >
          <select class="select select-accent w-40">
            <option disabled selected>Select Sex</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="mb-6">
          <label for="name" class="block mb-2 font-Poppins font-medium text-sm"
            >Phone Number<span class="text-red-600">*</span></label
          >
          <input
            type="number"
            id="phone_number"
            placeholder="Phone Number"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
          />
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 font-Poppins font-medium text-sm"
            >Email<span class="text-red-600">*</span></label
          >
          <input
            type="email"
            id="email"
            placeholder="Email"
            class="input input-bordered input-accent w-full font-Montserrat font-semibold text-base"
          />
        </div>
      </form>
    </div>
  </div>
</template>
