<script setup>
import icon_filter from "@/assets/icon_filter.svg"
import icon_reset from "@/assets/icon_reset.svg"
import icon_receive from "@/assets/icon-receive.svg"

import ModalAddMenu from "@/components/system-configuration/menu/ModalAddMenu.vue"
import ModalAddApproval from "@/components/system-configuration/approval/ModalAddApprover.vue"
import ModalAddUser from "@/components/system-configuration/user/ModalAddUser.vue"
import ModalAddSequence from "@/components/system-configuration/sequence/ModalAddSequence.vue"
import ModalAddRole from "@/components/system-configuration/role/ModalAddRole.vue"

import { ref, computed, onBeforeMount } from "vue"

import Api from "@/utils/Api";
import { useRouter } from 'vue-router'

const router = useRouter()

let search = ref("")
let companyId = ref('company')
let roleId = ref('role')
let pageMultiplier = ref(10)
let pageMultiplierReactive = computed(() => pageMultiplier.value);

const props = defineProps({
  title: String,
  modalAddType: String,
  numberSelected: Number
});

let companyData = ref([]);
let roleData = ref([]);

const fetchCompany = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await Api.get("/company/get");
    companyData.value = res.data.data;
}

const fetchRole = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  const api = await Api.get("/role/get");
  roleData.value = api.data.data
}

onBeforeMount(() => {

  if(router.currentRoute.value.path == '/user') {
    fetchRole()
  }

  if(router.currentRoute.value.path != '/role') {
    fetchCompany()
  }

})

const emits = defineEmits(['resetTable'])

const resetCompanyAndRole = () => {
  companyId.value = 'company'
  roleId.value = 'role'
  emits('resetTable')
}

</script>

<template>

  <div class="bg-white rounded-t-xl relative custom-card">

    <!-- USER , EXPORT BUTTON, ADD NEW BUTTON -->
    <div
      class="flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max sm:items-center sm:justify-between mx-4 py-2"
    >
      <p class="font-Poppins text-base capitalize text-[#0A0A0A] font-semibold">
        {{ props.title }}
      </p>

      <div class="flex items-center gap-4">

        <div v-if="props.numberSelected > 0" class="flex gap-2 items-center">
          <h1 class="font-semibold">
            {{ props.numberSelected }} Selected
          </h1>
          <button @click="$emit('deleteSelectedData')" class="bg-[#f4446c] py-3 px-4 text-xs rounded-lg text-white">
            Delete Selected 
          </button>
        </div>


        <!-- modal add ini perlu di segregasi -->
        
        <ModalAddMenu
          @add-menu="$emit('increaseMenu')"
          v-if="props.modalAddType === 'menu'"
        />

        <ModalAddUser
          @fetchSiteForCompany="$emit('fetchSiteForCompany')"
          @add-user="$emit('increaseUser')"
          v-if="props.modalAddType === 'user'"
        />
        
        <ModalAddApproval
          @add-approver="$emit('increaseApprover')"
          v-if="props.modalAddType === 'approval'"
        />
        <ModalAddSequence
          @add-sequence="$emit('increaseSequence')"
          v-if="props.modalAddType === 'sequence'"
        />
        <ModalAddRole
          @add-role="$emit('increaseRole')"
          v-if="props.modalAddType === 'role'"
        />

        <button
          @click="$emit('exportToExcel')"
          v-if="$route.path !== '/role'"
          class="btn btn-md border-green bg-white gap-2 items-center hover:bg-white hover:border-green"
        >
          <img :src="icon_receive" class="w-6 h-6" />
        </button>

      </div>
      
    </div>

    <!-- SORT & SEARCH -->
    <div class="flex flex-wrap items-end px-4 py-2 gap-y-2" v-if="$route.path !== '/role'">

      <!-- sort company -->
      <div
        class="flex items-end flex-wrap gap-4"
      >

        <!-- sort company filter -->
        <div class="flex flex-col gap-1">

          <p class="capitalize font-Fira text-xs text-black font-medium">
            Company 
            <!-- {{ companyId }} -->
          </p>

          <select
            v-model="companyId"
            class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
          >
            <option hidden disabled value="company">
              Company
            </option>
            <option v-for="data in companyData" :value="data.id" :key="data.id">
              {{ data.company_name }}
            </option>
          </select>
        </div>

        <!-- show role on user table page -->
        <div
          class="flex flex-col gap-1"
          :class="[$route.path == '/user' ? 'inline' : 'hidden']"
        >
          
          <p class="capitalize font-Fira text-xs text-black font-medium">
            Role
          </p>

          <select
            v-model="roleId"
            class="font-JakartaSans bg-white w-full lg:w-40 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:tline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
          >
            <option hidden disabled value="role">
              Role
            </option>
            <option v-for="data in roleData" :value="data.id" :key="data.id">
              {{ data.role_name }}
            </option>
          </select>

        </div>

        <!-- filter & reset button -->
        <div class="flex gap-4 flex-wrap">
          <button
            @click="$emit('filterTable',companyId, roleId)"
            class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-green bg-green gap-2 items-center hover:bg-[#099250] hover:text-white hover:border-[#099250]"
          >
            <span>
              <img :src="icon_filter" class="w-5 h-5" />
            </span>
            Filter
          </button>
          <button
            @click="resetCompanyAndRole"
            class="btn btn-sm text-white text-sm font-JakartaSans font-bold capitalize w-[114px] h-[36px] border-red bg-red gap-2 items-center hover:bg-[#D92D20] hover:text-white hover:border-[#D92D20]"
          >
            <span>
              <img :src="icon_reset" class="w-5 h-5" />
            </span>
            Reset
          </button>
        </div>

      </div>

      <div class="sm:flex-1"></div>

      <!-- searchbar -->
      <div class="pt-2 flex md:mx-0">

        <div class="relative block">
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
            type="text"
            placeholder="Search..."
            class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            v-model="search"
            @keyup="$emit('doSearch', search)"
          />
        </div>
        
      </div>

    </div>

    <div class="flex" v-if="$route.path === '/role'">

        <!-- showing -->
        <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4">
          <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
  
          <select
            class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
            v-model="pageMultiplier"
            @change="$emit('changeShowing', pageMultiplierReactive)"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>75</option>
            <option>100</option>
          </select>
        </div>

        <div class="sm:flex-1"></div>

        <!-- searchbar -->
        <div class="py-2 flex md:mx-0 px-4">
          <div class="relative block">
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
              type="text"
              placeholder="Search..."
              class="placeholder:text-slate-400 placeholder:font-JakartaSans placeholder:text-xs capitalize block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              v-model="search"
              @keyup="$emit('doSearch', search)"
            />
          </div>
        </div>
      
    </div>

    <!-- SHOWING -->
    <div class="flex items-center gap-1 pt-6 pb-4 px-4 h-4" v-else>
      <h1 class="text-xs font-JakartaSans font-normal">Showing</h1>
      <select
        class="font-JakartaSans bg-white w-full lg:w-16 border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm cursor-pointer"
        v-model="pageMultiplier"
        @change="$emit('changeShowing', pageMultiplierReactive)"
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>75</option>
        <option>100</option>
      </select>
    </div>

  </div>

</template>

<style scoped>
.custom-card {
  box-shadow: 0px -4px #015289;
  border-radius: 4px;
}
</style>
