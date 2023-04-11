<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import dataDummy from '@/utils/Api/data.js'
</script>

<template>
  <div class="">
    <table
      class="table table-zebra table-compact border w-full rounded-lg"
    >

      <thead class="text-center font-Montserrat text-sm font-bold">
        <tr class="">
          <th class="relative">
            <span class="flex justify-center">No</span>
            <button class="absolute right-0 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Username</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Approval Authorities</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-center">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-[#F5F5F5]">

        <tr>
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

        <tr>
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

        <tr>
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
</template>

<style scoped>
  th {
    padding: 2px;
    text-align: left;
    position: relative;
  }

  tr td {
    text-align: center;
    white-space: nowrap;
  }

  tr th {
    background-color: #015289;
    text-transform: capitalize;
    color: white;
  }

</style>