<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import icon_filter from "@/assets/icon_filter.svg";
import icon_reset from "@/assets/icon_reset.svg";
import arrowicon from "@/assets/navbar/icon_arrow.svg";
import icon_receive from "@/assets/icon-receive.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import icondanger from "@/assets/Danger.png";
import iconPlus from "@/assets/navbar/icon_plus.svg";
import icondanger2 from "@/assets/icon-danger-circle.png";
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import gearicon from "@/assets/system-configuration-not-selected.png";

import ModalAdd from "@/components/facility-services/atk-supplies/management-item-atk/ModalAdd.vue";
import ModalEdit from "@/components/facility-services/atk-supplies/management-item-atk/ModalEdit.vue";
import Swal from "sweetalert2";

// import itemdata from "@/utils/Api/facility-service-system/management-item-atk/itemdata.js";

import { ref, onBeforeMount, computed, onMounted } from "vue";

import { useSidebarStore } from "@/stores/sidebar.js";
import Api from "@/utils/Api";
const sidebar = useSidebarStore();

//for sort & search
let selectedCompany = ref("Company");
let selectedWarehouse = ref("Warehouse")
let selectedSite = ref("Site");
// let selectedWarehouse = ref("Warehouse")
let selectedUOM = ref("UOM")
let selectedBrand = ref("Brand")
let brandName = ref("");
// let Company = ref("");
let Site = ref("");
// let Warehouse = ref("");
let UOM = ref("")
let idItems = ref("")
let alertQuantity = ref("")
let Brand = ref("")
let itemNames = ref("")
let remark = ref("")
const date = ref();
const search = ref("");
let sortedData = ref([]);
const selectedType = ref("Item");
const selectedTypeWarehouse = ref("Warehouse");
const selectedTypeCompany = ref("Company");
let sortedbyASC = true;
let instanceArray = [];
let lengthCounter = 0;
let lockScrollbar = ref(false);
let lockScrollbarEdit = ref(false);
let Company = ref("");
let Warehouse = ref("");
let itemdata = ref("")
let editData = ref("")
let idS = ref("")
let checkedAlert = ref(false)

//for paginations
let showingValue = ref(1);
let pageMultiplier = ref(10);
let pageMultiplierReactive = computed(() => pageMultiplier.value);
let paginateIndex = ref(0);

//for paginations
const onChangePage = (pageOfItem) => {
  paginateIndex.value = pageOfItem - 1
  showingValue.value = pageOfItem
};

//for filter & reset button
const filterDataByType = () => {
  // console.log(selectedCompany.value)
  if(selectedType.value != ''){
    sortedData.value = instanceArray.filter(
      (item) => item.item_name === selectedType.value
    );
  }
  if(selectedCompany.value != ''){
    sortedData.value = instanceArray.filter(
      (item) => item.id_company === selectedCompany.value
    );
  }
  if (selectedWarehouse.value != ''){
    sortedData.value = instanceArray.filter(
      (item) => item.id_warehouse === selectedWarehouse.value
    );
  }
  // else{
  //   sortedData.value = filteredR;
  //   lengthCounter = sortedData.value.length;
  //   onChangePage(1);
  // }
  // if (selectedType.value === "") {
  //   sortedData.value = instanceArray;
  // } else {
  //   sortedData.value = instanceArray.filter(
  //     (item) => item.item_name === selectedType.value
  //   );
  // }
};

//for filter & reset button
const resetData = () => {
  sortedData.value = instanceArray;
  selectedType.value = "Type";
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
  { Id: 4, title: "Warehouse", jsonData: "warehouse_name" },
  { Id: 5, title: "Stock Available", jsonData: "current_stock" },
  { Id: 6, title: "Alert Quantity", jsonData: "alert_qty" },
  { Id: 7, title: "UOM", jsonData: "uom_name" },
  { Id: 8, title: "Actions" },
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
//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

const fetchGetCompanyID = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  // const id_company = JSON.parse(localStorage.getItem("id_company"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_company}`);
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchSite = async (id, id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  Site.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if(id === element.id){
      selectedSite.value = id
    }
  }
};
const fetchWarehouse = async (id, id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/warehouse/get_by_company_id/${id_company}`);
  Warehouse.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if(id === element.id){
      selectedWarehouse.value = id
    }
  }
};
const fetchBrand = async (id, id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/brand/get_by_company_id/${id_company}`);
  Brand.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if(id === element.id){
      selectedBrand.value = id
    }
  }
};
const fetchBrandCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/brand/get_by_company_id/${id_company}`);
  Brand.value = res.data.data;
};
const fetchUOM = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/uom");
  UOM.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if(id === element.id){
      selectedUOM.value = id
    }
  }
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === 4 ? fetchGetCompany() : fetchGetCompanyID(id_company)
  // changeCompany()
};
const fetchData = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/management_atk/get");
  // console.log(res.data.data)
  itemdata.value = res.data.data.data;
  instanceArray = itemdata.value;
  // console.log(instanceArray)
  sortedData.value = instanceArray;
  lengthCounter = sortedData.value.length;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const changeCompany = async (id_company) => {
  fetchBrandCompany(id_company)
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
  // console.log(res)
  Warehouse.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const changeWarehouseCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/warehouse/get_by_company_id/${id_company}`);
  // console.log(res)
  Warehouse.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

const editValue = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/management_atk/get/${id}`);
  // console.log(res.data.data)
  // editData.value = res.data.data.data;
  idS.value = id
  selectedCompany.value = res.data.data[0].id_company
  selectedSite.value = fetchSite(res.data.data[0].id_site, res.data.data[0].id_company)
  selectedWarehouse.value = fetchWarehouse(res.data.data[0].id_warehouse, res.data.data[0].id_company)
  selectedUOM.value = fetchUOM(res.data.data[0].id_uom)
  itemNames.value = res.data.data[0].item_name
  alertQuantity.value = res.data.data[0].alert_qty
  selectedBrand.value = fetchBrand(res.data.data[0].id_brand, res.data.data[0].id_company)
  remark.value = res.data.data[0].remarks
  idItems.value = res.data.data[0].code_item
  lockScrollbarEdit.value = true
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const save = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const payload = {
    code_item : idItems.value,
    item_name : itemNames.value,
    id_brand : selectedBrand.value,
    id_uom : selectedUOM.value,
    alert_qty: alertQuantity.value,
    id_company: selectedCompany.value,
    id_site: selectedSite.value,
    id_warehouse: selectedWarehouse.value,
    remarks: remark.value
  }
  
  
  const res = await Api.post(`/management_atk/update_data/${idS.value}`,payload);
  Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    fetchData()
    lockScrollbarEdit.value = false
  // lockScrollbar.value= false
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
        fetchData()
      });
    } else {
      return;
    }
  });
    
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
onBeforeMount(() => {
  getSessionForSidebar();
  fetchCondition()
  fetchData()
});
//for searching
const filteredItems = (search) => {
  sortedData.value = instanceArray;
  const filteredR = sortedData.value.filter((item) => {
    // console.log(item)
    (item.code_item.toLowerCase().indexOf(search.toLowerCase()) > -1) ||
      (item.item_name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
      (item.code_item.toLowerCase().indexOf(search.toLowerCase()) > -1) ||
      (item.item_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
  });
  sortedData.value = filteredR;
  lengthCounter = sortedData.value.length;
  onChangePage(1);
};
const selectAlert = (checked) => {
  sortedData.value = instanceArray;
  // console.log(checked)
  if(checked === false){
    const filteredR = sortedData.value.filter((item) => {
    if(item.current_stock <= item.alert_qty){
      return((item.alert_qty))
      }
    });
    sortedData.value = filteredR;
    lengthCounter = sortedData.value.length;
    onChangePage(1);
  }else{
    sortedData.value = instanceArray;
    lengthCounter = sortedData.value.length;
    onChangePage(1);
  }
  
};

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
</script>

<template>
  <div
    class="flex flex-col w-full this"
    :class="lockScrollbar === true ? 'fixed' : ''"
  >
    <Navbar />

    <div class="flex w-screen mt-[115px]">
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
            <p class="font-JakartaSans text-base capitalize text-[#0A0A0A] font-semibold">
              Management Item ATK
            </p>

            <div class="flex justify-between gap-4 items-center">
              <button
                class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
              >
                <img :src="gearicon" class="w-6 h-6" />
              </button>

              <ModalAdd @unlock-scrollbar="lockScrollbar = !lockScrollbar" />

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
                  Item
                </p>
                <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedType"
                >
                  <option disabled selected>Item</option>
                  <option v-for="data in sortedData" :key="data.id">
                    {{ data.item_name }}
                  </option>
                </select>
              </div>

              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Company
                </p>
                <!-- <select
                  class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  v-model="selectedTypeCompany"
                >
                  <option disabled selected>Company</option>
                  <option v-for="data in sortedData" :key="data.id">
                    {{ data.company }}
                  </option>
                </select> -->
                <select
                class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                required
                v-model="selectedCompany"
                @change="changeWarehouseCompany(selectedCompany)"
              >
                <option disabled selected>Company</option>
                <option v-for="(company,i) in Company" :key="i" :value="company.id">
                  {{ company.company_name }}
                </option>
              </select>
              </div>

              <div>
                <p
                  class="capitalize font-JakartaSans text-xs text-black font-medium pb-2"
                >
                  Warehouse
                </p>
                <select
                  class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  required
                  v-model="selectedWarehouse"
                >
                  <option disabled selected>Warehouse</option>
                  <option v-for="(warehouse,i) in Warehouse" :key="i" :value="warehouse.id">
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
                      v-for="data in tableHead"
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

                <tbody>
                  <tr
                    :class="data.current_stock <= data.alert_qty ? 'font-JakartaSans font-normal text-sm text-red' : 'font-JakartaSans font-normal text-sm'"
                    v-for="(data, index) in sortedData.slice(
                      paginateIndex * pageMultiplierReactive,
                      (paginateIndex + 1) * pageMultiplierReactive
                    )"
                    :key="data.id"
                  >
                    <td class="p-0">
                      <input type="checkbox" name="checks" />
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ index + 1 }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.code_item === null ? '-' : data.code_item }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.item_name === null ? '-' : data.item_name  }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.warehouse_name === null ? '-' : data.warehouse_name }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.current_stock === null ? '-' :  data.current_stock}}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.alert_qty === null ? '-' : data.alert_qty }}
                    </td>
                    <td class="font-JakartaSans font-normal text-sm p-0">
                      {{ data.uom_name === null ? '-' : data.uom_name }}
                    </td>
                    <td class="flex flex-nowrap gap-1 justify-center">
                      <!-- <ModalEdit
                        @
                        @unlock-scrollbar="lockScrollbar = !lockScrollbar"
                      /> -->
                      <label
                      @click="editValue(data.id)"
                      for="my-modal-item-edit-atk"
                      class="cursor-pointer"
                      ><img :src="editicon" class="w-6 h-6"
                    /></label>

                    <input type="checkbox" id="my-modal-item-edit-atk" class="modal-toggle" />
                    <div v-if="lockScrollbarEdit" class="modal">
                      <div class="modal-dialog bg-white w-3/5">
                        <nav class="sticky top-0 z-50 bg-[#015289]">
                          <label
                            @click="lockScrollbar"
                            for="my-modal-item-edit-atk"
                            class="cursor-pointer absolute right-3 top-3"
                          >
                            <img :src="iconClose" class="w-[24px] h-[24px] hover:scale-75" />
                          </label>
                          <p class="font-JakartaSans font-semibold text-white mx-4 py-2 text-start">
                            Edit Item
                          </p>
                        </nav>

                        <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
                          <img :src="icondanger2" class="w-5 h-5" />
                          <p class="font-JakartaSans font-semibold">
                            Item Info
                          </p>
                        </div>

                        <main class="modal-box-inner-brand pb-14">
                            <div class="flex justify-between px-6 items-center gap-2">
                              <div class="mb-6 w-full">
                                <label
                                  for="company"
                                  class="block text-black text-left mb-2 font-JakartaSans font-medium text-sm"
                                  >Company<span class="text-red">*</span></label
                                >
                                <select
                                  class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                                  required
                                  v-model="selectedCompany"
                                  @change="changeCompany(selectedCompany)"
                                >
                                  <option disabled selected>Company</option>
                                  <option v-for="(company,i) in Company" :key="i" :value="company.id">
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
                                >
                                  <option disabled selected>Site</option>
                                  <option v-for="(site,i) in Site" :key="i" :value="site.id">
                                    {{ site.site_name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="flex justify-between px-6 items-center gap-2">
                              <div class="mb-6 w-full">
                                <label
                                  for="detail"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >Details</label
                                >
                              <hr />
                              </div>
                            </div>
                            <div class="flex justify-between px-6 items-center gap-2">
                              <div class="mb-6 w-full">
                                <label
                                  for="warehouse"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >Warehouse<span class="text-red">*</span></label
                                >
                                <select
                                  class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  required
                                  v-model="selectedWarehouse"
                                >
                                  <option disabled selected>Warehouse</option>
                                  <option v-for="(warehouse,i) in Warehouse" :key="i" :value="warehouse.id">
                                    {{ warehouse.warehouse_name }}
                                  </option>
                                </select>
                              </div>
                              <div class="mb-6 w-full">
                                <label
                                  for="uom"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >UOM<span class="text-red">*</span></label
                                >
                                <select
                                  class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  required
                                  v-model="selectedUOM"
                                >
                                  <option disabled selected>UOM</option>
                                  <option v-for="(uom,i) in UOM" :key="i" :value="uom.id">
                                    {{ uom.uom_name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="flex justify-between px-6 items-center gap-2">
                              <div class="mb-6 w-full">
                                <label
                                  for="item_name"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >Item Name<span class="text-red">*</span></label
                                >
                                <input
                                  type="text"
                                  v-model="itemNames"
                                  class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  placeholder="Item Name"
                                  required
                                />
                              </div>
                              
                              <div class="mb-6 w-full">
                                <label
                                  for="alert"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >Alert Quantity<span class="text-red">*</span></label
                                >
                                <input
                                  type="number"
                                  v-model="alertQuantity"
                                  class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  placeholder="Alert Quantity"
                                  required
                                />
                              </div>
                            </div>

                            <div class="flex justify-between px-6 items-center gap-2">
                              <div class="mb-6 w-full">
                                <label
                                  for="uom"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >Brand<span class="text-red">*</span></label
                                >
                                <select
                                  class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  required
                                  v-model="selectedBrand"
                                >
                                  <option disabled selected>Brand</option>
                                  <option v-for="(brand,i) in Brand" :key="i" :value="brand.id">
                                    {{ brand.brand_name }}
                                  </option>
                                </select>
                              </div>
                              <div class="mb-6 w-full">
                                <label
                                  for="id_item"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >Remarks</label
                                >
                                <textarea
                                  type="text"
                                  v-model="remark"
                                  class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                                  placeholder="Remarks"
                                  required
                                />
                              </div>
                            </div>
                            <div class="flex justify-start px-6 items-center gap-2">
                              <label
                                  for="warehouse"
                                  class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left"
                                  >ID Items<span class="text-red">*</span></label
                                >
                            </div>
                            <div class="flex justify-start px-6 items-center gap-2">
                              <div class="flex items-center border-b border-teal-500 py-2 mb-6 w-full">
                                <input class="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" v-model="idItems" maxlength="9" type="number" placeholder="ID Item" aria-label="Full name" disabled="true">
                              </div>
                              <div class="mb-6 w-full"></div>
                            </div>

                        </main>

                        <div class="sticky bottom-0 bg-white py-2">
                          <div class="flex justify-center gap-4 mr-6">
                            <button
                              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                              @click="save"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                      <button @click="deleteValue(data.id)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
</style>
