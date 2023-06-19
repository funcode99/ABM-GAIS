<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";
import { ref, onBeforeMount, computed, reactive, onMounted, watch } from "vue";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
import { Modal } from "usemodal-vue3";
import moment from "moment";
import { useRouter } from "vue-router";

const route = useRouter();

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};
const format_price = (value) => {
  if (!value) {
    return "0.00";
  }
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

let listCurrency = ref([]);
let listCostCentre = ref([]);

const router = useRouter();

let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));
let currency = ref("");
let event = ref("");
let date = ref("");
let itemsItem = ref("");
let itemsNominal = ref("");
let itemsCostCentre = ref("");
let itemsRemarks = ref("");
let itemsId = 0;
let total = 0;
let visible = ref(false);

const rowClass = "flex justify-between px-6 items-center gap-2";
const colClass = "mb-6 w-full";
const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

// FETCH DATA
const fetchCurrency = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("currency");
  listCurrency.value = api.data.data;
};

const fetchCostCentre = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("company/get_cost_center");
  listCostCentre.value = api.data.data;
};
// END

// ITEMS
const tempItem = ref([]);

const addItem = async () => {
  if (itemsItem.value && itemsNominal.value && itemsCostCentre.value) {
    let spl_cost_centre = itemsCostCentre.value.split("+");
    let data = {
      item_name: itemsItem.value,
      nominal: itemsNominal.value,
      id_cost_center: spl_cost_centre[0],
      remarks: itemsRemarks.value,
      cost_center_name: spl_cost_centre[1],
    };
    tempItem.value.push(data);
    total += Number(itemsNominal.value);
    itemsId += 1;
    resetItems();
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
    });
  }
  return tempItem;
};

const resetItems = async () => {
  itemsItem.value = "";
  itemsNominal.value = "";
  itemsCostCentre.value = "";
  itemsRemarks.value = "";
};

const removeItems = async (id) => {
  tempItem.value.splice(id, 1);
};
// END ITEMS
const saveForm = async () => {
  const payload = {
    id_employee: selectedEmployee,
    type_ca: 2,
    event: event.value,
    date: date.value,
    id_currency: currency.value,
    grand_total: total,
    array_detail: tempItem.value,
  };
  const api = await Api.post("cash_advance/store", payload);
  Swal.fire({
    position: "center",
    icon: "success",
    title: api.data.message,
    showConfirmButton: false,
    timer: 1500,
  });
  if (api.data.success) {
      router.push({ path: `/viewcashadvancenontravel/${api.data.data.id}` });
  }

  visible.value = false;
};

const close = () => {
  resetItems();
  event.value = "";
  total = 0;
  date.value = "";
  currency.value = "";
  tempItem.value = [];
  visible.value = false;
};

const open = () => {
  visible.value == true;
};

onMounted(() => {
  fetchCostCentre();
  fetchCurrency();
});
</script>

<template>
  <label
    @click="visible = true"
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <Modal v-model:visible="visible">
    <!-- <div class="modal-dialog bg-white w-3/5"> -->
    <nav class="sticky top-0 z-50 bg-[#015289]">
      <label
        @click="close"
        for="my-modal-3"
        class="cursor-pointer absolute right-3 top-3"
      >
        <img :src="iconClose" class="w-[24px] h-[24px] hover:scale-75" />
      </label>
      <p class="font-JakartaSans font-semibold text-white mx-4 py-2">
        New Item
      </p>
    </nav>
    <main class="modal-box-inner pb-4 lg:pb-16">
      <div :class="rowClass">
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Event<span class="text-red">*</span></label
          >
          <input
            v-model="event"
            type="text"
            name="event"
            :class="inputClass"
            placeholder="Event"
          />
        </div>
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Date<span class="text-red">*</span></label
          >
          <input
            v-model="date"
            type="date"
            name="date_start"
            :class="inputClass"
            :min="new Date().toISOString().substr(0, 10)"
          />
        </div>
      </div>

      <div :class="rowClass">
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Currency<span class="text-red">*</span></label
          >
          <select v-model="currency" id="currency" :class="inputClass">
            <option disabled selected>Currency</option>
            <option
              v-for="data in listCurrency"
              :key="data.id"
              :value="data.id"
            >
              {{ data.currency_code }} - {{ data.currency_name }}
            </option>
          </select>
        </div>
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Total</label
          >
          <input
            v-model="total"
            type="text"
            name="event"
            :class="inputClass"
            placeholder="Total"
            disabled
          />
        </div>
      </div>

      <div class="mx-3">
        <p class="font-JakartaSans font-medium text-sm pb-2">Details Item</p>
        <hr class="h-px bg-[#8B8B8B] border-0 mb-4" />
      </div>

      <div :class="rowClass">
        <div :class="colClass">
          <input type="hidden" name="idItem" v-model="itemsId" />
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Item<span class="text-red">*</span></label
          >
          <input
            v-model="itemsItem"
            type="text"
            name="item"
            :class="inputClass"
            placeholder="Item"
            required
          />
        </div>
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Nominal<span class="text-red">*</span></label
          >
          <input
            v-model="itemsNominal"
            type="number"
            name="nominal"
            :class="inputClass"
            placeholder="Nominal"
            required
          />
        </div>
      </div>

      <div :class="rowClass">
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Cost Center<span class="text-red">*</span></label
          >
          <select v-model="itemsCostCentre" :class="inputClass" required>
            <option disabled selected>Cost Center</option>
            <option
              v-for="data in listCostCentre"
              :key="data.id"
              :value="data.id + '+' + data.cost_center_name"
            >
              {{ data.cost_center_code }} - {{ data.cost_center_name }}
            </option>
          </select>
        </div>
        <div :class="colClass">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Remarks</label
          >
          <input
            v-model="itemsRemarks"
            type="text"
            name="remarks"
            :class="inputClass"
            placeholder="Remarks"
            required
          />
        </div>
      </div>

      <div class="flex justify-center items-center">
        <button
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
          @click="addItem"
        >
          Add
        </button>
      </div>

      <!-- TABLE -->
      <table class="mt-6 w-full overflow-auto">
        <thead class="font-JakartaSans font-bold text-xs">
          <tr class="bg-blue text-white h-8">
            <th class="border border-[#B9B9B9]">Item</th>
            <th class="border border-[#B9B9B9]">Cost Center</th>
            <th class="border border-[#B9B9B9]">Nominal</th>
            <th class="border border-[#B9B9B9]">Remarks</th>
            <th class="border border-[#B9B9B9]">Action</th>
          </tr>
        </thead>
        <tbody class="font-JakartaSans font-normal text-xs">
          <tr class="h-16" v-for="(items, i) in tempItem" :key="i">
            <td class="border border-[#B9B9B9]">{{ items.item_name }}</td>
            <td class="border border-[#B9B9B9]">
              {{ items.cost_center_name }}
            </td>
            <td class="border border-[#B9B9B9]">
              {{ format_price(items.nominal) }}
            </td>
            <td class="border border-[#B9B9B9]">{{ items.remarks }}</td>
            <td class="border border-[#B9B9B9]">
              <div class="flex justify-center items-center">
                <!-- <button>
                    <img :src="editicon" class="w-6 h-6" />
                  </button> -->
                <button>
                  <img
                    :src="deleteicon"
                    class="w-6 h-6"
                    @click="removeItems(i)"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <div class="sticky bottom-0 bg-white py-2">
      <div class="flex justify-end gap-4 mr-6">
        <label
          @click="close"
          for="my-modal-3"
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
          >Cancel</label
        >
        <button
          class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
          @click="saveForm"
        >
          Save
        </button>
      </div>
    </div>
    <!-- </div> -->
  </Modal>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner {
  height: 500px;
  --tw-scale-x: 0.9;
  --tw-scale-y: 0.9;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
}
</style>
