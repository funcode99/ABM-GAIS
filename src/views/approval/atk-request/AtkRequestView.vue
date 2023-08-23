<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "@/components/layout/Sidebar.vue"
import Footer from "@/components/layout/Footer.vue"

import ModalApproveAtk from "@/components/approval/atk-request/ModalApproveAtk.vue"
import ModalRejectAtk from "@/components/approval/atk-request/ModalRejectAtk.vue"
import HistoryApproval from "@/components/approval/HistoryApproval.vue"

import arrow from "@/assets/request-trip-view-arrow.png"
import icon_receive from "@/assets/icon-receive.svg"

import { onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import { useSidebarStore } from "@/stores/sidebar.js"
import Api from "@/utils/Api"
import Swal from "sweetalert2"
import moment from "moment"

const atkStatus = {
  Draft: {
    statusLevel: 0,
    class: "bg-[#000] border-[#000]",
  },
  "Waiting Approval": {
    statusLevel: 1,
    class: "bg-[#2970ff] border-[#2970ff]",
  },
  Approve: {
    statusLevel: 2,
    class: "bg-[#ef9d22] border-[#ef9d22]",
  },
  Completed: {
    statusLevel: 3,
    class: "bg-[#00c851] border-[#00c851]",
  },
  Rejected: {
    statusLevel: 3,
    class: "bg-red border-red",
  },
}

const sidebar = useSidebarStore()
const router = useRouter()
let lengthCounter = 0
let stockName = ref("")
let createdDate = ref("")
let createdBy = ref("")
let siteName = ref("")
let companyName = ref("")
let status = ref("")
let ItemTable = ref([])
const idR = ref(router.currentRoute.value.params.id)
let dataApproval = ref([])
let tabId = ref(1)
const company_code = JSON.parse(localStorage.getItem("company_code"))
let dataArr = ref([])
let dataItem = ref([])
let itemApproval = ref([])
const site_user = JSON.parse(localStorage.getItem("id_site"))
const company_user = JSON.parse(localStorage.getItem("id_company"))

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get/${id}`)
  dataArr.value = res.data.data[0]
  // console.log(res.data.data)
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index]
    companyName.value = element.company_name
    stockName.value = element.no_atk_request
    createdDate.value = format_date(element.created_at)
    createdBy.value = element.employee_name
    siteName.value = element.site_name
    status.value = element.status
  }
}
const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get_by_atk_request_id/${id}`)
  dataItem.value = res.data.data
  // console.log(res.data.data)
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index]
    ItemTable.value.push({
      Warehouse: element.warehouse_name,
      itemNames: element.item_name,
      idItems: element.code_item,
      brandName: element.brand_name,
      UOMName: element.uom_name,
      remark: element.remarks_detail,
      id_item: element.id_item,
      id_brand: element.id_brand,
      id_uom: element.id_uom,
      qty_requested: element.qty_requested,
      qty_approved: element.qty_approved,
      qty_unsend: element.qty_unsend,
      qty_delivered: element.qty_delivered,
    })
    // ItemTable.value.push({
    //   Warehouse: element.warehouse_name,
    //   itemNames: element.item_name,
    //   idItems: element.code_item,
    //   alertQuantity: element.qty,
    //   brandName: element.brand_name,
    //   UOMName: element.uom_name,
    //   remark: element.notes,
    //   qty_send: element.qty_send,
    //   qty_unsend: element.qty_unsend,
    // })
  }
}

const fetchLogApproval = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get_by_atk_request_w_id/${id}`)

  itemApproval.value = res.data.data
}

const fetchHistoryApproval = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get_history/${id}`)

  const {
    name_approved,
    notes,
    name_delivered,
    notes_delivered,
    delivered_at,
    notes_rejected,
    rejected_at,
    name_rejected,
    approved_at,
  } = res.data.data[0]

  dataApproval.value = [
    name_rejected
      ? {
          notes_rejected,
          rejected_at,
          name_rejected,
        }
      : false,
    name_delivered
      ? {
          name_delivered,
          delivered_at,
          notes_delivered,
        }
      : false,
    name_approved ? { name_approved, approved_at, notes } : false,
  ].filter(Boolean)
}

onBeforeMount(() => {
  getSessionForSidebar()
  fetchHistoryApproval(router.currentRoute.value.params.id)
  fetchDataById(router.currentRoute.value.params.id)
  fetchDetailById(router.currentRoute.value.params.id)
  fetchLogApproval(router.currentRoute.value.params.id)
})

const getSessionForSidebar = () => {
  sidebar.setSidebarRefresh(sessionStorage.getItem("isOpen"))
}
const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD-MM-YYYY")
  }
}
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
              to="/approvalatkrequest"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h1 class="text-blue font-semibold font-JakartaSans text-2xl">
                {{ stockName }}
              </h1>
            </router-link>
            <div class="py-4">
              <div class="flex justify-start gap-4 mx-4 py-4">
                <div
                  class="text-center rounded-lg p-1 text-white text-sm font-JakartaSans font-bold capitalize w-[120px] h-[50px]text-center"
                  :class="atkStatus[dataArr.status]?.class"
                >
                  {{ dataArr.status }}
                </div>
              </div>
              <!-- <button
                type="button"
                class="btn btn-sm border-none mx-4 capitalize status-default text-center"
              >
                {{ dataArr.status }}
              </button> -->
            </div>
          </div>
          <div
            class="flex flex-wrap justify-start gap-4 px-[70px]"
            v-if="
              dataArr.id_site == site_user && dataArr.id_company == company_user
            "
          >
            <ModalApproveAtk
              v-if="status == 'Waiting Approval' || status == 'Approve'"
              :data-arr="dataArr"
            />

            <ModalRejectAtk v-if="status == 'Waiting Approval'" />
            <!-- <button
              class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
            >
              <img :src="icon_receive" class="w-6 h-6" />
            </button> -->
          </div>

          <!-- FORM READ ONLY-->
          <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7 pt-7">
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
                >Requestor</span
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
          <div
            class="bg-blue capitalize font-JakartaSans font-bold text-xs rounded-lg pt-2 mx-[70px]"
          >
            <div class="flex items-center">
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 1"
              >
                <div
                  :class="
                    tabId == 1
                      ? 'absolute bg-black h-full w-2 left-0 top-0 rounded-tl-lg'
                      : 'absolute h-full w-2 left-0 top-0 rounded-tl-lg'
                  "
                ></div>
                <p
                  :class="
                    tabId == 1
                      ? 'font-JakartaSans text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Details
                </p>
              </div>
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 2"
              >
                <div
                  :class="
                    tabId == 2
                      ? 'absolute bg-black h-full w-2 left-0 top-0 rounded-tl-lg'
                      : 'absolute h-full w-2 left-0 top-0 rounded-tl-lg'
                  "
                ></div>
                <p
                  :class="
                    tabId == 2
                      ? 'font-JakartaSans text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Approval
                </p>
              </div>
              <div
                class="py-3 px-4 bg-white rounded-t-xl w-[132px] border border-[#e0e0e0] relative cursor-pointer"
                @click="tabId = 3"
              >
                <div
                  :class="
                    tabId == 3
                      ? 'absolute bg-black h-full w-2 left-0 top-0 rounded-tl-lg'
                      : 'absolute h-full w-2 left-0 top-0 rounded-tl-lg'
                  "
                ></div>
                <p
                  :class="
                    tabId == 3
                      ? 'font-JakartaSans text-sm text-center font-semibold text-blue'
                      : 'font-JakartaSans font-normal text-sm text-center'
                  "
                >
                  Approval Log
                </p>
              </div>
            </div>

            <div class="overflow-x-auto bg-white">
              <table class="table table-compact w-full" v-if="tabId == 1">
                <thead class="font-JakartaSans font-bold text-xs">
                  <tr class="bg-blue text-white h-8">
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      ID Item
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Name Item
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      UOM
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Quantity Requested
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Quantity Approved
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Quantity Delivery
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Quantity Rejected
                    </th>
                    <th
                      class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="font-JakartaSans font-normal text-xs"
                  v-for="(value, ind) in ItemTable"
                  :key="ind"
                >
                  <tr class="h-16">
                    <td class="border border-[#B9B9B9]">{{ value.idItems }}</td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.itemNames }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.UOMName }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.qty_requested }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.qty_approved }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.qty_delivered }}
                    </td>
                    <td class="border border-[#B9B9B9]">
                      <div v-if="status == 'Completed' || status == 'Rejected'">
                        {{ value.qty_unsend }}
                      </div>
                    </td>
                    <td class="border border-[#B9B9B9]">{{ value.remark }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="tabId == 2">
                <table class="table table-compact w-full">
                  <thead class="font-JakartaSans font-bold text-xs">
                    <tr class="bg-blue text-white h-8">
                      <th
                        class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      >
                        Item
                      </th>
                      <th
                        class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      >
                        Uom
                      </th>
                      <th
                        class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      >
                        ATK Warehouse
                      </th>
                      <th
                        class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      >
                        Stock Available
                      </th>
                      <th
                        class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      >
                        Quantity Approve
                      </th>
                      <th
                        class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                      >
                        Quantity Delivery
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="font-JakartaSans font-normal text-xs"
                    v-for="(value, ind) in itemApproval"
                    :key="ind"
                  >
                    <tr class="h-16">
                      <td class="border border-[#B9B9B9]">
                        {{ value.code_item }} - {{ value.item_name }}
                      </td>
                      <td class="border border-[#B9B9B9]">
                        {{ value.uom_name }}
                      </td>
                      <td class="border border-[#B9B9B9]">
                        {{ value.warehouse_name }}
                      </td>
                      <td class="border border-[#B9B9B9]">
                        {{ value.stock_available_wh }}
                      </td>
                      <td class="border border-[#B9B9B9]">
                        {{ value.qty_approved }}
                      </td>
                      <td class="border border-[#B9B9B9]">
                        {{ value.qty_delivered }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabId == 3">
                <HistoryApproval :data-approval="dataApproval" type="ATK" />
              </div>
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

.status-partial {
  color: #ef9d22;
  font-weight: 800;
}

.status-default {
  background-color: #2970ff;
  font-weight: 800;
}
.status-done {
  color: #00c851;
  font-weight: 800;
}
</style>
