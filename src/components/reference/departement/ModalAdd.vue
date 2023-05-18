<script setup>
import iconClose from "@/assets/navbar/icon_close.svg";

import Swal from "sweetalert2";
import Api from "@/utils/Api";

import { ref, onMounted } from "vue";

const emits = defineEmits(["unlockScrollbar", "departement-saved"]);

const tags = ref([]);
const selectedDivisionTags = ref([]);
let isOpenModal = ref(false);
let selectedCompany = ref("Company");
let Company = ref();
let selectedGlAccount = ref("Account");
let GlAccount = ref();
let nameDepartement = ref("");
let costCenter = ref("");
let profitCenter = ref("");
let status = ref("Status");
let departementHead = ref("Name");
let Employee = ref("");

//for get company in select
const fetchCompany = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/company/get");
  Company.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get gl account in select
const fetchGlAccount = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/gl_account/");
  GlAccount.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

//for get employee in select
const fetchEmployee = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await Api.get("/employee/get/");
  Employee.value = res.data.data;
  // console.log("ini data parent" + JSON.stringify(res.data.data));
};

onMounted(() => {
  fetchCompany();
  fetchGlAccount();
  fetchEmployee();
});

const handleChangeTag = (tags) => {
  tags.value = tags;
  selectedDivisionTags.value.push(tags);
};

const saveDepartement = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const payload = {
      departement_name: nameDepartement.value,
      id_company: selectedCompany.value,
      cost_center: costCenter.value,
      is_active: status.value,
      profit_center: profitCenter.value,
      departement_head: departementHead.value,
      division: selectedDivisionTags.value,
    };

    console.log("ini payload:" + JSON.stringify(payload));

    await Api.post(`/department/store`, payload);

    // Reset nilai input
    nameDepartement.value = "";
    selectedCompany.value = "";
    costCenter.value = "";
    status.value = "";
    profitCenter.value = "";
    departementHead.value = "";
    selectedDivisionTags.value = [];

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    emits("departement-saved");
    isOpenModal.value = !isOpenModal.value;
  } catch (error) {
    console.log(error);
  }
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
          @click="this.$emit('unlockScrollbar')"
          for="my-modal-3"
          class="cursor-pointer absolute right-3 top-3"
        >
          <img :src="iconClose" class="w-[34px] h-[34px] hover:scale-75" />
        </label>
        <p class="font-JakartaSans text-2xl font-semibold text-white mx-4 py-2">
          New Departement
        </p>
      </nav>

      <main class="modal-box-inner-departement">
        <form @submit.prevent="saveDepartement">
          <div class="w-full">
            <div class="mb-6 w-full px-4">
              <label
                for="company"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Company<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
                v-model="selectedCompany"
              >
                <option disabled selected>Company</option>
                <option v-for="company in Company" :value="company.id">
                  {{ company.company_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-6 w-full px-4">
            <label
              for="name"
              class="block mb-2 font-JakartaSans font-medium text-sm"
              >Name<span class="text-red">*</span></label
            >
            <input
              type="text"
              name="name"
              class="font-JakartaSans capitalize block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name Departement"
              required
              v-model="nameDepartement"
            />
          </div>

          <div class="flex justify-between px-4 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="cost_center"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Cost Center<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Cost Center"
                required
                v-model="costCenter"
              />
            </div>

            <div class="mb-6 w-full ml-6">
              <label
                for="profit"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Profit Center<span class="text-red">*</span></label
              >
              <input
                type="text"
                name="name"
                class="font-JakartaSans capitalize block bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Profit Center"
                required
                v-model="profitCenter"
              />
            </div>
          </div>

          <div class="flex justify-between px-4 items-center gap-2">
            <div class="mb-6 w-full">
              <label
                for="glaccount"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >GL Account<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
                v-model="selectedGlAccount"
              >
                <option disabled selected>Account</option>
                <option v-for="account in GlAccount" :value="account.id">
                  {{ account.gl_account }}
                </option>
              </select>
            </div>
            <div class="mb-6 w-full ml-6">
              <label
                for="status"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Status<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
                v-model="status"
              >
                <option disabled selected>Status</option>
                <option>Active</option>
                <option>Non Active</option>
              </select>
            </div>
          </div>

          <div class="flex justify-between items-start gap-2 px-4">
            <div class="mb-6 w-full text-start">
              <label
                for="Division"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Division<span class="text-red">*</span></label
              >
              <div
                class="block bg-white w-full lg:w-[220px] md:w-52 border border-slate-300 rounded-md shadow-sm"
              >
                <vue3-tags-input
                  :tags="tags"
                  placeholder="enter some tags"
                  @on-tags-changed="handleChangeTag"
                />
              </div>
            </div>

            <div class="mb-6 w-full text-start ml-6">
              <label
                for="departementhead"
                class="block mb-2 font-JakartaSans font-medium text-sm"
                >Departemen Head<span class="text-red">*</span></label
              >
              <select
                class="bg-white w-full lg:w-56 md:w-52 border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
                required
                v-model="departementHead"
              >
                <option disabled selected>Name</option>
                <option v-for="name in Employee" :value="name.employee_name">
                  {{ name.employee_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="sticky bottom-0 bg-white">
            <div class="flex justify-end gap-4 mr-6">
              <label
                @click="this.$emit('unlockScrollbar')"
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

.modal-box-inner-departement {
  height: 500px;
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
