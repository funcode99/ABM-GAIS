<script setup>
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import ModalEdit from "./ModalEdit.vue";

import brandData from "@/utils/Api/reference/branddata";

const selectAll = (checkValue) => {
  const checkList = checkValue;
  if (checkList == true) {
    let check = document.getElementsByName("checks");
    for (let i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") check[i].checked = true;
    }
  } else {
    let check = document.getElementsByName("checks");
    for (let i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") check[i].checked = false;
    }
  }
};

const tableHead = [
  { Id: 1, title: "No" },
  { Id: 2, title: "Brand Name" },
  { Id: 3, title: "Company" },
  { Id: 4, title: "Actions" },
];
</script>

<template>
  <div>
    <table class="table table-zebra table-compact border w-full rounded-lg">
      <thead class="text-center font-JakartaSans text-sm font-bold">
        <tr>
          <th class="relative">
            <div class="flex justify-center">
              <input
                type="checkbox"
                name="checked"
                @click="selectAll((checkList = !checkList))"
              />
            </div>
          </th>

          <th v-for="data in tableHead" :key="data.Id" class="relative">
            <span class="flex justify-center">{{ data.title }}</span>
            <button class="absolute right-2 top-0 bottom-0">
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="bg-[#F5F5F5]">
        <tr
          class="font-JakartaSans font-normal text-sm"
          v-for="data in brandData"
          :key="data.id"
        >
          <td class="relative">
            <input type="checkbox" name="checks" />
          </td>
          <td>{{ data.id }}</td>
          <td>{{ data.brand_name }}</td>
          <td>{{ data.company }}</td>
          <td class="flex flex-wrap gap-4 justify-center">
            <ModalEdit />
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

.table-zebra tbody tr:hover td {
  background-color: rgb(193, 192, 192);
  cursor: pointer;
}
</style>
