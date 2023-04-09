<script setup>
import editicon from "../../assets/navbar/edit_icon.svg";
import deleteicon from "../../assets/navbar/delete_icon.svg";
import arrowicon from "../../assets/navbar/icon_arrow.svg";
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="table-zebra table-compact w-full border border-black rounded-full"
    >
      <thead class="bg-white text-center font-Montserrat text-sm font-bold">
        <tr class="grid grid-cols-7">
          <th class="flex justify-between items-center">
            <span>No</span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-between items-center">
            <span>SN</span>
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
            <span> Sex </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-between items-center">
            <span> Email </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-between items-center">
            <span> Phone Number </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="justify-center">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-[#F5F5F5]">
        <tr class="grid grid-cols-7">
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
            John Mane
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            Male
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            Johnm@gmail.com
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
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
        <tr class="grid grid-cols-7">
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
            Mae X
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            Female
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            maex@gmail.com
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
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
        <tr class="grid grid-cols-7">
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
            Nina Max
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            Female
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
          >
            ninam@gmail.com
          </th>
          <th
            class="flex justify-start font-Montserrat text-center text-sm font-normal"
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
