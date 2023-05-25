<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted } from "vue";

let selectedCompany = ref("Company");
let selectedSite = ref("Site");
let warehouseName = ref("");
let Company = ref("");
let Site = ref("");
let isOpenModal = ref(false);
const emits = defineEmits(["unlockScrollbar", "warehouse-saved"]);

//for get company in select
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get site in select
const fetchGetSite = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/site/");
  Site.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchGetCompany();
  fetchGetSite();
});

const saveWarehouse = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const payload = {
      warehouse_name: warehouseName.value,
      id_company: selectedCompany.value,
      id_site: selectedSite.value,
    };

    await Api.post(`/warehouse/store`, payload);

    // Reset nilai input
    (warehouseName.value = ""), (selectedCompany.value = "Company");
    selectedSite.value = "Site";

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    emits("warehouse-saved");
    isOpenModal.value = !isOpenModal.value;
  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  warehouseName.value = "";
  selectedCompany.value = "Company";
  selectedSite.value = "Site";
};
</script>

<template>
  <label
    @click="this.$emit('unlockScrollbar')"
    for="my-modal-3"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
    >+ Add New</label
  >

  <input
    type="checkbox"
    id="my-modal-3"
    class="modal-toggle"
    v-model="isOpenModal"
  />
  <div class="modal">
    <div class="modal-box relative">
      <nav class="sticky top-0 z-50 bg-[#015289]">
        <label
          @click="
            resetInput();
            this.$emit('unlockScrollbar');
          "
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New Warehouse
        </p>
      </nav>

      <main class="modal-box-inner-warehouse">
        <form class="pt-4" @submit.prevent="saveWarehouse">
          <div class="mb-6 w-full px-4">
            <label
              for="company"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Company<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
              v-model="selectedCompany"
            >
              <option disabled selected>Company</option>
              <option v-for="company in Company" :value="company.id">
                {{ company.company_name }}
              </option>
            </select>
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="site"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Site<span class="text-red">*</span></label
            >
            <select
              class="cursor-pointer font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              required
              v-model="selectedSite"
            >
              <option disabled selected>Site</option>
              <option v-for="site in Site" :value="site.id">
                {{ site.site_name }}
              </option>
            </select>
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="warehouse"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Warehouse Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="warehouse"
              class="font-JakartaSans block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Warehouse Name"
              required
              v-model="warehouseName"
            />
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="
                  resetInput();
                  this.$emit('unlockScrollbar');
                "
                for="my-modal-3"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] bg-red border-red hover:bg-white hover:border-red hover:text-red"
                >Cancel</label
              >
              <button
                type="submit"
                class="btn text-white text-base font-JakartaSans font-bold capitalize w-[141px] border-green bg-green hover:bg-white hover:text-green hover:border-green"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.modal-box {
  padding: 0;
  overflow-y: hidden;
  overscroll-behavior: contain;
}

.modal-box-inner-warehouse {
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
