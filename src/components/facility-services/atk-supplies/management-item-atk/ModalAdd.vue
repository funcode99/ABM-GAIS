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
import { useRouter } from 'vue-router'
const router = useRouter()


let selectedCompany = ref("Company");
let selectedSite = ref("Site");
let selectedWarehouse = ref("Warehouse")
let selectedUOM = ref("UOM")
let selectedBrand = ref("Brand")
let brandName = ref("");
let warehouseName = ref("");
let Company = ref("");
let Site = ref("");
let Warehouse = ref("");
let UOM = ref("")
let uomName = ref("")
let idItems = ref("")
let alertQuantity = ref("")
let Brand = ref("")
let itemNames = ref("")
let remark = ref("")
const itemsTable = ref([])
const itemsTable2 = ref([])
let disableCompany = ref(false)
let disableSite = ref(false)
let addModal = ref(false)

const emits = defineEmits(["unlockScrollbar", "close"]);
const menuAccess = useMenuAccessStore()

// const props = defineProps({
//   roleId: Number,
//   roleAccess: Array,
//   unlockScrollbar:Boolean
// })
// console.log(props.unlockScrollbar)
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
  // warehouseName.value = res.data.data.filter(
  //     (item) => item.id_warehouse === selectedWarehouse.value
  //   );
  // console.log(warehouseName.value)
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
//get kondisi local storage
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === 4 ? fetchGetCompany() : fetchGetCompanyID(id_company)
};

const generateNumber = async () => {
  idItems.value = Math.floor(100000000 + Math.random() * 900000000);
};
const addItem = async () => {
  const wh = Warehouse.value
  for (let index = 0; index < wh.length; index++) {
    const element = wh[index];
    if(element.id == selectedWarehouse.value){
      warehouseName.value = element.warehouse_name
    }
  }
  const br = Brand.value
  for (let index = 0; index < br.length; index++) {
    const element = br[index];
    if(element.id == selectedBrand.value){
      brandName.value = element.brand_name
    }
  }
  const uom = UOM.value
  for (let index = 0; index < uom.length; index++) {
    const element = uom[index];
    if(element.id == selectedUOM.value){
      uomName.value = element.uom_name
    }
  }
  // console.log(warehouseName.value)
  itemsTable.value.push({
    code_item: idItems.value,
    item_name: itemNames.value,
    id_brand:selectedBrand.value,
    id_uom: selectedUOM.value,
    alert_qty : alertQuantity.value,
    id_company: selectedCompany.value,
    id_site: selectedSite.value,
    id_warehouse: selectedWarehouse.value,
    current_stock: "",
    remarks:remark.value,
    nameWarehouse : warehouseName.value,
    namaBrand : brandName.value,
    namaUOM : uomName.value
  })
  
  resetButCompanyDisable()
  return itemsTable
};
const removeItems = async (id) => {
// console.log(id)
itemsTable.value.splice(id,1)
if(id == 0){
  disableSite.value = false
  disableCompany.value = false
  reset()
}
// return itemsTable
}
// console.log(emits('close'))
const save = async () => {
  
  const payload = {
    array_multi:itemsTable.value,
  }
  Api.post('management_atk/store_multi/',payload).then((res) => {
  Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    reset()
    addModal.value = false
    emits("close");
  }).catch((error) =>{
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    // console.log(error.response.data.message)
  })
    
    // console.log(router.go({path : '/managementitem'}))
    // router.go({path : '/managementitem'})
    // defineEmits(["unlockScrollbar"])
};
const coba = async () => {
  addModal.value = true
}
const coba2 = async () => {
  addModal.value = false
}
const reset = async () => {
  disableSite.value = false
  disableCompany.value = false
  selectedCompany.value = ''
  selectedSite.value = ''
  selectedWarehouse.value = ''
  selectedUOM.value = ''
  idItems.value = ''
  alertQuantity.value = ''
  itemNames.value = ''
  remark.value = ''
  selectedBrand.value = ''
  itemsTable.value= []
};
const resetButCompanyDisable = async () => {
  disableSite.value = true
  disableCompany.value = true
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
  fetchUOM()
});
</script>

<template>
  <label
    @click="coba"
    for="my-modal-item-atk"
    class="btn btn-success bg-green border-green hover:bg-none text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add Item</label
  >

  <input type="checkbox" v-if="addModal == true" id="my-modal-item-atk" class="modal-toggle" />
  <div class="modal" v-if="addModal == true">
    <div class="modal-dialog bg-white w-3/5">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="coba2"
          for="my-modal-item-atk"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New Item
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
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                required
                v-model="selectedCompany"
                @change="changeCompany(selectedCompany)"
                :disabled="disableCompany"
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
                :disabled="disableSite"
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
                >Alert Quantity<span class="text-red">*</span></label
              >
              <input
                type="number"
                v-model="alertQuantity"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Alert Quantity"
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
                >Remarks</label
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
          <div class="flex justify-start px-6 items-center gap-2">
            <label
                for="warehouse"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >ID Items<span class="text-red">*</span></label
              >
          </div>
          <div class="flex justify-start px-6 items-center gap-2">
            <div class="flex items-center border-b border-teal-500 py-2 mb-6 w-full">
              <input class="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" v-model="idItems" maxlength="9" type="number" placeholder="ID Item" aria-label="Full name">
              <button class="flex-shrink-0 bg-[#015289] text-sm border-4 text-white py-1 px-2 rounded" type="button" @click="generateNumber">
                <img :src="iconPlus" class="w-[10px] h-[10px]" />
              </button>
            </div>
            <div class="mb-6 w-full"></div>
          </div>

          <div class="flex justify-center py-2">
            <button
              class="btn text-white text-base font-JakartaSans font-bold w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
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
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  Warehouse
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  ID Item
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  Item Name
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  Brand
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  UOM
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  Alert Quantity
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  Remarks
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue font-JakartaSans font-bold text-xs"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16" v-for="(items, i) in itemsTable" :key="i">
                <td class="border border-[#B9B9B9]">{{ items.nameWarehouse }}</td>
                <td class="border border-[#B9B9B9]">{{ items.code_item }}</td>
                <td class="border border-[#B9B9B9]">{{ items.item_name }}</td>
                <td class="border border-[#B9B9B9]">{{ items.namaBrand }}</td>
                <td class="border border-[#B9B9B9]">{{ items.namaUOM }}</td>
                <td class="border border-[#B9B9B9]">{{ items.alert_qty }}</td>
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

      <!-- <div class="sticky bottom-0 bg-white py-2"> -->
        <div class="flex justify-center py-2">
          <button
            class="btn text-white text-base font-JakartaSans font-bold w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            @click="save"
          >
            Save
          </button>
        </div>
      <!-- </div> -->
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
