<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="table-zebra table-compact w-full border border-black rounded-full"
    >
      <thead class="bg-white text-center font-Montserrat text-sm font-bold">
        <tr class="grid grid-cols-5">
          <th class="flex justify-between items-center">
            <span>No</span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-between items-center">
            <span>Code</span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-between items-center">
            <span> Name </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-between items-center">
            <span> Parent Company </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="justify-center">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-[#F5F5F5]">
        <tr class="grid grid-cols-5">
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            1
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            2382193892
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            PT Tunas Inti Abadi
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            MVC
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
        <tr class="grid grid-cols-5">
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            2
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            2349893929
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            PT ABM Investama
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            PT ABM Investama
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
        <tr class="grid grid-cols-5">
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            3
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            2344784787
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            PT Cipta Kridatama
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            MVC
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
