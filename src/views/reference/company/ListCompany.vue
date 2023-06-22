<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import ModalAdd from "@/components/reference/company/ModalAdd.vue";
import ModalEdit from "@/components/reference/company/ModalEdit.vue";
import ModalView from "@/components/reference/company/ModalView.vue";
import ModalAddGrupCompany from "@/components/reference/company/GroupCompany/ModalAddGrupCompany.vue";
import ModalEditGrupCompany from "@/components/reference/company/GroupCompany/ModalEditGrupCompany.vue";

import fetchVendorUtils from "@/utils/Fetch/Reference/fetchVendorFlightTrip";
import fetchGrupCompanyUtils from "@/utils/Fetch/Reference/fetchGrupCompany";

import tableContainer from "@/components/table/tableContainer.vue";
import tableTop from "@/components/table/tableTop.vue";
import tableData from "@/components/table/tableData.vue";

import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { Workbook } from "exceljs";
import { ref, onBeforeMount, computed, watch } from "vue";

import { useReferenceFetchResult } from "@/stores/fetch/reference";
import { useFormEditStore } from "@/stores/reference/company/edit-modal.js";
import { useFormEditStoreGroupCompany } from "@/stores/reference/company/edit-modal-grupCompany.js";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const formEditState = useFormEditStore();
const formEditStateGroupCompany = useFormEditStoreGroupCompany();
const referenceFetch = useReferenceFetchResult();

let companyCode = ref();
let companyName = ref();
let companyShortName = ref();
let companyGroup = ref();
let companyIdVendor = ref();
let companyLogo = ref();
let companyCodeErp = ref();

let editCompanyDataId = ref();

//for edit
const editCompany = async (data) => {
  editCompanyDataId.value = data;
  setTimeout(callEditApi, 500);
  // console.log("ini data id:" + data);
};

//for edit
const callEditApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  await Api.post(`/company/update_data/${editCompanyDataId.value}`, {
    company_name: formEditState.company.companyName,
    company_code: formEditState.company.companyCode,
    id_group_company: formEditState.company.companyGroup,
    short_name: formEditState.company.companyShortName,
    id_vendor: formEditState.company.companyIdVendor,
    logo: formEditState.company.companyLogo,
    code_erp: formEditState.company.companyCodeErp,
  });
  // console.log(formEditState.company.companyCodeErp);
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  fetch();
};

let sortedData = ref([]);
let addVendorData = ref([]);
let addGrupCompanyData = ref([]);

//for sort & search
const search = ref("");
let sortedbyASC = true;
let instanceArray = [];
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

//for check & uncheck all
const selectAll = (checkValue) => {
  const check = document.getElementsByName("checks");
  const btnDelete = document.getElementById("btnDelete");

  if (checkValue === true) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = true;
      }
    }
    btnDelete.style.display = "block";
  } else {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = false;
      }
    }
    btnDelete.style.display = "none";
  }
};

const deleteDataInCeklis = () => {
  const check = document.getElementsByName("checks");
  for (let i = 0; i < check.length; i++) {
    if (check[i].type === "checkbox" && check[i].checked) {
      // Lakukan tindakan penghapusan data yang sesuai di sini
      const row = check[i].parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  }

  // Setelah penghapusan, sembunyikan kembali button hapus jika tidak ada checkbox yang terceklis
  const btnDelete = document.getElementById("btnDelete");
  const checkedCheckboxes = document.querySelectorAll(
    'input[name="checks"]:checked'
  );
  if (checkedCheckboxes.length === 0) {
    btnDelete.style.display = "none";
  }
};

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
  fetch();
  fetchVendorUtils(addVendorData);
  fetchGrupCompanyUtils(addGrupCompanyData);
  fetchGroupCompany();
});

watch(addVendorData, () => {
  referenceFetch.fetchVendorAirlinesResult = addVendorData.value;
});

watch(addGrupCompanyData, () => {
  referenceFetch.fetchGrupCompanyResult = addGrupCompanyData.value;
});

//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.company_code.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.company_name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.company_code.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.company_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  onChangePage(1);
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

//get all company
const fetch = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  instanceArray = res.data.data;
  sortedData.value = instanceArray;
};

const deleteCompany = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  Swal.fire({
    title:
      "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
    html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
    iconHtml: `<img src="${icondanger}" />`,
    showCloseButton: true,
    closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
    showCancelButton: true,
    buttonsStyling: false,
    cancelButtonText: "Cancel",
    customClass: {
      cancelButton: "swal-cancel-button",
      confirmButton: "swal-confirm-button",
    },
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Api.delete(`/company/delete_data/${id}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Company has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });
        fetch();
      });
    } else {
      return;
    }
  });
};

//for export
const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Company Data");

  const tableHead = [
    { title: "Nomor" },
    { title: "ID" },
    { title: "Code" },
    { title: "Name" },
    { title: "Parent Company" },
  ];

  // Menambahkan header kolom
  tableHead.forEach((column, index) => {
    worksheet.getCell(1, index + 1).value = column.title;
  });

  // Menambahkan data ke baris-baris selanjutnya
  sortedData.value.forEach((data, rowIndex) => {
    worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1;
    worksheet.getCell(rowIndex + 2, 2).value = data.id;
    worksheet.getCell(rowIndex + 2, 3).value = data.company_code;
    worksheet.getCell(rowIndex + 2, 4).value = data.company_name;
    worksheet.getCell(rowIndex + 2, 5).value = data.group_company;
  });

  // Menyimpan workbook menjadi file Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  });
};

//for tablehead
const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Code", jsonData: "company_code" },
  { Id: 3, title: "Name", jsonData: "company_name" },
  { Id: 4, title: "Parent Company", jsonData: "group_company_name" },
  { Id: 5, title: "Actions" },
];

//for group company
const tabs = ref(["Company", "Company Group"]);
const activeTab = ref(0);

let instanceArrayGroupCompany = [];
let sortedDataGroupCompany = ref([]);

const searchGroupCompany = ref("");
let sortedbyASCGroupCompany = true;
const showFullTextGroupCompany = ref({});
let checkListGroupCompany = false;

let showingValueGroupCompany = ref(1);
let pageMultiplierGroupCompany = ref(10);
let pageMultiplierReactiveGroupCompany = computed(
  () => pageMultiplierGroupCompany.value
);
let paginateIndexGroupCompany = ref(0);

const changeTab = (index) => {
  activeTab.value = index;
};

const tableHeadGroupCompany = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Code", jsonData: "group_company_code" },
  { Id: 3, title: "Group Name", jsonData: "group_company_name" },
  { Id: 4, title: "Actions" },
];

const fetchGroupCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/group_company/get");
  instanceArrayGroupCompany = res.data.data;
  sortedDataGroupCompany.value = instanceArrayGroupCompany;
  // console.log(instanceArrayGroupCompany);
};

const deleteDataInCeklisGroupCompany = () => {
  const check = document.getElementsByName("checks");
  for (let i = 0; i < check.length; i++) {
    if (check[i].type === "checkbox" && check[i].checked) {
      // Lakukan tindakan penghapusan data yang sesuai di sini
      const row = check[i].parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  }

  // Setelah penghapusan, sembunyikan kembali button hapus jika tidak ada checkbox yang terceklis
  const btnDelete = document.getElementById("btnDelete");
  const checkedCheckboxes = document.querySelectorAll(
    'input[name="checks"]:checked'
  );
  if (checkedCheckboxes.length === 0) {
    btnDelete.style.display = "none";
  }
};

const onChangePageGroupCompany = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
};

const filteredItemsGroupCompany = (searchGroupCompany) => {
  sortedDataGroupCompany.value = instanceArrayGroupCompany;
  const filteredRGroupCompany = sortedDataGroupCompany.value.filter((item) => {
    (item.group_company_code
      .toLowerCase()
      .indexOf(searchGroupCompany.toLowerCase()) >
      -1) |
      (item.group_company_name
        .toLowerCase()
        .indexOf(searchGroupCompany.toLowerCase()) >
        -1);
    return (
      (item.group_company_code
        .toLowerCase()
        .indexOf(searchGroupCompany.toLowerCase()) >
        -1) |
      (item.group_company_name
        .toLowerCase()
        .indexOf(searchGroupCompany.toLowerCase()) >
        -1)
    );
  });
  sortedDataGroupCompany.value = filteredRGroupCompany;
  onChangePageGroupCompany(1);
};

const selectAllGroupCompany = (checkValue) => {
  const check = document.getElementsByName("checks");
  const btnDelete = document.getElementById("btnDelete");

  if (checkValue === true) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = true;
      }
    }
    btnDelete.style.display = "block";
  } else {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = false;
      }
    }
    btnDelete.style.display = "none";
  }
};

const deleteGroupCompany = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  Swal.fire({
    title:
      "<span class='font-JakartaSans font-medium text-[28px]'>Are you sure want to delete this?</span>",
    html: "<div class='font-JakartaSans font-medium text-sm'>This will delete this data permanently, You cannot undo this action.</div>",
    iconHtml: `<img src="${icondanger}" />`,
    showCloseButton: true,
    closeButtonHtml: `<img src="${iconClose}" class="hover:scale-75"/>`,
    showCancelButton: true,
    buttonsStyling: false,
    cancelButtonText: "Cancel",
    customClass: {
      cancelButton: "swal-cancel-button",
      confirmButton: "swal-confirm-button",
    },
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Api.delete(`/group_company/delete_data/${id}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Company has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchGroupCompany();
      });
    } else {
      return;
    }
  });
};

let editGroupCompanyDataId = ref();

//for edit
const editGroupCompany = async (data) => {
  editGroupCompanyDataId.value = data;
  setTimeout(callEditApiGroupCompany, 500);
  // console.log("ini data id:" + data);
};

//for edit
const callEditApiGroupCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  await Api.post(`/group_company/update_data/${editGroupCompanyDataId.value}`, {
    group_company_code:
      formEditStateGroupCompany.groupCompany.companyGroupCompanyCode,
    group_company_name:
      formEditStateGroupCompany.groupCompany.companyGroupCompanyName,
    logo: formEditStateGroupCompany.groupCompany.companyGroupCompanyLogo,
  });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  fetchGroupCompany();
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <tableContainer>
        <tableTop>
          <div class="tabs">
            <a
              v-for="(tab, index) in tabs"
              :key="index"
              :class="[
                'tab',
                'tab-bordered',
                'tab-lifted',
                'font-JakartaSans font-normal text-md',
                { 'tab-active': activeTab === index },
              ]"
              @click="changeTab(index)"
            >
              {{ tab }}
            </a>
          </div>

          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <main v-if="activeTab === 0">
            <div
              class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
            >
              <p
                class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
              >
                company
              </p>
              <div class="flex gap-4">
                <button
                  class="btn text-white font-JakartaSans text-xs font-bold capitalize bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  id="btnDelete"
                  style="display: none"
                  @click="deleteDataInCeklis()"
                >
                  Delete
                </button>
                <ModalAdd @company-saved="fetch" />
                <button
                  class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                  @click="exportToExcel"
                >
                  <img :src="icon_receive" class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- SEARCH & SHOWING-->
            <div class="flex flex-wrap justify-between items-center mx-4">
              <div class="flex flex-wrap gap-2">
                <h1
                  class="text-xs font-JakartaSans font-normal flex justify-center items-center"
                >
                  Showing
                </h1>
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

              <div class="flex md:mx-0">
                <label class="relative block">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
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

            <!-- TABLE -->
            <tableData v-if="sortedData.length > 0">
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
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
                  v-for="(data, index) in sortedData.slice(
                    paginateIndex * pageMultiplierReactive,
                    (paginateIndex + 1) * pageMultiplierReactive
                  )"
                  :key="data.id"
                >
                  <td style="width: 5%">
                    <input type="checkbox" name="checks" />
                  </td>
                  <td style="width: 5%">{{ data.no }}</td>
                  <td style="width: 20%">{{ data.company_code }}</td>
                  <td style="width: 35%">
                    <span
                      :class="[
                        'readmore-text',
                        showFullText[data.id] ? 'show-full' : '',
                      ]"
                    >
                      {{ data.company_name }}
                    </span>
                  </td>
                  <td style="width: 20%">{{ data.group_company_name }}</td>
                  <td class="flex flex-wrap gap-2 justify-center">
                    <ModalView
                      :formContent="[
                        data.company_name,
                        data.company_code,
                        data.short_name,
                        data.id_group_company,
                        data.id_vendor,
                        data.logo_path,
                        data.code_erp,
                        data.detail,
                      ]"
                    />

                    <ModalEdit
                      @change-company="editCompany(data.id)"
                      :formContent="[
                        data.company_name,
                        data.company_code,
                        data.short_name,
                        data.id_group_company,
                        data.id_vendor,
                        data.logo_path,
                        data.code_erp,
                      ]"
                    />
                    <button @click="deleteCompany(data.id)">
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
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
                      colspan="6"
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
              <p
                class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
              >
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
          </main>

          <main v-else>
            <div
              class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
            >
              <p
                class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
              >
                company group
              </p>
              <div class="flex gap-4">
                <button
                  class="btn text-white font-JakartaSans text-xs font-bold capitalize bg-red border-red hover:bg-white hover:border-red hover:text-red"
                  id="btnDelete"
                  style="display: none"
                  @click="deleteDataInCeklisGroupCompany()"
                >
                  Delete
                </button>
                <ModalAddGrupCompany @companygrup-saved="fetchGroupCompany" />
              </div>
            </div>

            <!-- SEARCH & SHOWING-->
            <div class="flex flex-wrap justify-between items-center mx-4">
              <div class="flex flex-wrap gap-2">
                <h1
                  class="text-xs font-JakartaSans font-normal flex justify-center items-center"
                >
                  Showing
                </h1>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="pageMultiplierGroupCompany"
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>75</option>
                  <option>100</option>
                </select>
              </div>

              <div class="flex md:mx-0">
                <label class="relative block">
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
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
                    v-model="searchGroupCompany"
                    @keyup="filteredItemsGroupCompany(searchGroupCompany)"
                  />
                </label>
              </div>
            </div>

            <!-- TABLE -->
            <tableData v-if="sortedDataGroupCompany.length > 0">
              <thead
                class="text-center font-JakartaSans text-sm font-bold h-10"
              >
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <input
                        type="checkbox"
                        name="checked"
                        @click="
                          selectAllGroupCompany(
                            (checkListGroupCompany = !checkListGroupCompany)
                          )
                        "
                      />
                    </div>
                  </th>

                  <th
                    v-for="data in tableHeadGroupCompany"
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
                  v-for="(data, index) in sortedDataGroupCompany.slice(
                    paginateIndexGroupCompany *
                      pageMultiplierReactiveGroupCompany,
                    (paginateIndexGroupCompany + 1) *
                      pageMultiplierReactiveGroupCompany
                  )"
                  :key="data.id"
                >
                  <td style="width: 5%">
                    <input type="checkbox" name="checks" />
                  </td>
                  <td style="width: 5%">{{ data.no }}</td>
                  <td style="width: 20%">{{ data.group_company_code }}</td>
                  <td style="width: 35%">
                    <span
                      :class="[
                        'readmore-text',
                        showFullTextGroupCompany[data.id] ? 'show-full' : '',
                      ]"
                    >
                      {{ data.group_company_name }}
                    </span>
                  </td>
                  <td class="flex flex-wrap gap-2 justify-center">
                    <ModalEditGrupCompany
                      @changeGroupCompany="editGroupCompany(data.id)"
                      :formContent="[
                        data.group_company_code,
                        data.group_company_name,
                        data.logo_path,
                      ]"
                    />
                    <button @click="deleteGroupCompany(data.id)">
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
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
                        <input
                          type="checkbox"
                          name="checked"
                          @click="
                            selectAllGroupCompany(
                              (checkListGroupCompany = !checkListGroupCompany)
                            )
                          "
                        />
                      </div>
                    </th>

                    <th
                      v-for="data in tableHeadGroupCompany"
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
                      colspan="5"
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
              <p
                class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
              >
                Showing
                {{
                  (showingValueGroupCompany - 1) * pageMultiplierGroupCompany +
                  1
                }}
                to
                {{
                  Math.min(
                    showingValueGroupCompany * pageMultiplierGroupCompany,
                    sortedDataGroupCompany.length
                  )
                }}
                of {{ sortedDataGroupCompany.length }} entries
              </p>
              <vue-awesome-paginate
                :total-items="sortedDataGroupCompany.length"
                :items-per-page="parseInt(pageMultiplierReactiveGroupCompany)"
                :on-click="onChangePageGroupCompany"
                v-model="showingValueGroupCompany"
                :max-pages-shown="4"
                :show-breakpoint-buttons="false"
                :show-ending-buttons="true"
              />
            </div>
          </main>
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
