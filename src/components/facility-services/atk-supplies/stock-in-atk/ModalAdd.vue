<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icondanger from "@/assets/icon-danger-circle.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import { ref, onMounted, watch } from "vue";
import Api from "@/utils/Api";

let selectedCompany = ref("Company");
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
const itemsTable = ref([])
const emits = defineEmits(["unlockScrollbar"]);
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
//for get site in select
// const fetchGetSite = async () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   Api.defaults.headers.common.Authorization = `Bearer ${token}`;
//   const res = await Api.get("/site/get_data");
//   Site.value = res.data.data;
//   // console.log("ini data parent" + JSON.stringify(res.data.data));
// };
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
  // console.log(res)
  Brand.value = res.data.data;
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
//get kondisi local storage
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === 4 ? fetchGetCompany() : fetchGetCompanyID(id_company)
};

const addItem = async () => {

  itemsTable.value.push({
    id_item : 1,
    qty: alertQuantity.value,
    remarks: remark.value
  })
  reset()
  return itemsTable
};
const removeItems = async (id) => {

itemsTable.value.splice(id,1)
// return itemsTable
}
const save = async () => {
  const payload = {
    id_company: selectedCompany.value,
    id_site: selectedSite.value,
    id_warehouse: selectedWarehouse.value,
    remarks:remark.value,
    array_multi:itemsTable.value,
  }
  const res = await Api.post('stock_in/store',payload);
  Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    reset()
    defineEmits(["unlockScrollbar"])
};
const reset = async () => {
  selectedCompany.value = ''
  selectedSite.value = ''
  selectedWarehouse.value = ''
  selectedUOM.value = ''
  alertQuantity.value = ''
  itemNames.value = ''
  remark.value = ''
  selectedBrand.value = ''
};
onMounted(() => {
  fetchCondition()
  fetchUOM()
});
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-stock-in"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add Item</label
  >

  <input type="checkbox" id="my-modal-stock-in" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-stock-in"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Stock In
        </p>
      </nav>

      <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
        <img :src="icondanger" class="w-5 h-5" />
        <p class="font-JakartaSans font-semibold text-lg">Stock In Info</p>
      </div>

      <main class="modal-box-inner-brand pb-14">
        <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Site<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Details</label
              >
             <hr />
            </div>
          </div>
          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="warehouse"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Warehouse<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >UOM<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Item Name<span class="text-red">*</span></label
              >
              <input
                type="text"
                v-model="itemNames"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Item Name"
                required
              />
            </div>

            <div class="mb-6 w-full">
              <label
                for="alert"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Quantity<span class="text-red">*</span></label
              >
              <input
                type="number"
                v-model="alertQuantity"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Quantity"
                required
              />
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="uom"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Brand<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Remarks<span class="text-red">*</span></label
              >
              <input
                type="text"
                v-model="remark"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Remarks"
                required
              />
            </div>
          </div>

          <div class="flex justify-center py-2">
            <button
              class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
              @click="addItem"
            >
              Add
            </button>
          </div>

        <!-- INNER TABLE -->
        <div class="inner-table px-6">
          <table class="table table-compact w-full">
            <thead class="font-JakartaSans font-bold text-xs">
              <tr class="bg-blue text-white h-8">
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Warehouse
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
                  Remarks
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16" v-for="(items, i) in itemsTable" :key="i">
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]">{{ items.qty }}</td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]"></td>
                <td class="border border-[#B9B9B9]">{{ items.remarks }}</td>
                <td class="border border-[#B9B9B9]">
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
