<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
</script>

<template>
  <div>
    <table class="table table-zebra table-compact border w-full rounded-lg">
      <thead class="text-center font-JakartaSans text-sm font-bold">
        <tr>
          <th class="relative">
            <span class="flex justify-center">TLK</span>
            <button class="absolute right-0 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Cross/Hari</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-center">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-[#F5F5F5]">
        <tr class="font-JakartaSans font-normal text-sm">
          <td>A</td>
          <td></td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="font-JakartaSans font-normal text-sm">
          <td>B</td>
          <td></td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="font-JakartaSans font-normal text-sm">
          <td>C</td>
          <td></td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="font-JakartaSans font-normal text-sm">
          <td>D</td>
          <td></td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="font-JakartaSans font-normal text-sm">
          <td>E</td>
          <td></td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
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
