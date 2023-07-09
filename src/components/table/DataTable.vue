<script setup>
import { computed, onMounted, ref, watch } from "vue"
import debounce from "lodash/debounce"
import { stringify } from "qs"
import exportExcel from "@/utils/exportToExcel.js"

import arrowicon from "@/assets/navbar/icon_arrow.svg"

const SEARCH_DEBOUNCE_MS = 500

const emit = defineEmits(["update:selectedItems", "row:click"])

const props = defineProps({
  headers: {
    type: Object,
    required: true,
    // {
    //    text: String,
    //    key: String,
    //    value: String
    //    sortable: Boolean
    // }
  },
  data: {
    type: Array,
    default: [],
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  apiParams: {
    type: Object,
    default: () => {},
  },
  apiMethod: {
    type: Function,
    default: () => {},
  },
  tableNumber: {
    type: Boolean,
    default: true,
  },
  showSelect: {
    type: Boolean,
    default: false,
  },
  selectedItems: {
    type: Array,
    default: () => [],
  },
  filter: {
    type: Object,
    default: () => {},
  },
  exportFileName: {
    type: String,
    default: () => {},
  },
})

const paging = ref({
  page: 1,
  limit: 10,
  totalData: 1,
})

const items = ref([])
const loading = ref(true)

const headerKeys = computed(() => {
  return props.headers.map(({ key }) => key) ?? []
})

watch(
  props.filter,
  () => {
    paging.page = 0
    getData()
  },
  { deep: true }
)

watch(
  () => props.apiParams,
  () => {
    paging.page = 0
    getData()
  },
  { deep: true }
)

watch(
  () => props.data,
  () => {
    items.value = props.data
  },
  { deep: true }
)

const getData = debounce(async function () {
  // const { sortBy, sortDesc, page, limit } = paging

  try {
    items.value = []
    loading.value = true
    const res = await props.apiMethod({
      params: {
        perPage: paging.value.limit,
        page: paging.value.page,
        ...props.apiParams,
      },
      paramsSerializer: (params) => stringify(params),
    })

    paging.value.totalData = res.data.total || 0
    items.value = res.data.data || []
    // items.value = []
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}, SEARCH_DEBOUNCE_MS)

const exportToXls = async () => {
  const formatedHeader = props.headers
    .filter(({ noExport }) => !noExport)
    .map(({ text, value }, index) => {
      return {
        no: index + 1,
        title: text,
        value: value,
      }
    })

  await exportExcel(
    props.exportFileName,
    formatedHeader,
    items,
    ...formatedHeader.map(({ value }) => value)
  )
}

const sortTableByKey = (key, orderBy) => {
  items.value = items.value.sort(function (a, b) {
    var x = orderBy ? a[key] : b[key]
    var y = orderBy ? b[key] : a[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}

defineExpose({ getData, exportToXls })

onMounted(() => {
  if (props.data.length == 0) {
    getData()
  } else {
    items.value = props.data
  }
})
</script>

<template>
  <slot name="item-per-page">
    <div v-if="pagination" class="my-5">
      <div class="flex items-center gap-1 h-4">
        <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
        <select
          class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
          v-model="paging.limit"
          @change="getData()"
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
        </select>
      </div>
    </div>
  </slot>

  <div class="bg-white rounded-xl box-border block overflow-x-auto w-[auto]">
    <table
      class="table table-zebra table-compact border w-full h-full block rounded-lg overflow-auto"
    >
      <thead class="text-center font-JakartaSans text-sm font-bold h-10">
        <tr>
          <slot v-if="showSelect" name="selection">
            <th width="50px" class="p-3">
              <div class="flex justify-center">
                <input type="checkbox" name="checked" />
              </div>
            </th>
          </slot>

          <th width="50px" class="p-3" v-if="tableNumber" align="center">
            <span class="flex justify-center items-center gap-1"> No </span>
          </th>

          <slot name="headers">
            <th
              v-for="header in headers"
              class="overflow-x-hidden cursor-pointer"
              :set="(orderBy = true)"
              width="auto"
              @click="
                () => {
                  sortTableByKey(header.key, orderBy)
                  orderBy = !orderBy
                }
              "
            >
              <slot :key="header.key" :name="`header_${header.key}`">
                <span class="flex justify-center items-center gap-1 p-3">
                  {{ header.text }}

                  <button v-if="header.sortable ?? true">
                    <img :src="arrowicon" class="w-[9px] h-3" />
                  </button>
                </span>
              </slot>
            </th>
          </slot>
        </tr>
      </thead>

      <tbody>
        <slot name="body">
          <tr
            v-if="items.length > 0"
            v-for="(item, index) in items"
            class="font-JakartaSans font-normal text-sm data-item"
            @click="emit('row:click')"
          >
            <td v-if="showSelect">
              <input type="checkbox" name="checks" :value="item" />
            </td>
            <td v-if="tableNumber">
              {{ (paging.page - 1) * paging.limit + index + 1 }}
            </td>

            <td v-for="headerKey in headerKeys" :key="`${index}-${headerKey}`">
              <slot :item="item" :name="`item-${headerKey}`">
                {{
                  item[headerKey] !== undefined ? item[headerKey] || "-" : "-"
                }}
              </slot>
            </td>
          </tr>

          <tr v-else-if="loading">
            <td colspan="100%" height="200px">
              <div class="w-[auto] flex justify-center align-center">
                <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                  <path
                    class="opacity-75 text-primary"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span class="text-base"> Loading Data...</span>
              </div>
            </td>
          </tr>

          <tr v-else>
            <td height="200px" colspan="100%" align="center">
              <slot name="not-found"> No Data Available </slot>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
  <slot name="footer">
    <div
      v-if="pagination"
      class="flex flex-wrap justify-center lg:justify-between items-center mx-4 py-2"
    >
      <p class="font-JakartaSans text-xs font-normal text-[#888888] py-2">
        Showing {{ paging.limit * (paging.page - 1) + 1 }} to
        {{ paging.limit * paging.page }}
        of {{ paging.totalData }} entries
      </p>

      <vue-awesome-paginate
        :total-items="paging.totalData"
        :items-per-page="parseInt(paging.limit)"
        v-model="paging.page"
        :on-click="getData"
        :max-pages-shown="4"
        :show-breakpoint-buttons="true"
        :show-jump-buttons="false"
      />
    </div>
  </slot>
</template>

<style scoped>
th {
  padding: 2px;
  text-align: left;
  position: relative;
}

tr td {
  text-align: center;
  white-space: nowrap;
}

tr th {
  background-color: #015289;
  text-transform: capitalize;
  color: white;
}

.table-zebra tbody tr.data-item:hover td {
  background-color: rgb(193, 192, 192);
  /* cursor: pointer; */
}

.backgroundHeight {
  min-height: calc(100vh - 115px);
}
</style>
