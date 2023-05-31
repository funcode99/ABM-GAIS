<script setup>
import modalHeader from "@/components/modal/modalHeader.vue";
import modalFooter from "@/components/modal/modalFooter.vue";

import { Modal } from "usemodal-vue3";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted, watch } from "vue";

const emits = defineEmits(["unlockScrollbar", "zona-saved"]);

let selectedCompany = ref("Company");
let Company = ref("");
let selectedCity = ref("");
let zonaName = ref("");
let City = ref("");
let isVisible = ref(false);
let modalPaddingHeight = "25vh";
let isAdding = ref(false);

const selectedCityTags = ref([]);
const tags = ref([]);
const tag = ref("");

const handleSelectedTag = (tag) => {
  tags.value.push(tag);
  selectedCityTags.value.push(tag.id);
};

const handleChangeTag = (tags) => {
  tags.value = tags;
};

//for get city in input
const fetchCity = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/city/");
  City.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get company in input
const fetchGetCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchCity();
  fetchGetCompany();
});

const saveZona = async () => {
  isAdding.value = true;
  isVisible.value = !isVisible.value;
  setTimeout(callAddApi, 500);
};

const callAddApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await Api.post(`/zona/store`, {
      zona_name: zonaName.value,
      id_city: selectedCityTags.value,
      // id_company: selectedCompany.value,
    });

    // const payload = {
    //   zona_name: zonaName.value,
    //   id_city: selectedCityTags.value,
    // };

    // console.log("ini payload:" + JSON.stringify(payload));

    // Reset nilai input
    // zonaName.value = "";
    // selectedCityTags.value = [];

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    emits("zona-saved");
  } catch (error) {
    console.log(error);
  }
};

const resetInput = () => {
  zonaName.value = "";
  // selectedCompany.value = "Company";
  selectedCityTags.value = "Site";
};

watch(isVisible, () => {
  if (isAdding.value == true) {
    isAdding.value = false;
  } else {
    resetInput();
  }
});
</script>

<template>
  <button
    @click="isVisible = true"
    class="btn btn-success bg-green border-green hover:bg-none capitalize text-white font-JakartaSans text-xs hover:bg-white hover:text-green hover:border-green"
  >
    + Add New
  </button>

  <Modal v-model:visible="isVisible" v-model:offsetTop="modalPaddingHeight">
    <main>
      <modalHeader @closeVisibility="isVisible = false" title="New Zona" />

      <form class="pt-4" @submit.prevent="saveZona">
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
            for="zona"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >Zona<span class="text-red">*</span></label
          >
          <input
            type="text"
            name="tlk"
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Zona"
            required
            v-model="zonaName"
          />
        </div>

        <div class="mb-6 w-full px-4">
          <label
            for="city"
            class="block mb-2 font-JakartaSans font-medium text-sm"
            >City<span class="text-red">*</span></label
          >
          <div
            class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md text-sm font-medium sm:text-sm"
          >
            <vue3-tags-input
              v-model:tags="tags"
              v-model="tag"
              :select="true"
              :select-items="City"
              @on-select="handleSelectedTag"
              @on-tags-changed="handleChangeTag"
              placeholder="Select the tag"
            >
              <template
                #item="{ tag, index }"
                v-model="selectedCity"
                v-for="city in City"
                :value="Array(city.id)"
                :key="city.id"
              >
                {{ tag.city_name }}
              </template>
              <template #no-data> No Data </template>
              <template #select-item="tag">
                {{ tag.city_name }}
              </template>
            </vue3-tags-input>
          </div>
        </div>

        <modalFooter @closeEdit="isVisible = false" />
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
