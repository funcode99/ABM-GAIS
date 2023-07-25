<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_done from "@/assets/icon_done.svg";

import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
const router = useRouter();
const notesName = ref("");
let item = ref([]);
const id = router.currentRoute.value.params.id;
const itemName = ref("");
const uomName = ref("");
const quantity = ref("");
const qtyAwal = ref("");
const itemTable = ref([]);
const itemPayload = ref([]);
const payload = ref([]);

const idItem = ref("");
const isApprove = ref(false);
const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/request_atk/get_by_atk_request_id/${id}`);
  //   console.log(res.data.data)
  for (let index = 0; index < res.data.data.length; index++) {
    const element = res.data.data[index];
    itemTable.value.push({
      itemName: element.item_name,
      uomName: element.uom_name,
      qtyAwal: element.stock_available,
      qty: element.qty,
      id: element.id_item,
      qtyApproved: element.qty,
    });
  }

  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

const submit = async () => {
  //   console.log(itemTable.value);
  for (let index = 0; index < itemTable.value.length; index++) {
    const element = itemTable.value[index];
    if (element.qty > element.qtyAwal) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Input Quantity tidak boleh lebih dari stock available",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else if (element.qtyApproved > element.qty) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Input Quantity Approved tidak boleh lebih dari Quantity Request",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else {
      itemPayload.value.push({
        qty: element.qtyApproved,
        id: element.id,
      });
      payload.value = {
        notes: notesName.value,
        array_detail: itemPayload.value,
      };
      isApprove.value = true;
    }
  }
  if (isApprove.value) {
    const token = JSON.parse(localStorage.getItem("token"));

    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.post(
      `/approval_request_atk/approve/${router.currentRoute.value.params.id}`,
      payload.value
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
      path: "/approvalatkrequest",
    });
  }

  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onBeforeMount(() => {
  fetchDetailById(router.currentRoute.value.params.id);
});
</script>

<template>
  <label
    for="my-modal-approve-atk"
    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-[#099250] hover:text-white hover:border-[#099250]"
  >
    <span>
      <img :src="icon_done" class="w-5 h-5" />
    </span>
    Approve
  </label>

  <input type="checkbox" id="my-modal-approve-atk" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative w-3/5">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="my-modal-approve-atk"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          Approval Confirmation
        </p>
      </nav>

      <main class="modal-box-inner-approval-atk">
        <p class="font-JakartaSans font-medium text-sm py-2">
          Are you sure want to approve this document?
        </p>
        <form class="pt-4">
          <div v-for="(value, i) in itemTable" :key="i">
            <div class="flex flex-wrap justify-start gap-2">
              <div class="form-control">
                <label class="block mt-2 font-JakartaSans font-medium text-sm">
                  Item
                </label>
                <input type="hidden" v-model="value.id" />
                <input
                  type="text"
                  v-model="value.itemName"
                  disabled="true"
                  style="background-color: #d3d3d3"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                />
              </div>
              <div class="form-control">
                <label class="block mt-2 font-JakartaSans font-medium text-sm">
                  UOM
                </label>
                <input
                  type="text"
                  v-model="value.uomName"
                  disabled="true"
                  style="background-color: #d3d3d3"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                />
              </div>
              <div class="form-control">
                <label class="block mt-2 font-JakartaSans font-medium text-sm">
                  Quantity Request
                </label>
                <input
                  type="number"
                  v-model="value.qty"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  disabled="true"
                  style="background-color: #d3d3d3"
                />
              </div>
              <div class="form-control">
                <label class="block mt-2 font-JakartaSans font-medium text-sm">
                  Stock Available
                </label>
                <input
                  type="text"
                  disabled="true"
                  style="background-color: #d3d3d3"
                  v-model="value.qtyAwal"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                />
              </div>
              <div class="form-control">
                <label class="block mt-2 font-JakartaSans font-medium text-sm">
                  Quantity Approve
                </label>
                <input
                  type="number"
                  v-model="value.qtyApproved"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  @input="
                    () => {
                      if (
                        value.qtyApproved > value.qty ||
                        value.qtyApproved < 0
                      ) {
                        value.qtyApproved = value.qty;
                      }
                    }
                  "
                />
              </div>
            </div>
            <hr class="mt-3 mb-3" />
          </div>
          <!-- <div class="flex flex-wrap justify-start">
            <div class="form-control">
              <label class="block mt-2 font-JakartaSans font-medium text-sm">
                Quantity </label>
                <input
                  type="text"
                  v-model="quantity"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  required
                />
              
            </div>
          </div> -->

          <p class="font-JakartaSans font-medium text-sm py-2">Notes</p>
          <textarea
            type="text"
            rows="5"
            v-model="notesName"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Notes"
          ></textarea>
        </form>
      </main>

      <div class="sticky bottom-0 bg-white py-2">
        <div class="flex justify-end gap-4 mr-6">
          <label
            for="my-modal-approve-atk"
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
            >Cancel</label
          >
          <button
            class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
            @click="submit"
          >
            Approve
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

.modal-box-inner-approval-atk {
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
