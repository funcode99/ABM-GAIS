<script setup>
import Multiselect from "@vueform/multiselect"

import iconClose from "@/assets/navbar/icon_close.svg"
import iconPlus from "@/assets/navbar/icon_plus.svg"
import icondanger from "@/assets/icon-danger-circle.png"
import editicon from "@/assets/navbar/edit_icon.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"
import { ref, onMounted, watchEffect, watch } from "vue"
import Api from "@/utils/Api"
import { useMenuAccessStore } from "@/stores/savemenuaccess"
import Swal from "sweetalert2"
import { useRouter } from "vue-router"
const router = useRouter()

let selectedCompany = ref("Company")
let selectedSite = ref("Site")
let selectedWarehouse = ref([])
let selectedUOM = ref("UOM")
let selectedBrand = ref("")
let brandName = ref("")
let warehouseName = ref([])
let warehouseId = ref([])
let Company = ref("")
let Site = ref("")
let Warehouse = ref(null)
let UOM = ref("")
let uomName = ref("")
let idItems = ref("")
let alertQuantity = ref("")
let Brand = ref("")
let itemNames = ref("")
let remark = ref("")
const itemsTable = ref([])
const payload = ref([])
let disableCompany = ref(false)
let disableSite = ref(false)
let addModal = ref(false)
const company_code = JSON.parse(localStorage.getItem("company_code"))
let isDoneLoading = ref(false)

// multiselect
let isLoading = ref(false)

const emits = defineEmits(["unlockScrollbar", "close"])
const menuAccess = useMenuAccessStore()

const props = defineProps({
  status: String,
  id: Number,
})
// const props = defineProps({
//   roleId: Number,
//   roleAccess: Array,
//   unlockScrollbar:Boolean
// })
//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get("/company/get")
  Company.value = res.data.data
  // console.log("ini data parent" + JSON.stringify(res.data.data));
}

const fetchGetCompanyID = async (id_company) => {
  changeCompany(id_company)
  const token = JSON.parse(localStorage.getItem("token"))
  // const id_company = JSON.parse(localStorage.getItem("id_company"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/company/get/${id_company}`)
  Company.value = res.data.data
  selectedCompany.value = id_company
  // console.log("ini data parent" + JSON.stringify(res.data.data));
}

const fetchUOM = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get("/uom")
  UOM.value = res.data.data
  // console.log("ini data parent" + JSON.stringify(res.data.data));
}
const changeCompany = async (id_company) => {
  // fetchBrandCompany(id_company)
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/site/get_by_company/${id_company}`)

  Site.value = res.data.data
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index]
    if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
      selectedSite.value = element.id
      changeSite(element.id)
    }
  }
  // console.log("ini data parent" + JSON.stringify(res.data.data));
}

const changeSite = async (id_site) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/warehouse/get_by_site_id/${id_site}`)
  Warehouse.value = res.data.data
  isDoneLoading.value = true
}
//get kondisi local storage
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"))
  const id_role = JSON.parse(localStorage.getItem("id_role"))
  id_role === "ADMTR" ? fetchGetCompany() : fetchGetCompanyID(id_company)
}

const generateNumber = async () => {
  idItems.value = Math.floor(100000000 + Math.random() * 900000000)
}

const addItem = async () => {
  console.log(
    selectedCompany.value,
    selectedSite.value,
    selectedUOM.value,
    itemNames.value,
    alertQuantity.value,
    idItems.value
  )

  if (
    !selectedCompany.value ||
    !selectedSite.value ||
    selectedWarehouse.value.length == 0 ||
    !selectedUOM.value ||
    !itemNames.value ||
    !alertQuantity.value ||
    !idItems.value
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Data required Tidak Boleh Kosong",
      showConfirmButton: false,
      timer: 1500,
    })
    return false
  } else {
    warehouseName.value = []
    warehouseId.value = []
    const wh = Warehouse.value
    for (let index = 0; index < wh.length; index++) {
      const element = wh[index]
      if (selectedWarehouse.value.includes(element.id)) {
        warehouseName.value.push(element.warehouse_name)
        warehouseId.value.push(element.id)
      }
    }
    const br = Brand.value
    for (let index = 0; index < br.length; index++) {
      const element = br[index]
      if (element.id == selectedBrand.value) {
        brandName.value = element.brand_name
      }
    }
    const uom = UOM.value
    for (let index = 0; index < uom.length; index++) {
      const element = uom[index]
      if (element.id == selectedUOM.value) {
        uomName.value = element.uom_name
      }
    }

    for (let index = 0; index < warehouseId.value.length; index++) {
      itemsTable.value.push({
        code_item: idItems.value,
        item_name: itemNames.value,
        id_brand: selectedBrand.value,
        id_uom: selectedUOM.value,
        alert_qty: alertQuantity.value,
        id_company: selectedCompany.value,
        id_site: selectedSite.value,
        id_warehouse: warehouseId.value[index],
        current_stock: "",
        remarks: remark.value,
        nameWarehouse: warehouseName.value[index],
        namaBrand: brandName.value,
        namaUOM: uomName.value,
        array_warehouse: selectedWarehouse.value,
      })
    }
    payload.value.push({
      code_item: idItems.value,
      item_name: itemNames.value,
      id_brand: selectedBrand.value,
      id_uom: selectedUOM.value,
      alert_qty: alertQuantity.value,
      id_company: selectedCompany.value,
      id_site: selectedSite.value,
      remarks: remark.value,
      array_warehouse: selectedWarehouse.value,
    })
    resetButCompanyDisable()
    return itemsTable
  }
}
const removeItems = async (id) => {
  itemsTable.value.splice(id, 1)
  if (id == 0) {
    disableSite.value = false
    disableCompany.value = false
    reset()
  }
  // return itemsTable
}

const save = async () => {
  if (selectedCompany.value == "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Data Di Table Tidak Boleh Kosong",
      showConfirmButton: false,
      timer: 1500,
    })
    return false
  } else {
    Api.post("management_atk/store/", { array_atk: payload.value })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        reset()
        addModal.value = false
        emits("close")
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }
}
const coba = async () => {
  addModal.value = true
}
const coba2 = async () => {
  addModal.value = false
}
const reset = async () => {
  disableSite.value = false
  disableCompany.value = false
  selectedCompany.value = ""
  selectedSite.value = ""
  selectedWarehouse.value = []
  selectedUOM.value = ""
  idItems.value = ""
  alertQuantity.value = ""
  itemNames.value = ""
  remark.value = ""
  selectedBrand.value = ""
  itemsTable.value = []
}
const resetButCompanyDisable = async () => {
  disableSite.value = true
  disableCompany.value = true
  selectedWarehouse.value = []
  selectedUOM.value = ""
  idItems.value = ""
  alertQuantity.value = ""
  itemNames.value = ""
  remark.value = ""
  selectedBrand.value = ""
}
onMounted(() => {
  fetchCondition()
  fetchUOM()
})

watchEffect(() => {
  if (isDoneLoading.value) {
    Warehouse.value.map((item) => {
      item.value = parseInt(item.id)
    })
  }
})
</script>

<template>
  <input type="checkbox" id="my-modal-item-atk" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5 rounded-2xl">
      <nav class="sticky top-0 z-50 bg-[#015289] rounded-t-2xl">
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

      <main class="modal-box-inner-brand overflow-auto h-[80vh]">
        <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
          <img :src="icondanger" class="w-5 h-5" />
          <p class="font-JakartaSans font-semibold">Item Info</p>
        </div>
        <div>
          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
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
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
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
                <option v-for="(site, i) in Site" :key="i" :value="site.id">
                  {{ site.site_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex justify-between px-6 items-center gap-2">
            <div class="mb-6 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Details</label
              >
              <hr />
            </div>
          </div>
          <div class="grid grid-cols-2 px-6 items-center gap-2">
            <div class="mb-4 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
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

            <div class="mb-4 w-full">
              <label
                class="block mb-2 font-JakartaSans font-medium text-sm mx-2"
                >ID Items<span class="text-red">*</span></label
              >
              <div
                class="flex items-center border-b border-teal-500 py-2 mb-4 w-full mx-2"
              >
                <input
                  class="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  v-model="idItems"
                  maxlength="25"
                  placeholder="ID Item"
                  aria-label="Full name"
                />
                <button
                  class="flex-shrink-0 bg-[#015289] text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  @click="generateNumber"
                >
                  <img :src="iconPlus" class="w-[10px] h-[10px]" />
                </button>
              </div>
            </div>
            <div class="mb-4 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >UOM<span class="text-red">*</span></label
              >
              <select
                class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                required
                v-model="selectedUOM"
              >
                <option disabled selected value="">UOM</option>
                <option v-for="(uom, i) in UOM" :key="i" :value="uom.id">
                  {{ uom.uom_name }}
                </option>
              </select>
            </div>

            <div class="mb-4 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
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
            <div class="mb-4 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >Description</label
              >
              <input
                type="text"
                v-model="remark"
                class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Description"
                required
              />
            </div>
            <div class="mb-4 w-full">
              <label class="block mb-2 font-JakartaSans font-medium text-sm"
                >ATK Warehouse<span class="text-red">*</span></label
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
              >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
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
                      @click="handleTagRemove(option, $event)"
                    >
                      <span class="multiselect-tag-remove-icon"></span>
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
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="font-JakartaSans font-normal text-xs">
                <tr class="h-16" v-for="(items, i) in itemsTable" :key="i">
                  <td class="border border-[#B9B9B9] text-center">
                    {{ items.nameWarehouse }}
                  </td>
                  <td class="border border-[#B9B9B9] text-center">
                    {{ items.code_item }}
                  </td>
                  <td class="border border-[#B9B9B9] text-center">
                    {{ items.item_name }}
                  </td>
                  <td class="border border-[#B9B9B9] text-center">
                    {{ items.namaUOM }}
                  </td>
                  <td class="border border-[#B9B9B9] text-center">
                    {{ items.alert_qty }}
                  </td>
                  <td class="border border-[#B9B9B9] text-center">
                    {{ items.remarks }}
                  </td>
                  <td class="border border-[#B9B9B9]">
                    <div
                      class="flex flex-wrap justify-center items-center gap-2"
                    >
                      <button @click="removeItems(i)">
                        <img :src="deleteicon" class="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <div class="sticky bottom-0 bg-white py-2 rounded-2xl">
        <div class="flex justify-center">
          <button
            class="btn text-white text-base font-JakartaSans font-bold w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
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
