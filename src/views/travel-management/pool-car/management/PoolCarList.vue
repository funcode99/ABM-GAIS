<script setup>
import { onMounted, ref, computed, reactive } from "vue"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import DataTable from "@/components/table/DataTable.vue"

import PageTitle from "@/components/atomics/PageTitle.vue"
import FormDialog from "./CarFormDialog.vue"

import icon_receive from "@/assets/icon-receive.svg"
import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"
import icon_edit from "@/assets/navbar/edit_icon.svg"
import icon_delete from "@/assets/navbar/delete_icon.svg"

import Multiselect from "@vueform/multiselect"

import { numberFilter } from "@/utils/filters"

import {
  fetchCarMaster,
  getAllSite,
  deleteCarById,
} from "@/utils/Api/travel-management/poolCar"

import fetchCompany from "@/utils/Fetch/Reference/fetchCompany.js"

import ConfirmDialog from "@/components/molecules/ConfirmDialog.vue"

const headers = ref([
  {
    text: "Plate",
    key: "plate",
    value: "plate",
  },
  {
    text: "Car Name",
    key: "car_name",
    value: "car_name",
  },
  {
    text: "Site",
    key: "site_name",
    value: "site_name",
  },
  {
    text: "Driver",
    key: "name",
    value: "name",
  },
  {
    text: "Odometer",
    key: "odometer",
    value: "odometer",
  },
  {
    text: "Status",
    key: "status",
    value: "status",
  },
  {
    text: "Actions",
    key: "actions",
    value: "actions",
    noExport: true,
  },
])

const selectedItems = ref([])
const dataTableRef = ref()
const formDialogRef = ref()
const selectedData = ref({})
const deleteDialog = ref(false)

const filter = reactive({
  site: {
    items: [],
    value: null,
  },
  company: {
    items: [],
    value: null,
  },
  keyword: null,
})

const computedFilter = computed(() => {
  return {
    id_site: filter.site.value,
    search: filter.keyword,
    id_company: filter.company.value,
  }
})

const fethSiteReference = async () => {
  try {
    const companyId = localStorage.getItem("id_company")
    // const res = await getSiteByCompany(companyId)
    const res = await getAllSite(companyId)

    filter.site.items = res.data.data
  } catch (error) {
    console.error(error)
  }
}

const setEditedData = (item) => {
  selectedData.value = { ...item }
  formDialogRef.value.dialog = true
}

const setDeleteDialog = (item) => {
  selectedData.value = { ...item }
  deleteDialog.value = true
}

const success = () => {
  dataTableRef.value.getData()
}

const reset = () => {
  filter.site.value = null
  filter.keyword = null
  filter.company.value = null

  dataTableRef.value.getData()
}

const exportToXLS = () => {
  dataTableRef.value.exportToXls()
}

const deleteData = async () => {
  try {
    const carId = selectedData.value.id

    await deleteCarById(carId)

    success()
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fethSiteReference()
  filter.company.items = await fetchCompany()
})
</script>

<template>
  <tableContainer>
    <tableTop>
      <div
        class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2"
      >
        <PageTitle></PageTitle>

        <div class="flex items-center gap-4">
          <FormDialog
            ref="formDialogRef"
            @success="success()"
            @reset-data="selectedData = {}"
            :data="selectedData"
          >
          </FormDialog>
        </div>
      </div>

      <div class="flex flex-wrap items-end px-4 py-2 gap-y-2">
        <div class="flex items-end flex-wrap gap-4 justify-between">
          <div class="flex flex-col gap-1">
            <p
              class="capitalize font-JakartaSans text-xs text-black font-medium"
            >
              Site
            </p>

            <Multiselect
              v-model="filter.site.value"
              mode="single"
              placeholder="Select Site"
              label="site_name"
              track-by="site_code"
              :options="filter.site.items"
              valueProp="id"
              clear
              searchable
              class="w-[300px]"
            >
            </Multiselect>
          </div>

          <div class="flex flex-col gap-1">
            <p
              class="capitalize font-JakartaSans text-xs text-black font-medium"
            >
              Company
            </p>

            <Multiselect
              v-model="filter.company.value"
              mode="single"
              placeholder="Select Company"
              label="company_name"
              track-by="company_name"
              :options="filter.company.items"
              valueProp="id"
              clear
              searchable
              class="w-[300px]"
            >
            </Multiselect>
          </div>

          <!-- FILTER -->
          <div class="flex gap-4 flex-wrap flex-1">
            <button
              @click="dataTableRef.getData()"
              class="h-[45px] btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
            >
              <span>
                <img :src="icon_filter" class="w-5 h-5" />
              </span>
              Filter
            </button>

            <button
              @click="reset"
              class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[45px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
            >
              <span>
                <img :src="icon_reset" class="w-5 h-5" />
              </span>
              Reset
            </button>
          </div>
        </div>
        <div class="sm:flex-1"></div>
        <div class="pt-2 flex md:mx-0">
          <label class="relative block">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>

            <input
              class="placeholder:text-slate-400 placeholder:font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              placeholder="Search..."
              type="text"
              name="search"
              v-model="filter.keyword"
            />
          </label>
        </div>
      </div>
      <div class="px-5">
        <DataTable
          v-model:selectedItems="selectedItems"
          @update:selectedItems="selectedItems = $event"
          :headers="headers"
          :api-method="fetchCarMaster"
          :api-params="computedFilter"
          export-fileName="Pool Car List"
          ref="dataTableRef"
          show-select
        >
          <template #item-status="{ item }">
            {{ !item.status ? "Under Maintance" : "Active" }}
          </template>

          <template #item-odometer="{ item }">
            {{ numberFilter(item.odometer) }}
          </template>

          <template #item-actions="{ item }">
            <div class="flex justify-center items-center gap-2">
              <button @click="setEditedData(item)">
                <img :src="icon_edit" class="w-6 h-6" />
              </button>
              <button @click="setDeleteDialog(item)">
                <img :src="icon_delete" class="w-6 h-6" />

                <ConfirmDialog
                  v-if="deleteDialog"
                  @confirm="deleteData"
                  @cancel="deleteDialog = false"
                ></ConfirmDialog>
              </button>
            </div>
          </template>
        </DataTable>
      </div>
    </tableTop>
  </tableContainer>
</template>
