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
        <tr>
          <th>
            <span>No</span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th>
            <span>SN</span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th>
            <span> Name </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th>
            <span> Sex </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th>
            <span> Email </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th>
            <span> Phone Number </span>
            <button>
              <img :src="arrowicon" class="w-[9px] h-3" />
            </button>
          </th>
          <th class="justify-center">Actions</th>
        </tr>
      </thead>
      <tbody
        class="font-Montserrat text-center text-sm font-normal bg-[#F5F5F5]"
      >
        <tr>
          <th>1</th>
          <th>2382193892</th>
          <td>John Mane</td>
          <td>Male</td>
          <td>Johnm@gmail.com</td>
          <td>08723236283112</td>
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
          <th>2</th>
          <th>2349893929</th>
          <td>Mae X</td>
          <td>Female</td>
          <td>maex@gmail.com</td>
          <td>0872323298929</td>
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
          <th>3</th>
          <th>2344784787</th>
          <td>Nina Max</td>
          <td>Female</td>
          <td>ninam@gmail.com</td>
          <td>0893283728322</td>
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

<style>
tr {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
}

th {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
