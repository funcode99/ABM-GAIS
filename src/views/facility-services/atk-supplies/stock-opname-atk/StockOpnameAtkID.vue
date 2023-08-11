<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import iconClose from "@/assets/navbar/icon_close.svg";
import ModalAdd from "@/components/facility-services/atk-supplies/stock-opname-atk/ModalAddOpname.vue";

import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebar.js";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import moment from "moment";
import { elements } from "chart.js";

const sidebar = useSidebarStore();
const router = useRouter();
let lengthCounter = 0;
let stockName = ref("");
let createdDate = ref("");
let createdBy = ref("");
let siteName = ref("");
let companyName = ref("");
let status = ref("");
let ItemTable = ref([]);
let itemsTableEdit = ref([]);
const lockScrollbarEdit = ref(false);
const idDetail = ref("");
const company_code = JSON.parse(localStorage.getItem("company_code"));
let dataArr = ref([]);
let dataItem = ref([]);
let id = ref(router.currentRoute.value.params.id);
let statusForm = ref("add");
let visibleModal = ref(false);
let idItem = ref(0);

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/stock_opname/get/${id}`);
  dataArr.value = res.data.data[0];

  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    companyName.value = element.company_name;
    stockName.value = element.no_stock_opname;
    createdDate.value = format_date(element.created_at);
    createdBy.value = element.name_created;
    siteName.value = element.site_name;
    status.value = element.status;
  }
};
const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/stock_opname/get_by_stock_opname_id/${id}`);
  ItemTable.value = [];
  itemsTableEdit.value = [];
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    ItemTable.value.push({
      Warehouse: element.warehouse_name,
      itemNames: element.item_name,
      idItems: element.code_item,
      alertQuantity: element.current_stock,
      brandName: element.brand_name,
      UOMName: element.uom_name,
      remark: element.remarks,
      QuantityAdjusment: element.qty_adjustment,
      adjusmentType: element.adjustment_type,
      id_item: element.id_item,
      id_uom: element.id_uom,
      id_brand: element.id_brand,
      id: element.id,
      id_warehouse: element.id_warehouse,
      adjustment_type: element.adjustment_type,
    });
    itemsTableEdit.value.push({
      Warehouse: element.warehouse_name,
      itemNames: element.item_name,
      idItems: element.code_item,
      alertQuantity: element.current_stock,
      brandName: element.brand_name,
      UOMName: element.uom_name,
      remark: element.remarks,
      QuantityAdjusment: element.qty_adjustment,
      adjusmentType: element.adjustment_type,
      id_item: element.id_item,
      id_uom: element.id_uom,
      id_brand: element.id_brand,
      id: element.id,
      id_warehouse: element.id_warehouse,
      adjustment_type: element.adjustment_type,
    });
  }
  dataItem.value = itemsTableEdit.value;
};

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.post(
    `/stock_opname/submit/${router.currentRoute.value.params.id}`
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
    path: "/stock-opname-atk",
  });
  // console.log(res.data.data)

  // console.log("ini data parent" + JSON.stringify(res.data.data));
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

// for modal
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
              to="/stock-opname-atk"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h3 class="text-blue font-semibold font-JakartaSans text-2xl">
                {{ stockName }}
              </h3>
            </router-link>
            <div class="flex justify-start gap-4 mx-4 py-4">
              <span
                class="badge text-blue text-base font-JakartaSans font-bold capitalize w-[100px] h-[30px] border-blue bg-white"
              >
                {{ status }}
              </span>
            </div>
          </div>

          <div class="flex justify-between ml-10">
            <div class="flex gap-2">
              <label
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
                v-if="status == 'Draft'"
                @click="openModal('edit', id)"
                for="my-modal-stock-in"
              >
                Edit
              </label>
              <ModalAdd
                @close="closeModal"
                :status="statusForm"
                :id="idItem"
                :data-arr="dataArr"
                :data-item="dataItem"
                v-if="visibleModal"
              />
              <button
                v-if="status == 'Draft'"
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit</button
              ><br />
            </div>
          </div>

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
                      Warehouse
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
                      Quantity Adjusment
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Adjusment Type
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
                      {{ value.QuantityAdjusment }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{
                        value.adjusmentType == "addition"
                          ? "Increase"
                          : "Decrease"
                      }}
                    </td>
                    <td class="border border-[#B9B9B9]">{{ value.UOMName }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.remark }}</td>
                    <!-- <td class="border border-[#B9B9B9]">
                      <div class="flex justify-center items-center gap-2">
                        <button>
                          <img :src="editicon" class="w-6 h-6" />
                        </button>
                        <button>
                          <img :src="deleteicon" class="w-6 h-6" />
                        </button>
                      </div>
                    </td> -->
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
</style>
