<script setup>
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import editicon from "@/assets/navbar/edit_icon.svg";

import travellerdata from "@/utils/Api/request-trip/travellerdata.js";

//for tablehead
const tableHead = [
  { Id: 1, title: "Name", jsonData: "name" },
  { Id: 2, title: "SN", jsonData: "sn" },
  { Id: 3, title: "Gender", jsonData: "gender" },
  { Id: 4, title: "Contact No", jsonData: "contact" },
  { Id: 5, title: "Departement", jsonData: "department" },
  { Id: 6, title: "Company", jsonData: "company" },
  { Id: 7, title: "Type", jsonData: "type" },
  { Id: 8, title: "Max Hotel Fare", jsonData: "maxhotelfare" },
  { Id: 9, title: "Actions" },
];
</script>

<template>
  <div class="bg-white rounded-b-xl box-border block overflow-x-hidden">
    <div class="block overflow-x-auto">
      <table
        class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
      >
        <thead class="text-center font-JakartaSans text-sm font-bold h-10">
          <tr>
            <th
              v-for="data in tableHead"
              :key="data.Id"
              class="overflow-x-hidden cursor-pointer"
              @click="sortList(`${data.jsonData}`)"
            >
              <span class="flex justify-center items-center gap-1">
                {{ data.title }}
                <button>
                  <img :src="arrowicon" class="w-[9px] h-3" />
                </button>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="font-JakartaSans font-normal text-sm"
            v-for="data in travellerdata"
            :key="data.no"
          >
            <td>{{ data.name }}</td>
            <td>{{ data.sn }}</td>
            <td>{{ data.gender }}</td>
            <td>{{ data.contact }}</td>
            <td>{{ data.department }}</td>
            <td>{{ data.company }}</td>
            <td>{{ data.type }}</td>
            <td>{{ data.maxhotelfare }}</td>
            <td class="flex flex-wrap gap-2 justify-center">
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
