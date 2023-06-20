<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

// import ModalAdd from "@/components/reference/employee/ModalAdd.vue";
// import ModalEdit from "@/components/reference/employee/ModalEdit.vue";
import ModalView from "@/components/reference/employee/ModalView.vue";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";

import Api from "@/utils/Api";

import { Workbook } from "exceljs";

import { ref, onBeforeMount, onMounted, computed } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
const sidebar = useSidebarStore();

//for sort & search
const search = ref("");
let sortedData = ref([]);
const selectedCompany = ref("Company");
let sortedbyASC = true;
let instanceArray = [];
let Company = ref("");
let lengthCounter = 0;
let sortAscending = true;
let sortedDataReactive = computed(() => sortedData.value);
const showFullText = ref({});
let checkList = false;

//for paginations
let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);

//for paginations
const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
};

//for filter & reset button
const filterDataByCompany = () => {
  if (selectedCompany.value === "Company") {
    sortedData.value = instanceArray;
  } else {
    sortedData.value = instanceArray.filter(
      (item) => item.id_company === selectedCompany.value
    );
  }
};

//for filter & reset button
const resetData = () => {
  sortedData.value = instanceArray;
  selectedCompany.value = "Company";
};

//for check & uncheck all
// const selectAll = (checkValue) => {
//   const checkList = checkValue;
//   if (checkList == true) {
//     let check = document.getElementsByName("checks");
//     for (let i = 0; i < check.length; i++) {
//       if (check[i].type == "checkbox") check[i].checked = true;
//     }
//   } else {
//     let check = document.getElementsByName("checks");
//     for (let i = 0; i < check.length; i++) {
//       if (check[i].type == "checkbox") check[i].checked = false;
//     }
//   }
// };

//for tablehead
const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "SN", jsonData: "sn_employee" },
  { Id: 3, title: "Name", jsonData: "employee_name" },
  { Id: 4, title: "Gender", jsonData: "jenkel" },
  { Id: 5, title: "Email", jsonData: "email" },
  { Id: 6, title: "Phone Number", jsonData: "phone_number" },
  { Id: 7, title: "Actions" },
];

//for sort
const sortList = (sortBy) => {
  if (sortedbyASC) {
    sortedData.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
    sortedbyASC = false;
  } else {
    sortedData.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
    sortedbyASC = true;
  }
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchEmployee();
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
});

//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.sn_employee.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.employee_name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.sn_employee.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.employee_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  lengthCounter = sortedData.value.length;
  onChangePage(1);
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
});

// get all employee
const fetchEmployee = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/employee/get/");
  // console.log("ini data employe" + JSON.stringify(res.data.data.data));
  instanceArray = res.data.data;
  // console.log("ini data instance array" + JSON.stringify(instanceArray));
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
};

//delete employee
// const deleteBrand = async (id) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;

//   Swal.fire({
//     title:
//       "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
//     html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
//     iconHtml: `<img src="${icondanger}" />`,
//     showCloseButton: true,
//     closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
//     showCancelButton: true,
//     buttonsStyling: false,
//     cancelButtonText: "Cancel",
//     customClass: {
//       cancelButton: "swal-cancel-button",
//       confirmButton: "swal-confirm-button",
//     },
//     reverseButtons: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Api.delete(`/employee/delete_data/${id}`).then((res) => {
//         Swal.fire({
//           title: "Successfully",
//           text: "Employee has been deleted.",
//           icon: "success",
//           showCancelButton: false,
//           confirmButtonColor: "#015289",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         fetchBrand();
//       });
//     } else {
//       return;
//     }
//   });
// };

//for export
const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Employee Data");

  const tableHead = [
    { title: "Nomor" },
    { title: "ID" },
    { title: "SN" },
    { title: "Name" },
    { title: "Gender" },
    { title: "Email" },
    { title: "Phone" },
  ];

  // Menambahkan header kolom
  tableHead.forEach((column, index) => {
    worksheet.getCell(1, index + 1).value = column.title;
  });

  // Menambahkan data ke baris-baris selanjutnya
  sortedDataReactive.value.forEach((data, rowIndex) => {
    worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1;
    worksheet.getCell(rowIndex + 2, 2).value = data.id;
    worksheet.getCell(rowIndex + 2, 3).value = data.sn_employee;
    worksheet.getCell(rowIndex + 2, 4).value = data.employee_name;
    worksheet.getCell(rowIndex + 2, 5).value = data.jenkel;
    worksheet.getCell(rowIndex + 2, 6).value = data.email;
    worksheet.getCell(rowIndex + 2, 7).value = data.phone_number;
  });

  // Menyimpan workbook menjadi file Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  });
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <tableContainer>
        <tableTop>
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Employee
            </p>
            <div class="flex gap-4">
              <!-- <ModalAdd @unlockScrollbar="lockScrollbar = !lockScrollbar" /> -->
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                @click="exportToExcel"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT & SEARCH -->
          <div
            class="grid grid-flow-col auto-cols-max justify-between items-center mx-4"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Company
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedCompany"
                >
                  <option disabled selected>Company</option>
                  <option v-for="company in Company" :key="company.id">
                    {{ company.company_name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-wrap gap-4 items-center pt-6">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="filterDataByCompany"
                >
                  <span>
                    <img :src="icon_filter" class="w-5 h-5" />
                  </span>
                  Filter
                </button>
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
                  @click="resetData"
                >
                  <span>
                    <img :src="icon_reset" class="w-5 h-5" />
                  </span>
                  Reset
                </button>
              </div>
            </div>

            <div class="pt-6 flex md:mx-0">
              <label class="relative block">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </span>
                <input
                  class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search..."
                  type="text"
                  name="search"
                  v-model="search"
                  @keyup="filteredItems(search)"
                />
              </label>
            </div>
          </div>

          <!-- SHOWING -->
          <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
            <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
            <select
              class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
              v-model="pageMultiplier"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </div>

          <!-- TABLE -->
          <tableData v-if="sortedData.length > 0">
            <thead class="text-center font-JakartaSans text-sm font-bold h-10">
              <tr>
                <!-- <th>
                  <div class="flex justify-center">
                    <input
                      type="checkbox"
                      name="checked"
                      @click="selectAll((checkList = !checkList))"
                    />
                  </div>
                </th> -->

                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                  @click="sortList(`${data.jsonData}`)"
                >
                  <span class="flex justify-center items-center gap-1">
                    <p class="font-JakartaSans font-bold text-sm">
                      {{ data.title }}
                    </p>
                    <button v-if="data.jsonData" class="ml-2">
                      <img :src="arrowicon" class="w-[9px] h-3" />
                    </button>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                class="font-JakartaSans font-normal text-sm"
                v-for="data in sortedData.slice(
                  paginateIndex * pageMultiplierReactive,
                  (paginateIndex + 1) * pageMultiplierReactive
                )"
                :key="data.id"
              >
                <!-- <td style="width: 5%">
                  <input type="checkbox" name="checks" />
                </td> -->
                <td style="width: 5%">{{ data.no }}</td>
                <td style="width: 10%">{{ data.sn_employee }}</td>
                <td style="width: 40%">
                  <span
                    :class="[
                      'readmore-text',
                      showFullText[data.id] ? 'show-full' : '',
                    ]"
                  >
                    {{ data.employee_name }}
                  </span>
                </td>
                <td style="width: 5%">{{ data.jenkel }}</td>
                <td style="width: 10%">{{ data.email }}</td>
                <td style="width: 10%">{{ data.phone_number }}</td>
                <td class="flex flex-wrap gap-4 justify-center">
                  <ModalView
                    :formContent="[
                      data.foto_path,
                      data.employee_name,
                      data.email,
                      data.sn_employee,
                      data.start_date,
                      data.nik,
                      data.end_date,
                      data.dob,
                      data.company_name,
                      data.jenkel,
                      data.site_name,
                      data.departement_name,
                      data.band_job_name,
                      data.phone_number,
                      data.cost_center_name,
                      data.sn_atasan_1,
                      data.sn_atasan_2,
                    ]"
                  />
                  <!-- <ModalEdit
                    @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                  />
                  <button>
                    <img :src="deleteicon" class="w-6 h-6" />
                  </button> -->
                </td>
              </tr>
            </tbody>
          </tableData>

          <div v-else>
            <tableData>
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <!-- <input
                        type="checkbox"
                        name="checked"
                        @click="selectAll((checkList = !checkList))"
                      /> -->
                    </div>
                  </th>

                  <th
                    v-for="data in tableHead"
                    :key="data.Id"
                    class="overflow-x-hidden cursor-pointer"
                    @click="sortList(`${data.jsonData}`)"
                  >
                    <div class="flex justify-center items-center">
                      <p class="font-JakartaSans font-bold text-sm">
                        {{ data.title }}
                      </p>
                      <button v-if="data.jsonData" class="ml-2">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colspan="8"
                    class="text-center font-JakartaSans text-base font-medium"
                  >
                    Data not Found
                  </td>
                </tr>
              </tbody>
            </tableData>
          </div>

          <!-- PAGINATION -->
          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
          >
            <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
              Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
              {{ Math.min(showingValue * pageMultiplier, sortedData.length) }}
              of {{ sortedData.length }} entries
            </p>
            <vue-awesome-paginate
              :total-items="sortedData.length"
              :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-ending-buttons="true"
            />
          </div>
        </tableTop>
      </tableContainer>

      <Footer />
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

.this {
  overflow-x: hidden;
}

.readmore-text {
  display: inline-block;
  max-width: 200px; /* Atur sesuai kebutuhan */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: max-width 0.3s ease-in-out;
}

.readmore-text:hover {
  max-width: 400px;
  white-space: nowrap;
  word-break: break-word;
}
</style>
