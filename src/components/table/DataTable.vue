<script setup>
import arrowicon from "@/assets/navbar/icon_arrow.svg"
import { computed, onMounted, ref, watch } from "vue"
import debounce from "lodash/debounce"
import { stringify } from "qs"

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
  // items: {
  //   type: Array,
  //   default: () => [],
  // },
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
})

const paging = ref({
  page: 1,
  limit: 10,
  totalData: 1,
})

const items = ref([])

const headerKeys = computed(() => {
  return props.headers.map(({ key }) => key) ?? []
})

watch(paging, () => {
  getData()
})

watch(props.filter, () => {
  getData()
})

const getData = debounce(async function () {
  // const { sortBy, sortDesc, page, limit } = paging


  

  try {
    const res = await props.apiMethod({
      params: {
        perPage: paging.value.limit,
        page: paging.value.page,
        ...props.apiParams,
      },
      paramsSerializer: (params) => stringify(params),
    })

    paging.totalData = res.data.total || 0
    items.value = res.data.data
  } catch (error) {
    console.error(error)
  }
}, SEARCH_DEBOUNCE_MS)

onMounted(() => {
  getData()
})
</script>

<template>
  <slot name="item-per-page">
    <div>
      <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
        <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
        <select
          class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
          v-model="paging.limit"
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

  <div class="px-4 py-2 bg-white rounded-xl box-border block overflow-x-hidden">
    <table
      class="table table-zebra table-compact border w-screen sm:w-full h-full rounded-lg"
    >
      <thead class="text-center font-JakartaSans text-sm font-bold h-10">
        <tr>
          <slot v-if="showSelect" name="selection">
            <th>
              <div class="flex justify-center">
                <input type="checkbox" name="checked" />
              </div>
            </th>
          </slot>

          <th v-if="tableNumber" align="center">
            <span class="flex justify-center items-center gap-1"> No </span>
          </th>

          <slot name="headers">
            <th
              v-for="header in headers"
              class="overflow-x-hidden cursor-pointer"
            >
              <slot :key="header.key" :name="`header_${header.key}`">
                <span class="flex justify-center items-center gap-1">
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
            class="font-JakartaSans font-normal text-sm"
            @click="emit('row:click')"
          >
            <td v-if="showSelect">
              <input type="checkbox" name="checks" :value="item" />
            </td>
            <td v-if="tableNumber">
              {{ index + 1 }}
            </td>

            <td v-for="headerKey in headerKeys" :key="`${index}-${headerKey}`">
              <slot :item="item" :name="`item-${headerKey}`">
                {{
                  item[headerKey] !== undefined ? item[headerKey] || "-" : "-"
                }}
              </slot>
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

    <slot name="footer">
      <div
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
          :max-pages-shown="4"
          :show-breakpoint-buttons="true"
          :show-jump-buttons="false"
        />
      </div>
    </slot>
  </div>
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

.table-zebra tbody tr:hover td {
  background-color: rgb(193, 192, 192);
  /* cursor: pointer; */
}

.backgroundHeight {
  min-height: calc(100vh - 115px);
}

.this {
  overflow-x: hidden;
}
</style>
