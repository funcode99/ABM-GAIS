<script setup>
import { onMounted, ref } from "vue"

import tableContainer from "@/components/table/tableContainer.vue"
import tableTop from "@/components/table/tableTop.vue"
import DataTable from "@/components/table/DataTable.vue"

import PageTitle from "@/components/atomics/PageTitle.vue"

import FormDialog from "../components/CarFormDialog.vue"

import icon_receive from "@/assets/icon-receive.svg"

import Multiselect from "@vueform/multiselect"

import { numberFilter } from "@/utils/filters"

import {
  fetchCarMaster,
  getSiteByCompany,
  getAllSite,
} from "@/utils/Api/travel-management/poolCar"

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
])

const selectedItems = ref([])

const filter = ref({
  site: {
    items: [],
    value: null,
  },
})

const fethSiteReference = async () => {
  try {
    const companyId = localStorage.getItem("id_company")
    // const res = await getSiteByCompany(companyId)
    const res = await getAllSite(companyId)

    filter.value.site.items = res.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fethSiteReference()
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
          <FormDialog> </FormDialog>

          <button
            class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
          >
            <img :src="icon_receive" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-end px-4 py-2 gap-y-2">
        <div class="flex items-end flex-wrap gap-4">
          <!-- SORT -->
          <div class="flex flex-col gap-1">
            <p
              class="capitalize font-JakartaSans text-xs text-black font-medium"
            >
              Site
            </p>

            <!-- <select
              v-model="filter.site"
              class="font-JakartaSans capitalize block bg-white w-[200px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            >
              <option v-for="item in filter.site.items" :value="item"></option>
            </select> -->

            <Multiselect
              v-model="filter.site.value"
              mode="single"
              placeholder="Select Site"
              label="site_name"
              track-by="site_code"
              :options="filter.site.items"
              valueProp="site_code"
              object
              clear
              searchable
              class="w-[300px]"
            >
            </Multiselect>
          </div>
        </div>
      </div>

      <DataTable
        v-model:selectedItems="selectedItems"
        @update:selectedItems="selectedItems = $event"
        :headers="headers"
        :api-method="fetchCarMaster"
        show-select
      >
        <template #item-status="{ item }">
          {{ !item ? "Under Maintance" : "Active" }}
        </template>
        <template #item-odometer="{ item }">
          {{ numberFilter(item.odometer) }}
        </template>
      </DataTable>
    </tableTop>
  </tableContainer>
</template>
