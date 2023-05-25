<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import ModalAdd from "@/components/reference/gl-account/ModalAdd.vue";
import ModalEdit from "@/components/reference/gl-account/ModalEdit.vue";

import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";

import Api from "@/utils/Api";

import { Workbook } from "exceljs";

import { ref, onBeforeMount, computed } from "vue";

import { useFormEditStore } from "@/stores/reference/gl-account/edit-modal.js";
import { useSidebarStore } from "@/stores/sidebar.js";

const sidebar = useSidebarStore();
const formEditState = useFormEditStore();

let glAccountCode = ref();
let glAccountName = ref();

let editglAccountDataId = ref();

//for edit
const editGlAccount = async (data) => {
  editglAccountDataId.value = data;
  // callEditApi();
  setTimeout(callEditApi, 500);
  // console.log("ini data:" + data);
};

//for edit
const callEditApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  await Api.post(`/gl_account/update_data/${editglAccountDataId.value}`, {
    gl_account: formEditState.glAccount.glAccountCode,
    gl_name: formEditState.glAccount.glAccountName,
  });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  fetchGLAccount();
};

//for sort & search
const search = ref("");
let sortedData = ref([]);
let sortedbyASC = true;
let instanceArray = [];
let lockScrollbar = ref(false);
let sortedDataReactive = computed(() => sortedData.value);
let lengthCounter = 0;
let sortAscending = true;
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
  const btnHapus = document.getElementById("btnHapus");

  if (checkValue === true) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = true;
      }
    }
    btnHapus.style.display = "block";
  } else {
    for (let i = 0; i < check.length; i++) {
      if (check[i].type === "checkbox") {
        check[i].checked = false;
      }
    }
    btnHapus.style.display = "none";
  }
};

const hapusDataDiceklis = () => {
  const check = document.getElementsByName("checks");
  for (let i = 0; i < check.length; i++) {
    if (check[i].type === "checkbox" && check[i].checked) {
      // Lakukan tindakan penghapusan data yang sesuai di sini
      const row = check[i].parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  }

  // Setelah penghapusan, sembunyikan kembali button hapus jika tidak ada checkbox yang terceklis
  const btnHapus = document.getElementById("btnHapus");
  const checkedCheckboxes = document.querySelectorAll(
    'input[name="checks"]:checked'
  );
  if (checkedCheckboxes.length === 0) {
    btnHapus.style.display = "none";
  }
};

//for tablehead
const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "GL Account", jsonData: "gl_account" },
  { Id: 3, title: "GL Name", jsonData: "gl_name" },
  { Id: 4, title: "Actions" },
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
  fetchGLAccount();
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
});

//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    (item.gl_account.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.gl_name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.gl_account.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.gl_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  lengthCounter = sortedData.value.length;
  onChangePage(1);
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

//get all gl_account
const fetchGLAccount = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/gl_account/");
  instanceArray = res.data.data;
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
};

//delete gl account
const deleteGLAccount = async (id) => {
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
      Api.delete(`/gl_account/delete_data/${id}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "GL Account has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchGLAccount();
      });
    } else {
      return;
    }
  });
};

//for export
const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("GL Account Data");

  const tableHead = [
    { title: "Nomor" },
    { title: "ID" },
    { title: "GL Account" },
    { title: "GL Name" },
  ];

  // Menambahkan header kolom
  tableHead.forEach((column, index) => {
    worksheet.getCell(1, index + 1).value = column.title;
  });

  // Menambahkan data ke baris-baris selanjutnya
  sortedDataReactive.value.forEach((data, rowIndex) => {
    worksheet.getCell(rowIndex + 2, 1).value = rowIndex + 1;
    worksheet.getCell(rowIndex + 2, 2).value = data.id;
    worksheet.getCell(rowIndex + 2, 3).value = data.gl_account;
    worksheet.getCell(rowIndex + 2, 4).value = data.gl_name;
  });

  // Menyimpan workbook menjadi file Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "glaccount_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  });
};

function toggleReadMore(id) {
  showFullText.value = { ...showFullText.value, [id]: true };
}
</script>

<template>
  <div
    class="flex flex-col w-full this h-[100vh]"
    :class="lockScrollbar === true ? 'fixed' : ''"
  >
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white rounded-t-xl pb-3 relative custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div
            class="grid grid-flow-col auto-cols-max items-center justify-between mx-4 py-2"
          >
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              GL Account
            </p>
            <div class="flex gap-4">
              <button
                class="btn text-white font-JakartaSans text-xs font-bold capitalize bg-red border-red hover:bg-white hover:border-red hover:text-red"
                id="btnHapus"
                style="display: none"
                @click="hapusDataDiceklis()"
              >
                Delete
              </button>
              <ModalAdd
                @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                @gl-saved="fetchGLAccount"
              />
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
                @click="exportToExcel"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SEARCH & SHOWING -->
          <div class="flex flex-wrap justify-between items-center mx-4">
            <div class="flex items-center gap-1 pt-6 pb-4 h-4">
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

            <div class="flex md:mx-0">
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

          <!-- TABLE -->
          <div
            class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden"
          >
            <div class="block overflow-x-auto">
              <table
                v-if="sortedData.length > 0"
                class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
              >
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
                        {{ data.title }}
                        <button v-if="data.jsonData" class="ml-2">
                          <img :src="arrowicon" class="w-[9px] h-3" />
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    class="font-JakartaSans font-normal text-sm capitalize"
                    v-for="(data, index) in sortedData.slice(
                      paginateIndex * pageMultiplierReactive,
                      (paginateIndex + 1) * pageMultiplierReactive
                    )"
                    :key="data.id"
                  >
                    <td>
                      <input type="checkbox" name="checks" />
                    </td>
                    <td>{{ data.no }}</td>
                    <td>{{ data.gl_account }}</td>
                    <!-- <td>{{ data.gl_name }}</td> -->
                    <td>
                      <span
                        v-if="
                          data.gl_name.length <= 30 || showFullText[data.id]
                        "
                        class="readmore-text"
                      >
                        {{ data.gl_name }}
                      </span>
                      <span v-else class="readmore-text">
                        {{ data.gl_name.substring(0, 30) }}
                        <a href="#" @click="toggleReadMore(data.id)">...</a>
                      </span>
                    </td>
                    <td class="flex flex-wrap gap-4 justify-center">
                      <ModalEdit
                        @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                        @change-gl="editGlAccount(data.id)"
                        :formContent="[data.gl_account, data.gl_name]"
                      />
                      <button @click="deleteGLAccount(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                v-else
                class="h-[100px] border-t border-t-black flex items-center justify-center"
              >
                <h1 class="text-center font-JakartaSans text-base font-medium">
                  Tidak Ada Data
                </h1>
              </div>
            </div>
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
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}

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
  max-width: 500px;
  white-space: nowrap;
  word-break: break-word;
}
</style>
