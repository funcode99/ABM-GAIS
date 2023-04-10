<script setup>
import editicon from "../../assets/navbar/edit_icon.svg";
import deleteicon from "../../assets/navbar/delete_icon.svg";
import arrowicon from "../../assets/navbar/icon_arrow.svg";
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="table table-zebra table-compact border w-full border-black rounded-full"
    >
      <thead class="bg-white text-center font-Montserrat text-sm font-bold">
        <tr class="">
          <th class="relative">
            <span class="flex justify-center">No</span>
            <button class="absolute right-0 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">SN</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Name</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Gender</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center"> Email </span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Phone Number</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-center">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-[#F5F5F5]">

        <tr>
          <th
          >
            1
          </th>
          <th
            
          >
            2382193892
          </th>
          <th
            
          >
            John Mane
          </th>
          <th
            
          >
            Male
          </th>
          <th
            
          >
            Johnm@gmail.com
          </th>
          <th
            
          >
            08723236283112
          </th>
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
          <th
            
          >
            2
          </th>
          <th
            
          >
            2349893929
          </th>
          <th
            
          >
            Mae X
          </th>
          <th
            
          >
            Female
          </th>
          <th
            
          >
            maex@gmail.com
          </th>
          <th
            
          >
            0872323298929
          </th>
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
          <th
          
          >
            3
          </th>
          <th
            
          >
            2344784787
          </th>
          <th
            
          >
            Nina Max
          </th>
          <th
            
          >
            Female
          </th>
          <th
            
          >
            ninam@gmail.com
          </th>
          <th
            
          >
            0893283728322
          </th>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
            <button>
              <img :src="deleteicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

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

  /* th button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  } */

</style>