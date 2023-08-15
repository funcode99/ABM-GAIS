<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icondanger from "@/assets/icon-danger-circle.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import { ref, onMounted, watch } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const props = defineProps({
  status: String,
  id: Number,
  dataItem: [Object, Array],
  dataArr: [Object, Array],
});

const router = useRouter();

let selectedCompany = ref("");
let selectedSite = ref("");
let selectedWarehouse = ref("");
let selectedEmployee = ref(JSON.parse(localStorage.getItem("id_employee")));
let selectedUOM = ref("UOM");
let selectedBrand = ref("");
let brandName = ref("");
let warehouseName = ref("");
let namaItem = ref("");
let uomName = ref("");
let Company = ref("");
let Site = ref("");
let Item = ref("");
let Warehouse = ref("");
let UOM = ref("");
let idItems = ref("");
let alertQuantity = ref("");
let Brand = ref("");
let itemNames = ref("");
let codeItem = ref("");
let remark = ref("");
const itemsTable = ref([]);
let disableCompany = ref(false);
let disableSite = ref(false);
let addModal = ref(false);
const company_code = JSON.parse(localStorage.getItem("company_code"));

const emits = defineEmits(["unlockScrollbar", "close"]);
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
};

const fetchGetCompanyID = async (id_company) => {
  changeCompany(id_company);
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/company/get/${id_company}`);
  Company.value = res.data.data;
  selectedCompany.value = id_company;
};

const fetchUOM = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/uom");
  UOM.value = res.data.data;
};

const changeCompany = async (id_company) => {
  disableCompany.value =
    JSON.parse(localStorage.getItem("id_role")) == "EMPLY" ? true : false;
  disableSite.value =
    JSON.parse(localStorage.getItem("id_role")) == "EMPLY" ? true : false;
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/site/get_by_company/${id_company}`);
  // console.log(res)
  Site.value = res.data.data;
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    if (JSON.parse(localStorage.getItem("id_site")) === element.id) {
      selectedSite.value = element.id;
      changeSite(element.id);
    }
  }
};

const fetItems = async (id_site) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/management_atk/get_by_site/${id_site}`);
  Item.value = res.data.data;
};

const changeUomBrand = async (id_item) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/management_atk/get/${id_item}`);

  selectedBrand.value = res.data.data[0].id_brand;
  selectedUOM.value = res.data.data[0].id_uom;
};

const changeSite = async (id_site) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/warehouse/get_by_site_id/${id_site}`);
  Warehouse.value = res.data.data;
  fetItems(id_site);
};
//get kondisi local storage
const fetchCondition = async () => {
  const id_company = JSON.parse(localStorage.getItem("id_company"));
  const id_role = JSON.parse(localStorage.getItem("id_role"));
  id_role === "ADMTR" ? fetchGetCompany() : fetchGetCompanyID(id_company);
};

const fetchDataEdit = async () => {
  itemsTable.value = [];
  if (props.dataItem.length <= 1) {
    itemNames.value = props.dataItem[0].id_item;
    changeUomBrand(itemNames.value);
    remark.value = props.dataItem[0].remark;
    alertQuantity.value = props.dataItem[0].qty;
  }

  props.dataItem.map((elements) => {
    itemsTable.value.push({
      id_company: selectedCompany.value,
      id_site: selectedSite.value,
      id_warehouse: elements.id_warehouse,
      id_employee: selectedEmployee.value,
      remarks: elements.remarks,
      id_item: elements.id_item,
      id_brand: elements.id_brand ? elements.id_brand : "",
      id_uom: elements.id_uom,
      qty: elements.qty,
      namaBrand: elements.brandName,
      namaUOM: elements.UOMName,
      namItem: elements.itemNames,
      codeItem: elements.idItems,
      id: elements.id,
      remarks: elements.remark,
    });
  });
};

function checkExists(item) {
  return itemsTable.value.some(function (el) {
    return el.id_item === item;
  });
}

const addItem = async () => {
  if (
    selectedCompany.value == "" ||
    selectedSite.value == "" ||
    selectedUOM.value == "" ||
    itemNames.value == "" ||
    alertQuantity.value == ""
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
    const wh = Warehouse.value;
    for (let index = 0; index < wh.length; index++) {
      const element = wh[index];
      if (element.id == selectedWarehouse.value) {
        warehouseName.value = element.warehouse_name;
      }
    }
    const br = Brand.value;
    for (let index = 0; index < br.length; index++) {
      const element = br[index];
      if (element.id == selectedBrand.value) {
        brandName.value = element.brand_name;
      }
    }
    const uom = UOM.value;
    for (let index = 0; index < uom.length; index++) {
      const element = uom[index];
      if (element.id == selectedUOM.value) {
        uomName.value = element.uom_name;
      }
    }
    const it = Item.value;
    for (let index = 0; index < it.length; index++) {
      const element = it[index];
      if (element.id == itemNames.value) {
        namaItem.value = element.item_name;
        codeItem.value = element.code_item;
      }
    }
    let checkData = checkExists(itemNames.value);
    if (!checkData) {
      itemsTable.value.push({
        id_company: selectedCompany.value,
        id_site: selectedSite.value,
        id_warehouse: selectedWarehouse.value,
        remarks: remark.value,
        id_item: itemNames.value,
        id_brand: selectedBrand.value ? selectedBrand.value : "",
        id_uom: selectedUOM.value,
        qty: alertQuantity.value,
        nameWarehouse: warehouseName.value,
        namaBrand: brandName.value,
        namaUOM: uomName.value,
        namItem: namaItem.value,
        codeItem: codeItem.value,
      });
    } else {
      itemsTable.value.map((element) => {
        if (itemNames.value == element.id_item) {
          element.qty = alertQuantity.value;
          element.remarks = remark.value
        }
      });
    }
    resetButCompanyDisable();
    return itemsTable;
  }
};
const resetButCompanyDisable = async () => {
  disableSite.value = true;
  disableCompany.value = true;
  selectedWarehouse.value = "";
  selectedUOM.value = "";
  idItems.value = "";
  alertQuantity.value = "";
  itemNames.value = "";
  remark.value = "";
  selectedBrand.value = "";
};
const removeItems = async (id) => {
  itemsTable.value.splice(id, 1);
  // return itemsTable
};
const save = async () => {
  if (selectedCompany.value == "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Data Di Table Tidak Boleh Kosong",
      showConfirmButton: false,
      timer: 1500,
    });
    return false;
  } else {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const payload = {
      id_company: selectedCompany.value,
      id_site: selectedSite.value,
      remarks: remark.value,
      array_detail: itemsTable.value,
    };
    let api =
      props.status === "add"
        ? "request_atk/store"
        : `request_atk/update/${props.id}`;
    Api.post(api, payload)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        emits("close");
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
  }
};
const coba2 = async () => {
  addModal.value = false;
};
const reset = async () => {
  selectedCompany.value = "";
  selectedSite.value = "";
  selectedWarehouse.value = "";
  selectedUOM.value = "";
  alertQuantity.value = "";
  itemNames.value = "";
  remark.value = "";
  selectedBrand.value = "";
};

onMounted(() => {
  fetchCondition();
  fetchUOM();
  if (props.status == "edit") {
    fetchDataEdit();
  }
});
</script>

<template>
  <input type="checkbox" id="my-modal-stock-in" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-3/5 rounded-2xl">
      <nav class="sticky top-0 z-50 bg-[#015289] rounded-t-2xl">
        <label
          @click="coba2"
          for="my-modal-stock-in"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Atk Request
        </p>
      </nav>

      <div class="flex flex-wrap gap-2 justify-start items-center pt-4 mx-4">
        <img :src="icondanger" class="w-5 h-5" />
        <p class="font-JakartaSans font-semibold text-lg">Atk Request Info</p>
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
              <option v-for="(site, i) in Site" :key="i" :value="site.id">
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
        <div class="grid grid-cols-2 px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label
              for="item_name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Item Name<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
              v-model="itemNames"
              @change="changeUomBrand(itemNames)"
            >
              <option disabled selected>Item</option>
              <option v-for="(item, i) in Item" :key="i" :value="item.id">
                {{ item.code_item }} - {{ item.item_name }}
              </option>
            </select>
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
              style="background-color: #d3d3d3"
            >
              <option disabled selected>UOM</option>
              <option v-for="(uom, i) in UOM" :key="i" :value="uom.id">
                {{ uom.uom_name }}
              </option>
            </select>
          </div>
          <div
            class="mb-6"
            :class="company_code != '8000' ? 'w-full' : 'w-[50%]'"
          >
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
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center"
                >
                  ID Item
                </th>

                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center"
                >
                  Item Name
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center"
                >
                  Quantity
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center"
                >
                  UOM
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center"
                >
                  Remarks
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16" v-for="(items, i) in itemsTable" :key="i">
                <td class="border border-[#B9B9B9] text-center">
                  {{ items.codeItem }}
                </td>
                <td class="border border-[#B9B9B9] text-center">
                  {{ items.namItem }}
                </td>
                <td class="border border-[#B9B9B9] text-center">
                  {{ items.qty }}
                </td>
                <td class="border border-[#B9B9B9] text-center">
                  {{ items.namaUOM }}
                </td>
                <td class="border border-[#B9B9B9] text-center">
                  {{ items.remarks }}
                </td>
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