<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_jurnal from "@/assets/icon_jurnal.svg";

import Api from "@/utils/Api";
import moment from "moment";

import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const emits = defineEmits(["unlockScrollbar"]);
const route = useRoute();

let dataCaNonTravel = ref([]);
let dataSapDoc = ref([]);
let dataDetailJurnal = ref([]);
let companyData = ref([]);
let companyCode = ref("");

let id = route.params.id;

const role = JSON.parse(localStorage.getItem("id_role"));

const props = defineProps({
  dataJurnal: Object,
});

const tableHead = [
  { Id: 1, title: "Item", jsonData: "item_number" },
  { Id: 2, title: "PK", jsonData: "posting_key" },
  { Id: 3, title: "Doc Date", jsonData: "doc_date" },
  { Id: 4, title: "G/L Account", jsonData: "gl_reccon_acc" },
  { Id: 5, title: "Account Short Text", jsonData: "short_text" },
  { Id: 6, title: "Amount", jsonData: "amount" },
  { Id: 7, title: "Text", jsonData: "item_text" },
  { Id: 8, title: "Cost Center", jsonData: "cost_center" },
  { Id: 9, title: "Profit Center", jsonData: "profit_center" },
  { Id: 10, title: "Wbs", jsonData: "wbs" },
  { Id: 11, title: "Due Date", jsonData: "due_date" },
  { Id: 12, title: "Posting Date", jsonData: "posting_date" },
  { Id: 12, title: "Actions" },
];

const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get/");
  companyData.value = res.data.data;
  companyData.value.map((item) => {
    if (item.id === props.dataJurnal.id_company) {
      companyCode.value = item.company_code;
    }
  });
};

const fetchDataById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/approval_non_travel/get_data/${id}`);
  dataCaNonTravel.value = res.data.data[0];
  fetchSapByIdDoc(dataCaNonTravel.value.id_document);
};

const fetchSapByIdDoc = async (id) => {
  // const res = await Api.get(`/jurnal/get_sap_by_id_document/${id}`);
  const res = await Api.get(`/jurnal/get_sap_by_id_document/1`); //using data dummy
  // console.log(res);
  dataSapDoc.value = res.data.data;
  fetchDataDetailJurnal(dataSapDoc.value[0].id);
};

const fetchDataDetailJurnal = async (id) => {
  const res = await Api.get(`/jurnal/get_sap_detail_by_id_header/${id}`);
  // console.log(res);
  dataDetailJurnal.value = res.data.data;
};

onBeforeMount(() => {
  fetchCompany();
  fetchDataById(id);
});

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const format_year = (value) => {
  if (value) {
    return moment(String(value)).format("YYYY");
  }
};

const format_month = (value) => {
  if (value) {
    return moment(String(value)).format("M");
  }
};

const format_price = (value) => {
  if (!value) {
    return "0.00";
  }
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

let classStyle =
  "font-JakartaSans font-semibold text-base capitalize block bg-#e0e0e0 w-96 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 cursor-not-allowed";
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    type="button"
    class="btn btn-sm mx-4 text-white text-base font-JakartaSans font-bold capitalize bg-blue border-blue hover:bg-blue hover:border-blue hover:text-white"
  >
    <span> <img :src="icon_jurnal" class="w-5 h-5 mr-2" /> </span>Jurnal
  </label>

  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative w-11/12 max-w-6xl">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Jurnal
        </p>
      </nav>

      <main class="modal-box-inner">
        <div class="sticky top-0 bg-white" v-if="role === 'ADM'">
          <div
            class="flex flex-wrap justify-start gap-2 items-center px-8 py-3"
          >
            <button
              class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-blue border-blue hover:bg-white hover:border-blue hover:text-blue"
            >
              Edit
            </button>

            <button
              class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-green border-green hover:bg-white hover:border-green hover:text-green"
            >
              Posting
            </button>

            <button
              class="btn btn-sm w-[100px] h-[36px] text-white text-base font-JakartaSans font-bold capitalize bg-[#FF9900] border-[#FF9900] hover:bg-white hover:border-[#FF9900] hover:text-[#FF9900]"
            >
              Reverse
            </button>
          </div>
        </div>

        <div class="flex flex-wrap justify-around items-center pt-4">
          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Number</label
            >
            <input type="text" name="doc_number" :class="classStyle" disabled />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company Code</label
            >
            <input
              type="text"
              name="company_code"
              :class="classStyle"
              disabled
              v-model="companyCode"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Doc Date</label
            >
            <input
              type="text"
              name="doc_date"
              :class="classStyle"
              disabled
              :value="format_date(props.dataJurnal.doc_created_at)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Posting Date</label
            >
            <input type="text" name="post_date" :class="classStyle" disabled />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Ref Doc</label
            >
            <input
              type="text"
              name="ref_doc"
              :class="classStyle"
              disabled
              :value="props.dataJurnal.no_ca"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Fiscal Year</label
            >
            <input
              type="text"
              name="fiscal_year"
              :class="classStyle"
              disabled
              :value="format_year(props.dataJurnal.doc_created_at)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Currency</label
            >
            <input
              type="text"
              name="currency"
              :class="classStyle"
              disabled
              :value="props.dataJurnal.currency_code"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Period</label
            >
            <input
              type="text"
              name="period"
              :class="classStyle"
              disabled
              :value="format_month(props.dataJurnal.doc_created_at)"
            />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Order</label
            >
            <input type="text" name="order" :class="classStyle" disabled />
          </div>

          <div class="mb-3">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Claim Category</label
            >
            <input
              type="text"
              name="claim_category"
              :class="classStyle"
              disabled
              :value="props.dataJurnal.code_document"
            />
          </div>
        </div>

        <!-- TABLE -->
        <div class="pb-4">
          <div class="table-wrapper">
            <table>
              <thead class="text-center font-JakartaSans text-sm font-bold">
                <th
                  v-for="data in tableHead"
                  :key="data.Id"
                  class="overflow-x-hidden cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-1">
                    {{ data.title }}
                  </span>
                </th>
              </thead>
              <tbody>
                <tr
                  class="font-JakartaSans font-normal text-sm text-center"
                  v-for="data in dataDetailJurnal"
                  :key="data.id"
                >
                  <td>{{ data.item_number }}</td>
                  <td>{{ data.posting_key }}</td>
                  <td>{{ format_date(props.dataJurnal.doc_created_at) }}</td>
                  <td>{{ data.gl_reccon_acc }}</td>
                  <td>{{ data.short_text }}</td>
                  <td>{{ format_price(props.dataJurnal.grand_total) }}</td>
                  <td>{{ data.item_text }}</td>
                  <td>{{ data.cost_center }}</td>
                  <td>{{ data.profit_center }}</td>
                  <td>{{ data.wbs }}</td>
                  <td>{{ data.due_date }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
  width: 100%;
}

.modal-box-inner {
  height: 500px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}

.table-wrapper {
  overflow-y: scroll;
  overflow-x: scroll;
  height: fit-content;
  max-height: 66.4vh;
  margin-top: 22px;
  margin: 25px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid rgb(229, 228, 228);
}

table {
  min-width: max-content;
}

table tbody :hover {
  background-color: rgb(193, 192, 192);
  cursor: pointer;
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
}

table th {
  position: sticky;
  top: 0px;
  font-weight: normal;
  padding: 8px;
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}

table th {
  padding: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}

table td {
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
