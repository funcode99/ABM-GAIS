<script setup>
import modalHeader from "@/components/modal/modalHeader.vue"
import modalFooter from "@/components/modal/modalFooter.vue"

import { ref, watch } from "vue"
import { Modal } from "usemodal-vue3"
import Swal from "sweetalert2"
import Api from "@/utils/Api"

import { useReferenceFetchResult } from '@/stores/fetch/reference'
const referenceFetch = useReferenceFetchResult()

const emits = defineEmits(["unlockScrollbar", "brand-saved"])

let selectedCompany = ref("Company")
let selectedSite = ref("Site")
let brandName = ref("")
let Company = ref("")
let Site = ref("")
let isVisible = ref(false)
let modalPaddingHeight = "25vh"
let isAdding = ref(false)
let location = ref()
let responseCompanyArray = ref([])
let responseSiteArray = ref([])


const saveBrand = async () => {
  isAdding.value = true
  isVisible.value = !isVisible.value
  setTimeout(callAddApi, 500)
}

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await Api.post(`/brand/store`, {
      brand_name: brandName.value,
      id_company: location.value[1],
      id_site: location.value[0],
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("brand-saved")
  } catch (error) {
    console.log(error)
  }
}

const resetInput = () => {
  brandName.value = ""
  selectedCompany.value = "Company"
  selectedSite.value = "Site"
}

watch(isVisible, () => {

  if (isAdding.value == true) {
    isAdding.value = false
  } else {
    resetInput()
  }

  responseCompanyArray.value = referenceFetch.fetchEmployeeResult
  responseSiteArray.value = referenceFetch.fetchSiteResult

})


</script>

<template>

  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green">
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">

    <main>
      
      <modalHeader @closeVisibility="isVisible = false" title="New Brand" />

      <form class="pt-4" @submit.prevent="saveBrand">
        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Company<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="location"
          >
            <option disabled selected>Company</option>
            <option
              v-for="data in responseSiteArray"
              :key="data.id"
              :value="[data.id, data.id_company]"
            >
              {{ data.company_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Site<span class="text-red">*</span></label
          >
          <select
            class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
            v-model="location"
          >
            <option disabled selected>Site</option>
            <option
              v-for="data in responseSiteArray"
              :key="data.id"
              :value="[data.id, data.id_company]"
            >
              {{ data.site_name }}
            </option>
          </select>
        </div>

        <div class="mb-6 w-full px-4">
          <label class="block mb-2 font-JakartaSans font-medium text-sm"
            >Brand Name<span class="text-red">*</span></label
          >
          <input
            type="text"
            class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Brand Name"
            required
            v-model="brandName"
          />
        </div>

        <modalFooter @closeEdit="isVisible = false" class="pb-2" />
      </form>

    </main>

  </Modal>
</template>

<style scoped>
:deep(.modal-vue3-content) {
  max-height: 400px !important;
  max-width: 510px !important;
}
</style>
