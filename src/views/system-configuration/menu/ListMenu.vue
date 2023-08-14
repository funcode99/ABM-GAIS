<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";
import TableTopBar from "@/components/layout/TableTopBar.vue";
import Footer from "@/components/layout/Footer.vue";
import SkeletonLoadingTable from "@/components/layout/SkeletonLoadingTable.vue";

import exportExcel from "@/utils/exportToExcel.js";
import deleteCheckedArrayUtils from "@/utils/deleteCheckedArray";
import selectAllCheckbox from "@/utils/selectAllCheckbox";

import fetchMenuStatusUtils from "@/utils/Fetch/System-Configuration/fetchMenuStatus";
import fetchMenuUtils from "@/utils/Fetch/System-Configuration/fetchMenu.js";
import fetchCompanyUtils from "@/utils/Fetch/Reference/fetchCompany.js";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onBeforeMount, computed, watch } from "vue";
import arrowicon from "@/assets/navbar/icon_arrow.svg";

import ModalEditMenu from "@/components/system-configuration/menu/ModalEditMenu.vue";

import tableContainer from "@/components/table/tableContainer.vue";

import deleteicon from "@/assets/navbar/delete_icon.svg";
import icondanger from "@/assets/Danger.png";
import iconClose from "@/assets/navbar/icon_close.svg";

import { useSidebarStore } from "@/stores/sidebar.js";
import { useFormEditStore } from "@/stores/sysconfig/edit-modal.js";
import { useFormAddStore } from "@/stores/sysconfig/add-modal.js";
import { useReferenceFetchResult } from "@/stores/fetch/reference";
import { useSysconfigFetchResult } from "@/stores/fetch/sysconfig";

let formState = useFormAddStore();
let formEditState = useFormEditStore();
const sidebar = useSidebarStore();
const referenceFetch = useReferenceFetchResult();
const sysconfigFetch = useSysconfigFetchResult();

let responseStatus = ref("");
let responseMessage = ref("");
let instanceArray = [];
let sortedData = ref([]);
let deleteArray = ref([]);
let sortedbyASC = true;
let editDataId = ref(0);

let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);

let addMenuData = ref([]);
let addCompanyData = ref([]);
let addMenuStatusData = ref([]);
let baitArray = ref([]);

const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1;
  showingValue.value = pageOfItem;
};

const deleteData = async (event) => {
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
      Api.delete(`/menu/delete_data/${event}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: "Data has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });

        if (sortedData.value.length == 1) {
          sortedData.value = [];
        } else {
          fetchMenuUtils(
            baitArray,
            responseStatus,
            responseMessage,
            addMenuData,
            sortedData
          );
        }
      });
    } else {
      return;
    }
  });
};

const addNewMenu = async () => {
  setTimeout(callApi, 500);
};

const callApi = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  const api = await Api.post("/menu/store", {
    menu: formState.menu.menuName,
    sort: formState.menu.sort,
    parent_id: formState.menu.parentId,
    id_status_menu: formState.menu.idStatusMenu,
    use_sequence: formState.menu.sequence,
    code_sequence: formState.menu.sequenceCode,
    description: "kosong",
    url: formState.menu.url,
    url_view: formState.menu.urlView,
    url_approval: formState.menu.urlApproval,
    icon: formState.menu.icon,
    id_company: formState.menu.companyId,
  });

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });

  fetchMenuUtils(
    baitArray,
    responseStatus,
    responseMessage,
    addMenuData,
    sortedData
  );
};

const editMenu = async (data) => {
  editDataId.value = data;
  setTimeout(callEditApi, 1000);
};

const callEditApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.post(`/menu/update_data/${editDataId.value}`, {
      menu: formEditState.menu.menuName,
      description: "kosong",
      url: formEditState.menu.url,
      url_view: formEditState.menu.urlView,
      icon: formEditState.menu.icon,
      sort: formEditState.menu.sort,
      parent_id: formEditState.menu.parentId,
      use_sequence: formEditState.menu.sequence,
      code_sequence: formEditState.menu.sequenceCode,
      id_status_menu: formEditState.menu.idStatusMenu,
      id_company: formEditState.menu.companyId,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been edited",
      showConfirmButton: false,
      timer: 1500,
    });

    fetchMenuUtils(
      baitArray,
      responseStatus,
      responseMessage,
      addMenuData,
      sortedData
    );
  } catch (error) {
    console.log(error);
  }
};

const selectAll = (checkValue) => {
  selectAllCheckbox(checkValue, deleteArray, sortedData);
};

const tableHead = [
  { Id: 1, title: "No", jsonData: "no" },
  { Id: 2, title: "Name", jsonData: "menu" },
  { Id: 3, title: "Parent Menu", jsonData: "parent" },
  { Id: 4, title: "Status", jsonData: "status_name" },
];

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
  fetchMenuStatusUtils(instanceArray, addMenuStatusData);
  fetchMenuUtils(
    baitArray,
    responseStatus,
    responseMessage,
    addMenuData,
    sortedData
  );
  fetchCompanyUtils(instanceArray, addCompanyData);
});

watch(baitArray, () => {
  instanceArray = baitArray.value;
});

watch(addCompanyData, () => {
  referenceFetch.fetchCompanyResult = addCompanyData.value;
});

watch(addMenuData, () => {
  sysconfigFetch.fetchMenuResult = addMenuData.value;
});

watch(addMenuStatusData, () => {
  sysconfigFetch.fetchMenuStatusResult = addMenuStatusData.value;
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};

const deleteCheckedArray = () => {
  deleteCheckedArrayUtils(deleteArray, "menu", sortedData, fetch);
};

const filterTable = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get(`/menu/get?filter=${id}`);
  responseStatus.value = api.status;
  instanceArray = api.data.data;
  sortedData.value = instanceArray;
};

const exportToExcel = () => {
  exportExcel(
    "Menu Data",
    tableHead,
    sortedData,
    "no",
    "menu",
    "parent",
    "status_name"
  );
};

const fillPageMultiplier = (value) => {
  pageMultiplier.value = value;
  onChangePage(1);
};

const filteredItems = (search) => {
  console.log(search);

  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    return (
      (item.menu?.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.parent?.toLowerCase().indexOf(search.toLowerCase()) > -1) |
      (item.status_name?.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  onChangePage(1);
};

const fetchMenuStatusUtilsHelper = () => {
  fetchMenuUtils(
    baitArray,
    responseStatus,
    responseMessage,
    addMenuData,
    sortedData
  );
};
</script>

<template>
  <div class="flex flex-col w-full this h-[100vh]">
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none" />

      <tableContainer>
        <TableTopBar
          title="Menu"
          modalAddType="menu"
          :numberSelected="deleteArray.length"
          @delete-selected-data="deleteCheckedArray()"
          @increase-menu="addNewMenu"
          @do-search="filteredItems"
          @reset-search="filteredItems"
          @change-showing="fillPageMultiplier"
          @filter-table="filterTable"
          @reset-table="fetchMenuStatusUtilsHelper"
          @export-to-excel="exportToExcel"
        />

        {{ writeMenuList }}

        <div
          class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden"
        >
          <div class="block overflow-x-auto overflow-y-hidden">
            <table
              v-if="sortedData.length > 0"
              class="table table-zebra table-compact border w-full sm:w-full h-full rounded-lg"
            >
              <thead class="text-center font-Montserrat text-sm font-bold h-10">
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <input
                        type="checkbox"
                        name="chklead"
                        @click="selectAll((checkLead = !checkLead))"
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
                      <button class="">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>

                  <th
                    class="overflow-x-hidden cursor-pointer"
                    v-if="sidebar.writeMenu.includes('Menu')"
                  >
                    <span class="flex justify-center items-center gap-1">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="data in sortedData.slice(
                    paginateIndex * pageMultiplierReactive,
                    (paginateIndex + 1) * pageMultiplierReactive
                  )"
                  :key="data.id"
                >
                  <td style="width: 5%">
                    <input
                      type="checkbox"
                      name="chk"
                      :value="data.id"
                      v-model="deleteArray"
                    />
                  </td>

                  <td style="width: 5%">
                    {{ data.no }}
                  </td>

                  <td style="width: 30%">
                    {{ data.menu }}
                  </td>

                  <td style="width: 30%">
                    {{ data.parent }}
                  </td>

                  <td style="width: 15%" v-if="data.status_name == 'Active'">
                    Active
                  </td>

                  <td style="width: 15%" v-else>Disabled</td>

                  <td
                    class="flex flex-wrap gap-4 justify-center"
                    v-if="sidebar.writeMenu.includes('Menu')"
                  >
                    <ModalEditMenu
                      @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                      @change-menu="editMenu(data.id)"
                      :formContent="[
                        data.menu,
                        data.url,
                        data.sort,
                        data.icon,
                        data.comp_array,
                        data.parent_id,
                        data.status_name,
                        data.code_sequence,
                        data.icon_path,
                        data.use_sequence,
                        data.url_view,
                      ]"
                    />
                    <button @click="deleteData(data.id)">
                      <img :src="deleteicon" class="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              v-else-if="sortedData.length == 0 && responseStatus == ''"
              class="table table-zebra table-compact border h-full w-full rounded-lg"
            >
              <thead class="text-center font-Montserrat text-sm font-bold h-10">
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <input
                        type="checkbox"
                        name="chklead"
                        @click="selectAll((checkLead = !checkLead))"
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
                      <button class="">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>
                  <th>
                    <div class="flex justify-center">Actions</div>
                  </th>
                </tr>
              </thead>

              <SkeletonLoadingTable :column="6" :row="5" />
            </table>

            <table
              v-else-if="
                (sortedData.length == 0 && responseStatus == 200) ||
                (sortedData.length == 0 && responseStatus == 404)
              "
              class="table table-zebra table-compact border h-full w-full rounded-lg"
            >
              <thead class="text-center font-Montserrat text-sm font-bold h-10">
                <tr>
                  <th>
                    <div class="flex justify-center">
                      <input
                        type="checkbox"
                        name="chklead"
                        @click="selectAll((checkLead = !checkLead))"
                      />
                    </div>
                  </th>
                  <th
                    v-for="data in tableHead"
                    :key="data.Id"
                    class="overflow-x-hidden cursor-pointer"
                  >
                    <span class="flex justify-center items-center gap-1">
                      {{ data.title }}
                      <button class="">
                        <img :src="arrowicon" class="w-[9px] h-3" />
                      </button>
                    </span>
                  </th>
                  <th>
                    <div class="flex justify-center">Actions</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colspan="6"
                    class="text-center font-JakartaSans text-base font-medium"
                  >
                    Tidak ada data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PAGINATION -->
          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
          >
            <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
              Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
              {{ Math.min(showingValue * pageMultiplier, sortedData.length) }}
              of {{ sortedData.length }} entries {{ status }}
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
      </tableContainer>
    </div>
  </div>

  <Footer />
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
}
</style>
