<script setup>
import multiStepCircle from "@/components/molecules/multiStepCircle.vue"

import iconClose from "@/assets/navbar/icon_close.svg"
import iconUpload from "@/assets/icon_upload.svg"

// cuma gara2 lupa import ref sidebar gua error terus anjing
import { ref, onBeforeMount, reactive } from "vue"
import Api from "@/utils/Api"
import { elements } from "chart.js"
import Swal from "sweetalert2"
import { useRouter } from "vue-router"
import moment from "moment"

import { fetchCurrencyList } from "@/utils/Api/reference/currencydata.js"

import fetchEmployeeByLoginUtils from "@/utils/Fetch/Reference/fetchEmployeeByLogin"
import CurrencyInput from "@/components/atomics/CurrencyInput.vue"
import Multiselect from "@vueform/multiselect"

const router = useRouter()
const props = defineProps({
  listType: Array,
})
const emits = defineEmits(["close"])
const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY")
  }
}

let listCAType = ref(props.listType)
let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"))
// let visibleModal = ref(props.visible);

let employeeLoginData = ref()

let listTravel = ref([])
let listNonTravel = ref([])
let detailHeaderData = ref([])
let detailItemData = ref([])
let arrItem = {
  nominal_ca: ref([]),
  nominal_real: ref([]),
  attachment: ref([]),
}
const tempItem = ref([])
let currenciesList = ref([])

let instanceArray = []
let sortedDataDetail = ref([])
let idItem = ref("")
let tempAttach = ref("")
let titleArray = [
  { id: 0, title: "Choose Cash Advance" },
  { id: 1, title: "Settlement Cash Advance" },
]

let stepMinimum = 0
let stepLength = 2
let stepForm = ref(0)
let CAOption = ref("1")

let CANo = ref("")
let reference = ref("")

const inputStylingClass =
  "py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base"

const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

const tableHeadCATravel = [
  { id: 1, title: "CA No" },
  { id: 2, title: "Reference" },
  { id: 3, title: "Total" },
  { id: 4, title: "Status" },
]

const tableHeadCANonTravel = [
  { id: 1, title: "CANo" },
  { id: 2, title: "Event" },
  { id: 3, title: "Total" },
  { id: 4, title: "Status" },
]

const tableHeadDetailsItem = [
  { id: 1, title: "Item" },
  { id: 2, title: "Frequency" },
  { id: 3, title: "Currency" },
  { id: 4, title: "Nominal" },
  { id: 5, title: "Total" },
  { id: 6, title: "Total Pemakaian Real" },
  { id: 7, title: "Attachment" },
]

const tableHeadDetailsItemNon = [
  { id: 1, title: "Item" },
  { id: 2, title: "Date" },
  { id: 3, title: "Cost Centre" },
  { id: 4, title: "Nominal" },
  { id: 5, title: "Nominal Pemakaian Real" },
  { id: 6, title: "Attachment" },
]

const format_price = (value) => {
  if (!value) {
    return "0.00"
  }
  // let val = (value / 1).toFixed(2).replace(".", ",")

  return new Intl.NumberFormat().format(value)

  // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// image
const selectedImage = ref(null)
let filename = ref(null)

const onFileSelected = (event, ind, nominal, dataId) => {
  const file = event.target.files[0]
  selectedImage.value = file ? file : null
  filename.value = file.name
  tempItem.value[ind].attachment = selectedImage.value
  tempItem.value[ind].id = dataId
}

const fetchTravel = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get("/settlement/get_travel")
  instanceArray = api.data.data
  listTravel.value = instanceArray
}

const fetchNonTravel = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const api = await Api.get("/settlement/get_non_travel")
  instanceArray = api.data.data
  listNonTravel.value = instanceArray
}

const addItem = (id) => {
  idItem.value = id
}

onBeforeMount(async () => {
  fetchTravel()
  fetchNonTravel()
  fetchEmployeeByLoginUtils(employeeLoginData)
  currenciesList.value = await fetchCurrencyList()
})

const resetState = () => {
  CANo.value = ""
  reference.value = ""
  stepForm.value = 0
}

const close = () => {
  idItem.value = ""
  emits("close")
}

const isEmptyDetail = (items) => {
  console.log(items)
  return items.some(
    ({ attachment, frequency, detail_item_name, nominal_ca, nominal_real }) => {
      if (
        !attachment ||
        !frequency ||
        !detail_item_name ||
        !nominal_ca ||
        !nominal_real
      ) {
        return true
      }
    }
  )
}

const nextStep = async (step) => {
  if (step == 0) {
    stepForm.value += 1
    let type_name = CAOption.value == 1 ? "travel" : "non_travel"
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await Api.get(`/cash_advance/` + type_name + `/${idItem.value}`)
    instanceArray = res.data.data
    detailHeaderData.value = instanceArray[0]

    const api = await Api.get(`cash_advance/get_by_cash_id/${idItem.value}`)
    instanceArray = api.data.data
    detailItemData.value = instanceArray
    detailItemData.value.forEach((elements) => {
      console.log(elements)
      let data = {
        nominal_real: 0,
        nominal_ca: elements.nominal,
        attachment: "",
        frequency: elements.frequency,
        detail_item_name: elements?.nama_item || elements?.item_name,
        currency_name: elements.currency_name,
        created_at: elements.created_at,
        cost_center_name: elements.cost_center_name,
        id: elements.id,
        id_ca_detail: elements.id,
        total: elements.total,
        isFromCA: true,
      }
      tempItem.value.push(data)
    })
  } else {
    if (isEmptyDetail(tempItem.value)) {
      Swal.fire({
        title: "Please check item details!",
        text: "Item Details cannot empty or 0 value",
        icon: "error",
        showConfirmButton: true,
      })
      return
    }

    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    let payload = {
      id_employee: selectedEmployee,
      id_ca: idItem.value,
      id_ca_type: CAOption.value,
      no_ca: detailHeaderData.value.no_ca,
      array_detail: tempItem.value,
    }
    await Api.post(`/settlement/store`, payload)
      .then((res) => {
        instanceArray = res.data.data
        detailItemData.value = instanceArray
        if (res.data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          router.push({ path: `/settlement/${res.data.data.id}` })
        } else {
          Swal.fire({
            html: "<b>Please fill in the form!</b>",
            timer: 2000,
            timerProgressBar: true,
            position: "top-end",
            background: "#EA5455",
            color: "#ffffff",
            showCancelButton: false,
            showConfirmButton: false,
            width: "300px",
          })
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        })
        // console.log(error.response.data.message)
      })
  }
}

const addNewItem = (item) => {
  const default_item = {
    isFromCA: false,
    nominal_real: 0,
    nominal_ca: 0,
    attachment: "",
    frequency: 0,
    detail_item_name: "",
    currency_name: item.currency_name,
    cost_center_name: null,
    id_ca_detail: item.id || id_ca,
    total: null,
    cost_center_name: item.cost_center_name,
    created_at: item.created_at,
  }

  tempItem.value.push({ ...default_item })
}
</script>

<template>
  <input type="checkbox" id="add-menu-modal" class="modal-toggle" />

  <div class="modal">
    <div class="modal-box relative">
      <div class="sticky top-0 z-50 bg-white py-4">
        <label
          @click="close"
          for="add-menu-modal"
          class="cursor-pointer absolute right-0"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold">New Settlement</p>
        <div className="divider m-0"></div>
      </div>

      <div class="mb-8">
        <div>
          <multiStepCircle
            :title="titleArray"
            :length="stepLength"
            :step="stepForm"
          />
        </div>
      </div>
      <div v-if="stepForm == 0">
        <div class="flex flex-col items-center gap-3 mt-20">
          <div>
            <h1 class="text-sm font-medium">CA Type</h1>
            <select
              v-model="CAOption"
              :class="'w-[163px] mt-2 ' + inputStylingClass"
              @change="idItem = ''"
              :disabled="employeeLoginData?.group_company_code == 'CKB'"
            >
              <option
                v-for="data in listCAType"
                :key="data.id"
                :value="data.id"
              >
                {{ data.title }}
              </option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto flex justify-center mt-6">
          <table v-if="CAOption == '1'" class="table">
            <thead>
              <tr>
                <th v-for="data in tableHeadCATravel" :key="data.id">
                  {{ data.title }}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="data in listTravel"
                :key="data.id"
                :class="data.id == idItem ? 'selected' : ''"
              >
                <td>
                  {{ data.no_ca }}
                </td>
                <td>
                  {{ data.no_request_trip }}
                </td>
                <td>
                  {{ format_price(data.total) }}
                </td>
                <td>Need Settlement</td>
                <td>
                  <button
                    class="text-white bg-[#87c556] px-3 py-2 rounded-lg font-bold text-base text-center"
                    @click="addItem(data.id)"
                    v-if="data.id != idItem"
                  >
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <table v-if="CAOption == '2'" class="table">
            <thead>
              <tr>
                <th v-for="data in tableHeadCANonTravel" :key="data.id">
                  {{ data.title }}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="data in listNonTravel"
                :key="data.id"
                :class="data.id == idItem ? 'selected' : ''"
              >
                <td>
                  {{ data.no_ca }}
                </td>
                <td>
                  {{ data.event }}
                </td>
                <td>
                  {{ format_price(data.total) }}
                </td>
                <td>Need Settlement</td>
                <td>
                  <button
                    class="text-white bg-[#87c556] px-3 py-2 rounded-lg font-bold text-base text-center"
                    @click="addItem(data.id)"
                    v-if="data.id != idItem"
                  >
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="stepForm == 1" class="mt-12 flex flex-col gap-6">
        <!-- HEADER -->
        <div class="flex flex-col gap-1">
          <label>CA No<span class="text-red-star">*</span></label>
          <input
            type="text"
            :class="inputStylingClass"
            v-model="detailHeaderData.no_ca"
            disabled
          />
        </div>

        <div v-if="CAOption === '1'">
          <label>Reference<span class="text-red-star">*</span></label>
          <input
            type="text"
            :class="inputStylingClass"
            v-model="detailHeaderData.no_request_trip"
            disabled
          />
        </div>

        <!-- TABLE -->
        <div>
          <h1 class="mb-5">Details Item</h1>
          <div class="mb-5">
            <button
              class="btn bg-green capitalize border-none"
              @click="addNewItem(tempItem[0])"
              v-if="CAOption == 1"
            >
              Add Item
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="table" width="100%">
              <thead>
                <tr>
                  <th
                    v-for="data in CAOption == '1'
                      ? tableHeadDetailsItem
                      : tableHeadDetailsItemNon"
                    :key="data.id"
                  >
                    {{ data.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in tempItem" :key="data.id">
                  <td style="min-width: 170px">
                    <input
                      v-if="CAOption == 1"
                      type="text"
                      :class="inputStylingClass"
                      v-model="data.detail_item_name"
                      :disabled="data.id_ca_detail"
                    />
                    <!-- :disabled="data?.isFromCA" -->

                    <div v-else>{{ data.detail_item_name }}</div>
                  </td>
                  <td>
                    <!-- {{
                      CAOption == "1"
                        ? data.frequency
                        : format_date(data.created_at)
                    }} -->

                    <div v-if="CAOption == 1">
                      <CurrencyInput
                        v-model="data.frequency"
                        :class="inputClass"
                        required
                      >
                      </CurrencyInput>
                    </div>
                    <div v-else>{{ format_date(data.created_at) }}</div>
                  </td>
                  <td style="min-width: 170px">
                    <!-- {{
                      CAOption == "1"
                        ? data.currency_name
                        : data.cost_center_name
                    }} -->

                    <div v-if="CAOption == 1">
                      <!-- <Multiselect
                        v-model="data.currency_name"
                        mode="single"
                        placeholder="Select Currency"
                        :options="currenciesList"
                        track-by="id"
                        label="currency_name"
                        valueProp="currency_name"
                        class="text-sm"
                        required
                        clear
                        searchable
                      >
                      </Multiselect> -->

                      {{ data.currency_name }}
                    </div>

                    <div v-else>{{ data.cost_center_name }}</div>
                  </td>
                  <td style="min-width: 130px">
                    <!-- <input
                      type="number"
                      name="remarks"
                      :class="inputClass"
                      required
                      v-model="data.nominal_real"
                      class="hidden"
                    /> -->

                    <CurrencyInput
                      v-if="CAOption == 1"
                      v-model="data.nominal_ca"
                      :class="inputClass"
                      required
                      :disabled="data.id_ca_detail"
                    >
                    </CurrencyInput>

                    <div v-else>
                      {{ data.nominal_ca }}
                    </div>
                  </td>
                  <td v-if="CAOption == '1'" style="min-width: 100px">
                    {{ format_price(data.nominal_ca * data.frequency) }}
                  </td>
                  <td style="min-width: 130px">
                    <!-- <input
                      type="number"
                      name="remarks"
                      :class="inputClass"
                      required
                      v-model="data.nominal_real"
                    /> -->

                    <CurrencyInput
                      v-if="CAOption == 1"
                      v-model="data.nominal_real"
                      :class="inputClass"
                      required
                    >
                    </CurrencyInput>

                    <div v-else>
                      {{ data.nominal_real }}
                    </div>
                  </td>
                  <td>
                    <input
                      type="file"
                      id="logo_company"
                      class="px-4 py-3 w-[300px] border border-[#e0e0e0] rounded-lg font-JakartaSans font-semibold text-base"
                      accept="image/*"
                      @change="
                        onFileSelected($event, index, data.nominal, data.id)
                      "
                    />
                    <!-- <div
                      v-if="filename != null"
                      class="py-2 font-JakartaSans font-medium text-sm"
                    >
                      <a
                        :href="detailItemData.attachment_path"
                        target="_blank"
                        class="text-blue"
                      >
                        {{ filename }}
                      </a>
                    </div> -->
                  </td>

                  <td v-if="!data.isFromCA">
                    <button class="btn btn-sm bg-error">delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="sticky bottom-0 bg-white mt-4 py-4">
        <div className="divider m-0 pb-4"></div>
        <div class="flex justify-end gap-4">
          <label
            @click="close"
            class="btn bg-white text-base font-JakartaSans font-bold capitalize w-[141px] text-[#1F7793] border-[#1F7793]"
            type="submit"
          >
            Cancel
          </label>
          <button
            @click="nextStep(stepForm)"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-[#1F7793]"
          >
            {{ stepForm == 0 ? "Next" : "Save" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  max-height: calc(100vh - 5em);
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  padding-top: 0rem;
  padding-bottom: 0rem;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  /* width: 91.666667%; */
  max-width: 70rem;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  border-top-left-radius: var(--rounded-box, 1rem);
  border-top-right-radius: var(--rounded-box, 1rem);
  border-bottom-left-radius: var(--rounded-box, 1rem);
  border-bottom-right-radius: var(--rounded-box, 1rem);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.table th {
  background: #015289 !important;
  border-color: #b9b9b9 !important;
  border-width: 2px;
  color: white;
  padding: 16px 12px;
}

.table td {
  border-color: #b9b9b9 !important;
  border-width: 2px;
  padding: 16px 12px;
}

input::file-selector-button {
  background: white;
  font-size: 10px !important;
  border-color: #1f7793;
  color: #1f7793 !important;
  font-weight: 700 !important;
  line-height: 0px !important;
  border-radius: 2px;
  height: 18px;
  padding: 3px 3px;
  text-align: center;
}

.table tbody tr.selected {
  color: #aa2b2b;
  font-weight: 800;
}

:disabled {
  background: #eeeeee;
  border-color: #eeeeee;
}
</style>
