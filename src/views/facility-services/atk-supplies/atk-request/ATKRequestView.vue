<script setup>
import Navbar from "@/components/layout/Navbar.vue"
import Sidebar from "@/components/layout/Sidebar.vue"
import Footer from "@/components/layout/Footer.vue"
import HistoryApproval from "@/components/approval/HistoryApproval.vue"

import arrow from "@/assets/request-trip-view-arrow.png"
import editicon from "@/assets/navbar/edit_icon.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"
import iconClose from "@/assets/navbar/icon_close.svg"
import ModalAdd from "@/components/facility-services/atk-supplies/atk-request/ModalAddRequest.vue"

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
}

let dataApproval = ref([])
let tabId = ref(1)

// for modal
let statusForm = ref("edit")
let visibleModal = ref(false)

const sidebar = useSidebarStore()
const router = useRouter()
let lengthCounter = 0
const idDetail = ref("")
let stockName = ref("")
let createdDate = ref("")
let createdBy = ref("")
let Company = ref("")
let Site = ref("")
let Warehouse = ref("")
let siteName = ref("")
let companyName = ref("")
let status = ref("")
let ItemTable = ref([])
let lockScrollbarEdit = ref(false)
const selectedCompany = ref("")
const selectedSite = ref("")
const notes = ref("")
let disableCompany = ref(false)
let disableSite = ref(false)
let itemsTable = ref([])
const id_role = JSON.parse(localStorage.getItem("id_role"))
const company_code = JSON.parse(localStorage.getItem("company_code"))
let dataArr = ref([])
let dataItem = ref([])
let itemApproval = ref([])

const widthType = id_role == "EMPLY" ? "w-[50%]" : "w-full"
const fetchGetCompanyID = async (id_company) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/company/get/${id_company}`)
  Company.value = res.data.data
  selectedCompany.value = id_company
}

const fetchSite2 = async (id, id_company) => {
  disableCompany.value =
    JSON.parse(localStorage.getItem("id_role")) == "EMPLY" ? true : false
  disableSite.value =
    JSON.parse(localStorage.getItem("id_role")) == "EMPLY" ? true : false
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/site/get_by_company/${id_company}`)
  Site.value = res.data.data
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index]
    if (id === element.id) {
      selectedSite.value = id
      changeSite(element.id)
      // selectedSite2.value = id
    }
  }
}
const changeSite = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/warehouse/get_by_site_id/${id}`)
  Warehouse.value = res.data.data
}

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get/${id}`)
  dataArr.value = res.data.data[0]

  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index]
    companyName.value = element.company_name
    stockName.value = element.no_atk_request
    createdDate.value = format_date(element.created_at)
    createdBy.value = element.employee_name
    siteName.value = element.site_name
    status.value = element.status
    notes.value = element.remarks_header
  }
}
const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get_by_atk_request_id/${id}`)
  itemsTable.value = []
  ItemTable.value = []

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
    // itemsTable.value.push({
    //   Warehouse: element.warehouse_name,
    //   itemNames: element.item_name,
    //   idItems: element.code_item,
    //   alertQuantity: element.qty,
    //   brandName: element.brand_name,
    //   UOMName: element.uom_name,
    //   remark: element.remarks,
    //   qty_approved: element.qty_approved,
    //   qty_unsend: element.qty_unsend,
    //   id_item: element.id_item,
    //   id_brand: element.id_brand,
    //   id_uom: element.id_uom,
    //   qty: element.qty,
    // })
  }

  dataItem.value = itemsTable.value
}

const submit = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.post(
    `/request_atk/submit/${router.currentRoute.value.params.id}`
  )
  Swal.fire({
    position: "center",
    icon: "success",
    title: res.data.message,
    showConfirmButton: false,
    timer: 1500,
  })
  router.push({
    path: "/atk-request",
  })
}

const fetchHistoryApproval = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get_history/${id}`)
  // dataApproval.value = res.data.data

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

const openModal = (type, id) => {
  visibleModal.value = true
  statusForm.value = type
  if (id) {
    idDetail.value = parseInt(id)
  }
}

const closeModal = () => {
  visibleModal.value = false
  fetchHistoryApproval(router.currentRoute.value.params.id)
  fetchDataById(router.currentRoute.value.params.id)
  fetchDetailById(router.currentRoute.value.params.id)
}

const fetchLogApproval = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/request_atk/get_by_atk_request_w_id/${id}`)

  itemApproval.value = res.data.data
}

onBeforeMount(() => {
  getSessionForSidebar()
  fetchHistoryApproval(router.currentRoute.value.params.id)
  fetchDataById(router.currentRoute.value.params.id)
  fetchDetailById(router.currentRoute.value.params.id)
  idDetail.value = parseInt(router.currentRoute.value.params.id)
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
              to="/atk-request"
              class="flex items-center gap-2 py-4 mx-4"
            >
              <img :src="arrow" class="w-3 h-3" alt="" />
              <h3 class="text-blue font-semibold font-JakartaSans text-2xl">
                {{ stockName }}
              </h3>
            </router-link>
            <div class="flex justify-start gap-4 mx-4 py-4">
              <div
                class="text-center rounded-lg p-1 text-white text-sm font-JakartaSans font-bold capitalize w-[120px] h-[50px]text-center"
                :class="atkStatus[status]?.class"
              >
                {{ status }}
              </div>
            </div>
          </div>

          <div class="flex justify-between ml-10" v-if="status == 'Draft'">
            <div class="flex gap-2">
              <label
                class="btn btn-sm text-blue text-base font-JakartaSans font-bold capitalize w-[100px] border-blue bg-white hover:bg-blue hover:text-white hover:border-blue"
                @click="openModal('edit', 0)"
                for="my-modal-stock-in"
              >
                Edit
              </label>
              <ModalAdd
                @close="closeModal"
                :status="statusForm"
                :id="idDetail"
                :data-arr="dataArr"
                :data-item="dataItem"
                v-if="visibleModal"
              />

              <button
                class="btn btn-sm text-white text-base font-JakartaSans font-bold capitalize w-[100px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
                @click="submit"
              >
                Submit</button
              ><br />
            </div>
          </div>

          <input
            type="checkbox"
            v-if="lockScrollbarEdit == true"
            id="my-modal-request-edit-atk"
            class="modal-toggle"
          />
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
          <!-- <div class="grid grid-cols-2 pl-[71px] gap-y-3 mb-7">
            <div class="flex flex-col gap-2">
              <span class="font-JakartaSans font-medium text-sm">Notes</span>
              <input
                type="text"
                disabled
                v-model="notes"
                class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
              />
            </div>
            <div class="flex flex-col gap-2"></div>
          </div> -->
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
                    <td class="border border-[#B9B9B9]">{{ value.idItems }}</td>
                    <td class="border border-[#B9B9B9]">
                      {{ value.itemNames }}
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
                      <div v-if="status == 'Completed'">
                        {{ value.qty_unsend }}
                      </div>
                    </td>
                    <td class="border border-[#B9B9B9]">{{ value.UOMName }}</td>
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
