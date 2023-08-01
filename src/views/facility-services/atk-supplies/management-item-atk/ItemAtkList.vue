<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Multiselect from "@vueform/multiselect";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import icondanger from "@/assets/Danger.png";
import viewicon from "@/assets/eye.png";
import icondanger2 from "@/assets/icon-danger-circle.png";
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import gearicon from "@/assets/system-configuration-not-selected.png";

import ModalAdd from "@/components/facility-services/atk-supplies/management-item-atk/ModalAdd.vue";
import ModalEdit from "@/components/facility-services/atk-supplies/management-item-atk/ModalEdit.vue";
import Swal from "sweetalert2";

// import itemdata from "@/utils/Api/facility-service-system/management-item-atk/itemdata.js";

import { ref, onBeforeMount, computed, watchEffect } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
import Api from "@/utils/Api";

const sidebar = useSidebarStore();

const id_role = JSON.parse(localStorage.getItem("id_role"));
const company_code = JSON.parse(localStorage.getItem("company_code"));

//for sort & search
let selectedCompany =
  JSON.parse(localStorage.getItem("id_role")) === "ADMTR"
    ? ref("")
    : ref(JSON.parse(localStorage.getItem("id_company")));
let selectedWarehouse = ref([]);
let selectedSite =
  JSON.parse(localStorage.getItem("id_role")) === "ADMTR" ||
  JSON.parse(localStorage.getItem("id_role")) === "SUPADM"
    ? ref("")
    : ref(JSON.parse(localStorage.getItem("id_site")));

let selectedCompany2 =
  JSON.parse(localStorage.getItem("id_role")) === "ADMTR"
    ? ref("")
    : ref(JSON.parse(localStorage.getItem("id_company")));
let selectedWarehouse2 = ref("");
let selectedSite2 =
  JSON.parse(localStorage.getItem("id_role")) === "ADMTR" ||
  JSON.parse(localStorage.getItem("id_role")) === "SUPADM"
    ? ref("")
    : ref(JSON.parse(localStorage.getItem("id_site")));
let selectedUOM = ref("UOM");
let selectedBrand = ref("Brand");
let statusForm = ref("add");
let visibleModal = ref(false);
let idItem = ref(0);
let arrItem = ref([]);
let arrData = ref([]);
// let Company = ref("");
let Site = ref("");
// let Warehouse = ref("");
let UOM = ref("");
let idItems = ref("");
let alertQuantity = ref("");
let Brand = ref("");
let itemNames = ref("");
let remarks = ref("");
const search = ref("");
let sortedData = ref([]);
const selectedType = ref("");
let sortedbyASC = true;
let instanceArray = [];
let lengthCounter = 0;
let lockScrollbar = ref(false);
let lockScrollbarEdit = ref(false);
let Company = ref("");
let Warehouse = ref(null);
let itemdata = ref("");
let idS = ref("");
let checkedAlert = ref(false);
let valueChecked = ref(0);
let disabledField = ref(false);
let isDoneLoading = ref(false);
let brandName = ref("");
let warehouseName = ref([]);
let warehouseId = ref([]);
let uomName = ref("");
const payload = ref([]);
let disableCompany = ref(false);
let disableSite = ref(false);

//for paginations
let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);
let lenghtPagination = ref(0);
const searchFilter = ref("");
//for paginations
const onChangePage = (pageOfItem) => {
  fetchData(
    pageOfItem,
    selectedType.value,
    selectedCompany2.value,
    selectedWarehouse2.value,
    valueChecked.value,
    searchFilter.value,
    pageMultiplier.value,
    selectedSite2.value
  );
  // console.log(paginateIndex.value)
};

//for filter & reset button
const filterDataByType = () => {
  fetchData(
    1,
    selectedType.value,
    selectedCompany2.value,
    selectedWarehouse2.value,
    valueChecked.value,
    searchFilter.value,
    pageMultiplier.value,
    selectedSite2.value
  );
};

//for filter & reset button
const resetData = () => {
  selectedType.value = "";
  selectedCompany2.value =
    JSON.parse(localStorage.getItem("id_role")) === "ADMTR"
      ? ""
      : JSON.parse(localStorage.getItem("id_company"));
  selectedWarehouse2.value = "";
  selectedSite2.value =
    JSON.parse(localStorage.getItem("id_role")) === "ADMTR" ||
    JSON.parse(localStorage.getItem("id_role")) === "SUPADM"
      ? ""
      : JSON.parse(localStorage.getItem("id_site"));
  fetchData(
    showingValue.value,
    "",
    selectedCompany2.value,
    selectedWarehouse2.value,
    0,
    searchFilter.value,
    pageMultiplier.value,
    selectedSite2.value
  );
};

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
  { Id: 1, title: "No", jsonData: "id" },
  { Id: 2, title: "ID Item", jsonData: "code_item" },
  { Id: 3, title: "Item Name", jsonData: "item_name" },
  { Id: 4, title: "ATK Warehouse", jsonData: "warehouse_name" },
  { Id: 5, title: "Real Stock", jsonData: "current_stock" },
  { Id: 6, title: "Booked Stock", jsonData: "current_stock" },
  { Id: 7, title: "Stock Available to Request", jsonData: "current_stock" },
  { Id: 8, title: "Available Stock to Approve", jsonData: "current_stock" },
  { Id: 9, title: "Alert Quantity", jsonData: "alert_qty" },
  { Id: 10, title: "UOM", jsonData: "uom_name" },
  { Id: 11, title: "Actions" },
];

const tableHeadEmployee = [
  { Id: 1, title: "No", jsonData: "id" },
  { Id: 2, title: "ID Item", jsonData: "code_item" },
  { Id: 3, title: "Item Name", jsonData: "item_name" },
  { Id: 4, title: "ATK Warehouse", jsonData: "warehouse_name" },
  { Id: 5, title: "Stock Available to Request", jsonData: "current_stock" },
  { Id: 6, title: "Alert Quantity", jsonData: "alert_qty" },
  { Id: 7, title: "UOM", jsonData: "uom_name" },
  { Id: 8, title: "Actions" },
];

let tableType =
  JSON.parse(localStorage.getItem("id_role")) == "EMPLY"
    ? tableHeadEmployee
    : tableHead;

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
//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
};

const fetchGetCompanyID = async (id_company) => {
  fetchSite(selectedSite2.value, id_company);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_company}`);
  Company.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id_company === element.id) {
      selectedCompany.value = id_company;
      selectedCompany2.value = id_company;
    }
  }
};
const fetchGetCompanyID2 = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_company}`);
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id_company === element.id) {
      selectedCompany.value = id_company;
    }
  }
};
const fetchSite = async (id, id_company) => {
  if (id) {
    changeSite(id);
  }
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  Site.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id === element.id) {
      selectedSite.value = id;
      selectedSite2.value = id;
    }
  }
};
const fetchSite2 = async (id, id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  Site.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id === element.id) {
      selectedSite.value = id;
    }
  }
};
const fetchBrand = async (id, id_site) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/brand/get_by_site_id/${id_site}`);
  Brand.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id === element.id) {
      selectedBrand.value = id;
    }
  }
};
const fetchUOM = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/uom");
  UOM.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (id === element.id) {
      selectedUOM.value = id;
    }
  }
};
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === "ADMTR" ? fetchGetCompany() : fetchGetCompanyID(id_company);
  // changeCompany()
};
const fetchData = async (
  page,
  selectedType,
  selectedCompany,
  selectedWarehouse,
  alert_qty,
  searchFilter,
  pageMultiplier,
  selectedSite
) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(
    `/management_atk/get?page=${page}&item_name=${selectedType}&id_company=${selectedCompany}&id_warehouse=${selectedWarehouse}&alert_qty=${alert_qty}&search=${searchFilter}&perPage=${pageMultiplier}&id_site=${selectedSite}`
  );
  itemdata.value = res.data.data.data;
  instanceArray = itemdata.value;
  // console.log(instanceArray)
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  lenghtPagination = res.data.data.total;
  paginateIndex.value = res.data.data.current_page - 1;
  showingValue.value = res.data.data.current_page;
};

const changeCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  // console.log(res)
  Site.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const changeSite = async (id_site) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/warehouse/get_by_site_id/${id_site}`);
  Warehouse.value = res.data.data;
  isDoneLoading.value = true;
};

const editValue = async (id, type, detail_warehouse) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/management_atk/get/${id}`);
  arrData.value = res.data.data[0];

  idS.value = id;
  selectedCompany.value = fetchGetCompanyID2(res.data.data[0].id_company);
  arrItem.value = res.data.data[0].array_warehouse;
  changeSite(res.data.data[0].id_site);
  selectedSite.value = fetchSite2(
    res.data.data[0].id_site,
    res.data.data[0].id_company
  );
  selectedUOM.value = fetchUOM(res.data.data[0].id_uom);
  itemNames.value = res.data.data[0].item_name;
  alertQuantity.value = res.data.data[0].alert_qty;
  selectedBrand.value = fetchBrand(
    res.data.data[0].id_brand,
    res.data.data[0].id_site
  );
  remarks.value = res.data.data[0].remarks;
  idItems.value = res.data.data[0].code_item;
  selectedWarehouse.value = [];
  detail_warehouse.forEach((element) => {
    selectedWarehouse.value.push(element.id_warehouse);
  });
  lockScrollbarEdit.value = true;
  let dataEdit = {
    code_item: idItems.value,
    item_name: itemNames.value,
    id_brand: arrData.value.id_brand,
    id_uom: arrData.value.id_uom,
    alert_qty: alertQuantity.value,
    id_company: arrData.value.id_company,
    id_site: arrData.value.id_site,
    remarks: remarks.value,
    array_warehouse: selectedWarehouse.value,
  };
  payload.value = dataEdit;
  disabledField.value = type == "view" ? true : false;
};

const save = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  payload.value.array_warehouse = selectedWarehouse.value

  Api.post(`/management_atk/update/${idS.value}`, payload.value)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData(
        showingValue.value,
        selectedType.value,
        selectedCompany2.value,
        selectedWarehouse2.value,
        valueChecked.value,
        searchFilter.value,
        pageMultiplier.value,
        selectedSite2.value
      );
      lockScrollbarEdit.value = false;
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};
const deleteValue = async (id) => {
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
      Api.delete(`/management_atk/delete_data/${id}`).then((res) => {
        Swal.fire({
          title: "Successfully",
          text: res.data.message,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#015289",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData(
          showingValue.value,
          selectedType.value,
          selectedCompany2.value,
          selectedWarehouse2.value,
          valueChecked.value,
          searchFilter.value,
          pageMultiplier.value,
          selectedSite2.value
        );
      });
    } else {
      return;
    }
  });

  isDoneLoading.value = true;
};

const openModal = (type, id) => {
  visibleModal.value = true;
  statusForm.value = type;
  if (id) {
    idItem.value = parseInt(id);
  }
};

const resetButCompanyDisable = async () => {
  disableSite.value = true;
  disableCompany.value = true;
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchCondition();
  fetchData(
    showingValue.value,
    selectedType.value,
    selectedCompany2.value,
    selectedWarehouse2.value,
    valueChecked.value,
    searchFilter.value,
    pageMultiplier.value,
    selectedSite2.value
  );
});
//for searching
const filteredItems = (search) => {
  fetchData(
    1,
    selectedType.value,
    selectedCompany2.value,
    selectedWarehouse2.value,
    valueChecked.value,
    search,
    pageMultiplier.value,
    selectedSite2.value
  );
};
const perPage = async () => {
  // console.log(pageMultiplier.value)
  fetchData(
    showingValue.value,
    selectedType.value,
    selectedCompany2.value,
    selectedWarehouse2.value,
    valueChecked.value,
    searchFilter.value,
    pageMultiplier.value,
    selectedSite2.value
  );
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const selectAlert = (checked) => {
  if (checked === false) {
    valueChecked.value = 1;
    fetchData(
      showingValue.value,
      selectedType.value,
      selectedCompany2.value,
      selectedWarehouse2.value,
      valueChecked.value,
      searchFilter.value,
      pageMultiplier.value,
      selectedSite2.value
    );
  } else {
    valueChecked.value = 0;
    fetchData(
      showingValue.value,
      selectedType.value,
      selectedCompany2.value,
      selectedWarehouse2.value,
      valueChecked.value,
      searchFilter.value,
      pageMultiplier.value,
      selectedSite2.value
    );
  }
};

const closeModal = () => {
  visibleModal.value = false;
  fetchData(
    showingValue.value,
    selectedType.value,
    selectedCompany2.value,
    selectedWarehouse2.value,
    valueChecked.value,
    searchFilter.value,
    pageMultiplier.value,
    selectedSite2.value
  );
};

const removeItems = async (id) => {
  arrItem.value.splice(id, 1);
  // return itemsTable
};

const addItem = async () => {
  if (
    selectedCompany.value == "" ||
    selectedSite.value == "" ||
    selectedWarehouse.value == [] ||
    selectedUOM.value == "" ||
    itemNames.value == "" ||
    alertQuantity.value == "" ||
    idItems.value == ""
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Data required Tidak Boleh Kosong",
      showConfirmButton: false,
      timer: 1500,
    });
    return false;
  } else {
    arrData.value.alert_qty = alertQuantity.value;
    arrData.value.remarks = remarks.value;
    warehouseName.value = [];
    warehouseId.value = [];
    arrItem.value = [];
    const wh = Warehouse.value;
    for (let index = 0; index < wh.length; index++) {
      const element = wh[index];
      if (selectedWarehouse.value.includes(element.id)) {
        warehouseName.value.push(element.warehouse_name);
        warehouseId.value.push(element.id);
      }
    }
    const br = Brand.value;
    for (let index = 0; index < br.length; index++) {
      const element = br[index];
      if (element.id == selectedBrand.value) {
        arrData.value.brand_name = element.brand_name;
      }
    }
    const uom = UOM.value;
    for (let index = 0; index < uom.length; index++) {
      const element = uom[index];
      if (element.id == selectedUOM.value) {
        arrData.value.uom_name = element.uom_name;
      }
    }

    for (let index = 0; index < warehouseId.value.length; index++) {
      arrItem.value.push({
        code_item: idItems.value,
        item_name: itemNames.value,
        id_brand: selectedBrand.value,
        id_uom: selectedUOM.value,
        id_company: selectedCompany.value,
        id_site: selectedSite.value,
        id_warehouse: warehouseId.value[index],
        current_stock: "",
        remarks: remarks.value,
        warehouse_name: warehouseName.value[index],
        namaBrand: brandName.value,
        namaUOM: uomName.value,
        array_warehouse: selectedWarehouse.value,
      });
    }
    payload.value.push({
      code_item: idItems.value,
      item_name: itemNames.value,
      id_brand: selectedBrand.value,
      id_uom: selectedUOM.value,
      alert_qty: alertQuantity.value,
      id_company: selectedCompany.value,
      id_site: selectedSite.value,
      remarks: remarks.value,
      array_warehouse: selectedWarehouse.value,
    });
    resetButCompanyDisable();
    return arrItem.value;
  }
};

// multiselect
let isLoading = ref(false);
watchEffect(() => {
  if (isDoneLoading.value) {
    Warehouse.value.map((item) => {
      item.value = parseInt(item.id);
    });
  }
});
// end

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
</script>

<template>
  <div
    class="flex flex-col w-full this h-[100vh]"
    :class="lockScrollbar === true ? 'fixed' : ''"
  >
    <Navbar />

    <div class="flex w-screen content mt-[115px]">
      <Sidebar class="flex-none fixed" />

      <div
        class="bg-[#e4e4e6] pt-5 pb-16 px-8 w-screen h-full clean-margin ease-in-out duration-500"
        :class="[
          lengthCounter < 6 ? 'backgroundHeight' : 'h-full',
          sidebar.isWide === true ? 'ml-[260px]' : 'ml-[100px]',
        ]"
      >
        <div class="bg-white w-full rounded-t-xl pb-3 relative custom-card">
          <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
          <div class="flex flex-wrap items-center justify-between mx-4 py-2">
            <p
              class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold"
            >
              Management Item ATK
            </p>

            <div class="flex justify-between gap-4 items-center">
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="gearicon" class="w-6 h-6" />
              </button>

              <label
                @click="openModal('add', 0)"
                for="my-modal-item-atk"
                class="btn btn-success bg-green border-green hover:bg-none text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
                >+ Add Item</label
              >
              <ModalAdd
                @close="closeModal"
                :status="statusForm"
                :id="idItem"
                v-if="id_role != 'EMPLY' && visibleModal"
              />

              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="icon_receive" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- SORT, DATE & SEARCH -->

          <div
            class="grid grid-flow-col auto-cols-max justify-between items-center mx-4 py-2"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Company
                </p>
                <select
                  class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  required
                  v-model="selectedCompany2"
                  @change="changeCompany(selectedCompany2)"
                >
                  <option disabled selected>Company</option>
                  <option
                    v-for="(company, i) in Company"
                    :key="i"
                    :value="company.id"
                  >
                    {{ company.company_name }}
                  </option>
                </select>
              </div>

              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Site
                </p>
                <select
                  class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  required
                  v-model="selectedSite2"
                  @change="changeSite(selectedSite2)"
                >
                  <option disabled selected>Site</option>
                  <option v-for="(site, i) in Site" :key="i" :value="site.id">
                    {{ site.site_name }}
                  </option>
                </select>
              </div>

              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  ATK Warehouse
                </p>
                <select
                  class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  required
                  v-model="selectedWarehouse2"
                >
                  <option disabled selected>ATK Warehouse</option>
                  <option
                    v-for="(warehouse, i) in Warehouse"
                    :key="i"
                    :value="warehouse.id"
                  >
                    {{ warehouse.warehouse_name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-wrap gap-4 items-center pt-6">
                <button
                  class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
                  @click="filterDataByType"
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

            <div class="pt-6 w-full">
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
          <div class="flex flex-wrap items-center justify-between mx-4 py-2">
            <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
              <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
              <select
                class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                v-model="pageMultiplier"
                @change="perPage"
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>

            <div class="flex justify-between gap-4 items-center">
              <input
                type="checkbox"
                v-model="checkedAlert"
                @click="selectAlert(checkedAlert)"
              />
              Show Items that have been alert
            </div>
          </div>
          <!-- TABLE -->
          <div
            class="px-4 py-2 bg-white rounded-b-xl box-border block overflow-x-hidden"
          >
            <div class="block overflow-x-auto">
              <table
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
                      v-for="data in tableType"
                      :key="data.id"
                      class="overflow-x-hidden cursor-pointer font-JakartaSans font-normal text-sm"
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

                <tbody v-if="sortedData.length > 0">
                  <tr
                    :class="
                      data.current_stock <= data.alert_qty
                        ? 'font-JakartaSans font-normal text-sm text-red'
                        : 'font-JakartaSans font-normal text-sm'
                    "
                    v-for="(data, index) in sortedData"
                    :key="data.id"
                  >
                    <td class="p-0">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ (showingValue - 1) * pageMultiplier + 1 + index }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.code_item === null ? "-" : data.code_item }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.item_name === null ? "-" : data.item_name }}
                    </td>
                    <td class="p-0">
                      <div class="collapse collapse-arrow p-0 m-0">
                        <input type="checkbox" />
                        <div class="collapse-title">
                          <div class="flex justify-center items-center gap-2">
                            <div
                              class="badge badge-primary gap-2 text-xs font-bold font-white"
                            >
                              {{ data.warehouse_count }}
                            </div>
                          </div>
                        </div>
                        <div class="collapse-content">
                          <ol class="list-decimal">
                            <li
                              v-for="(detail, i) in data.array_warehouse"
                              :key="detail.id"
                              class="overflow-x-hidden cursor-pointer"
                            >
                              {{ i + 1 }}.
                              <span class="ml-1">{{
                                detail.warehouse_name
                              }}</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </td>
                    <td
                      class="font-JakartaSans font-normal text-sm p-0"
                      v-if="id_role != 'EMPLY'"
                    >
                      {{ data.total_stock == null ? "-" : data.total_stock }}
                    </td>
                    <td
                      class="font-JakartaSans font-normal text-sm p-0"
                      v-if="id_role != 'EMPLY'"
                    >
                      {{ data.stock_booked == null ? "-" : data.stock_booked }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{
                        data.stock_to_booked == null ? "-" : data.stock_to_booked
                      }}
                    </td>
                    <td
                      class="font-JakartaSans font-normal text-sm p-0"
                      v-if="id_role != 'EMPLY'"
                    >
                      {{
                        data.stock_to_approve == null ? "-" : data.stock_to_approve
                      }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.alert_qty === null ? "-" : data.alert_qty }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.uom_name === null ? "-" : data.uom_name }}
                    </td>
                    <td>
                      <div class="flex justify-center items-center gap-2">
                        <label
                          v-if="id_role != 'EMPLY'"
                          @click="
                            editValue(data.id, 'edit', data.array_warehouse)
                          "
                          for="my-modal-item-edit-atk"
                          class="cursor-pointer"
                          ><img :src="editicon" class="w-6 h-6"
                        /></label>
                        <label
                          @click="
                            editValue(data.id, 'view', data.array_warehouse)
                          "
                          for="my-modal-item-edit-atk"
                          class="cursor-pointer"
                          ><img :src="viewicon" class="w-6 h-6"
                        /></label>

                        <input
                          type="checkbox"
                          id="my-modal-item-edit-atk"
                          class="modal-toggle"
                        />

                        <!-- MODAL EDIT -->
                        <div v-if="lockScrollbarEdit == true" class="modal">
                          <div class="modal-dialog bg-white w-3/5">
                            <nav class="sticky top-0 z-50 bg-[#015289]">
                              <label
                                @click="lockScrollbar"
                                for="my-modal-item-edit-atk"
                                class="cursor-pointer absolute right-3 top-3"
                              >
                                <img
                                  :src="iconClose"
                                  class="w-[34px] h-[34px] hover:scale-75"
                                />
                              </label>
                              <p
                                class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start"
                              >
                                <span
                                  v-if="id_role != 'EMPLY' && !disabledField"
                                  >Edit Item</span
                                >
                                <span v-else>View Item</span>
                              </p>
                            </nav>

                            <div
                              class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4 mb-6"
                            >
                              <img :src="icondanger2" class="w-5 h-5" />
                              <p class="font-JakartaSans font-semibold">
                                Item Info
                              </p>
                            </div>

                            <main class="modal-box-inner-brand pb-14">
                              <div
                                class="flex justify-between px-6 items-center gap-2"
                              >
                                <div class="mb-6 w-full">
                                  <label
                                    for="company"
                                    class="block text-black text-left mb-2 font-JakartaSans font-medium text-sm"
                                    >Company<span class="text-red"
                                      >*</span
                                    ></label
                                  >
                                  <select
                                    class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                                    required
                                    v-model="selectedCompany"
                                    @change="changeCompany(selectedCompany)"
                                    :disabled="disabledField"
                                  >
                                    <option disabled selected>Company</option>
                                    <option
                                      v-for="(company, i) in Company"
                                      :key="i"
                                      :value="company.id"
                                    >
                                      {{ company.company_name }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-6 w-full">
                                  <label
                                    for="site"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >Site<span class="text-red">*</span></label
                                  >
                                  <select
                                    class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                                    required
                                    v-model="selectedSite"
                                    @change="changeSite(selectedSite)"
                                    :disabled="disabledField"
                                  >
                                    <option disabled selected>Site</option>
                                    <option
                                      v-for="(site, i) in Site"
                                      :key="i"
                                      :value="site.id"
                                    >
                                      {{ site.site_name }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div
                                class="flex justify-between px-6 items-center gap-2"
                              >
                                <div class="mb-6 w-full">
                                  <label
                                    for="detail"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >Details</label
                                  >
                                  <hr />
                                </div>
                              </div>
                              <div
                                class="grid grid-cols-2 px-6 items-center gap-2"
                              >
                                <div class="mb-4 w-full">
                                  <label
                                    for="item_name"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >Item Name<span class="text-red"
                                      >*</span
                                    ></label
                                  >
                                  <input
                                    type="text"
                                    v-model="itemNames"
                                    class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                    placeholder="Item Name"
                                    required
                                    :disabled="disabledField"
                                  />
                                </div>
                                <div class="mb-4 w-full">
                                  <label
                                    for="warehouse"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >ID Items<span class="text-red"
                                      >*</span
                                    ></label
                                  >
                                  <div
                                    class="flex justify-start px-6 items-center gap-2"
                                  >
                                    <div
                                      class="flex items-center border-b border-teal-500 py-2 mb-6 w-full"
                                    >
                                      <input
                                        class="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        v-model="idItems"
                                        maxlength="9"
                                        type="number"
                                        placeholder="ID Item"
                                        aria-label="Full name"
                                        disabled="true"
                                      />
                                    </div>
                                    <div class="mb-6 w-full"></div>
                                  </div>
                                </div>
                                <div class="mb-4 w-full">
                                  <label
                                    for="uom"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >UOM<span class="text-red">*</span></label
                                  >
                                  <select
                                    class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                    required
                                    v-model="selectedUOM"
                                    :disabled="disabledField"
                                  >
                                    <option disabled selected>UOM</option>
                                    <option
                                      v-for="(uom, i) in UOM"
                                      :key="i"
                                      :value="uom.id"
                                    >
                                      {{ uom.uom_name }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-4 w-full">
                                  <label
                                    for="alert"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >Alert Quantity<span class="text-red"
                                      >*</span
                                    ></label
                                  >
                                  <input
                                    type="number"
                                    v-model="alertQuantity"
                                    class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                    placeholder="Alert Quantity"
                                    required
                                    :disabled="disabledField"
                                  />
                                </div>
                                <div
                                  class="mb-4 w-full"
                                  v-if="id_role != 'EMPLY'"
                                >
                                  <label
                                    for="uom"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >Brand<span class="text-red">*</span></label
                                  >
                                  <select
                                    class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                    required
                                    v-model="selectedBrand"
                                    :disabled="disabledField"
                                  >
                                    <option disabled selected>Brand</option>
                                    <option
                                      v-for="(brand, i) in Brand"
                                      :key="i"
                                      :value="brand.id"
                                    >
                                      {{ brand.brand_name }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-4 w-full">
                                  <label
                                    for="id_item"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >Description</label
                                  >
                                  <input
                                    type="text"
                                    v-model="remarks"
                                    class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                    placeholder="Description"
                                    required
                                    :disabled="disabledField"
                                  />
                                </div>
                                <div class="mb-4 w-full">
                                  <label
                                    for="warehouse"
                                    class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                    >ATK Warehouse<span class="text-red"
                                      >*</span
                                    ></label
                                  >
                                  <Multiselect
                                    v-model="selectedWarehouse"
                                    mode="tags"
                                    placeholder="Select Warehouse"
                                    track-by="warehouse_name"
                                    label="warehouse_name"
                                    :close-on-select="false"
                                    :searchable="true"
                                    :options="Warehouse"
                                    :loading="isLoading"
                                    :disabled="disabledField"
                                  >
                                    <template
                                      v-slot:tag="{
                                        option,
                                        handleTagRemove,
                                        disabled,
                                      }"
                                    >
                                      <div
                                        class="multiselect-tag is-user"
                                        :class="{
                                          'is-disabled': disabled,
                                        }"
                                      >
                                        {{ option.warehouse_name }}
                                        <span
                                          v-if="!disabled"
                                          class="multiselect-tag-remove"
                                          @click="
                                            handleTagRemove(option, $event)
                                          "
                                        >
                                          <span
                                            class="multiselect-tag-remove-icon"
                                          ></span>
                                        </span>
                                      </div>
                                    </template>
                                  </Multiselect>
                                </div>
                              </div>
                              <div class="flex justify-center py-2">
                                <button
                                  class="btn text-white text-base font-JakartaSans font-bold w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
                                  @click="addItem"
                                  v-if="!disabledField"
                                >
                                  Add
                                </button>
                              </div>

                              <!-- INNER TABLE -->
                              <div class="inner-table px-6">
                                <table class="table table-compact w-full">
                                  <thead
                                    class="font-JakartaSans font-bold text-xs text-centre"
                                  >
                                    <tr class="bg-blue text-white h-8">
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                      >
                                        ATK Warehouse
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                      >
                                        ID Item
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                      >
                                        Item Name
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                        v-if="company_code != '8000'"
                                      >
                                        Brand
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                      >
                                        UOM
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                      >
                                        Alert Quantity
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                      >
                                        Remarks
                                      </th>
                                      <th
                                        class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs text-center"
                                        v-if="!disabledField"
                                      >
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    class="font-JakartaSans font-normal text-xs"
                                  >
                                    <tr
                                      class="h-16"
                                      v-for="(items, i) in arrItem"
                                      :key="i"
                                    >
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                      >
                                        {{ items.warehouse_name }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                      >
                                        {{ idItems }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                      >
                                        {{ itemNames }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                        v-if="company_code != '8000'"
                                      >
                                        {{ arrData.brand_name }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                      >
                                        {{ arrData.uom_name }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                      >
                                        {{ arrData.alert_qty }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9] text-center"
                                      >
                                        {{ arrData.remarks }}
                                      </td>
                                      <td
                                        class="border border-[#B9B9B9]"
                                        v-if="!disabledField"
                                      >
                                        <div
                                          class="flex flex-wrap justify-center items-center gap-2"
                                        >
                                          <button @click="removeItems(i)">
                                            <img
                                              :src="deleteicon"
                                              class="w-6 h-6"
                                            />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="sticky bottom-0 bg-white py-2">
                                <div class="flex justify-center gap-4 mr-6">
                                  <button
                                    v-if="id_role != 'EMPLY' && !disabledField"
                                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                                    @click="save"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </main>
                          </div>
                        </div>
                        <!-- END MODAL -->
                        <button
                          @click="deleteValue(data.id)"
                          v-if="id_role != 'EMPLY'"
                        >
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="9">Data Not Found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- PAGINATION -->
          <div
            class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
          >
            <p
              v-if="sortedData.length > 0"
              class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
            >
              Showing {{ (showingValue - 1) * pageMultiplier + 1 }} to
              {{ Math.min(showingValue * pageMultiplier, lenghtPagination) }}
              of {{ lenghtPagination }} entries
            </p>
            <p
              v-else
              class="font-JakartaSans text-xs font-normal text-[#888888] py-2"
            >
              Showing 0 to 0 of 0 entries
            </p>
            <vue-awesome-paginate
              v-if="sortedData.length > 0"
              :total-items="lenghtPagination"
              :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-jump-buttons="true"
            />
            <vue-awesome-paginate
              v-else
              total-items="0"
              :items-per-page="parseInt(pageMultiplierReactive)"
              :on-click="onChangePage"
              v-model="showingValue"
              :max-pages-shown="4"
              :show-breakpoint-buttons="false"
              :show-jump-buttons="true"
            />
          </div>
        </div>
      </div>
      <Footer class="fixed bottom-0 left-0 right-0" />
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

.my-date {
  width: 260px !important;
}

:disabled {
  background: #eeeeee !important;
  border-color: #eeeeee !important;
}

.detail-data {
  margin-top: -10px !important;
}

.inner-table {
  overflow-x: auto;
}
</style>
