<script setup>
import Layout from "@/components/layout/Layout.vue";
import iconUser from "@/assets/navbar/icon_user.svg";
</script>

<template>
  <Layout />
  <div class="card w-full p-10 bg-base-100">
    
    <div class="card-body">
      <!-- <p class="font-JakartaSans font-semibold text-2xl">John Mane</p> -->
      <form class="mb-6 grid grid-cols-2 gap-6">
        <div class="">
          <label
            for="name"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Nama Matrix<span class="text-red">*</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="Employee Name"
            class="input input-bordered input-accent max-w-[316px] font-JakartaSans font-semibold text-base"
            required
          />
        </div>
        <div class="flex items-center">
          <div class="flex flex-col">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">Company<span class="text-red">*</span></label>
            <select name="" id="" class="input input-bordered input-accent w-[163px] font-JakartaSans font-semibold text-base">
              <option disabled selected hidden value="">
                Company
              </option>
              <option value="">
                ABC
              </option>
            </select>
          </div>
       </div>
       <div class="flex items-center">
          <div class="flex flex-col">
            <label class="block mb-2 font-JakartaSans font-medium text-sm">Menu<span class="text-red">*</span></label>
            <select name="" id="" class="input input-bordered input-accent w-[163px] font-JakartaSans font-semibold text-base">
              <option disabled selected hidden value="">
                Settlement
              </option>
              <option value="">
                ABC
              </option>
            </select>
          </div>
       </div>
      </form>
      <h1>Approver Lines <span>*</span></h1>
      <hr class="border border-black">

    <table
      class="table table-zebra table-compact border w-full rounded-lg"
    >

      <thead class="text-center font-Montserrat text-sm font-bold">
        <tr class="">
          <th class="relative">
            <span class="flex justify-center">-</span>
            <!-- <button class="absolute right-0 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button> -->
          </th>
          <th class="relative">
            <span class="flex justify-center">No</span>
            <button class="absolute right-0 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Matrix Name</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Menu</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-center">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-[#F5F5F5]">

        <tr class="text-center">
          <td>
            -
          </td>
          <td
          >
            1
          </td>
          <td
            
          >
            John Mane
          </td>
          <td
            
          >
            Male
          </td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
            <button>
              <img :src="deleteicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="text-center">
          <td>
            -
          </td>
          <td
          >
            2
          </td>
          <td
            
          >
            Mae X
          </td>
          <td
            
          >
            Female
          </td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>

            <button>
              <img :src="deleteicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="text-center">
          <td>
            -
          </td>
          <td
          >
            3
          </td>
          <td
          >
            Nina Max
          </td>
          <td
            
          >
            Female
          </td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
            <button>
              <img :src="deleteicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <!-- <tr v-for="data in dataDummy" :key="data.blogId">
          <td>{{ data.title }}</td>
          <td>{{ data.name }}</td>
        </tr> -->

      </tbody>
      
    </table>

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
