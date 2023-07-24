<script setup>

import iconClose from "@/assets/navbar/icon_close.svg";
import iconPlus from "@/assets/navbar/icon_plus.svg";
import icondanger from "@/assets/icon-danger-circle.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import { ref, onMounted, watch } from "vue";
import Api from "@/utils/Api";
import { useMenuAccessStore } from '@/stores/savemenuaccess'
import { resetTracking } from "@vue/reactivity";

import Swal from "sweetalert2";


let selectedCompany = ref(props.formContent[1]);
let selectedSite = ref("Site");
let selectedWarehouse = ref("Warehouse")
let selectedUOM = ref("UOM")
let selectedBrand = ref("Brand")
let brandName = ref("");
let Company = ref("");
let Site = ref("");
let Warehouse = ref("");
let UOM = ref("")
let idItems = ref("")
let alertQuantity = ref("")
let Brand = ref("")
let itemNames = ref("")
let remark = ref("")
let id = ref(props.formContent[0])
const itemsTable = ref([])

// const emits = defineEmits(["unlockScrollbar"]);
const menuAccess = useMenuAccessStore()
const props = defineProps({
  roleId: Number,
  roleAccess: Array,
  formContent: Array,
  unlockScrollbar: Boolean
})
const currentCompany = ref(props.formContent[1]);
const currentSite = ref(props.formContent[2]);
const currentWarehouse = ref(props.formContent[3]);
const currentUOM = ref(props.formContent[4]);
const currentitemID = ref(props.formContent[5]);
const alertQTY = ref(props.formContent[6]);
const currentitemName = ref(props.formContent[7]);
const remarks = ref(props.formContent[8]);
const currentBrand = ref(props.formContent[9]);
selectedCompany.value = currentCompany.value
selectedSite.value = currentSite.value
selectedWarehouse.value = currentWarehouse.value
selectedUOM.value = currentUOM.value
// console.log(selectedUOM.value)
idItems.value = currentitemID.value
alertQuantity.value = alertQTY.value
itemNames.value = currentitemName.value
remark.value = remarks.value
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

const fetchUOM = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/uom");
  UOM.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchSite = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/site/get_data");
  Site.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchWH = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/warehouse");
  Warehouse.value = res.data.data;
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
const fetchBrandCompany = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/brand/get_by_company_id/${id_company}`);
  // console.log(res.data)
  Brand.value = res.data.data;
  selectedBrand.value = res.data.data[0].id
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
  
  
  const res = await Api.post(`/management_atk/update_data/${id.value}`,payload);
  Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  // lockScrollbar.value= false
};
//get kondisi local storage
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === 'ADMTR' ? fetchGetCompany() : fetchGetCompanyID(id_company)
  fetchUOM()
  fetchSite()
  fetchWH()
  fetchBrandCompany(selectedCompany.value)
  // const dataById = this.$emit('changeMenu')
  // console.log(currentbrandName)
  // console.log(ref(props.formConten0]))
};

const reset = async () => {
  selectedCompany.value = ''
  selectedSite.value = ''
  selectedWarehouse.value = ''
  selectedUOM.value = ''
  idItems.value = ''
  alertQuantity.value = ''
  itemNames.value = ''
  remark.value = ''
  selectedBrand.value = ''
};
onMounted(() => {
  fetchCondition()
});


</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-item-edit-atk"
    class="cursor-pointer"
    ><img :src="editicon" class="w-6 h-6"
  /></label>

  <input type="checkbox" id="my-modal-item-edit-atk" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
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
        <img :src="icondanger" class="w-5 h-5" />
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
                >ATK Warehouse<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black text-left"
                required
                v-model="selectedWarehouse"
              >
                <option disabled selected>ATK Warehouse</option>
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
                >Remarks<span class="text-red">*</span></label
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
              <button class="flex-shrink-0 bg-[#015289] text-sm border-4 text-white py-1 px-2 rounded" type="button" @click="generateNumber" disabled="true">
                <img :src="iconPlus" class="w-[10px] h-[10px]" />
              </button>
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
</template>

<style scoped>
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
