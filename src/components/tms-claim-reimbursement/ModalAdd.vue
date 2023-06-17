<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import editicon from "@/assets/navbar/edit_icon.svg";
import iconUpload from "@/assets/icon_upload.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";

import Api from "@/utils/Api";
import Swal from "sweetalert2";

import { ref } from "vue";

const props = defineProps({
  listType: Array,
  listReimbursementType: Array,
  visible: Boolean,
});

const format_price = (value) => {
  if (!value) {
    return "0.00";
  }
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

let listReimbursement = ref(props.listReimbursementType);
let listTravel = ref(props.listType);
let visibleModal = ref(props.visible);

let selectedEmployee = JSON.parse(localStorage.getItem("id_employee"));
let username = localStorage.getItem("username");

let reimburse_type = ref("");
let nominal = ref("");
let travel_type = ref("");
let remarks = ref("");
const tempItem = ref([]);

const selectedImage = ref(null);
let filename = ref(null);

const onFileSelected = (event) => {
  const file = event.target.files[0];
  selectedImage.value = file ? file : null;
  filename.value = file.name;
};

// Table
const addItem = async () => {
  let spl_reimburse = reimburse_type.value.split("+");

  if (nominal.value) {
    let data = {
      nominal: nominal.value,
      remarks: remarks.value,
      reimburse_type_name: spl_reimburse[1],
      id_reimbursement_type: spl_reimburse[0],
    };

    tempItem.value.push(data);
    reimburse_type.value = "";
    nominal.value = "";
    remarks.value = "";
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

const removeItems = async (id) => {
  tempItem.value.splice(id, 1);
};
// end

const saveForm = async () => {
  const payload = {
    id_employee: selectedEmployee,
    id_request_trip: travel_type.value,
    attachment: selectedImage.value,
    array_detail: tempItem.value,
  };
  if (selectedImage.value) {
    Api.post("claim_reimbursement/store", payload).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push({ path: "/claimreimbursement" });
      visibleModal.value = false;
    });
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
};

const close = () => {
  reimburse_type.value = "";
  nominal.value = "";
  remarks.value = "";
  travel_type.value = "";
  filename.value = "";
  selectedImage.value = "";
  tempItem.value = [];
  visibleModal.value = false;
};
</script>

<template>
  <input type="checkbox" id="my-modal-claim" class="modal-toggle" />
  <div class="modal" v-if="visibleModal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-claim"
          class="cursor-pointer absolute right-3 top-0 lg:top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p
          class="font-JakartaSans text-sm lg:text-2xl font-semibold text-white mx-4 py-2"
        >
          New Claim Reimbursement
        </p>
      </nav>

      <main class="modal-box-inner-claim pb-8">
        <!-- <form> -->
        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Requestor<span class="text-red">*</span></label
            >
            <input
              v-model="username"
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Requestor"
              required
              disabled
            />
          </div>
          <div class="mb-6 w-full">
            <div
              class="block mb-2 font-JakartaSans font-medium text-sm cursor-default"
            >
              Attachment
              <span class="text-red">*</span>
            </div>
            <div class="relative border border-slate-300 rounded-lg py-[6px]">
              <input
                type="file"
                id="logo_company"
                class="hidden border"
                accept="application/pdf"
                @change="onFileSelected"
              />
              <label class="py-2">
                <span
                  class="font-JakartaSans hidden font-medium text-sm cursor-pointer"
                  >{{ selectedImage || "Attachment" }}</span
                >
                <img
                  :src="iconUpload"
                  class="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </label>
              <div
                v-if="filename != null"
                class="px-5 py-2 font-JakartaSans font-medium text-sm"
              >
                {{ filename }}
              </div>
              <div
                v-else
                class="px-4 py-2 font-JakartaSans font-medium text-sm"
              >
                Attachment
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Travel</label
            >
            <select
              v-model="travel_type"
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
            >
              <option disabled selected>Type</option>
              <option
                v-for="data in listTravel"
                :key="data.id"
                :value="data.id"
              >
                {{ data.no_request_trip }}
              </option>
            </select>
          </div>
        </div>

        <div class="mx-5">
          <p class="font-JakartaSans font-medium text-sm pb-2">Details Item</p>
          <hr class="h-px bg-[#8B8B8B] border-0 mb-4" />
        </div>
        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Reimbursement Type</label
            >
            <select
              v-model="reimburse_type"
              class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
            >
              <option disabled selected>Type</option>
              <option
                v-for="data in listReimbursement"
                :key="data.id"
                :value="data.id + '+' + data.reimbursement_type"
              >
                {{ data.reimbursement_type }}
              </option>
            </select>
          </div>
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Nominal<span class="text-red">*</span></label
            >
            <input
              v-model="nominal"
              type="number"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Nominal"
              required
            />
          </div>
        </div>

        <div class="flex justify-between px-6 items-center gap-2">
          <div class="mb-6 w-full">
            <label class="block mb-2 font-JakartaSans font-medium text-sm"
              >Remarks</label
            >
            <input
              v-model="remarks"
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="remarks"
            />
          </div>
        </div>

        <div class="flex justify-center py-2">
          <button
            @click="addItem"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-blue bg-blue hover:bg-white hover:text-blue hover:border-blue"
          >
            Add
          </button>
        </div>
        <!-- </form> -->

        <!-- INNER TABLE -->
        <div class="overflow-x-auto px-6">
          <table class="table table-compact w-full">
            <thead class="font-JakartaSans font-bold text-xs">
              <tr class="bg-blue text-white h-8">
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Type
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Nominal
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Remarks
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="font-JakartaSans font-normal text-xs">
              <tr class="h-16" v-for="(item, i) in tempItem" :key="i">
                <td class="border border-[#B9B9B9]">
                  {{ item.reimburse_type_name }}
                </td>
                <td class="border border-[#B9B9B9]">
                  {{ format_price(item.nominal) }}
                </td>
                <td class="border border-[#B9B9B9]">{{ item.remarks }}</td>
                <td class="border border-[#B9B9B9]">
                  <div class="flex flex-wrap justify-center items-center gap-2">
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
        </div>
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
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-claim {
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
</style>
