<script setup>
import _ from "lodash"

import iconClose from "@/assets/navbar/icon_close.svg"
import icon_done from "@/assets/icon_done.svg"
import icon_add from "@/assets/icon_add_square.svg"
import deleteicon from "@/assets/navbar/delete_icon.svg"

const props = defineProps({
  dataArr: [Object, Array],
})

import { computed, onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import Api from "@/utils/Api"
import Swal from "sweetalert2"
import Multiselect from "@vueform/multiselect"

const router = useRouter()
const notesName = ref("")
let qtyApproved = ref([])
const id = router.currentRoute.value.params.id
const itemTable = ref([])
const dataItem = ref([])
const headerApprove = ref([])
const itemPayload = ref([])
const payload = ref([])
const idWh = ref([])
const warehouseName = ref("")
const listChildItem = ref([])
const Warehouse = ref([])
const btnApprove = ref(
  props.dataArr.status == "Approve" ? "Delivery" : "Approve"
)
const disableField = ref(false)
const tableKey = ref(0)

const inputClass =
  "cursor-pointer font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"

const isApprove = ref(false)

const changeSite = async (id_site) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  const res = await Api.get(`/warehouse/get_by_site_id/${id_site}`)
  Warehouse.value = res.data.data
}

const fetchDetailById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  Api.defaults.headers.common.Authorization = `Bearer ${token}`
  if (props.dataArr.status == "Approve") {
    const res = await Api.get(`/request_atk/get_by_atk_request_w_id/${id}`)
    const get_wh = await Api.get(`/request_atk/get_by_atk_request_id/${id}`)

    console.log(res.data.data)
    itemTable.value = res.data.data.map((element, index) => {
      return {
        ...element,
        total_stock: element.stock_real_wh,
        qtyApproved: element.qty_approved,
        qty_requested: element.qty_approved,
      }
    })

    // itemTable.value = itemTable.value.reduce((acc, detail) => {
    //   const item_name = detail.item_name
    //   ;(acc[item_name] = acc[item_name] || []).push(detail)
    //   return acc
    // }, {})

    const groupedItems = _.groupBy(itemTable.value, "item_name")

    itemTable.value = _.values(groupedItems)

    console.log(itemTable.value)
  } else {
    const res = await Api.get(`/request_atk/get_by_atk_request_id/${id}`)
    console.log(res.data.data)
    itemTable.value = res.data.data.map((item) => {
      return [item]
    })
  }
}

const filteredWh = (data) => {
  const selectedWh = (itemTable?.value || [])
    .map(({ id_warehouse }) => id_warehouse)
    .filter((item) => item)

  return (data?.array_warehouse || []).filter(function (item) {
    return !selectedWh.includes(item.id_warehouse)
  })
}

const addItem = async (ind, data) => {
  // let datas = {
  //   id_item: data.id_item,
  //   id_atk_request_detail: router.currentRoute.value.params.id,
  //   id_warehouse: idWh.value[ind],
  //   name_warehouse: warehouseName.value,
  //   qty_approved: qtyApproved.value[ind],
  //   item_name: data.item_name,
  //   code_item: data.code_item,
  //   uom_name: data.uom_name,
  //   qty: data.qty,
  //   remarks: notesName.value ? notesName.value : "",
  //   array_warehouse: filter_wh,
  //   total_stock: data.total_stock,
  //   status: "add_new",
  // }

  itemTable.value[ind].push({
    ...data,
    qtyApproved: null,
    id_warehouse: null,
  })

  // itemTable.value.map((element) => {
  //   element.stock_available = data?.stock_available ? data?.stock_available : 0
  // })

  tableKey.value++
}

const updateQty = (item, data) => {
  if (data.qtyApproved > data.total_stock || data.qtyApproved < 0) {
    data.qtyApproved = data.total_stock
  }

  if (data.qtyApproved > data.qty_requested) {
    data.qtyApproved = data.qty_requested
  }

  const countTotalApprove = totalApprove([...item])
  console.log(totalApprove(item), data.qty_requested)

  if (countTotalApprove > data.qty_requested) {
    data.qtyApproved = 0
    data.qtyApproved = Math.abs(data.qty_requested - totalApprove([...item]))
  }

  if (data.qtyApproved < 0) {
    data.qtyApproved = 0
  }
}

const totalApprove = (item) => {
  const total = item
    .map(({ qtyApproved }) => qtyApproved)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

  return parseInt(total)
}

const removeItem = async (indexItem, indexDetail) => {
  itemTable.value[indexItem].splice(indexDetail, 1)
  tableKey.value++
}

const submit = async () => {
  itemPayload.value = []
  console.log(itemTable.value)
  const warehouse_detail = itemTable.value.flat().map((element, index) => {
    // element.remarks = notesName.value ? notesName.value : ""
    // element.qty_approved = qtyApproved.value[index]
    // element.id_warehouse = idWh.value[index]
    // element.id_atk_request_detail = element.id

    return {
      id_item: element.id_item,
      id_atk_request_detail: element.id,
      id_warehouse: element.id_warehouse,
      qty_approved: element.qtyApproved,
      remarks: element.remarks_detail,
    }
  })

  payload.value = {
    warehouse_detail: warehouse_detail,
    notes: notesName.value ? notesName.value : "",
  }

  // console.log(payload.value)

  isApprove.value = true
  if (isApprove.value) {
    const token = JSON.parse(localStorage.getItem("token"))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    let api =
      props.dataArr.status == "Approve"
        ? `/approval_request_atk/completed/${router.currentRoute.value.params.id}`
        : `/approval_request_atk/approve/${router.currentRoute.value.params.id}`
    Api.post(api, payload.value, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        router.push({
          path: "/approvalatkrequest",
        })
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }
}

onBeforeMount(() => {
  changeSite(props.dataArr.id_site)
  fetchDetailById(router.currentRoute.value.params.id)
  disableField.value = props.dataArr.status == "Approve" ? true : false
})
</script>

<template>
  <label
    for="my-modal-approve-atk"
    class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-[#099250] hover:text-white hover:border-[#099250]"
  >
    <span>
      <img :src="icon_done" class="w-5 h-5" />
    </span>
    {{ btnApprove }}
  </label>

  <input type="checkbox" id="my-modal-approve-atk" class="modal-toggle" />
  <div class="modal">
    <div class="modal-dialog bg-white w-4/5">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          for="my-modal-approve-atk"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          <span v-if="props.dataArr.status == 'Approve'"
            >Delivery Confirmation</span
          >
          <span v-else>Approval Confirmation</span>
        </p>
      </nav>
      <main
        class="modal-box-inner-approval-atk p-5 h-[50vh] overflow-y-scroll w-ful"
      >
        <div>
          <table class="table table-compact w-full mb-5">
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
                  class="border w-[50px] border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  <span v-if="props.dataArr.status == 'Approve'">
                    Quantity Approve
                  </span>
                  <span v-else>Quantity Requested</span>
                </th>
                <th
                  class="border border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  ATK Warehouse
                </th>
                <th
                  class="border w-[50px] border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  Stock Available
                </th>
                <th
                  class="border w-[50px] border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                >
                  <span v-if="props.dataArr.status == 'Approve'"
                    >Quantity Delivery</span
                  >
                  <span v-else>Quantity Approve</span>
                </th>
                <th
                  class="border w-[50px] border-[#B9B9B9] bg-blue capitalize font-JakartaSans font-bold text-xs"
                  v-if="!disableField"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody
              v-for="(item, ind) in itemTable"
              :key="ind"
              class="font-JakartaSans font-normal text-xs"
            >
              <tr class="h-16" v-for="(value, index) in item" :key="value.id">
                <td
                  v-if="index == 0"
                  :rowspan="item.length"
                  class="border border-[#B9B9B9]"
                >
                  {{ value.code_item }} - {{ value.item_name }}
                </td>
                <td
                  v-if="index == 0"
                  :rowspan="item.length"
                  align="center"
                  class="border border-[#B9B9B9]"
                >
                  {{ value.uom_name }}
                </td>

                <td
                  v-if="
                    index == 0 && props.dataArr.status == 'Waiting Approval'
                  "
                  align="center"
                  :rowspan="item.length"
                  class="border border-[#B9B9B9]"
                >
                  {{ value?.qty_requested }}
                </td>

                <td
                  v-else-if="props.dataArr.status == 'Approve'"
                  class="border border-[#B9B9B9]"
                >
                  {{ value?.qty_approved }}
                </td>

                <td class="border border-[#B9B9B9] w-150px">
                  <div v-if="value.array_warehouse">
                    <!-- <pre>
                      {{ value.array_warehouse }}
                    </pre> -->
                    <Multiselect
                      class="text-sm"
                      v-model="value.id_warehouse"
                      :options="value.array_warehouse"
                      label="warehouse_name"
                      track-by="warehouse_name"
                      value-prop="id_warehouse"
                      :can-clear="false"
                      @select="
                        (option, select$) => {
                          value.total_stock = select$.stock_available
                        }
                      "
                      @open="
                        () => {
                          const selectedWh = item
                            .map(({ id_warehouse }) => id_warehouse)
                            .filter((item) => item)

                          value.array_warehouse.forEach((item) => {
                            item.disabled = selectedWh.includes(
                              item.id_warehouse
                            )
                              ? true
                              : false
                          })

                          updateQty(item, value)
                        }
                      "
                    >
                    </Multiselect>
                  </div>

                  <div v-else>{{ value.warehouse_name }}</div>
                </td>
                <td class="border border-[#B9B9B9]">
                  {{ value.total_stock }}
                </td>

                <td class="border border-[#B9B9B9]" style="max-width: auto">
                  <input
                    type="number"
                    v-model="value.qtyApproved"
                    class="bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                    @input="
                      () => {
                        if (props.dataArr.status == 'Waiting Approval') {
                          updateQty(item, value)
                        } else {
                          if (value.qtyApproved > value.qty_approved) {
                            value.qtyApproved = value.qty_requested
                          }

                          if (value.qtyApproved < 0) {
                            value.qtyApproved = value.qty_requested
                          }
                        }
                      }
                    "
                    :disabled="!value?.id_warehouse"
                  />
                </td>
                <td
                  class="border border-[#B9B9B9] text-center"
                  v-if="!disableField"
                >
                  <button
                    @click="addItem(ind, value)"
                    v-if="
                      value.array_warehouse.length > item.length &&
                      index == item.length - 1 &&
                      value.qtyApproved &&
                      value.qty_requested > totalApprove(item)
                    "
                  >
                    <img :src="icon_add" class="w-6 h-6" alt="" />
                  </button>
                  <button
                    v-else-if="item.length > 1"
                    @click="removeItem(ind, index)"
                  >
                    <img :src="deleteicon" class="w-6 h-6" alt="" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div class="sticky bottom-0 bg-white py-2">
        <div class="w-full p-5">
          <p class="font-JakartaSans font-medium text-sm py-2">Notes</p>
          <textarea
            type="text"
            rows="5"
            v-model="notesName"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Notes"
            style="resize: none"
          ></textarea>
        </div>
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
            <span v-if="props.dataArr.status == 'Approve'">Delivery</span>
            <span v-else>Approve</span>
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

table {
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
