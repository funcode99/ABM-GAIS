<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";

import arrow from "@/assets/request-trip-view-arrow.png";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";

import { onBeforeMount, ref } from "vue";
import { useRouter } from 'vue-router'
import { useSidebarStore } from "@/stores/sidebar.js";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import moment from 'moment';


const sidebar = useSidebarStore();
const router = useRouter()
let lengthCounter = 0;
let stockName = ref("")
let createdDate = ref("")
let createdBy = ref("")
let brandName = ref("");
let Company = ref("");
let Site = ref("");
let Warehouse = ref("");
let UOM = ref("")
let UOMName = ref("")
let idItems = ref("")
let ItemsName = ref("")
let alertQuantity = ref("")
let Brand = ref("")
let itemNames = ref("")
let remark = ref("")
let siteName = ref("")
let status = ref("")
let statusValue = ref(false)
let ItemTable = ref([])

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/stock_in/get/${id}`);
  // console.log(res.data.data)
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    stockName.value = element.no_stock_in
    createdDate.value = format_date(element.created_at)
    createdBy.value = element.employee_name
    siteName.value = element.site_name
    status.value = element.status
    // element.status == 'Submitted' ? !statusValue : statusValue
  }
  
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/stock_in/get_by_stock_in_id/${id}`);
  // console.log(res.data.data)
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    ItemTable.value.push({
      Warehouse : element.warehouse_name,
      itemNames: element.item_name,
      idItems: element.code_item,
      alertQuantity: element.qty,
      brandName: element.brand_name,
      UOMName: element.uom_name,
      remark: element.remarks,
    })
    // Warehouse.value = element.warehouse_name
    // itemNames.value = element.item_name
    // idItems.value = element.code_item
    // alertQuantity.value = element.qty
    // brandName.value = element.brand_name
    // UOMName.value = element.uom_name
    // remark.value = element.remarks
    // siteName.value = element.site_name
    // element.status == 'Submitted' ? !statusValue : statusValue
  }
  
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.post(`/stock_in/submit/${router.currentRoute.value.params.id}`);
  Swal.fire({
      position: "center",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    // reset()
    router.push({path: '/stockinatk'})
  // console.log(res.data.data)
  
  
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};
onBeforeMount(() => {
  getSessionForSidebar();
  fetchDataById(router.currentRoute.value.params.id)
  fetchDetailById(router.currentRoute.value.params.id)
  // console.log(router.currentRoute.value.params.id)
});

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"));
};
const format_date = (value) => {
  if (value) {
           return moment(String(value)).format('DD-MM-YYYY')
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
              <button
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
              >
                {{status}}
              </button>
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
              <!-- <button
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
              >
                Edit
              </button> -->
              <button
                v-if="status == 'Draft'"
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit
              </button><br>
            </div>
          </div>

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
              
              <span class="font-JakartaSans font-medium text-sm"
                >Site</span
              >
              <input
                type="text"
                disabled
                v-model="siteName"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm"
                >Status</span
              >
              <input
                type="text"
                disabled
                v-model="status"
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
                      Remark
                    </th>
                    <!-- <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Action
                    </th> -->
                  </tr>
                </thead>
                <tbody class="font-JakartaSans font-normal text-xs" v-for="(value, ind) in ItemTable" :key="ind">
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">{{ value.Warehouse }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.idItems }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.itemNames }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.alertQuantity }}</td>
                    <td class="border border-[#B9B9B9]">{{ value.brandName }}</td>
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
