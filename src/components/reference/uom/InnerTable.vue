<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import addicon from "@/assets/icon_add_square.svg";
</script>

<template>
  <div>
    <table class="table table-zebra table-compact border w-full rounded-lg">
      <thead class="text-center font-JakartaSans text-sm font-bold">
        <tr>
          <th class="relative">
            <span class="flex justify-center">Unit of Measure</span>
          </th>
          <th class="relative">
            <span class="flex justify-center">Amount</span>
          </th>
          <th class="flex justify-center">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-[#F5F5F5]">
        <tr class="font-JakartaSans font-normal text-sm">
          <td>Units</td>
          <td>1.00</td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>

            <button>
              <img :src="deleteicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="font-JakartaSans font-normal text-sm">
          <td>Dozens</td>
          <td>12.00</td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button>
              <img :src="editicon" class="w-6 h-6" />
            </button>

            <button>
              <img :src="deleteicon" class="w-6 h-6" />
            </button>
          </td>
        </tr>

        <tr class="font-JakartaSans font-normal text-sm">
          <td></td>
          <td></td>
          <td class="flex flex-wrap gap-4 justify-center">
            <button class="ml-10">
              <img :src="addicon" class="w-6 h-6" />
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
