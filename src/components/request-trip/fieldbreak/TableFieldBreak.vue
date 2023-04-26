<script setup>
import deleteicon from "@/assets/navbar/delete_icon.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import fieldbreakdata from "@/utils/Api/request-trip/fieldbreakdata.js";

//for check & uncheck all
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

//for tablehead
const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Created Date", jsonData: "created_date" },
  { Id: 3, title: "Request No", jsonData: "request_no" },
  { Id: 4, title: "Requestor", jsonData: "requestor" },
  { Id: 5, title: "Purpose of Trip", jsonData: "purpose_of_trip" },
  { Id: 6, title: "Status", jsonData: "Status" },
  { Id: 7, title: "Actions" },
];
</script>

<template>
  <div
    class="px-4 py-2 rounded-b-xl box-border block"
  >
    <div class="block overflow-x-auto">
      <table
        class="table table-zebra table-compact border w-screen h-full rounded-lg"
      >
        <thead class="text-center font-JakartaSans text-sm font-bold h-10">
          <tr>
            <th>
              <div class="flex justify-center">
                <input
                  type="checkbox"
                  name="checked"
                  @click="selectAll((checkList = !checkList))"
                />
              </div>
            </th>

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
            v-for="data in fieldbreakdata"
            :key="data.no"
          >
            <td>
              <input type="checkbox" name="checks" />
            </td>
            <td>{{ data.no }}</td>
            <td>{{ data.created_date }}</td>
            <td>{{ data.request_no }}</td>
            <td>{{ data.requestor }}</td>
            <td>{{ data.purpose_of_trip }}</td>
            <td>{{ data.Status }}</td>
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
