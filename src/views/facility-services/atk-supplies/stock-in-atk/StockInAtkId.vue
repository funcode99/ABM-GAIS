<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import icondanger2 from "@/assets/icon-danger-circle.png";
import iconClose from "@/assets/navbar/icon_close.svg";
import ModalAdd from "@/components/facility-services/atk-supplies/stock-in-atk/ModalAdd.vue";

import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar.js";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import moment from "moment";

const sidebar = useSidebarStore();
const router = useRouter();
let lengthCounter = 0;
const idData = router.currentRoute.value.params.id;
const idDetail = ref("");
let stockName = ref("");
let createdDate = ref("");
let createdBy = ref("");
let brandName = ref("");
let warehouseName = ref("");
let namaItem = ref("");
let uomName = ref("");
let Company = ref("");
let Site = ref("");
let Warehouse = ref("");
let Item = ref("");
let UOM = ref("");
let UOMName = ref("");
let idItems = ref("");
let ItemsName = ref("");
let alertQuantity = ref("");
let Brand = ref("");
let itemNames = ref("");
let itemNamesSelect = ref("");
let remark = ref("");
let siteName = ref("");
let companyName = ref("");
let status = ref("");
let statusValue = ref(false);
let ItemTable = ref([]);
let lockScrollbarEdit = ref(false);
const selectedCompany = ref("");
const selectedSite = ref("");
const selectedWarehouse = ref("");
const selectedBrand = ref("");
const selectedUOM = ref("");
let itemsTable = ref([]);
const company_code = JSON.parse(localStorage.getItem("company_code"));
let arrData = ref([]);
let arrItem = ref([]);

let statusForm = ref("edit");
let visibleModal = ref(false);
let idItem = ref(0);

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/stock_in/get/${id}`);
  arrData.value = res.data.data[0];
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    companyName.value = element.company_name;
    stockName.value = element.no_stock_in;
    createdDate.value = format_date(element.created_at);
    createdBy.value = element.name_created;
    siteName.value = element.site_name;
    status.value = element.status;
  }
};
const fetchDetailById = async (id, type) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/stock_in/get_by_stock_in_id/${id}`);
  arrItem.value = res.data.data;

  ItemTable.value = [];
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];

    ItemTable.value.push({
      Warehouse: element.warehouse_name,
      itemNames: element.item_name,
      idItems: element.code_item,
      alertQuantity: element.qty,
      brandName: element.brand_name,
      UOMName: element.uom_name,
      remark: element.remarks,
    });
    itemsTable.value.push({
      id_warehouse: element.id_warehouse,
      remarks: element.remark,
      id_item: element.id_item,
      id_brand: element.id_brand,
      id_uom: element.id_uom,
      qty: element.qty,
      Warehouse: element.warehouse_name,
      itemNames: element.item_name,
      idItems: element.code_item,
      alertQuantity: element.qty,
      brandName: element.brand_name,
      UOMName: element.uom_name,
      remark: element.remarks,
    });
  }
};

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.post(
    `/stock_in/submit/${router.currentRoute.value.params.id}`
  );
  Swal.fire({
    position: "center",
    icon: "success",
    title: res.data.message,
    showConfirmButton: false,
    timer: 1500,
  });
  // reset()
  router.push({
    path: "/stockinatk",
  });
};

const openModal = (type, id) => {
  visibleModal.value = true;
  statusForm.value = type;
  if (id) {
    idItem.value = parseInt(id);
  }
};

const closeModal = () => {
  visibleModal.value = false;
  fetchDataById(router.currentRoute.value.params.id);
  fetchDetailById(router.currentRoute.value.params.id, "close");
};

onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(router.currentRoute.value.params.id);
  fetchDetailById(router.currentRoute.value.params.id);
  idDetail.value = router.currentRoute.value.params.id;
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD-MM-YYYY");
  }
};
</script>

<template>
  <div
    class="flex flex-col basis-full grow-0 shrink-0 w-full h-full overflow-y-hidden"
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
          <!-- HEADER -->
          <div class="flex justify-between">
            <router-link
              to="/stockinatk"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h3 class="text-blue font-semibold font-JakartaSans text-2xl">
                {{ stockName }}
              </h3>
            </router-link>
            <div class="flex justify-start gap-4 mx-4 py-4">
              <!-- <button
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
              >
                Draft
              </button> -->
              <span
                class="badge text-blue text-base font-JakartaSans font-bold capitalize w-[100px] h-[30px] border-blue bg-white"
              >
                {{ status }}
              </span>
              <!-- <button
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit
              </button> -->
            </div>
          </div>

          <div class="flex justify-between ml-10">
            <div class="flex gap-2">
              <label
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
                v-if="status == 'Draft'"
                @click="openModal('edit', idData)"
                for="my-modal-stock-in"
              >
                Edit
              </label>
              <button
                v-if="status == 'Draft'"
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit</button
              ><br />
            </div>
          </div>
          <ModalAdd
            @close="closeModal"
            :status="statusForm"
            :id="idItem"
            v-if="visibleModal"
            :dataArr="arrData"
            :dataItem="arrItem"
          />
          <!-- <input type="checkbox" v-if="lockScrollbarEdit == true" id="my-modal-stock-edit-atk" class="modal-toggle" />
          <div v-if="lockScrollbarEdit == true" class="modal">
            <div class="modal-dialog bg-white w-3/5 rounded-2xl">
              <nav class="sticky top-0 z-50 bg-[#015289] rounded-t-2xl">
                <label @click="coba2" class="cursor-pointer absolute right-3 top-3">
                  <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
                </label>
                <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2 text-start">
                  Edit Stock In
                </p>
              </nav>

              <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4 mb-6">

                <p class="font-JakartaSans font-semibold">

                </p>
              </div>

              <main class="modal-box-inner-brand pb-14">
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="company"
                      class="block text-black text-left mb-2 font-JakartaSans font-medium text-sm">Company<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                      required v-model="selectedCompany" @change="changeCompany(selectedCompany)">
                      <option disabled selected>Company</option>
                      <option v-for="(company,i) in Company" :key="i" :value="company.id">
                        {{ company.company_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6 w-full">
                    <label for="site"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Site<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                      required v-model="selectedSite" @change="changeSite(selectedSite)">
                      <option disabled selected>Site</option>
                      <option v-for="(site,i) in Site" :key="i" :value="site.id">
                        {{ site.site_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="detail"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">Details</label>
                    <hr />
                  </div>
                </div>
                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="warehouse"
                      class="block mb-2 font-JakartaSans font-medium text-sm text-black text-left">ATK Warehouse<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                      required v-model="selectedWarehouse" @change="fetItems(selectedWarehouse)">
                      <option disabled selected>Warehouse</option>
                      <option v-for="(warehouse,i) in Warehouse" :key="i" :value="warehouse.id">
                        {{ warehouse.warehouse_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6 w-full">
                    <label for="item_name" class="block mb-2 font-JakartaSans font-medium text-sm">Item Name<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      required v-model="itemNamesSelect" @change="changeUomBrand(itemNamesSelect)">
                      <option disabled selected>Item</option>
                      <option v-for="(item,i) in Item" :key="i" :value="item.id">
                        {{ item.code_item }} - {{ item.item_name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full">
                    <label for="uom" class="block mb-2 font-JakartaSans font-medium text-sm">UOM<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      required v-model="selectedUOM" disabled="true" style="background-color: 	#D3D3D3;">
                      <option disabled selected>UOM</option>
                      <option v-for="(uom,i) in UOM" :key="i" :value="uom.id">
                        {{ uom.uom_name }}
                      </option>
                    </select>
                  </div>

                  <div class="mb-6 w-full">
                    <label for="alert" class="block mb-2 font-JakartaSans font-medium text-sm">Quantity<span
                        class="text-red">*</span></label>
                    <input type="number" v-model="alertQuantity"
                      class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Quantity" required />
                  </div>
                </div>

                <div class="flex justify-between px-6 items-center gap-2">
                  <div class="mb-6 w-full" v-if="company_code != '8000'">
                    <label for="uom" class="block mb-2 font-JakartaSans font-medium text-sm">Brand<span
                        class="text-red">*</span></label>
                    <select
                      class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      required v-model="selectedBrand" disabled="true" style="background-color: 	#D3D3D3;">
                      <option disabled selected>Brand</option>
                      <option v-for="(brand,i) in Brand" :key="i" :value="brand.id">
                        {{ brand.brand_name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6" :class="company_code != '8000' ? 'w-full' : 'w-[50%]'">
                    <label for="id_item" class="block mb-2 font-JakartaSans font-medium text-sm">Remarks</label>
                    <input type="text" v-model="remark"
                      class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Remarks" required />
                  </div>
                </div>
                <div class="flex justify-center py-2">
                  <button
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
                    @click="addItem">
                    Add
                  </button>
                </div>
                <div class="inner-table px-6">
                  <table class="table table-compact w-full">
                    <thead class="font-JakartaSans font-bold text-xs">
                      <tr class="bg-blue text-white h-8">
                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center">
                          ATK Warehouse
                        </th>

                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center">
                          Item Name
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center">
                          Quantity
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center" v-if="company_code != '8000'">
                          Brand
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center">
                          UOM
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center">
                          Remarks
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="font-JakartaSans font-normal text-xs">
                      <tr class="h-16" v-for="(value, i) in itemsTable" :key="i">
                        <td class="border border-[#B9B9B9] text-center">{{ value.Warehouse }}</td>
                        <td class="border border-[#B9B9B9] text-center">{{ value.itemNames }}</td>
                        <td class="border border-[#B9B9B9] text-center">{{ value.alertQuantity }}</td>
                        <td class="border border-[#B9B9B9] text-center" v-if="company_code != '8000'">{{ value.brandName }}</td>
                        <td class="border border-[#B9B9B9] text-center">{{ value.UOMName }}</td>
                        <td class="border border-[#B9B9B9] text-center">{{ value.remark }}</td>
                        <td class="border border-[#B9B9B9] text-center">
                          <div class="flex flex-wrap justify-center items-center gap-2">
                            <button @click="removeItems(i)">
                              <img :src="deleteicon" class="w-6 h-6" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </main>
              <div class="sticky bottom-0 bg-white py-2">
                <div class="flex justify-center gap-4">
                  <button
                    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                    @click="save">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div> -->

          <!-- <div class="flex justify-between ml-10 mt-8">
            <div class="flex gap-2">
              <h1 class="font-JakartaSans font-medium text-lg">Document No : {{ stockName }}</h1>
            </div>
          </div> -->
          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-3 pt-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created Date</span
              >
              <input
                type="text"
                disabled
                v-model="createdDate"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Created By</span
              >
              <input
                type="text"
                disabled
                v-model="createdBy"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Company</span>
              <input
                type="text"
                disabled
                v-model="companyName"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Site</span>
              <input
                type="text"
                disabled
                v-model="siteName"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
          </div>
          <!-- TAB & TABLE-->
          <div class="bg-blue rounded-lg pt-2 mx-[70px]">
            <div
              class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
            >
              <div
                class="absolute bg-black h-full w-3 left-0 top-0 rounded-tl-lg"
              ></div>
              <p class="font-JakartaSans font-normal text-sm mx-8">Details</p>
            </div>
            <div class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      ATK Warehouse
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      ID Item
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Item Name
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Quantity
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      v-if="company_code != '8000'"
                    >
                      Brand
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      UOM
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Remark
                    </th>
                    <!-- <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Action
                    </th> -->
                  </tr>
                </thead>
                <tbody
                  class="font-JakartaSans font-normal text-xs"
                  v-for="(value, ind) in ItemTable"
                  :key="ind"
                >
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">
                      {{ value.Warehouse }}
                    </td>
                    <td class="border border-[#B9B9B9]">{{ value.idItems }}</td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.itemNames }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.alertQuantity }}
                    </td>
                    <td
                      class="border border-[#B9B9B9]"
                      v-if="company_code != '8000'"
                    >
                      {{ value.brandName }}
                    </td>
                    <td class="border border-[#B9B9B9]">{{ value.UOMName }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.remark }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-brand {
  height: 450px;
  --tw-scale-x: 1;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.inner-table {
  overflow-x: auto;
}
</style>
