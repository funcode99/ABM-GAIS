<script setup>
import multiStepCircle from "@/components/molecules/multiStepCircle.vue";

import iconClose from "@/assets/navbar/icon_close.svg";
import iconUpload from "@/assets/icon_upload.svg";

// cuma gara2 lupa import ref sidebar gua error terus anjing
import { ref, onBeforeMount, reactive } from "vue";
import Api from "@/utils/Api";
import { elements } from "chart.js";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const props = defineProps({
  listType: Array,
});
const emits = defineEmits(["close"]);
const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

let listCAType = ref(props.listType);
let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));
// let visibleModal = ref(props.visible);

let listTravel = ref([]);
let listNonTravel = ref([]);
let detailHeaderData = ref([]);
let detailItemData = ref([]);
let arrItem = {
  nominal_ca: ref([]),
  nominal_real: ref([]),
  attachment: ref([]),
};
const tempItem = ref([]);

let instanceArray = [];
let sortedDataDetail = ref([]);
let idItem = ref("");
let tempAttach = ref("");
let titleArray = [
  { id: 0, title: "Choose Cash Advance" },
  { id: 1, title: "Settlement Cash Advance" },
];

let stepMinimum = 0;
let stepLength = 2;
let stepForm = ref(0);
let CAOption = ref("1");

let CANo = ref("");
let reference = ref("");

const inputStylingClass =
  "py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base";

const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const tableHeadCATravel = [
  { id: 1, title: "CA No" },
  { id: 2, title: "Reference" },
  { id: 3, title: "Total" },
  { id: 4, title: "Status" },
];

const tableHeadCANonTravel = [
  { id: 1, title: "CANo" },
  { id: 2, title: "Event" },
  { id: 3, title: "Total" },
  { id: 4, title: "Status" },
];

const tableHeadDetailsItem = [
  { id: 1, title: "Item" },
  { id: 2, title: "Frequency" },
  { id: 3, title: "Currency" },
  { id: 4, title: "Nominal" },
  { id: 5, title: "Total" },
  { id: 6, title: "Total Pemakaian Real" },
  { id: 7, title: "Attachment" },
];

const tableHeadDetailsItemNon = [
  { id: 1, title: "Item" },
  { id: 2, title: "Date" },
  { id: 3, title: "Cost Centre" },
  { id: 4, title: "Nominal" },
  { id: 5, title: "Nominal Pemakaian Real" },
  { id: 6, title: "Attachment" },
];

const format_price = (value) => {
  if (!value) {
    return "0.00";
  }
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// image
const selectedImage = ref(null);
let filename = ref(null);

const onFileSelected = (event, id, nominal, dataId) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  filename.value = file.name;
  tempItem.value[id].attachment = selectedImage.value;
  tempItem.value[id_ca_detail].id = dataId;
};
// end

const fetchTravel = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("/settlement/get_travel");
  instanceArray = api.data.data;
  listTravel.value = instanceArray;
};

const fetchNonTravel = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("/settlement/get_non_travel");
  instanceArray = api.data.data;
  listNonTravel.value = instanceArray;
};

const addItem = (id) => {
  idItem.value = id;
};

onBeforeMount(() => {
  fetchTravel();
  fetchNonTravel();
});

const resetState = () => {
  CANo.value = "";
  reference.value = "";
  stepForm.value = 0;
};

const close = () => {
  idItem.value = "";
  emits("close");
};

const nextStep = async (step) => {
  if (step == 0) {
    let type_name = CAOption.value == 1 ? "travel" : "non_travel";
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get(
      `/cash_advance/` + type_name + `/${idItem.value}`
    );
    instanceArray = res.data.data;
    detailHeaderData.value = instanceArray[0];

    const api = await Api.get(`cash_advance/get_by_cash_id/${idItem.value}`);
    instanceArray = api.data.data;
    detailItemData.value = instanceArray;
    detailItemData.value.map((elements) => {
      let data = {
        nominal_real: 0,
        nominal_ca: elements.nominal,
        attachment: "",
        frequency: elements.frequency,
        item_name: elements.item_name,
        currency_name: elements.currency_name,
        created_at: elements.created_at,
        cost_center_name: elements.cost_center_name,
        id: elements.id,
        id_ca_detail: elements.id,
        total: elements.total,
      };
      tempItem.value.push(data);
    });
  } else {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    let payload = {
      id_employee: selectedEmployee,
      id_ca: idItem.value,
      id_ca_type: CAOption.value,
      no_ca: detailHeaderData.value.no_ca,
      array_detail: tempItem.value,
    };
    const api = await Api.post(`/settlement/store`, payload);
    instanceArray = api.data.data;
    detailItemData.value = instanceArray;
    if (api.data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: api.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push({ path: `/settlement/${api.data.data.id}` });
    }
  }
};
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
          <h1 class="mb-10">Details Item</h1>
          <div class="overflow-x-auto">
            <table class="table">
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
                  <td>
                    {{ data.item_name }}
                  </td>
                  <td>
                    {{
                      CAOption == "1"
                        ? data.frequency
                        : format_date(data.created_at)
                    }}
                  </td>
                  <td>
                    {{
                      CAOption == "1"
                        ? data.currency_name
                        : data.cost_center_name
                    }}
                  </td>
                  <td>
                    <input
                      type="number"
                      name="remarks"
                      :class="inputClass"
                      required
                      v-model="data.nominal_real"
                      class="hidden"
                    />
                    {{ format_price(data.nominal_ca) }}
                  </td>
                  <td v-if="CAOption == '1'">
                    {{ format_price(data.total) }}
                  </td>
                  <td>
                    <input
                      type="number"
                      name="remarks"
                      :class="inputClass"
                      required
                      v-model="data.nominal_real"
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      id="logo_company"
                      class="px-4 py-3 border border-[#e0e0e0] rounded-lg max-w-[80%] font-JakartaSans font-semibold text-base"
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
          >
            Cancel
          </label>
          <button
            @click="nextStep(stepForm++)"
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
  width: 91.666667%;
  max-width: 50rem /* 512px */;
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
