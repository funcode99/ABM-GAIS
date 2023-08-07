<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";
import icon_done from "@/assets/icon_done.svg";
import icon_add from "@/assets/icon_add_square.svg";
import deleteicon from "@/assets/navbar/delete_icon.svg";

const props = defineProps({
  dataArr: [Object, Array],
});

import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/utils/Api";
import Swal from "sweetalert2";
const router = useRouter();
const notesName = ref("");
let qtyApproved = ref([]);
const id = router.currentRoute.value.params.id;
const itemTable = ref([]);
const dataItem = ref([]);
const headerApprove = ref([]);
const itemPayload = ref([]);
const payload = ref([]);
const idWh = ref([]);
const warehouseName = ref("");
const listChildItem = ref([]);
const Warehouse = ref([]);
const filteredData = ref([]);

const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm";

const isApprove = ref(false);

const changeSite = async (id_site) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/warehouse/get_by_site_id/${id_site}`);
  Warehouse.value = res.data.data;
};

const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get(`/request_atk/get_by_atk_request_id/${id}`);
  itemTable.value = res.data.data;
};

const addItem = async (ind, data) => {
  const wh = Warehouse.value;
  for (let index = 0; index < wh.length; index++) {
    const element = wh[index];
    if (element.id == idWh.value[ind]) {
      warehouseName.value = element.warehouse_name;
    }
  }

  listChildItem.value.push({
    id_item: itemTable.value[ind].id_item,
    id_atk_request_detail: router.currentRoute.value.params.id,
    id_warehouse: idWh.value[ind],
    name_warehouse: warehouseName.value,
    qty_approved: qtyApproved.value[ind],
    item_name: data.item_name,
    code_item: data.code_item,
    remarks: notesName.value ? notesName.value : "",
  });

  listChildItem.value.forEach((element) => {
    filteredData.value[element.id_item] = listChildItem.value.filter((item) => {
      return item.id_item == element.id_item;
    });
  });
  console.log(listChildItem.value);
};

const removeItem = async (ind, id, ind_parent) => {
  filteredData.value[id].splice(ind - 1, 1);
  listChildItem.value.splice(ind_parent, 1);
};

const submit = async () => {
  itemPayload.value = [];
  listChildItem.value.map((element) => {
    element.remarks = notesName.value ? notesName.value : "";
  });
  payload.value = {
    warehouse_detail: listChildItem.value,
  };
  isApprove.value = true;
  if (isApprove.value) {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    Api.post(
      `/approval_request_atk/approve/${router.currentRoute.value.params.id}`,
      payload.value
    )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        router.push({
          path: "/approvalatkrequest",
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
};

onBeforeMount(() => {
  changeSite(props.dataArr.id_site);
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
    <div class="modal-dialog bg-white w-3/5">
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
                Quantity Requested
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
                Action
              </th>
            </tr>
          </thead>
          <tbody
            class="font-JakartaSans font-normal text-xs"
            v-for="(value, ind) in itemTable"
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
                {{ value.qty }}
              </td>
              <td class="border border-[#B9B9B9]">
                <select v-model="idWh[ind]" :class="inputClass">
                  <option
                    v-for="data in value.array_warehouse"
                    :key="data.id_warehouse"
                    :value="data.id_warehouse"
                  >
                    {{ data.warehouse_name }}
                  </option>
                </select>
              </td>
              <td class="border border-[#B9B9B9]">
                {{ value.total_stock }}
              </td>
              <td class="border border-[#B9B9B9]">
                <input
                  type="number"
                  v-model="qtyApproved[ind]"
                  class="bg-white w-[320px] lg:w-56 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                  @input="
                    () => {
                      if (
                        qtyApproved[ind] > value.total_stock ||
                        qtyApproved[ind] < 0
                      ) {
                        qtyApproved[ind] = value.total_stock;
                      }
                    }
                  "
                />
              </td>
              <td class="border border-[#B9B9B9] text-center">
                <button @click="addItem(ind, value)">
                  <img :src="icon_add" class="w-6 h-6" alt="" />
                </button>
              </td>
            </tr>
            <tr
              v-if="
                filteredData[value.id_item] &&
                filteredData[value.id_item].length > 0
              "
            >
              <td colspan="7" class="justify-center px-10 py-5">
                <div class="overflow-x-auto">
                  <table class="table-auto w-full justify-center">
                    <thead class="font-JakartaSans font-bold text-xs">
                      <tr class="bg-indigo-500 text-white h-8">
                        <th
                          class="border border-[#B9B9B9] bg-indigo-500 capitalize font-JakartaSans font-bold text-xs"
                        >
                          No
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-indigo-500 capitalize font-JakartaSans font-bold text-xs"
                        >
                          Item
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-indigo-500 capitalize font-JakartaSans font-bold text-xs"
                        >
                          ATK Warehouse
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-indigo-500 capitalize font-JakartaSans font-bold text-xs text-center"
                        >
                          Quantity Approve
                        </th>
                        <th
                          class="border border-[#B9B9B9] bg-indigo-500 capitalize font-JakartaSans font-bold text-xs text-center"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="font-JakartaSans font-normal text-xs"
                      v-for="(dt, index) in filteredData[value.id_item]"
                      :key="index"
                    >
                      <tr>
                        <td class="border border-[#B9B9B9]">
                          {{ (index += 1) }}
                        </td>
                        <td class="border border-[#B9B9B9]">
                          {{ value.code_item }} - {{ value.item_name }}
                        </td>
                        <td class="border border-[#B9B9B9]">
                          {{ dt.name_warehouse }}
                        </td>
                        <td class="border border-[#B9B9B9] text-center">
                          {{ dt.qty_approved }}
                        </td>
                        <td class="border border-[#B9B9B9] text-center">
                          <button
                            @click="removeItem(index, value.id_item, ind)"
                          >
                            <img :src="deleteicon" class="w-6 h-6" alt="" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="font-JakartaSans font-medium text-sm py-2">Notes</p>
        <textarea
          type="text"
          rows="5"
          v-model="notesName"
          class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Notes"
        ></textarea>
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
