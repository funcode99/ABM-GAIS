<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icondanger from "@/assets/icon-danger-circle.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import { ref, onMounted, watch } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router'
const router = useRouter()
let selectedCompany = ref("Company");
let selectedSite = ref("Site");
let selectedWarehouse = ref("Warehouse")
let selectedEmployee = ref(JSON.parse(localStorage.getItem("id_employee")))
let selectedUOM = ref("UOM")
let selectedBrand = ref("Brand")
let selectedAdjusment = ref("Adjusment Type")
let quantityOpname = ref("")
let brandName = ref("");
let Adjusment = ref([])
let Company = ref("");
let Site = ref("");
let Item = ref("")
let Warehouse = ref("");
let UOM = ref("")
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
  // changeUomBrand(id_company)
  fetItems(id_company)
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  // console.log(res)
  Site.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchBrand = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get('/brand/');
  // console.log(res)
  Brand.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetItems = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/management_atk/get_by_company/${id_company}`);
  // console.log(res.data.data)
  Item.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const changeUomBrand = async (id_item) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/management_atk/get_by_company/${selectedCompany.value}`);
  // console.log(id_item)
  // Warehouse.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if(id_item === element.id){
      selectedBrand.value = element.id_brand
      selectedUOM.value = element.id_uom
    }
  }
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
  Adjusment.value.push({name:'addition'},{ name:'substraction'})
};

const addItem = async () => {

  itemsTable.value.push({
    id_company: selectedCompany.value,
    id_departement: '',
    id_site: selectedSite.value,
    id_warehouse: selectedWarehouse.value,
    id_employee : selectedEmployee.value,
    remarks:remark.value,
    id_item: itemNames.value,
    id_brand:selectedBrand.value,
    id_uom: selectedUOM.value,
    qty : alertQuantity.value,
    qtyOpname : quantityOpname.value,
    adjusment: selectedAdjusment.value,
  })

  itemsTable2.value.push({
    id_item: itemNames.value,
    adjustment_type: selectedAdjusment.value,
    qty_adjustment : quantityOpname.value,
    remarks:remark.value,
  })
  resetButCompanyDisable()
  return itemsTable
  // return itemsTable2
};
const resetButCompanyDisable = async () => {
  disableSite.value = true
  disableCompany.value = true
  // selectedWarehouse.value = ''
  selectedUOM.value = ''
  idItems.value = ''
  alertQuantity.value = ''
  itemNames.value = ''
  remark.value = ''
  selectedBrand.value = ''
  quantityOpname.value = ''
  selectedAdjusment.value= ''
};
const removeItems = async (id) => {

itemsTable.value.splice(id,1)
if(id == 0){
  disableSite.value = false
  disableCompany.value = false
  reset()
}
// return itemsTable
}
const save = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const payload = {
    id_company:selectedCompany.value,
    id_departement:1,
    id_site:selectedSite.value,
    id_warehouse:selectedWarehouse.value,
    id_employee:selectedEmployee.value,
    remarks : remark.value,
    array_detail:itemsTable2.value
  }
  Api.post('stock_opname/store/',payload).then((res) => {
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
  // router.push({path: '/stock-opname-atk'})
};
const coba = async () => {
  addModal.value = true
}
const coba2 = async () => {
  addModal.value = false
}
const reset = async () => {
  selectedCompany.value = ''
  selectedSite.value = ''
  selectedWarehouse.value = ''
  selectedUOM.value = ''
  alertQuantity.value = ''
  itemNames.value = ''
  remark.value = ''
  selectedBrand.value = ''
  quantityOpname.value = ''
  selectedAdjusment.value= ''
  itemsTable.value = []
};
onMounted(() => {
  fetchCondition()
  fetchUOM()
  fetchBrand()
});
</script>

<template>
  <label
    @click="coba"
    for="my-modal-stock-in"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Opname</label
  >

  <input type="checkbox" v-if="addModal == true" id="my-modal-stock-in" class="modal-toggle" />
  <div class="modal" v-if="addModal == true">
    <div class="modal-dialog bg-white w-3/5">
      <nav class="sticky top-0 z-50 bg-[#015289]" >
        <label
          @click="coba2"
          for="my-modal-stock-in"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Stock Opname
        </p>
      </nav>

      <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
        <img :src="icondanger" class="w-5 h-5" />
        <p class="font-JakartaSans font-semibold text-lg">Stock Opname ATK Info</p>
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
                for="alert"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Quantity Opname<span class="text-red">*</span></label
              >
              <input
                type="number"
                v-model="quantityOpname"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Quantity Opname"
                required
              />
            </div>
            
          </div>
          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="item_name"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Item Name<span class="text-red">*</span></label
              >
              <!-- <input
                type="text"
                v-model="itemNames"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Item Name"
                required
              /> -->
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                required
                v-model="itemNames"
                @change="changeUomBrand(itemNames)"
              >
                <option disabled selected>Item</option>
                <option v-for="(item,i) in Item" :key="i" :value="item.id">
                 {{ item.code_item }} - {{ item.item_name }}
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
                disabled="true"
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
                for="uom"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Brand<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                required
                v-model="selectedBrand"
                disabled="true"
              >
                <option disabled selected>Brand</option>
                <option v-for="(brand,i) in Brand" :key="i" :value="brand.id">
                  {{ brand.brand_name }}
                </option>
              </select>
            </div>
            <div class="mb-6 w-full">
              <label
                for="uom"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Adjusment Type<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                required
                v-model="selectedAdjusment"
              >
                <option disabled selected>Adjusment Type</option>
                <option v-for="(adjust,i) in Adjusment" :key="i" :value="adjust.name">
                  {{ adjust.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="alert"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Quantity</label
              >
              <input
                type="number"
                v-model="alertQuantity"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Quantity"
                required
              />
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
                  Adjusment Type
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Quantity
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Quantity Opname
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
                <td class="border border-[#B9B9B9]">{{ items.id_warehouse }}</td>
                <td class="border border-[#B9B9B9]">{{ items.id_item }}</td>
                <td class="border border-[#B9B9B9]">{{ items.adjusment }}</td>
                <td class="border border-[#B9B9B9]">{{ items.qty }}</td>
                <td class="border border-[#B9B9B9]">{{ items.qtyOpname }}</td>
                <td class="border border-[#B9B9B9]">{{ items.id_brand }}</td>
                <td class="border border-[#B9B9B9]">{{ items.id_uom }}</td>
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
