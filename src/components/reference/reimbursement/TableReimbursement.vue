<script setup>
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
</script>

<template>
  <div>
    <table class="table table-zebra table-compact w-full rounded-lg">
      <thead class="text-center font-JakartaSans text-sm font-bold">
        <tr>
          <th class="relative">
            <label class="flex justify-center">
              <input
                type="checkbox"
                class="checkbox bg-transparent border border-white w-[18px] h-[18px] rounded-sm"
              />
            </label>
          </th>
          <th class="relative">
            <span class="flex justify-center">No</span>
            <button class="absolute right-0 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Reimbursement Type</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Parent Type</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="relative">
            <span class="flex justify-center">Company</span>
            <button class="absolute right-1 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="flex justify-center">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-[#F5F5F5]">
        <tr class="font-JakartaSans font-normal text-sm">
          <td class="relative">
            <label class="flex justify-center">
              <input
                type="checkbox"
                class="checkbox bg-transparent w-[18px] h-[18px] rounded-sm border border-[#015289]"
              />
            </label>
          </td>
          <td>1</td>
          <td>Transportation</td>
          <td>-</td>
          <td>MVC</td>
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
          <td class="relative">
            <label class="flex justify-center">
              <input
                type="checkbox"
                class="checkbox bg-transparent w-[18px] h-[18px] rounded-sm border border-[#015289]"
              />
            </label>
          </td>
          <td>2</td>
          <td>Meals</td>
          <td>-</td>
          <td>PT ABM</td>
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
          <td class="relative">
            <label class="flex justify-center">
              <input
                type="checkbox"
                class="checkbox bg-transparent w-[18px] h-[18px] rounded-sm border border-[#015289]"
              />
            </label>
          </td>
          <td>3</td>
          <td>Train</td>
          <td>Transportation</td>
          <td>PT ABM</td>
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
